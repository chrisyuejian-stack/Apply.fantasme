import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {LocalR2} from '../../scripts/local-r2.mjs';
import {createWorkerHarness,extractCookie} from './helpers.mjs';

async function fixture(storage=true) {
 const dir=await mkdtemp(join(tmpdir(),'fq-fees-')),files=new LocalR2(join(dir,'files')),h=await createWorkerHarness(storage?{FILES:files}:{});
 const setup=await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}}),sup=extractCookie(setup.headers);
 async function account(username,role,studentId) {
  const result=await h.call('/api/users',{method:'POST',cookie:sup,body:{username,name:username,role,studentId}});assert.equal(result.status,200,result.text);
  const cookie=extractCookie((await h.call('/api/login',{method:'POST',body:{username,password:result.data.password}})).headers);
  assert.equal((await h.call('/api/password',{method:'POST',cookie,body:{old:result.data.password,new:'ChangedPassword2026'}})).status,200);
  return {id:result.data.user.id,cookie};
 }
 const advisor=await account('advisor','advisor'),other=await account('other','advisor'),writer=await account('writer','writer');
 for(const [id,aid] of [['student-one',advisor.id],['student-two',other.id]]) assert.equal((await h.call('/api/t/students/'+id,{method:'PUT',cookie:sup,body:{id,name:id,advisorId:aid,writerIds:[writer.id]}})).status,200);
 const student=await account('student.one','student','student-one'),foreign=await account('student.two','student','student-two');
 const create=(extra={},cookie=advisor.cookie)=>h.call('/api/fees',{method:'POST',cookie,body:{studentId:'student-one',title:'Synthetic bill',items:[{label:'First fee',amountFen:12345},{label:'Second fee',amountFen:100}],...extra}});
 const act=(id,what,cookie=advisor.cookie,body={})=>h.call('/api/fees/'+id+'/'+what,{method:'POST',cookie,body});
 const edit=(bill,extra={},cookie=advisor.cookie)=>h.call('/api/fees/'+bill.id,{method:'PATCH',cookie,body:{_base:bill.updatedAt,...extra}});
 const row=id=>JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='feeBills' AND id=?").get(id).data);
 const boot=cookie=>h.call('/api/bootstrap',{cookie});
 const upload=(billId,purpose,cookie=advisor.cookie,bytes=Buffer.from([137,80,78,71,13,10,26,10]),headers={})=>h.call('/api/files?'+new URLSearchParams({...(billId?{billId}:{}),purpose}),{method:'POST',cookie,rawBody:bytes,headers:{'Content-Type':'image/png','X-File-Name':'synthetic.png',...headers}});
 const batch=h.db.batch.bind(h.db);let queue=Promise.resolve();h.db.batch=statements=>{const result=queue.then(()=>batch(statements));queue=result.catch(()=>{});return result;};
 return {...h,files,dir,sup,advisor,other,writer,student,foreign,create,act,edit,row,boot,upload,cleanup:async()=>{h.db.close();await rm(dir,{recursive:true,force:true});}};
}

test('#80: fee visibility and actor matrix, generic writes and browser gates',async()=>{
 const h=await fixture();try{
  const r=await h.create();assert.equal(r.status,200,r.text);const id=r.data.record.id;
  for(const cookie of [h.other.cookie,h.writer.cookie,h.student.cookie,h.foreign.cookie]) assert.equal((await h.create({},cookie)).status,403);
  assert.equal((await h.boot(h.student.cookie)).data.data.feeBills.length,0);assert.equal((await h.boot(h.writer.cookie)).data.data.feeBills.length,0);
  assert.equal((await h.boot(h.other.cookie)).data.data.feeBills.length,0);assert.equal((await h.boot(h.sup)).data.data.feeBills.length,1);
  assert.equal((await h.act(id,'send')).status,200);
  assert.equal((await h.boot(h.student.cookie)).data.data.feeBills.length,1);
  for(const cookie of [h.other.cookie,h.writer.cookie,h.foreign.cookie]) assert.equal((await h.act(id,'cancel',cookie)).status,403);
  assert.equal((await h.act(id,'confirm',h.student.cookie)).status,403);
  assert.equal((await h.act(id,'claim',h.advisor.cookie)).status,403);
  for(const method of ['PUT','DELETE']) for(const billId of [id,'nonexistent']) assert.equal((await h.call('/api/t/feeBills/'+billId,{method,cookie:h.sup,body:{id:billId}})).status,403);
  assert.equal((await h.call('/api/fees',{method:'POST',body:{}})).status,401);
  assert.equal((await h.call('/api/fees/'+id+'/cancel',{method:'POST',cookie:h.sup,body:{},headers:{'X-FQ':null}})).status,403);
  assert.equal((await h.call('/api/fees/'+id+'/cancel',{method:'POST',cookie:h.sup,body:{},headers:{Origin:'https://evil.example'}})).status,403);
  const draft=(await h.create()).data.record;await h.act(draft.id,'cancel');assert.ok(!(await h.boot(h.student.cookie)).data.data.feeBills.some(x=>x.id===draft.id));
  await h.call('/api/diy/register',{method:'POST',body:{phone:'13800001130',name:'Synthetic DIY',password:'DiyPassword2026',agree:true}});
  const diy=extractCookie((await h.call('/api/diy/login',{method:'POST',body:{phone:'13800001130',password:'DiyPassword2026'}})).headers,'__Host-fq_diy');
  assert.deepEqual((await h.boot(diy)).data.data,{});assert.equal((await h.act(id,'claim',diy)).status,401);
 }finally{await h.cleanup();}
});

