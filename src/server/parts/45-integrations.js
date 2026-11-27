// Assistant bridge v1.1. Deliberately independent of browser cookies and CSRF headers.
async function fqBoardPermission(user, action, previous, input, read) {
  if (!previous) return {ok:false,error:'任务只能由助理创建'};
  const supervisor = user.role === 'supervisor';
  const assigned = ['advisor','supervisor'].includes(user.role) && previous.assigneeId === user.id;
  if (action === 'delete') return {ok:supervisor};
  if (!supervisor && !assigned) return {ok:false};
  const record = {...previous};
  if (supervisor && Object.hasOwn(input,'assigneeId') && input.assigneeId !== previous.assigneeId) {
    const assignee = await read('boardAssignee',input.assigneeId);
    if (!assignee) throw new I(400,'负责人不存在');
    record.assigneeId = assignee.id;
  }
  if (input.status !== undefined && input.status !== previous.status) {
    if (!assigned) return {ok:false,error:'只有负责人可以推进任务状态'};
    if (previous.status === 'open' && input.status === 'blocked') {
      if (typeof input.blockedReason !== 'string' || !input.blockedReason.trim() || [...input.blockedReason.trim()].length > 500) throw new I(400,'遇阻原因必填且不能超过500字');
      record.status = 'blocked'; record.blockedReason = input.blockedReason.trim(); record.blockedAt = j();
    } else if (['open','blocked'].includes(previous.status) && input.status === 'done') {
      record.status = 'done'; record.doneAt = j(); record.doneBy = user.name;
    } else throw new I(409,'不允许的任务状态变化');
  }
  return {ok:true,record};
}
async function fqBoardAssignee(env, id, byUsername = false) {
  if (typeof id !== 'string') return null;
  return env.DB.prepare("SELECT id, username, name, role FROM users WHERE " + (byUsername ? 'username = ? COLLATE NOCASE' : 'id = ?') + " AND active=1 AND role IN ('advisor','supervisor')").bind(id).first();
}
// Serialize timestamps across board tasks as well as CAS each record. A timestamp-only
// cursor must never split equal timestamps at the 200-item boundary.
async function fqBoardSave(env, original, record) {
  const latest = await env.DB.prepare("SELECT MAX(updated_at) AS at FROM records WHERE tbl='boardTasks'").first();
  const clock = await env.DB.prepare("SELECT value FROM meta WHERE key='assistant:board-clock'").first();
  record.updatedAt = new Date(Math.max(Date.now(),(Date.parse(latest?.at)||0)+1,(Date.parse(clock?.value)||0)+1)).toISOString();
  const data = JSON.stringify(record), guard = "NOT EXISTS(SELECT 1 FROM records WHERE tbl='boardTasks' AND updated_at>=?) AND NOT EXISTS(SELECT 1 FROM meta WHERE key='assistant:board-clock' AND value>=?)";
  const statement = original === null
    ? env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT 'boardTasks',?,NULL,?,? WHERE " + guard + " ON CONFLICT(tbl,id) DO NOTHING").bind(record.id,data,record.updatedAt,record.updatedAt,record.updatedAt)
    : env.DB.prepare("UPDATE records SET data=?,updated_at=?,student_id=NULL WHERE tbl='boardTasks' AND id=? AND data=? AND " + guard).bind(data,record.updatedAt,record.id,original,record.updatedAt,record.updatedAt);
  const clockWrite = env.DB.prepare("INSERT INTO meta(key,value) SELECT 'assistant:board-clock',? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='boardTasks' AND id=? AND data=?) ON CONFLICT(key) DO UPDATE SET value=excluded.value WHERE meta.value<excluded.value").bind(record.updatedAt,record.id,data);
  const saved = await env.DB.batch([statement,clockWrite]);
  if (!saved[0].meta.changes) throw new I(409,'任务已被更新，请重试');
}
function fqAssistantText(value, max, required = false) {
  if (typeof value !== 'string' || [...value].length > max || (required && !value.trim())) throw new I(400,'任务字段无效');
  return value;
}
async function fqAssistant(request, env, url) {
  const secret = env.ASSISTANT_BRIDGE_SECRET;
  if (typeof secret !== 'string' || !secret) throw new I(503,'助理对接未配置');
  const timestamp = request.headers.get('X-FQ-Timestamp') || '';
  const signature = request.headers.get('X-FQ-Signature') || '';
  if (!/^\d{1,12}$/.test(timestamp) || Math.abs(Math.floor(Date.now()/1000)-Number(timestamp)) > 300 || !/^[a-fA-F0-9]{64}$/.test(signature)) throw new I(401,'签名无效');
  const bytes = await fqReadLimitedBody(request, 64*1024);
  const hex = data => Array.from(new Uint8Array(data),v=>v.toString(16).padStart(2,'0')).join('');
  const encoder = new TextEncoder();
  const hash = hex(await crypto.subtle.digest('SHA-256',bytes));
  const key = await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
  const supplied = Uint8Array.from(signature.match(/../g),v=>parseInt(v,16));
  const message = `${timestamp}\n${request.method}\n${url.pathname}${url.search}\n${hash}`;
  if (!await crypto.subtle.verify('HMAC',key,supplied,encoder.encode(message))) throw new I(401,'签名无效');
  const route = url.pathname.slice('/api/integrations/assistant'.length);
  if (route === '/advisors' && request.method === 'GET') {
    const rows = await env.DB.prepare("SELECT username,name,role FROM users WHERE active=1 AND role IN ('advisor','supervisor') ORDER BY username").all();
    return D({items:rows.results});
  }
  if (route === '/updates' && request.method === 'GET') {
    const since = url.searchParams.get('since');
    if (!since || !/^\d{4}-\d\d-\d\dT(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-]\d\d:\d\d)$/.test(since) || !Number.isFinite(Date.parse(since)) || new Date(since.slice(0,10)+'T00:00:00.000Z').toISOString().slice(0,10) !== since.slice(0,10)) throw new I(400,'since 必须为 ISO 时间');
    const after = new Date(since).toISOString();
    const rows = (await env.DB.prepare("SELECT r.data,u.name AS assigneeName FROM records r LEFT JOIN users u ON u.id=json_extract(r.data,'$.assigneeId') WHERE r.tbl='boardTasks' AND json_extract(r.data,'$.source')='assistant' AND r.updated_at>? ORDER BY r.updated_at ASC,r.id ASC LIMIT 200").bind(after).all()).results;
    const items = rows.map(row=>{
      const task = JSON.parse(row.data);
      return {externalId:task.externalId,status:task.status,blockedReason:task.blockedReason??null,blockedAt:task.blockedAt??null,doneAt:task.doneAt??null,doneBy:task.doneBy??null,assigneeName:row.assigneeName||'',note:task.note,updatedAt:task.updatedAt};
    });
    return D({items,next:items.at(-1)?.updatedAt || since});
  }
  if (route === '/tasks' && request.method === 'POST') {
    if ((request.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase() !== 'application/json') throw new I(415,'需要 application/json');
    let input;
    try {input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));} catch {throw new I(400,'请求内容不是有效的 JSON');}
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new I(400,'任务字段无效');
    const externalId = fqAssistantText(input.externalId,200,true);
    const title = fqAssistantText(input.title,120,true), note = fqAssistantText(input.note??'',2000);
    if (!['high','normal','low'].includes(input.importance)) throw new I(400,'重要性无效');
    const due = input.due??null;
    if (due !== null && (typeof due !== 'string' || !/^\d{4}-\d\d-\d\d$/.test(due) || !Number.isFinite(Date.parse(due)) || new Date(due).toISOString().slice(0,10) !== due)) throw new I(400,'截止日期无效');
    const assignee = await fqBoardAssignee(env,input.assignee,true);
    if (!assignee) throw new I(400,'负责人不存在');
    const id = 'bt-' + hex(await crypto.subtle.digest('SHA-256',encoder.encode(externalId)));
    for (let attempt=0;attempt<5;attempt++) {
      const previous = await env.DB.prepare("SELECT data FROM records WHERE tbl='boardTasks' AND id=?").bind(id).first();
      const old = previous ? JSON.parse(previous.data) : null;
      const record = {...(old || {id,status:'open',blockedReason:null,blockedAt:null,doneAt:null,doneBy:null,source:'assistant',externalId,createdBy:'assistant',createdAt:j()}),title,note,importance:input.importance,due,assigneeId:assignee.id};
      try {await fqBoardSave(env,previous?.data??null,record);} catch(error) {if(error instanceof I && error.status===409 && attempt<4) continue;throw error;}
      return D({id,status:record.status,created:!old});
    }
  }
  throw new I(404,'接口不存在');
}
