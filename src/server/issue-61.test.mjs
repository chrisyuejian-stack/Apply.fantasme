import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash,createHmac} from 'node:crypto';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';
const prefix='/api/integrations/assistant';
const secret='SyntheticBridgeSecretForTestsOnly32Bytes';
async function fixture() {
  const h=await createWorkerHarness({ASSISTANT_BRIDGE_SECRET:secret});
  const setup=await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}});
  const sup=extractCookie(setup.headers);
  async function account(username,role,studentId) {
    const r=await h.call('/api/users',{method:'POST',cookie:sup,body:{username,name:username,role,studentId}});assert.equal(r.status,200,r.text);
    const cookie=extractCookie((await h.call('/api/login',{method:'POST',body:{username,password:r.data.password}})).headers);
    assert.equal((await h.call('/api/password',{method:'POST',cookie,body:{old:r.data.password,new:'ChangedPassword2026'}})).status,200);
    return {id:r.data.user.id,cookie};
  }
  const advisor=await account('advisor','advisor'),other=await account('other','advisor'),writer=await account('writer','writer');
  await h.call('/api/t/students/student-one',{method:'PUT',cookie:sup,body:{id:'student-one',name:'Synthetic',advisorId:advisor.id,writerIds:[writer.id]}});
  const student=await account('student','student','student-one');
  async function bridge(path,body,options={}) {
    const method=options.method||(body===undefined?'GET':'POST'),rawBody=body===undefined?'':JSON.stringify(body);
    const timestamp=options.timestamp??String(Math.floor(Date.now()/1000));
    const signedPath=prefix+(options.signedPath??path);
    const signature=createHmac('sha256',secret).update(`${timestamp}\n${options.signedMethod??method}\n${signedPath}\n${createHash('sha256').update(options.signedBody??rawBody).digest('hex')}`).digest('hex');
    return h.call(prefix+path,{method,rawBody:method==='GET'?undefined:rawBody,headers:{'X-FQ':null,Origin:'https://assistant.test','X-FQ-Timestamp':timestamp,'X-FQ-Signature':signature,...options.headers}});
  }
  const push=(externalId='synthetic-1',extra={})=>bridge('/tasks',{externalId,title:'Synthetic task',note:'Synthetic note',importance:'normal',due:null,assignee:'advisor',...extra});
  const row=id=>JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='boardTasks' AND id=?").get(id).data);
  const put=(row,extra={},cookie=advisor.cookie)=>h.call('/api/t/boardTasks/'+row.id,{method:'PUT',cookie,body:{...row,_base:row.updatedAt,...extra}});
  return {...h,sup,advisor,other,writer,student,bridge,push,row,put};
}

test('#61: HMAC body/query/method integrity, timestamps, missing config and unchanged browser gates',async()=>{
 const h=await fixture();try {
   assert.equal((await h.bridge('/advisors')).status,200);
   for(const options of [{timestamp:'0'},{timestamp:String(Math.floor(Date.now()/1000)+301)},{timestamp:'abc'},{signedMethod:'POST'},{headers:{'X-FQ-Signature':'f'.repeat(64)}},{headers:{'X-FQ-Signature':'x'.repeat(64)}}]) {
     const result=await h.bridge('/advisors',undefined,options);assert.equal(result.status,401);assert.equal(result.data.error,'签名无效');
   }
   assert.equal((await h.bridge('/updates?since=2026-01-01T00:00:00.000Z',undefined,{signedPath:'/updates?since=2025-01-01T00:00:00.000Z'})).status,401);
   assert.equal((await h.bridge('/tasks',{externalId:'tamper'},{signedBody:'{}'})).status,401);
   assert.equal((await h.call(prefix+'/advisors',{cookie:h.sup})).status,401);
   delete h.env.ASSISTANT_BRIDGE_SECRET;assert.equal((await h.bridge('/advisors')).status,503);h.env.ASSISTANT_BRIDGE_SECRET=secret;
   assert.equal((await h.call('/api/t/boardTasks/fake',{method:'PUT',cookie:h.sup,body:{id:'fake'},headers:{'X-FQ':null}})).status,403);
   assert.equal((await h.call('/api/t/boardTasks/fake',{method:'PUT',cookie:h.sup,body:{id:'fake'},headers:{Origin:'https://evil.test'}})).status,403);
   assert.equal((await h.call('/api/bootstrap')).status,401);
   assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM records WHERE tbl='boardTasks'").get().n,0);
 }finally{h.db.close();}
});