test('#80: integer money, whitelisted fields, bounds, edits, history and reference uniqueness',async()=>{
 const h=await fixture();try{
  for(const amountFen of [0,-1,1.1,'100',100000001,null]) assert.equal((await h.create({items:[{label:'bad',amountFen}]})).status,400);
  for(const extra of [{title:''},{title:'x'.repeat(81)},{items:[]},{items:Array.from({length:51},()=>({label:'fee',amountFen:1}))},{studentNote:'x'.repeat(501)},{dueDate:'2026-02-30'}]) assert.equal((await h.create(extra)).status,400);
  const r=await h.create({totalFen:1,refCode:'forged',status:'confirmed',history:[],confirmedBy:'forged',applicationId:'forged'});assert.equal(r.status,200,r.text);
  const b=r.data.record;assert.equal(b.totalFen,12445);assert.equal(b.status,'draft');assert.equal(b.applicationId,undefined);assert.match(b.refCode,/^FQ-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/);assert.equal(b.history.length,1);
  const edited=await h.edit(b,{items:[{label:'new',amountFen:1}],totalFen:999,studentId:'student-two',history:[],refCode:'forged',status:'confirmed'});assert.equal(edited.status,200,edited.text);
  const current=edited.data.record;assert.equal(current.totalFen,1);assert.equal(current.studentId,'student-one');assert.equal(current.refCode,b.refCode);assert.deepEqual(current.history.slice(0,1),b.history);
  assert.equal((await h.edit(b,{title:'stale'})).status,409);
  const max=await h.create({items:Array.from({length:50},()=>({label:'max',amountFen:100000000}))});assert.equal(max.data.record.totalFen,5000000000);
  const codes=[];for(let i=0;i<12;i++) codes.push((await h.create()).data.record.refCode);assert.equal(new Set(codes).size,12);
  const original=crypto.getRandomValues.bind(crypto);crypto.getRandomValues=bytes=>bytes.fill(0);
  try {
   const first=await h.create();assert.equal(first.status,200);assert.equal(first.data.record.refCode,'FQ-2222');
   assert.equal((await h.create()).status,409);
   await h.act(first.data.record.id,'cancel');assert.equal((await h.create()).status,200);
  }finally{crypto.getRandomValues=original;}
 }finally{await h.cleanup();}
});

