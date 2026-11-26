import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

for(const actor of ['supervisor','advisor']) test('BUG-09: '+actor+' can atomically return a final document for changes',async()=>{
  const h=await createWorkerHarness();
  try {
    const sup=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
    async function user(username,role,studentId) {
      const account=(await h.call('/api/users',{method:'POST',cookie:sup,body:{username,name:username,role,studentId}})).data;
      const cookie=extractCookie((await h.call('/api/login',{method:'POST',body:{username,password:account.password}})).headers);
      assert.equal((await h.call('/api/password',{method:'POST',cookie,body:{old:account.password,new:'ChangedPassword2026'}})).status,200);
      return {cookie,id:account.user.id};
    }
    const adv=await user('advisor','advisor'),other=await user('other.advisor','advisor');
    const put=(tbl,row)=>h.call('/api/t/'+tbl+'/'+row.id,{method:'PUT',cookie:sup,body:row});
    assert.equal((await put('students',{id:'student-one',name:'Synthetic',advisorId:adv.id})).status,200);
    const student=await user('student','student','student-one');
    const doc=(await put('documents',{id:'doc-one',studentId:'student-one',title:'Essay',needStudentConfirm:false})).data.record;
    const version=(await put('versions',{id:'version-one',documentId:doc.id,kind:'text',text:'Synthetic document content.'})).data.record;
    const submitted=(await put('documents',{...doc,status:'advisor_review',currentVersionId:version.id,_base:doc.updatedAt})).data.record;
    const review=(cookie,body)=>h.call('/api/documents/'+doc.id+'/review',{method:'POST',cookie,body});
    const approved=await review(adv.cookie,{base:submitted.updatedAt,versionId:version.id,stage:'advisor',decision:'approve'});
    assert.equal(approved.status,200,approved.text);
    const finalized=await review(sup,{base:approved.data.document.updatedAt,versionId:version.id,stage:'supervisor',decision:'approve'});
    assert.equal(finalized.status,200,finalized.text);assert.equal(finalized.data.document.status,'final');
    const payload={base:finalized.data.document.updatedAt,versionId:version.id,stage:actor,decision:'changes',comment:'Please revise the final paragraph.'};
    const count=tbl=>h.db.raw.prepare('SELECT COUNT(*) n FROM records WHERE tbl=?').get(tbl).n;
    const reviews=count('reviews'),activities=count('activity');
    for(const [cookie,body] of [[student.cookie,{...payload,stage:'student'}],[other.cookie,{...payload,stage:'advisor'}],[sup,{...payload,comment:'   '}],[sup,{...payload,decision:'approve'}]]) {
      assert.ok([400,403].includes((await review(cookie,body)).status));
      assert.equal(count('reviews'),reviews);assert.equal(count('activity'),activities);
    }
    const reopened=await review(actor==='supervisor'?sup:adv.cookie,payload);
    assert.equal(reopened.status,200,reopened.text);assert.equal(reopened.data.document.status,'revising');
    assert.equal(reopened.data.document.currentVersionId,version.id);
    assert.equal(reopened.data.record.decision,'changes');assert.equal(reopened.data.record.stage,actor);
    assert.equal(count('reviews'),reviews+1);assert.equal(count('activity'),activities+1);
    const stale=await review(actor==='supervisor'?sup:adv.cookie,payload);
    assert.equal(stale.status,409);assert.equal(count('reviews'),reviews+1);assert.equal(count('activity'),activities+1);
    assert.equal(JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='versions' AND id=?").get(version.id).data).text,'Synthetic document content.');
  } finally {h.db.close();}
});