test('#61: assignee validation, field bounds, deterministic idempotency and protected source',async()=>{
 const h=await fixture();try {
   for(const extra of [{assignee:'writer'},{assignee:'missing'},{title:''},{title:'文'.repeat(121)},{note:'a'.repeat(2001)},{importance:'urgent'},{due:'2026-02-30'},{externalId:''}]) assert.equal((await h.push('bad',extra)).status,400);
   h.db.raw.prepare('UPDATE users SET active=0 WHERE id=?').run(h.other.id);
   assert.equal((await h.push('inactive',{assignee:'other'})).status,400);
   assert.ok(!(await h.bridge('/advisors')).data.items.some(x=>x.username==='other'));
   h.db.raw.prepare('UPDATE users SET active=1 WHERE id=?').run(h.other.id);
   const list=await h.bridge('/advisors');assert.deepEqual(list.data.items.map(x=>x.username).sort(),['advisor','other','sup']);
   const created=await h.push();assert.equal(created.status,200,created.text);assert.equal(created.data.created,true);
   const again=await h.push('synthetic-1',{title:'Updated',assignee:'OTHER'});assert.equal(again.data.id,created.data.id);assert.equal(again.data.created,false);
   const task=h.row(created.data.id);assert.equal(task.title,'Updated');assert.equal(task.assigneeId,h.other.id);assert.equal(task.source,'assistant');
   assert.equal(h.db.raw.prepare("SELECT student_id FROM records WHERE tbl='boardTasks' AND id=?").get(task.id).student_id,null);
   for(const cookie of [h.sup,h.advisor.cookie,h.other.cookie,h.writer.cookie,h.student.cookie]) assert.equal((await h.put({id:'fake',updatedAt:null},{source:'assistant',externalId:'forged',status:'open'},cookie)).status,403);
   const forged=await h.put(task,{source:'forged',externalId:'forged',title:'forged',note:'forged'},h.other.cookie);assert.equal(forged.status,200,forged.text);
   const saved=h.row(task.id);for(const field of ['source','externalId','title','note']) assert.equal(saved[field],task[field]);
 }finally{h.db.close();}
});

test('#61: advisor visibility without student assignments; supervisor reassign/delete; other roles and DIY excluded',async()=>{
 const h=await fixture();try {
   const first=(await h.push()).data.id;await h.push('other-task',{assignee:'other'});
   h.db.raw.prepare("UPDATE records SET data=json_set(data,'$.advisorId',NULL) WHERE tbl='students'").run();
   for(const [cookie,count] of [[h.sup,2],[h.advisor.cookie,1],[h.other.cookie,1],[h.writer.cookie,0],[h.student.cookie,0]]) {
     const result=await h.call('/api/bootstrap',{cookie});assert.equal(result.status,200);assert.equal(result.data.data.boardTasks.length,count);
   }
   assert.equal((await h.put(h.row(first),{status:'done'},h.other.cookie)).status,403);
   assert.equal((await h.put(h.row(first),{status:'done'},h.writer.cookie)).status,403);
   assert.equal((await h.put(h.row(first),{status:'done'},h.student.cookie)).status,403);
   assert.equal((await h.put(h.row(first),{assigneeId:h.writer.id},h.sup)).status,400);
   assert.equal((await h.put(h.row(first),{assigneeId:h.other.id,source:'forged',externalId:'forged'},h.sup)).status,200);
   assert.equal(h.row(first).source,'assistant');
   assert.equal((await h.put(h.row(first),{status:'done'})).status,403);
   assert.equal((await h.call('/api/t/boardTasks/'+first,{method:'DELETE',cookie:h.other.cookie})).status,403);
   assert.equal((await h.call('/api/t/boardTasks/'+first,{method:'DELETE',cookie:h.sup})).status,200);
   await h.call('/api/diy/register',{method:'POST',body:{phone:'13800001129',name:'Synthetic DIY',password:'DiyPassword2026',agree:true}});
   const diy=extractCookie((await h.call('/api/diy/login',{method:'POST',body:{phone:'13800001129',password:'DiyPassword2026'}})).headers,'__Host-fq_diy');
   assert.deepEqual((await h.call('/api/bootstrap',{cookie:diy})).data.data,{});
   assert.equal((await h.call('/api/t/boardTasks/'+first,{method:'PUT',cookie:diy,body:{id:first,status:'done'}})).status,401);
 }finally{h.db.close();}
});

