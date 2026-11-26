var qn = ["CREATE TABLE IF NOT EXISTS records (tbl TEXT NOT NULL, id TEXT NOT NULL, student_id TEXT, data TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (tbl, id))", "CREATE INDEX IF NOT EXISTS records_student ON records (tbl, student_id)", "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE COLLATE NOCASE, name TEXT NOT NULL, role TEXT NOT NULL, student_id TEXT, active INTEGER NOT NULL DEFAULT 1, pw_hash TEXT, pw_salt TEXT, must_change INTEGER NOT NULL DEFAULT 1, created_at TEXT, updated_at TEXT, last_login TEXT)", "CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER, ip TEXT, ua TEXT)", "CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, count INTEGER, locked_until INTEGER, updated_at INTEGER)", "CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)", "CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT, user_id TEXT, action TEXT, tbl TEXT, rec_id TEXT, detail TEXT)"],
  Wt = new WeakSet();
async function Hn(t) {
  if (!t.DB || !Wt.has(t.DB)) {
    if (!t.DB) throw new I(500, "\u7533\u8BF7\u7CFB\u7EDF\u672A\u7ED1\u5B9A D1 \u6570\u636E\u5E93\uFF08wrangler.toml \u4E2D\u7684 APPLY_DB\uFF09");
    await t.DB.batch([...qn, ...Ht].map(e => t.DB.prepare(e))), Wt.add(t.DB);
  }
}
var I = class extends Error {
    constructor(e, i, n) {
      super(i), this.status = e, this.extra = n;
    }
  },
  ot = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'"
  };
function Te(t, e = {}) {
  let i = new Response(t.body, t);
  for (let [n, o] of Object.entries({
    ...ot,
    ...e
  })) i.headers.set(n, o);
  return i;
}
var D = (t, e = 200, i = {}) => new Response(JSON.stringify(t), {
  status: e,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...ot,
    ...i
  }
});
// Bound raw bytes before parsing or allocating JSON; Content-Length is only an early check.
async function fqReadLimitedBody(request, limit) {
  const declared = request.headers.get('Content-Length');
  if (declared !== null && /^\d+$/.test(declared) && Number(declared) > limit) throw new I(413, '请求体超过大小限制');
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader(), chunks = []; let size = 0;
  try {
    for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel().catch(() => {}); throw new I(413, '请求体超过大小限制'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.byteLength; }
  return bytes;
}
async function fqReadImportRequest(request) {
  const bytes = await fqReadLimitedBody(request,20 * 1024 * 1024);
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new I(400, '请求内容不是有效的 JSON'); }
}
async function X(t) {
  try {
    return await t.json();
  } catch {
    throw new I(400, "\u8BF7\u6C42\u5185\u5BB9\u4E0D\u662F\u6709\u6548\u7684 JSON");
  }
}
var j = () => new Date().toISOString(),
  Kn = /^[A-Za-z0-9_-]{2,80}$/;
