import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('BUG-04: intake ownership, legacy records, and referenced recommenders are protected',async()=>{
  const h=await createWorkerHarness();
  try {
    const sup=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
    async function put(table,row,cookie=sup) {
      return h.call('/api/t/'+table+'/'+row.id,{method:'PUT',cookie,body:row});
    }
    const advisor=(await h.call('/api/users',{method:'POST',cookie:sup,body:{username:'advisor',name:'Advisor',role:'advisor'}})).data;
    assert.equal((await put('students',{id:'student-a',name:'Synthetic A',advisorId:advisor.user.id})).status,200);
    assert.equal((await put('students',{id:'student-b',name:'Synthetic B'})).status,200);
    const account=(await h.call('/api/users',{method:'POST',cookie:sup,body:{username:'student',name:'Student',role:'student',studentId:'student-a'}})).data;
    async function login(username,password) {
      const cookie=extractCookie((await h.call('/api/login',{method:'POST',body:{username,password}})).headers);
      assert.equal((await h.call('/api/password',{method:'POST',cookie,body:{old:password,new:'ChangedPassword2026'}})).status,200);
      return cookie;
    }
    const student=await login('student',account.password),adv=await login('advisor',advisor.password);
    for(const row of [{id:'rec-staff',fromIntake:false},{id:'rec-legacy'},{id:'rec-other',studentId:'student-b',fromIntake:true}]) {
      const original=(await put('recommenders',{studentId:'student-a',name:'Original',...row})).data.record;
      assert.equal((await put('recommenders',{...original,name:'Tampered',_base:original.updatedAt},student)).status,403);
      assert.equal((await h.call('/api/t/recommenders/'+row.id,{method:'DELETE',cookie:student})).status,403);
      assert.equal(JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='recommenders' AND id=?").get(row.id).data).name,'Original');
    }
    assert.equal((await put('recommenders',{id:'rec-own',studentId:'student-a',name:'Own intake',note:'Forged internal note',fromIntake:false},student)).status,200);
    let own=JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='recommenders' AND id='rec-own'").get().data);
    assert.equal(own.fromIntake,true);assert.equal(own.note,'');
    assert.equal((await put('recommenders',{...own,name:'Edited',_base:own.updatedAt},student)).status,200);
    own=JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='recommenders' AND id='rec-own'").get().data);
    assert.equal((await put('refRequests',{id:'ref-own',studentId:'student-a',recommenderId:'rec-own'})).status,200);
    assert.equal((await put('recommenders',{...own,name:'Blocked',_base:own.updatedAt},student)).status,409);
    for(const cookie of [sup,adv,student]) assert.equal((await h.call('/api/t/recommenders/rec-own',{method:'DELETE',cookie})).status,409);
    assert.ok(h.db.raw.prepare("SELECT 1 FROM records WHERE tbl='recommenders' AND id='rec-own'").get());
    assert.equal((await h.call('/api/t/refRequests/ref-own',{method:'DELETE',cookie:sup})).status,200);
    assert.equal((await h.call('/api/t/recommenders/rec-own',{method:'DELETE',cookie:student})).status,200);
    // Legacy missing fromIntake is still editable by staff, not reclassified as student-owned.
    const legacy=JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='recommenders' AND id='rec-legacy'").get().data);
    assert.equal((await put('recommenders',{...legacy,name:'Staff update',_base:legacy.updatedAt},adv)).status,200);
  } finally {h.db.close();}
});