test('#61: blocked reason immutable, done terminal and bridge retries preserve status and completion identity',async()=>{
 const h=await fixture();try {
   const id=(await h.push()).data.id;
   for(const blockedReason of ['', '  ', 'a'.repeat(501)]) assert.equal((await h.put(h.row(id),{status:'blocked',blockedReason})).status,400);
   const blocked=await h.put(h.row(id),{status:'blocked',blockedReason:' Waiting for approval ',blockedAt:'forged'});assert.equal(blocked.status,200,blocked.text);
   const original=h.row(id);assert.equal(original.blockedReason,'Waiting for approval');assert.notEqual(original.blockedAt,'forged');
   const repush=await h.push();assert.equal(repush.data.status,'blocked');
   assert.equal((await h.put(h.row(id),{blockedReason:'changed'})).status,200);assert.equal(h.row(id).blockedReason,original.blockedReason);
   assert.equal((await h.put(h.row(id),{status:'open'})).status,409);
   assert.equal((await h.put(h.row(id),{status:'done',doneBy:'forged',doneAt:'forged'})).status,200);
   const done=h.row(id);assert.equal(done.doneBy,'advisor');assert.notEqual(done.doneAt,'forged');assert.equal(done.blockedAt,original.blockedAt);
   assert.equal((await h.push()).data.status,'done');
   for(const status of ['open','blocked']) assert.equal((await h.put(h.row(id),{status,blockedReason:'new'})).status,409);
   const second=(await h.push('direct-done')).data.id;assert.equal((await h.put(h.row(second),{status:'done'})).status,200);
   const stale=h.row(second);await h.push('direct-done',{note:'refreshed'});assert.equal((await h.put(stale,{status:'done'})).status,409);
   const updates=await h.bridge('/updates?since=2000-01-01T00:00:00.000Z');assert.equal(updates.status,200);
   const item=updates.data.items.find(x=>x.externalId==='synthetic-1');assert.equal(item.status,'done');assert.equal(item.blockedReason,original.blockedReason);assert.equal(item.assigneeName,'advisor');assert.equal(item.doneBy,'advisor');
 }finally{h.db.close();}
});