async function Vn(t, e, i) {
  if (e.role !== "supervisor") throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5F7B\u5E95\u5220\u9664\u5B66\u751F");
  let n = await ue(t, "students", i);
  if (!n) throw new I(404, "\u5B66\u751F\u4E0D\u5B58\u5728\u6216\u5DF2\u5220\u9664");
  let o = (await t.DB.prepare("SELECT tbl, COUNT(*) AS n FROM records WHERE student_id = ? AND tbl NOT GLOB '__imp:*' GROUP BY tbl").bind(i).all()).results,
    r = (await t.DB.prepare("SELECT id FROM users WHERE role = 'student' AND student_id = ?").bind(i).all()).results.map(s => s.id);
  return await t.DB.batch([t.DB.prepare("DELETE FROM records WHERE student_id = ?").bind(i), t.DB.prepare("DELETE FROM records WHERE tbl = 'students' AND id = ?").bind(i), ...r.map(s => t.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s)), t.DB.prepare("DELETE FROM users WHERE role = 'student' AND student_id = ?").bind(i)]), await N(t, e.id, "student-purge", "students", i, `${n.name || ""}\uFF1A` + o.map(s => `${s.tbl} ${s.n}`).join("\uFF0C") + (r.length ? `\uFF0C\u5B66\u751F\u8D26\u53F7 ${r.length}` : "")), D({
    ok: !0
  });
}
async function N(t, e, i, n = "", o = "", r = "") {
  try {
    await t.DB.prepare("INSERT INTO audit (at, user_id, action, tbl, rec_id, detail) VALUES (?,?,?,?,?,?)").bind(j(), e || "", i, n, o, String(r).slice(0, 500)).run();
  } catch {}
}
async function ue(t, e, i) {
  let n = await t.DB.prepare("SELECT data FROM records WHERE tbl = ? AND id = ?").bind(e, i).first();
  return n ? JSON.parse(n.data) : null;
}
function Yt(t, e, i) {
  return t.DB.prepare("INSERT INTO records (tbl, id, student_id, data, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(tbl, id) DO UPDATE SET student_id = excluded.student_id, data = excluded.data, updated_at = excluded.updated_at").bind(e, i.id, e === "students" ? i.id : i.studentId || null, JSON.stringify(i), i.updatedAt);
}
async function Zt(t) {
  return (await t.DB.prepare("SELECT * FROM users ORDER BY created_at").all()).results.map(se);
}
function fqValidateImportReqdb(e) {
  if (!e || !Array.isArray(e.schools) || !Array.isArray(e.records) || !e.taxonomy) throw new I(400, "\u9662\u6821\u5E93\u683C\u5F0F\u4E0D\u5BF9\uFF1A\u9700\u8981 taxonomy\u3001schools\u3001records");
}
async function at(t, e) {
  fqValidateImportReqdb(e);
  let n = (await t.DB.prepare("SELECT key FROM meta WHERE key LIKE 'reqdb:school:%'").all()).results.map(r => r.key).map(r => t.DB.prepare("DELETE FROM meta WHERE key = ?").bind(r)),
    o = {};
  for (let r of e.schools) {
    let s = e.records.filter(a => a.school === r.id);
    o[r.id] = s.length, n.push(t.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?,?)").bind("reqdb:school:" + r.id, JSON.stringify(s)));
  }
  n.push(t.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?,?)").bind("reqdb:head", JSON.stringify({
    format: e.format,
    version: e.version,
    exportedAt: e.exportedAt,
    taxonomy: e.taxonomy,
    schools: e.schools.map(r => Object.assign({}, r, {
      recordCount: o[r.id] || 0
    }))
  }))), await t.DB.batch(n);
}
async function xe(t) {
  let e = await t.DB.prepare("SELECT value FROM meta WHERE key = 'reqdb:head'").first();
  return e ? JSON.parse(e.value) : null;
}
async function Xt(t) {
  let e = await xe(t);
  if (!e) return null;
  let i = (await t.DB.prepare("SELECT value FROM meta WHERE key LIKE 'reqdb:school:%'").all()).results;
  return {
    format: e.format,
    version: e.version,
    exportedAt: e.exportedAt,
    taxonomy: e.taxonomy,
    schools: e.schools.map(n => {
      let o = Object.assign({}, n);
      return delete o.recordCount, o;
    }),
    records: i.flatMap(n => JSON.parse(n.value))
  };
}
async function rt(t, e, {
  wipe: i = !1
} = {}) {
  let n = [];
  i && n.push(t.DB.prepare("DELETE FROM records"));
  let o = j();
  for (let r of we) for (let s of e[r] || []) s.updatedAt = s.updatedAt || o, s.createdAt = s.createdAt || o, n.push(Yt(t, r, s));
  for (let r = 0; r < n.length; r += 80) await t.DB.batch(n.slice(r, r + 80));
}
async function Jt(t, e) {
  await rt(t, Ze, {
    wipe: !0
  });
  let i = j(),
    n = [],
    o = [t.DB.prepare("DELETE FROM users WHERE id != ?").bind(e || "")];
  for (let r of Ze.users || []) {
    if (r.role === "supervisor" && e) continue;
    let s = ee(),
      a = await H(s);
    n.push({
      name: r.name,
      role: r.role,
      username: r.username,
      password: s
    }), o.push(t.DB.prepare("INSERT OR REPLACE INTO users (id, username, name, role, student_id, active, pw_hash, pw_salt, must_change, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(r.id, r.username, r.name, r.role, r.studentId || null, 1, a.hash, a.salt, 1, i, i));
  }
  return await t.DB.batch(o), e && (await t.DB.prepare(`UPDATE records SET data = REPLACE(data, '"u-sup"', ?) WHERE data LIKE '%"u-sup"%'`).bind(JSON.stringify(e)).run()), n;
}