test('#80: complete transition matrix, reject and repay, locked fields, bounded append-only history and audit',async()=>{
 const h=await fixture();try{
  const id=(await h.create()).data.record.id;
  assert.equal((await h.act(id,'claim',h.student.cookie)).status,403);
  for(const what of ['confirm','reject','disburse']) assert.equal((await h.act(id,what)).status,409);
  assert.equal((await h.act(id,'send')).status,200);
  assert.equal((await h.edit(h.row(id),{studentNote:'Pay by Friday'})).status,200);
  assert.equal((await h.act(id,'claim',h.student.cookie,{status:'confirmed',totalFen:1})).status,200);
  assert.equal((await h.edit(h.row(id),{items:[{label:'tamper',amountFen:1}]})).status,409);
  assert.equal((await h.act(id,'cancel')).status,409);assert.equal((await h.act(id,'reject',h.advisor.cookie,{reason:' '})).status,400);
  assert.equal((await h.act(id,'reject',h.advisor.cookie,{reason:'Synthetic transfer not found'})).status,200);assert.equal(h.row(id).lastReject.reason,'Synthetic transfer not found');
  assert.equal((await h.edit(h.row(id),{items:[{label:'Updated',amountFen:500}]})).status,200);
  await h.act(id,'claim',h.student.cookie);assert.equal((await h.act(id,'confirm')).status,200);
  assert.equal(h.row(id).confirmedBy,h.advisor.id);assert.equal((await h.act(id,'reject',h.advisor.cookie,{reason:'late'})).status,409);
  assert.equal((await h.act(id,'disburse',h.sup,{disbursedBy:'forged'})).status,200);
  const final=h.row(id);assert.equal(final.disbursedBy,(await h.boot(h.sup)).data.me.id);assert.equal(final.status,'disbursed');assert.equal(final.totalFen,500);
  for(const what of ['send','claim','confirm','reject','cancel','disburse']) assert.notEqual((await h.act(id,what,h.sup,{reason:'late'})).status,200);
  assert.deepEqual(final.history.map(x=>x.action),['create','send','edit','claim','reject','edit','claim','confirm','disburse']);
  assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM audit WHERE tbl='feeBills' AND rec_id=? AND action LIKE 'fee-%'").get(id).n,9);
  const limited=(await h.create()).data.record;limited.history=Array.from({length:200},()=>({at:'2000-01-01',by:'fixture',action:'edit',note:''}));h.db.raw.prepare("UPDATE records SET data=? WHERE tbl='feeBills' AND id=?").run(JSON.stringify(limited),limited.id);
  assert.equal((await h.act(limited.id,'send')).status,409);assert.equal(h.row(limited.id).history.length,200);
 }finally{await h.cleanup();}
});

test('#80: concurrent confirm/reject and advisor reassignment cannot lose updates',async()=>{
 const h=await fixture();try{
  const id=(await h.create()).data.record.id;await h.act(id,'send');await h.act(id,'claim',h.student.cookie);
  const results=await Promise.all([h.act(id,'confirm'),h.act(id,'reject',h.advisor.cookie,{reason:'not found'})]);assert.deepEqual(results.map(x=>x.status).sort(),[200,409]);
  assert.equal(h.row(id).history.length,4);
  assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM audit WHERE tbl='feeBills' AND rec_id=?").get(id).n,4);
  const fresh=(await h.create()).data.record;
  const batch=h.db.batch.bind(h.db);let intercept=true;
  h.db.batch=async statements=>{
   if(intercept&&statements[0].query.startsWith('UPDATE records SET data=?,student_id=?,updated_at=?')){intercept=false;h.db.raw.prepare("UPDATE records SET data=json_set(data,'$.advisorId',?) WHERE tbl='students' AND id='student-one'").run(h.other.id);}
   return batch(statements);
  };
  assert.equal((await h.edit(fresh,{title:'Stale advisor'})).status,409);assert.equal(h.row(fresh.id).title,fresh.title);
 }finally{await h.cleanup();}
});

test('#80: fee R2 objects enforce role, bill, purpose and byte limits; attachment metadata is canonical',async()=>{
 const h=await fixture();try{
  const b=(await h.create()).data.record,id=b.id;
  for(const cookie of [h.other.cookie,h.writer.cookie,h.student.cookie,h.foreign.cookie]) assert.equal((await h.upload(id,'attachment',cookie)).status,403);
  const file=await h.upload(id,'attachment');assert.equal(file.status,200,file.text);assert.match(file.data.upload.key,new RegExp('^fees/student-one/'+id+'/'));
  const u=file.data.upload;
  const edit=await h.edit(b,{attachments:[{...u,size:999,type:'text/html',name:'forged',note:'Invoice'}]});assert.equal(edit.status,200,edit.text);assert.equal(edit.data.record.attachments[0].size,8);assert.equal(edit.data.record.attachments[0].name,'synthetic.png');
  assert.equal((await h.edit(h.row(id),{attachments:[{key:u.key,note:'x'.repeat(101)}]})).status,400);
  assert.equal((await h.edit(h.row(id),{attachments:Array.from({length:31},()=>({key:u.key}))})).status,400);
  const other=(await h.create()).data.record;assert.equal((await h.edit(other,{attachments:[{key:u.key}]})).status,403);
  const get=(key,cookie=h.student.cookie,method='GET')=>h.worker.fetch(new Request('https://apply.test/api/files/'+encodeURIComponent(key),{method,headers:{Cookie:cookie,'X-FQ':'1'}}),h.env);
  assert.equal((await get(u.key)).status,403);await h.act(id,'send');
  const downloaded=await get(u.key);assert.equal(downloaded.status,200);assert.match(downloaded.headers.get('Content-Disposition'),/^attachment/);assert.equal(downloaded.headers.get('X-Content-Type-Options'),'nosniff');assert.equal((await downloaded.arrayBuffer()).byteLength,8);
  for(const cookie of [h.writer.cookie,h.other.cookie,h.foreign.cookie]) assert.equal((await get(u.key,cookie)).status,403);
  assert.equal((await get(u.key,h.student.cookie,'HEAD')).status,200);
  assert.equal((await h.upload(id,'payment',h.advisor.cookie)).status,403);
  const proof=(await h.upload(id,'payment',h.student.cookie)).data.upload;
  assert.equal((await h.edit(h.row(id),{attachments:[{key:proof.key}]})).status,403);
  assert.equal((await h.act(id,'claim',h.student.cookie,{paymentProof:{key:proof.key}})).status,200);
  assert.equal((await h.upload(id,'attachment')).status,403);assert.equal((await h.upload(id,'disburse')).status,403);
  await h.act(id,'confirm');const payout=(await h.upload(id,'disburse')).data.upload;
  assert.equal((await h.act(id,'disburse',h.advisor.cookie,{disburseProof:{key:payout.key}})).status,200);
  assert.equal((await h.upload(other.id,'attachment',h.advisor.cookie,new Uint8Array(10*1024*1024+1),{'Content-Length':'1'})).status,413);
  assert.equal((await h.upload(other.id,'attachment',h.advisor.cookie,'fake')).status,415);
  const webp=await h.upload(other.id,'attachment',h.advisor.cookie,Buffer.from('RIFF0000WEBP'),{'Content-Type':'image/webp','X-File-Name':'image.webp'});assert.equal(webp.status,200,webp.text);
  assert.equal((await get(u.key.replace('student-one','student-two'),h.foreign.cookie)).status,404);
 }finally{await h.cleanup();}
});

