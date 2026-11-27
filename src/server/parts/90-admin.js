const fqImportLockKey = '__imp:lock';
const fqImportLeaseMs = 300000;
function fqValidateBackup(backup) {
  if (!backup || typeof backup !== 'object' || Array.isArray(backup) || backup.format !== 'fq-admissions') throw new I(400, '不是本系统导出的备份文件');
  const tables = we.filter(table => table !== 'boardTasks' && Object.hasOwn(backup, table));
  if (!tables.length) throw new I(400, '空备份：没有业务表数组');
  for (const table of tables) {
    if (!Array.isArray(backup[table])) throw new I(400, table + ' 必须为数组');
    const ids = new Set();
    for (const row of backup[table]) {
      if (!row || typeof row !== 'object' || Array.isArray(row) || typeof row.id !== 'string' || !row.id || ids.has(row.id)) throw new I(400, table + ' 记录编号无效或重复');
      if (row.studentId != null && typeof row.studentId !== 'string') throw new I(400, table + ' 学生编号格式无效');
      ids.add(row.id);
    }
  }
  if (backup.reqdb != null) {
    fqValidateImportReqdb(backup.reqdb);
    if (backup.reqdb.schools.some(row => !row || typeof row !== 'object' || Array.isArray(row) || typeof row.id !== 'string') || backup.reqdb.records.some(row => !row || typeof row !== 'object' || Array.isArray(row))) throw new I(400, '院校库记录格式无效');
  }
  if (backup.users !== undefined && !Array.isArray(backup.users)) throw new I(400, 'users 必须为数组');
  const ids = new Set(), names = new Set();
  for (const user of backup.users || []) {
    if (!user || typeof user !== 'object' || typeof user.id !== 'string' || !user.id || typeof user.username !== 'string' || !user.username.trim()) throw new I(400, '备份用户编号或登录名无效');
    const name = user.username.replace(/[A-Z]/g, c => c.toLowerCase());
    if (ids.has(user.id) || names.has(name)) throw new I(400, '备份内用户编号或登录名重复');
    ids.add(user.id); names.add(name);
  }
  return tables;
}
function fqImportGuard(phase) {
  return "EXISTS(SELECT 1 FROM meta WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='" + phase + "')";
}
function fqImportJsonChunks(rows) {
  const chunks = []; let chunk = [], length = 2;
  for (const row of rows) {
    const encoded = JSON.stringify(row);
    if (chunk.length && length + encoded.length > 250000) { chunks.push('[' + chunk.join(',') + ']'); chunk = []; length = 2; }
    chunk.push(encoded); length += encoded.length + 1;
  }
  if (chunk.length) chunks.push('[' + chunk.join(',') + ']');
  return chunks;
}
async function fqImportBackup(env, backup) {
  const tables = fqValidateBackup(backup);
  const existing = (await env.DB.prepare('SELECT id,username FROM users').all()).results;
  const ids = new Set(existing.map(user => user.id));
  const names = new Map(existing.map(user => [user.username.replace(/[A-Z]/g, c => c.toLowerCase()), user.id]));
  for (const user of backup.users || []) {
    const other = names.get(user.username.replace(/[A-Z]/g, c => c.toLowerCase()));
    if (other !== undefined && other !== user.id) throw new I(400, '登录名冲突：' + user.username);
    if (!ids.has(user.id) && (typeof user.name !== 'string' || !['supervisor','advisor','writer','student'].includes(user.role))) throw new I(400, '新用户姓名或角色无效');
  }
  const users = [], created = [], now = j();
  for (const user of backup.users || []) {
    if (ids.has(user.id)) continue;
    const password = ee(), hash = await H(password);
    users.push({...user, pw_hash:hash.hash, pw_salt:hash.salt, active:user.active ? 1 : 0, createdAt:now});
    created.push({name:user.name,username:user.username,password});
  }
  const token = crypto.randomUUID(), prefix = '__imp:' + token + ':';
  const lease = () => JSON.stringify({token,phase:'staging',expiresAt:Date.now() + fqImportLeaseMs});
  const acquired = await env.DB.prepare("INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value WHERE json_extract(meta.value,'$.expiresAt') <= ?").bind(fqImportLockKey,lease(),Date.now()).run();
  if (acquired.meta.changes !== 1) throw new I(409, '另一个导入正在进行，请稍后重试');
  let committed = false;
  try {
    await env.DB.prepare("DELETE FROM records WHERE tbl GLOB '__imp:*' AND " + fqImportGuard('staging')).bind(fqImportLockKey,token).run();
    let pending = [], count = 0;
    const flush = async () => {
      if (!pending.length) return;
      const renewed = env.DB.prepare("UPDATE meta SET value=? WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='staging'").bind(lease(),fqImportLockKey,token);
      const result = await env.DB.batch([renewed,...pending]);
      if (result.some(row => row.meta.changes !== 1)) throw new I(409, '导入锁已失效，请重试');
      pending = [];
    };
    for (const table of tables) for (const original of backup[table]) {
      const row = {...original,updatedAt:original.updatedAt || now,createdAt:original.createdAt || now};
      pending.push(env.DB.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT ?,?,?,?,? WHERE ' + fqImportGuard('staging')).bind(prefix + table,row.id,table === 'students' ? row.id : row.studentId || null,JSON.stringify(row),row.updatedAt,fqImportLockKey,token));
      count++;
      if (pending.length === 79) await flush();
    }
    await flush();
    // The first statement arms all remaining writes only when ownership and the
    // complete staged row count still match. On a lost lease every write is a no-op.
    const guard = fqImportGuard('committing');
    const statements = [env.DB.prepare("UPDATE meta SET value=json_set(value,'$.phase','committing') WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='staging' AND json_extract(value,'$.expiresAt') > CAST(strftime('%s','now') AS INTEGER)*1000 AND (SELECT COUNT(*) FROM records WHERE tbl GLOB ?)=?").bind(fqImportLockKey,token,prefix + '*',count)];
    statements.push(env.DB.prepare('DELETE FROM records WHERE tbl IN (SELECT value FROM json_each(?)) AND ' + guard).bind(JSON.stringify(tables),fqImportLockKey,token));
    statements.push(env.DB.prepare('UPDATE records SET tbl=substr(tbl,?) WHERE tbl GLOB ? AND ' + guard).bind(prefix.length + 1,prefix + '*',fqImportLockKey,token));
    if (backup.reqdb != null) {
      const library = backup.reqdb, meta = [], counts = new Map(), groups = new Map();
      for (const row of library.records) { const group = groups.get(row.school) || []; group.push(row); groups.set(row.school,group); }
      for (const school of library.schools) {
        const rows = groups.get(school.id) || []; counts.set(school.id,rows.length);
        meta.push({key:'reqdb:school:' + school.id,value:JSON.stringify(rows)});
      }
      meta.push({key:'reqdb:head',value:JSON.stringify({format:library.format,version:library.version,exportedAt:library.exportedAt,taxonomy:library.taxonomy,schools:library.schools.map(school => ({...school,recordCount:counts.get(school.id) || 0}))})});
      statements.push(env.DB.prepare("DELETE FROM meta WHERE key LIKE 'reqdb:school:%' AND " + guard).bind(fqImportLockKey,token));
      for (const chunk of fqImportJsonChunks(meta)) statements.push(env.DB.prepare("INSERT OR REPLACE INTO meta(key,value) SELECT json_extract(value,'$.key'),json_extract(value,'$.value') FROM json_each(?) WHERE " + guard).bind(chunk,fqImportLockKey,token));
    }
    for (const chunk of fqImportJsonChunks(users)) statements.push(env.DB.prepare("INSERT INTO users(id,username,name,role,student_id,active,pw_hash,pw_salt,must_change,created_at,updated_at) SELECT json_extract(value,'$.id'),json_extract(value,'$.username'),json_extract(value,'$.name'),json_extract(value,'$.role'),json_extract(value,'$.studentId'),json_extract(value,'$.active'),json_extract(value,'$.pw_hash'),json_extract(value,'$.pw_salt'),1,json_extract(value,'$.createdAt'),json_extract(value,'$.createdAt') FROM json_each(?) WHERE " + guard).bind(chunk,fqImportLockKey,token));
    statements.push(env.DB.prepare('DELETE FROM meta WHERE key=? AND ' + guard).bind(fqImportLockKey,fqImportLockKey,token));
    const result = await env.DB.batch(statements);
    if (result[0].meta.changes !== 1) throw new I(409, '导入锁或暂存记录已变化，原数据未替换');
    committed = true;
    return created;
  } catch (error) {
    if (error instanceof I) throw error;
    if (/UNIQUE constraint/i.test(String(error.message))) throw new I(409, '导入时发生用户或记录冲突，原数据未替换');
    throw new I(500, '导入失败，原业务数据未替换');
  } finally {
    if (!committed) {
      try {
        await env.DB.batch([
          env.DB.prepare('DELETE FROM records WHERE tbl GLOB ?').bind(prefix + '*'),
          env.DB.prepare("DELETE FROM meta WHERE key=? AND json_extract(value,'$.token')=?").bind(fqImportLockKey,token)
        ]);
      } catch { /* A later import cleans abandoned staging after the lease expires. */ }
    }
  }
}
async function ni(t, e, i, n, o) {
  if (Qt(i), n === "export" && o === "GET") {
    let r = (await e.DB.prepare("SELECT tbl, data FROM records WHERE tbl NOT GLOB '__imp:*'").all()).results,
      s = {
        format: "fq-admissions",
        version: 2,
        exportedAt: j(),
        users: await Zt(e)
      };
    for (let a of we) s[a] = r.filter(d => d.tbl === a).map(d => JSON.parse(d.data));
    return s.reqdb = await Xt(e), await N(e, i.id, "export"), D(s, 200, {
      "Content-Disposition": 'attachment; filename="fq-backup.json"'
    });
  }
  if (n === "import" && o === "POST") {
    const r = await fqReadImportRequest(t);
    const s = await fqImportBackup(e, r);
    return await N(e, i.id, "import"), D({
      ok: !0,
      created: s
    });
  }
  if (n === "demo" && o === "POST") {
    let r = await Jt(e, i.id);
    return await N(e, i.id, "demo"), D({
      ok: !0,
      accounts: r
    });
  }
  if (n === "clear" && o === "POST") return await e.DB.prepare("DELETE FROM records WHERE tbl != 'templates'").run(), await e.DB.prepare("DELETE FROM users WHERE role != 'supervisor'").run(), await N(e, i.id, "clear"), D({
    ok: !0
  });
  if (n === "audit" && o === "GET") {
    let r = (await e.DB.prepare("SELECT a.at, a.action, a.tbl, a.rec_id, a.detail, u.name FROM audit a LEFT JOIN users u ON u.id = a.user_id ORDER BY a.id DESC LIMIT 300").all()).results;
    return D({
      rows: r
    });
  }
  throw new I(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
