import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('BUG-01: generic student deletion purges records, student account and sessions only for that student',async()=>{
  const h=await createWorkerHarness();
  try {
    const setup=await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Synthetic supervisor',username:'sup',password:'TestSupervisor2026',demo:false}});
    const cookie=extractCookie(setup.headers);
    for(const id of ['student-delete','student-keep']) {
      assert.equal((await h.call('/api/t/students/'+id,{method:'PUT',cookie,body:{id,name:id}})).status,200);
      assert.equal((await h.call('/api/t/tasks/'+id+'-task',{method:'PUT',cookie,body:{id:id+'-task',studentId:id,title:'Synthetic task'}})).status,200);
    }
    const created=await h.call('/api/users',{method:'POST',cookie,body:{username:'delete.student',name:'Synthetic student',role:'student',studentId:'student-delete'}});
    assert.equal(created.status,200);
    const student=extractCookie((await h.call('/api/login',{method:'POST',body:{username:'delete.student',password:created.data.password}})).headers);
    assert.equal((await h.call('/api/me',{cookie:student})).status,200);
    assert.equal((await h.call('/api/t/students/student-delete',{method:'DELETE',cookie:student})).status,403);
    assert.equal((await h.call('/api/t/students/student-delete',{method:'DELETE',cookie})).status,200);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM records WHERE student_id=? OR (tbl=? AND id=?)').get('student-delete','students','student-delete').n,0);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM users WHERE id=?').get(created.data.user.id).n,0);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM sessions WHERE user_id=?').get(created.data.user.id).n,0);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM records WHERE student_id=?').get('student-keep').n,2);
    assert.equal((await h.call('/api/me',{cookie:student})).status,401);
    assert.equal((await h.call('/api/login',{method:'POST',body:{username:'delete.student',password:created.data.password}})).status,401);
    assert.equal((await h.call('/api/t/students/student-delete',{method:'DELETE',cookie})).status,200);
  } finally {h.db.close();}
});