test('#61: cursor ordering, 200-item boundary, empty next and timestamp high-water after deletion',async()=>{
 const h=await fixture();try {
   const origin='2000-01-01T00:00:00.000Z';
   assert.deepEqual((await h.bridge('/updates?since='+origin)).data,{items:[],next:origin});
   assert.equal((await h.bridge('/updates?since=invalid')).status,400);
   for(const since of ['2000-01-01T00:00:00Z','2000-01-01T08:00:00+08:00']) assert.equal((await h.bridge('/updates?since='+encodeURIComponent(since))).data.next,since);
   assert.equal((await h.bridge('/updates?since=2026-02-30T00:00:00Z')).status,400);
   // A frozen clock forces each write onto the logical timestamp sequence.
   const now=Date.now;const frozen=now();Date.now=()=>frozen;
   try {for(let i=0;i<202;i++) assert.equal((await h.push('page-'+i)).status,200);}finally{Date.now=now;}
   const page1=(await h.bridge('/updates?since='+origin)).data;assert.equal(page1.items.length,200);
   const page2=(await h.bridge('/updates?since='+encodeURIComponent(page1.next))).data;assert.equal(page2.items.length,2);
   const all=[...page1.items,...page2.items];assert.equal(new Set(all.map(x=>x.externalId)).size,202);
   for(let i=1;i<all.length;i++) assert.ok(all[i].updatedAt>all[i-1].updatedAt);
   const last=h.db.raw.prepare("SELECT id FROM records WHERE tbl='boardTasks' ORDER BY updated_at DESC LIMIT 1").get().id;
   await h.call('/api/t/boardTasks/'+last,{method:'DELETE',cookie:h.sup});
   const pushed=await h.push('after-delete');assert.equal(pushed.status,200);assert.ok(h.row(pushed.data.id).updatedAt>page2.next);
   const next=(await h.bridge('/updates?since='+encodeURIComponent(page2.next))).data;assert.equal(next.items.length,1);
   assert.equal((await h.bridge('/updates?since='+encodeURIComponent(next.next))).data.next,next.next);
 }finally{h.db.close();}
});

test('#61: interleaved duplicate create and status update cannot overwrite completed work',async()=>{
 const h=await fixture();try {
   const batch=h.db.batch.bind(h.db);
   let competing;
   h.db.batch=async statements=>{
     h.db.batch=batch;
     competing=await h.push('race-create',{title:'First writer'});
     return batch(statements);
   };
   const second=await h.push('race-create',{title:'Retry writer'});
   assert.equal(competing.data.created,true);assert.equal(second.data.created,false);assert.equal(second.data.id,competing.data.id);
   const id=second.data.id;
   h.db.batch=async statements=>{
     h.db.batch=batch;
     assert.equal((await h.put(h.row(id),{status:'done'})).status,200);
     return batch(statements);
   };
   const replay=await h.push('race-create',{title:'Repushed while completing'});
   assert.equal(replay.status,200,replay.text);assert.equal(replay.data.status,'done');assert.equal(h.row(id).doneBy,'advisor');
   // A reassignment between permission check and storage must invalidate the old advisor's write.
   const fresh=(await h.push('race-reassign')).data.id;
   h.db.batch=async statements=>{
     h.db.batch=batch;
     assert.equal((await h.put(h.row(fresh),{assigneeId:h.other.id},h.sup)).status,200);
     return batch(statements);
   };
   const obsolete=await h.put(h.row(fresh),{status:'done'});assert.equal(obsolete.status,409);assert.equal(h.row(fresh).status,'open');assert.equal(h.row(fresh).assigneeId,h.other.id);
 }finally{h.db.close();}
});

test('#61: signed invalid payloads are bounded and update feed projects only assistant fields',async()=>{
 const h=await fixture();try {
   assert.equal((await h.bridge('/tasks',{externalId:'no-type'},{headers:{'Content-Type':'text/plain'}})).status,415);
   assert.equal((await h.bridge('/tasks',{note:'x'.repeat(65537)})).status,413);
   assert.equal((await h.bridge('/not-a-route')).status,404);
   const id=(await h.push('feed')).data.id;
   const first=h.row(id);await h.push('feed',{note:'Changed note'});
   const feed=await h.bridge('/updates?since='+encodeURIComponent(first.updatedAt));assert.equal(feed.data.items.length,1);assert.equal(feed.data.items[0].note,'Changed note');
   assert.deepEqual(Object.keys(feed.data.items[0]).sort(),['externalId','status','blockedReason','blockedAt','doneAt','doneBy','assigneeName','note','updatedAt'].sort());
   h.db.raw.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES('boardTasks','manual',NULL,?,?)").run(JSON.stringify({id:'manual',source:'manual',updatedAt:'2099-01-01T00:00:00.000Z'}),'2099-01-01T00:00:00.000Z');
   assert.equal((await h.bridge('/updates?since=2000-01-01T00:00:00.000Z')).data.items.length,1);
 }finally{h.db.close();}
});
