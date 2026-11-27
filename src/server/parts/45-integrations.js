// Assistant bridge and board task actions. No schema changes or external requests.
const fqBoardV12 = env => env.BOARD_V12_ENABLED === '1';
function fqBoardVisible(context, task) {
  const user=context.user;
  if (!user.active || !['supervisor','advisor'].includes(user.role) || task.status==='cancelled') return false;
  if (!context.boardV12 && task.visibility==='board') return false;
  return user.role==='supervisor' || task.assigneeId===user.id || (context.boardV12 && task.visibility==='board' && !task.claimedBy);
}
async function fqBoardPermission(user, action, previous, input, read) {
  if (!previous) return {ok:false,error:'任务只能由助理创建'};
  if (previous.status==='cancelled' || previous.visibility==='board') return {ok:false};
  const supervisor = user.role === 'supervisor';
  const assigned = ['advisor','supervisor'].includes(user.role) && previous.assigneeId === user.id;
  if (action === 'delete') return {ok:supervisor && ['open','blocked'].includes(previous.status)};
  if (!supervisor && !assigned) return {ok:false};
  const record={...previous};
  if (supervisor && Object.hasOwn(input,'assigneeId') && input.assigneeId!==previous.assigneeId && !['done','cancelled'].includes(previous.status)) {
    const assignee=await read('boardAssignee',input.assigneeId);
    if (!assignee) throw new I(400,'负责人不存在');
    record.assigneeId=assignee.id;
  }
  if (input.status!==undefined && input.status!==previous.status) {
    if (!assigned) return {ok:false};
    fqBoardAdvance(record,input.status,input.blockedReason,user);
  }
  return {ok:true,record};
}
function fqBoardAdvance(record,status,reason,user) {
  if (record.status==='open' && status==='blocked') {
    if (typeof reason!=='string' || !reason.trim() || [...reason.trim()].length>500) throw new I(400,'遇阻原因必填且不能超过500字');
    record.status='blocked';record.blockedReason=reason.trim();record.blockedAt=j();
  } else if (['open','blocked'].includes(record.status) && status==='done') {
    record.status='done';record.doneAt=j();record.doneBy=user.name;
  } else throw new I(409,'不允许的任务状态变化');
}
function fqBoardTransfer(record, assignee, board) {
  const changed=(record.visibility||'assigned')!==(board?'board':'assigned') || (!board && record.assigneeId!==assignee.id);
  // Explicit public -> public preserves a claim; ownership changes clear it.
  if (changed) {
    record.visibility=board?'board':'assigned';record.assigneeId=board?null:assignee.id;
    record.claimedBy=null;record.claimedAt=null;
    if (record.status==='blocked') {record.status='open';record.blockedReason=null;record.blockedAt=null;}
  }
}
async function fqBoardAssignee(env,id,byUsername=false) {
  if(typeof id!=='string') return null;
  return env.DB.prepare("SELECT id,username,name,role FROM users WHERE "+(byUsername?'username=? COLLATE NOCASE':'id=?')+" AND active=1 AND role IN ('advisor','supervisor')").bind(id).first();
}
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
async function fqBoardConflict(env,id) {
  const task=await ue(env,'boardTasks',id);
  const owner=task?.claimedBy && await fqBoardAssignee(env,task.claimedBy,true);
  throw new I(409,owner?'已被'+owner.name+'认领':'任务已被更新，请刷新后重试');
}
async function fqBoardAction(request,env,user,id,action) {
  if (!user.active || !['advisor','supervisor'].includes(user.role)) throw new I(403,'没有权限');
  if (!fqBoardV12(env) && ['claim','release'].includes(action)) throw new I(404,'接口不存在');
  const original=await env.DB.prepare("SELECT data FROM records WHERE tbl='boardTasks' AND id=?").bind(id).first();
  if (!original) throw new I(404,'任务不存在');
  const record=JSON.parse(original.data), context={user,boardV12:fqBoardV12(env)};
  const supervisor=user.role==='supervisor';
  if (action==='claim' && record.visibility==='board' && record.claimedBy) return fqBoardConflict(env,id);
  if (!fqBoardVisible(context,record)) throw new I(403,'没有权限');
  if (!['open','blocked'].includes(record.status)) throw new I(409,'任务已结束，不能操作');
  const bytes=await fqReadLimitedBody(request,4096);
  let input={};
  try {if(bytes.length) input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));} catch {throw new I(400,'请求内容不是有效的 JSON');}
  if (!input || typeof input!=='object' || Array.isArray(input)) throw new I(400,'请求内容无效');
  if (action==='claim') {
    if (record.visibility!=='board' || record.claimedBy || record.status!=='open') throw new I(409,'任务不能认领');
    record.claimedBy=user.username;record.claimedAt=j();record.assigneeId=user.id;
  } else if (action==='release') {
    if (!supervisor && (record.claimedBy!==user.username || record.status!=='open')) throw new I(403,'只有认领者可释放待办；遇阻任务需主管处理');
    record.visibility='board';record.assigneeId=null;record.claimedBy=null;record.claimedAt=null;
    if(record.status==='blocked') {record.status='open';record.blockedReason=null;record.blockedAt=null;}
  } else if (action==='block' || action==='done') {
    if(record.assigneeId!==user.id || (record.visibility==='board' && record.claimedBy!==user.username)) throw new I(403,'只有负责人可以推进任务状态');
    fqBoardAdvance(record,action==='block'?'blocked':'done',input.blockedReason,user);
  } else if(action==='reassign') {
    if(!supervisor) throw new I(403,'只有主管可以改派');
    if(input.assigneeId===null && !fqBoardV12(env)) throw new I(400,'公开任务板未开启');
    const assignee=input.assigneeId===null?null:await fqBoardAssignee(env,input.assigneeId);
    if(input.assigneeId!==null && !assignee) throw new I(400,'负责人不存在');
    fqBoardTransfer(record,assignee,input.assigneeId===null);
  } else if(action==='delete') {
    if(!supervisor) throw new I(403,'只有主管可以删除');
    record.status='cancelled';record.cancelledAt=j();record.cancelledBy='supervisor';
  } else throw new I(404,'接口不存在');
  try {await fqBoardSave(env,original.data,record);} catch(error) {if(error instanceof I && error.status===409) return fqBoardConflict(env,id);throw error;}
  await N(env,user.id,'board-'+action,'boardTasks',id);
  return D({record});
}
function fqAssistantExternalId(value) {
  if(typeof value!=='string' || !/^[A-Za-z0-9._:-]{1,128}$/.test(value)) throw new I(400,'externalId 格式无效');
  return value;
}
async function fqAssistantTaskId(externalId) {
  const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(externalId));
  return 'bt-'+Array.from(new Uint8Array(hash),v=>v.toString(16).padStart(2,'0')).join('');
}
function fqAssistantText(value,max,required=false) {
  if(typeof value!=='string' || [...value].length>max || (required&&!value.trim())) throw new I(400,'任务字段无效');
  return value;
}
async function fqAssistant(request, env, url) {
  const secret = env.ASSISTANT_BRIDGE_SECRET;
  if (typeof secret !== 'string' || secret.length < 32) throw new I(503,'助理对接未配置');
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
  const route=url.pathname.slice('/api/integrations/assistant'.length),v12=fqBoardV12(env);
  if(route==='/advisors' && request.method==='GET') return D({items:(await env.DB.prepare("SELECT username,name,role FROM users WHERE active=1 AND role IN ('advisor','supervisor') ORDER BY username").all()).results});
  if(route==='/updates' && request.method==='GET') {
    const since=url.searchParams.get('since');
    if(!since || !/^\d{4}-\d\d-\d\dT(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-]\d\d:\d\d)$/.test(since) || !Number.isFinite(Date.parse(since)) || new Date(since.slice(0,10)+'T00:00:00.000Z').toISOString().slice(0,10)!==since.slice(0,10)) throw new I(400,'since 必须为 ISO 时间');
    const rows=(await env.DB.prepare("SELECT r.data,u.name AS assigneeName,c.name AS claimedByName FROM records r LEFT JOIN users u ON u.id=json_extract(r.data,'$.assigneeId') LEFT JOIN users c ON c.username=json_extract(r.data,'$.claimedBy') COLLATE NOCASE WHERE r.tbl='boardTasks' AND json_extract(r.data,'$.source')='assistant'"+(!v12?" AND COALESCE(json_extract(r.data,'$.status'),'open')!='cancelled' AND COALESCE(json_extract(r.data,'$.visibility'),'assigned')!='board'":"")+" AND r.updated_at>? ORDER BY r.updated_at ASC,r.id ASC LIMIT 200").bind(new Date(since).toISOString()).all()).results;
    const items=rows.map(row=>{const t=JSON.parse(row.data);return {externalId:t.externalId,status:t.status,blockedReason:t.blockedReason??null,blockedAt:t.blockedAt??null,doneAt:t.doneAt??null,doneBy:t.doneBy??null,assigneeName:row.assigneeName??null,visibility:t.visibility||'assigned',claimedBy:t.claimedBy??null,claimedByName:row.claimedByName??null,claimedAt:t.claimedAt??null,cancelledAt:t.cancelledAt??null,cancelledBy:t.cancelledBy??null,note:t.note,updatedAt:t.updatedAt};});
    return D({items,next:items.at(-1)?.updatedAt||since});
  }
  const cancel=route.match(/^\/tasks\/(.*)\/cancel$/);
  if(cancel && request.method==='POST') {
    if(!v12) throw new I(404,'接口不存在');
    const externalId=fqAssistantExternalId(cancel[1]),id=await fqAssistantTaskId(externalId);
    if(bytes.length) throw new I(400,'撤回请求体必须为空');
    for(let attempt=0;attempt<5;attempt++) {
      const original=await env.DB.prepare("SELECT data FROM records WHERE tbl='boardTasks' AND id=?").bind(id).first();
      if(!original) throw new I(404,'任务不存在');
      const record=JSON.parse(original.data);
      if(record.status==='done') throw new I(409,'任务已完成，不能撤回');
      if(record.status==='cancelled') return D({id,status:'cancelled'});
      record.status='cancelled';record.cancelledAt=j();record.cancelledBy='assistant';
      try{await fqBoardSave(env,original.data,record);}catch(error){if(error instanceof I&&error.status===409&&attempt<4) continue;throw error;}
      await N(env,'assistant','board-cancel','boardTasks',id);return D({id,status:'cancelled'});
    }
  }
  if(route==='/tasks' && request.method==='POST') {
    if((request.headers.get('Content-Type')||'').split(';')[0].trim().toLowerCase()!=='application/json') throw new I(415,'需要 application/json');
    let input;try{input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw new I(400,'请求内容不是有效的 JSON');}
    if(!input || typeof input!=='object' || Array.isArray(input)) throw new I(400,'任务字段无效');
    const externalId=fqAssistantExternalId(input.externalId),id=await fqAssistantTaskId(externalId);
    for(let attempt=0;attempt<5;attempt++) {
      const original=await env.DB.prepare("SELECT data FROM records WHERE tbl='boardTasks' AND id=?").bind(id).first();
      const old=original?JSON.parse(original.data):null;
      if(old?.status==='cancelled') return D({id,status:'cancelled',created:false});
      const record={...(old||{id,status:'open',blockedReason:null,blockedAt:null,doneAt:null,doneBy:null,visibility:'assigned',claimedBy:null,claimedAt:null,cancelledAt:null,cancelledBy:null,source:'assistant',externalId,createdBy:'assistant',createdAt:j(),note:'',importance:'normal',due:null,assigneeId:null})};
      for(const [field,max] of [['title',120],['note',2000]]) if(Object.hasOwn(input,field)||(!old&&field==='title')) record[field]=fqAssistantText(field==='note'&&input[field]===null?'':input[field],max,field==='title');
      if(Object.hasOwn(input,'importance')) {if(!['high','normal','low'].includes(input.importance)) throw new I(400,'重要性无效');record.importance=input.importance;}
      if(Object.hasOwn(input,'due')) {
        const due=input.due;
        if(due!==null && (typeof due!=='string'||!/^\d{4}-\d\d-\d\d$/.test(due)||!Number.isFinite(Date.parse(due))||new Date(due).toISOString().slice(0,10)!==due)) throw new I(400,'截止日期无效');
        record.due=due;
      }
      if(Object.hasOwn(input,'assignee') || !old) {
        const publicBoard=input.assignee==null;
        if(publicBoard&&!v12) throw new I(400,'负责人不存在');
        const assignee=publicBoard?null:await fqBoardAssignee(env,input.assignee,true);
        if(!publicBoard&&!assignee) throw new I(400,'负责人不存在');
        if(!old || old.status!=='done') {
          if(v12) fqBoardTransfer(record,assignee,publicBoard);
          else record.assigneeId=assignee.id;
        }
      }
      try{await fqBoardSave(env,original?.data??null,record);}catch(error){if(error instanceof I&&error.status===409&&attempt<4) continue;throw error;}
      await N(env,'assistant',old?'board-push-update':'board-push-create','boardTasks',id);
      return D({id,status:record.status,created:!old});
    }
  }
  throw new I(404,'接口不存在');
}
