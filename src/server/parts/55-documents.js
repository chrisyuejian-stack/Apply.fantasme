async function fqDocumentAction(req, env, user, id, action) {
  const bodyText = await req.text();
  if (bodyText.length > 40000) throw new I(413, '内容过大');
  let b; try { b = JSON.parse(bodyText); } catch { throw new I(400, '请求格式不正确'); }
  if (!b || typeof b !== 'object') throw new I(400, '请求格式不正确');
  const row = await env.DB.prepare("SELECT data FROM records WHERE tbl='documents' AND id=?").bind(id).first();
  if (!row) throw new I(404, '文书不存在');
  const doc = JSON.parse(row.data);
  if (doc.archived) throw new I(409, '文书已归档，请先恢复后操作');
  if (b.versionId !== (doc.currentVersionId || null) || b.base !== doc.updatedAt) throw new I(409, '文书已被更新，请关闭窗口并刷新后查看最新版本');
  const now = new Date(Math.max(Date.now(), (Date.parse(doc.updatedAt) || 0) + 1)).toISOString();
  const next = {...doc, updatedAt:now};
  let record, table;
  if (action === 'revise') {
    if (user.role !== 'supervisor') throw new I(403, '只有申请主管可以在审核阶段修改正文');
    if (!['drafting','revising','advisor_review','supervisor_review','student_review'].includes(doc.status)) throw new I(409, '定稿文书须先重新打开修改');
    const value = String(b.text || '').trim(), words = Ln(value);
    if (!value || words < 1 || value.length > 20000 || words > 1000) throw new I(400, '正文须为 1–1000 words，且不超过 20000 字符');
    const old = doc.currentVersionId ? await ue(env, 'versions', doc.currentVersionId) : null;
    if (old && old.text === value) throw new I(400, '正文与当前版本相同');
    const count = await env.DB.prepare("SELECT MAX(CAST(json_extract(data,'$.no') AS INTEGER)) AS n FROM records WHERE tbl='versions' AND json_extract(data,'$.documentId')=?").bind(id).first();
    table = 'versions';
    record = {id:'v-'+crypto.randomUUID(),documentId:id,studentId:doc.studentId,no:(count?.n || 0)+1,kind:'text',text:value,words,note:String(b.note || '').slice(0,2000),createdBy:user.id,createdAt:now,updatedAt:now};
    next.currentVersionId = record.id;
  } else {
    if (!doc.currentVersionId || !(await ue(env, 'versions', doc.currentVersionId))) throw new I(409, '请先保存文书版本');
    const proxy = action === 'proxy-confirm';
    if (proxy && (user.role !== 'supervisor' || doc.status !== 'student_review')) throw new I(403, '仅主管可在学生确认阶段代确认');
    table = 'reviews';
    record = {id:'r-'+crypto.randomUUID(),documentId:id,studentId:doc.studentId,versionId:doc.currentVersionId,stage:proxy?'student':b.stage,userId:user.id,decision:proxy?'approve':b.decision,comment:String(b.comment || '').slice(0,4000),createdAt:now,updatedAt:now};
    if (proxy) record.proxy = true;
    else {
      if (!['advisor','supervisor','student'].includes(record.stage) || !['approve','changes'].includes(record.decision) || (doc.status === 'final' && !(record.decision === 'changes' && ['advisor','supervisor'].includes(record.stage)))) throw new I(400, '审核操作不正确');
      const ctx = await de(env,user);
      const check = await Qe(ctx, 'reviews', 'put', null, record, (tbl,key)=>ue(env,tbl,key));
      if (!check.ok) throw new I(403,check.error);
    }
    next.status = record.decision === 'changes' ? 'revising' : record.stage === 'advisor' ? 'supervisor_review' : record.stage === 'supervisor' && doc.needStudentConfirm ? 'student_review' : 'final';
  }
  // All writes use the identical old document snapshot. A competing write
  // makes every statement a no-op. D1 batch executes them in one transaction.
  const activity={id:'act-'+crypto.randomUUID(),studentId:doc.studentId,applicationId:null,userId:user.id,text:doc.title+(action==='revise'?'：主管修改正文，已保存新版本':action==='proxy-confirm'?'：主管代学生确认定稿':record.decision==='changes'?'：审核退回修改':next.status==='student_review'?'：主管审核通过，请学生确认':next.status==='final'?'：已确认定稿':'：顾问审核通过'),at:now,createdAt:now,updatedAt:now,studentVisible:doc.status==='student_review'||['student_review','final'].includes(next.status)};
  const result = await env.DB.batch([
    env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT 'activity',?,?,?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='documents' AND id=? AND data=?)").bind(activity.id,doc.studentId,JSON.stringify(activity),now,id,row.data),
    env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='documents' AND id=? AND data=?)").bind(table,record.id,doc.studentId,JSON.stringify(record),now,id,row.data),
    env.DB.prepare("UPDATE records SET data=?,updated_at=? WHERE tbl='documents' AND id=? AND data=?").bind(JSON.stringify(next),now,id,row.data)
  ]);
  if (result[2].meta.changes !== 1) throw new I(409,'文书已被其他人更新，请刷新后重试');
  await N(env,user.id,'document-'+action,'documents',id, `${record.id} / ${doc.currentVersionId || ''}`);
  return D({ok:true,document:next,record});
}

