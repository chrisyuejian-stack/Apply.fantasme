// M4: manual collection only. Money is integer fen; transitions and history are server-owned.
const fqFeeTerminal = status => ['disbursed','cancelled'].includes(status);
function fqFeeVisible(context,bill) {
  const user=context.user;
  if(user.role==='supervisor') return true;
  if(user.role==='advisor') return De(context,bill.studentId);
  return user.role==='student' && user.studentId===bill.studentId && bill.status!=='draft' && (bill.status!=='cancelled'||!!bill.sentAt);
}
function fqFeeManage(context,bill) {
  return context.user.role==='supervisor' || (context.user.role==='advisor' && De(context,bill.studentId));
}
function fqFeeText(value,max,required=false) {
  if(typeof value!=='string' || [...value].length>max || (required&&!value.trim())) throw new I(400,'费用单文字格式或长度无效');
  return value.trim();
}
function fqFeeHistory(bill,user,action,note='') {
  if(!Array.isArray(bill.history) || bill.history.length>=200) throw new I(409,'费用单历史已达上限，请联系主管');
  bill.history=[...bill.history,{at:j(),by:user.id,action,note}];
}
async function fqFeeSave(env,original,bill,studentData) {
  bill.updatedAt=new Date(Math.max(Date.now(),(Date.parse(bill.updatedAt)||0)+1)).toISOString();
  const guard="EXISTS(SELECT 1 FROM records WHERE tbl='students' AND id=? AND data=?)";
  const data=JSON.stringify(bill);
  const stmt=original
    ? env.DB.prepare("UPDATE records SET data=?,student_id=?,updated_at=? WHERE tbl='feeBills' AND id=? AND data=? AND "+guard).bind(data,bill.studentId,bill.updatedAt,bill.id,original,bill.studentId,studentData)
    : env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT 'feeBills',?,?,?,? WHERE "+guard+" AND NOT EXISTS(SELECT 1 FROM records WHERE tbl='feeBills' AND json_extract(data,'$.refCode')=? AND json_extract(data,'$.status') NOT IN ('disbursed','cancelled')) ON CONFLICT(tbl,id) DO NOTHING").bind(bill.id,bill.studentId,data,bill.updatedAt,bill.studentId,studentData,bill.refCode);
  const event=bill.history.at(-1),action='fee-'+event.action,detail=bill.refCode+' '+bill.updatedAt;
  const audit=env.DB.prepare("INSERT INTO audit(at,user_id,action,tbl,rec_id,detail) SELECT ?,?,?,'feeBills',?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='feeBills' AND id=? AND data=?) AND NOT EXISTS(SELECT 1 FROM audit WHERE tbl='feeBills' AND rec_id=? AND action=? AND detail=?)").bind(j(),event.by,action,bill.id,detail,bill.id,data,bill.id,action,detail);
  const results=await env.DB.batch([stmt,audit]);
  if(!results[0].meta.changes) throw new I(409,'费用单或学生负责人已变化，请刷新后重试');
}
async function fqFeeEdit(env,bill,input) {
  if(Object.hasOwn(input,'title')) bill.title=fqFeeText(input.title,80,true);
  if(Object.hasOwn(input,'items')) {
    if(!Array.isArray(input.items)||input.items.length<1||input.items.length>50) throw new I(400,'费用明细需为1至50行');
    bill.items=input.items.map(item=>{
      if(!item||!Number.isSafeInteger(item.amountFen)||item.amountFen<1||item.amountFen>100000000) throw new I(400,'单项金额须为正整数分，且不超过100万元');
      return {label:fqFeeText(item.label,80,true),amountFen:item.amountFen};
    });
    bill.totalFen=bill.items.reduce((sum,item)=>sum+item.amountFen,0);
  }
  if(Object.hasOwn(input,'dueDate')) {
    const due=input.dueDate;
    if(due!==null&&(typeof due!=='string'||!/^\d{4}-\d\d-\d\d$/.test(due)||!Number.isFinite(Date.parse(due))||new Date(due).toISOString().slice(0,10)!==due)) throw new I(400,'付款截止日期无效');
    bill.dueDate=due;
  }
  if(Object.hasOwn(input,'studentNote')) bill.studentNote=fqFeeText(input.studentNote,500);
  if(Object.hasOwn(input,'attachments')) {
    if(!Array.isArray(input.attachments)||input.attachments.length>30) throw new I(400,'缴费截图最多30张');
    const seen=new Set();bill.attachments=[];
    for(const row of input.attachments) {
      if(!row || seen.has(row.key)) throw new I(400,'文件重复或无效');seen.add(row.key);
      bill.attachments.push({...await fqFeeReference(env,row.key,bill,'attachment'),note:fqFeeText(row.note??'',100)});
    }
  }
}
async function fqFeeCollectAllowed(env,user) {
  if(ve(user)) return true;
  return user.role==='student' && !!(await env.DB.prepare("SELECT 1 FROM records WHERE tbl='feeBills' AND student_id=? AND json_extract(data,'$.status')='sent' LIMIT 1").bind(user.studentId).first());
}
async function fqFeeCollect(env,user,request) {
  if(request.method==='GET') {
    if(!await fqFeeCollectAllowed(env,user)) throw new I(403,'没有收款码访问权限');
    const row=await env.DB.prepare("SELECT value FROM meta WHERE key='fee:collect'").first();
    return D({collect:row?JSON.parse(row.value):{payeeName:'',wechat:null,alipay:null}});
  }
  if(request.method!=='PUT') throw new I(405,'不支持的操作');
  if(user.role!=='supervisor') throw new I(403,'只有主管可以修改收款码');
  const input=await X(request),collect={payeeName:fqFeeText(input.payeeName,80,true),wechat:null,alipay:null};
  for(const channel of ['wechat','alipay']) if(input[channel]!=null) collect[channel]=await fqFeeReference(env,input[channel].key,null,'collect');
  await env.DB.batch([
    env.DB.prepare("INSERT INTO meta(key,value) VALUES('fee:collect',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(JSON.stringify(collect)),
    env.DB.prepare("INSERT INTO audit(at,user_id,action,tbl,rec_id,detail) VALUES(?,?,'fee-collect-settings','meta','fee:collect','')").bind(j(),user.id)
  ]);return D({collect});
}
async function fqFees(request,env,user,url) {
  const tail=url.pathname.slice('/api/fees'.length);
  if(tail==='/collect') return fqFeeCollect(env,user,request);
  const match=tail.match(/^\/([A-Za-z0-9_-]{2,80})(?:\/(send|cancel|claim|confirm|reject|disburse))?$/);
  if(tail!==''&&!match) throw new I(404,'费用单接口不存在');
  if((tail===''&&request.method!=='POST')||(match&&!((!match[2]&&request.method==='PATCH')||(match[2]&&request.method==='POST')))) throw new I(405,'不支持的操作');
  const input=await X(request);
  if(!input||typeof input!=='object'||Array.isArray(input)) throw new I(400,'费用单格式无效');
  const context=await de(env,user),creating=tail==='';
  const original=creating?null:await env.DB.prepare("SELECT data FROM records WHERE tbl='feeBills' AND id=?").bind(match[1]).first();
  if(!creating&&!original) throw new I(404,'费用单不存在');
  const bill=creating?{id:'fee-'+crypto.randomUUID(),studentId:input.studentId,title:'',items:[],totalFen:0,status:'draft',dueDate:null,studentNote:'',attachments:[],paymentProof:null,disburseProof:null,sentAt:null,claimedAt:null,confirmedAt:null,confirmedBy:null,disbursedAt:null,disbursedBy:null,cancelledAt:null,lastReject:null,history:[],createdBy:user.id,createdAt:j()}:JSON.parse(original.data);
  if(!(creating?fqFeeManage(context,bill):fqFeeVisible(context,bill))) throw new I(403,'没有这张费用单的权限');
  const student=await env.DB.prepare("SELECT data FROM records WHERE tbl='students' AND id=?").bind(bill.studentId??'').first();
  if(!student) throw new I(400,'学生不存在');
  // Include the student snapshot in the final write to prevent assignment races.
  if(user.role==='advisor'&&JSON.parse(student.data).advisorId!==user.id) throw new I(403,'没有这位学生的管理权限');
  if(Object.hasOwn(input,'_base')&&input._base!==bill.updatedAt) throw new I(409,'费用单已更新，请刷新');
  let action=creating?'create':match[2]||'edit',note='';
  if(action==='create'||action==='edit') {
    if(!fqFeeManage(context,bill)) throw new I(403,'没有管理权限');
    if(!['draft','sent'].includes(bill.status)) throw new I(409,'学生已确认付款，金额和明细已锁定');
    if(!creating&&input._base!==bill.updatedAt) throw new I(409,'费用单已更新，请刷新');
    await fqFeeEdit(env,bill,input);
    if(!bill.title||!bill.items.length) throw new I(400,'请填写标题与费用明细');
  } else {
    if(action==='claim'?(user.role!=='student'||user.studentId!==bill.studentId):!fqFeeManage(context,bill)) throw new I(403,'没有执行此操作的权限');
    const expected={send:'draft',cancel:['draft','sent'],claim:'sent',confirm:'claimed',reject:'claimed',disburse:'confirmed'}[action];
    if(!(Array.isArray(expected)?expected.includes(bill.status):bill.status===expected)) throw new I(409,'不允许的费用单状态变化');
    if(action==='claim') {
      if(user.role!=='student'||user.studentId!==bill.studentId) throw new I(403,'只有本人学生可以确认已付款');
      if(input.paymentProof!=null) bill.paymentProof=await fqFeeReference(env,input.paymentProof.key,bill,'payment');
      else bill.paymentProof=null;
      bill.status='claimed';bill.claimedAt=j();
    } else {
      if(!fqFeeManage(context,bill)) throw new I(403,'没有管理权限');
      if(action==='send') {bill.status='sent';bill.sentAt=j();}
      if(action==='cancel') {bill.status='cancelled';bill.cancelledAt=j();}
      if(action==='confirm') {bill.status='confirmed';bill.confirmedAt=j();bill.confirmedBy=user.id;}
      if(action==='reject') {note=fqFeeText(input.reason,500,true);bill.status='sent';bill.lastReject={at:j(),by:user.id,reason:note};}
      if(action==='disburse') {
        bill.disburseProof=input.disburseProof==null?null:await fqFeeReference(env,input.disburseProof.key,bill,'disburse');
        bill.status='disbursed';bill.disbursedAt=j();bill.disbursedBy=user.id;
      }
    }
  }
  fqFeeHistory(bill,user,action,note);
  if(creating) {
    const alphabet='23456789ABCDEFGHJKMNPQRSTUVWXYZ';
    for(let attempt=0;attempt<16;attempt++) {
      bill.refCode='FQ-'+Array.from(crypto.getRandomValues(new Uint8Array(4)),n=>alphabet[n%alphabet.length]).join('');
      try{await fqFeeSave(env,null,bill,student.data);break;}catch(error){if(error instanceof I&&error.status===409&&attempt<15)continue;throw error;}
    }
  } else await fqFeeSave(env,original.data,bill,student.data);
  return D({record:bill});
}