test('#80: collect settings owner-only, QR access expires after claim, missing storage and restore isolation',async()=>{
 const h=await fixture();try{
  const collect=(method='GET',body,cookie=h.sup)=>h.call('/api/fees/collect',{method,body,cookie});
  for(const cookie of [h.advisor.cookie,h.writer.cookie,h.student.cookie]) assert.equal((await collect('PUT',{payeeName:'forged'},cookie)).status,403);
  assert.equal((await h.upload(null,'collect',h.advisor.cookie)).status,403);
  const code=(await h.upload(null,'collect',h.sup)).data.upload;
  const saved=await collect('PUT',{payeeName:'Synthetic Payee',wechat:{key:code.key},alipay:null});assert.equal(saved.status,200,saved.text);
  assert.equal((await collect('GET',undefined,h.student.cookie)).status,403);
  const bill=(await h.create()).data.record;await h.act(bill.id,'send');assert.equal((await collect('GET',undefined,h.student.cookie)).data.collect.payeeName,'Synthetic Payee');
  const get=cookie=>h.worker.fetch(new Request('https://apply.test/api/files/'+encodeURIComponent(code.key),{headers:{Cookie:cookie}}),h.env);
  assert.equal((await get(h.student.cookie)).status,200);assert.equal((await get(h.writer.cookie)).status,200);
  await h.act(bill.id,'claim',h.student.cookie);assert.equal((await get(h.student.cookie)).status,403);
  assert.equal((await collect('PUT',{payeeName:'Name',wechat:{key:'settings/collect/../escape'}})).status,400);
  const original=h.row(bill.id);assert.equal((await h.call('/api/admin/import',{method:'POST',cookie:h.sup,body:{format:'fq-admissions',templates:[],feeBills:[]}})).status,200);assert.deepEqual(h.row(bill.id),original);
 }finally{await h.cleanup();}
 const missing=await fixture(false);try{const bill=(await missing.create()).data.record;assert.equal((await missing.upload(bill.id,'attachment')).status,503);}finally{await missing.cleanup();}
});

test('#80: financial state and audit commit together; audit failure leaves the bill unchanged',async()=>{
 const h=await fixture();try{
  const bill=(await h.create()).data.record;
  h.db.raw.exec("CREATE TRIGGER deny_fee_audit BEFORE INSERT ON audit WHEN NEW.action LIKE 'fee-%' BEGIN SELECT RAISE(ABORT,'synthetic audit unavailable'); END");
  assert.equal((await h.act(bill.id,'send')).status,500);
  assert.deepEqual(h.row(bill.id),bill);
  assert.equal((await h.call('/api/fees/collect',{method:'PUT',cookie:h.sup,body:{payeeName:'Atomic test'}})).status,500);
  assert.equal(h.db.raw.prepare("SELECT value FROM meta WHERE key='fee:collect'").get(),undefined);
  assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM audit WHERE rec_id=? AND action='fee-send'").get(bill.id).n,0);
 }finally{await h.cleanup();}
});
