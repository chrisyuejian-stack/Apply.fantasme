import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('BUG-05: reset DIY accounts must change password before any business read/write',async()=>{
  const h=await createWorkerHarness();
  try {
    const sup=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
    const phone='13800001119';
    assert.equal((await h.call('/api/diy/register',{method:'POST',body:{phone,name:'Synthetic DIY',password:'DiyPassword2026',agree:true}})).status,200);
    async function login(password) {
      const res=await h.call('/api/diy/login',{method:'POST',body:{phone,password}});assert.equal(res.status,200,res.text);return extractCookie(res.headers,'__Host-fq_diy');
    }
    const old=await login('DiyPassword2026');
    const boot=await h.call('/api/diy/bootstrap',{cookie:old});assert.equal(boot.status,200);assert.equal(boot.data.me.mustChange,false);
    assert.equal((await h.call('/api/diy/t/tasks/diy-task',{method:'PUT',cookie:old,body:{title:'Keep this task'}})).status,200);
    const reset=await h.call('/api/diy-admin/accounts/'+boot.data.me.id+'/reset',{method:'POST',cookie:sup,body:{}});assert.equal(reset.status,200);
    assert.equal((await h.call('/api/diy/bootstrap',{cookie:old})).status,401);
    const cookie=await login(reset.data.password);
    const required=await h.call('/api/diy/bootstrap',{cookie});assert.equal(required.status,200);assert.equal(required.data.me.mustChange,true);
    assert.deepEqual(Object.keys(required.data).sort(),Object.keys(boot.data).sort());
    const task=required.data.data.tasks.find(row=>row.id==='diy-task');assert.equal(task.title,'Keep this task');
    for(const [path,method,body] of [
      ['/api/diy/t/tasks/diy-task','PUT',{title:'Blocked'}],['/api/diy/t/tasks/diy-task','DELETE',undefined],
      ['/api/diy/profile','POST',{name:'Blocked'}],['/api/diy/request','POST',{kind:'service'}],
      ['/api/diy/bootstrap/','GET',undefined],['/api/diy/password','PUT',{}],['/api/diy/logout','GET',undefined]
    ]) {
      const denied=await h.call(path,{method,cookie,body});assert.equal(denied.status,403,path+' '+method);
      assert.deepEqual(denied.data,{error:'请先修改初始密码',mustChange:true});
    }
    const unchanged=await h.call('/api/diy/bootstrap',{cookie});assert.equal(unchanged.data.data.tasks.find(row=>row.id==='diy-task').title,task.title);
    assert.equal(unchanged.data.me.name,'Synthetic DIY');
    const second=await login(reset.data.password);
    assert.equal((await h.call('/api/diy/logout',{method:'POST',cookie:second,body:{}})).status,200);
    assert.equal((await h.call('/api/diy/bootstrap',{cookie:second})).status,401);
    assert.equal((await h.call('/api/diy/password',{method:'POST',cookie,body:{old:reset.data.password,new:'ChangedDiyPassword2026'}})).status,200);
    assert.equal((await h.call('/api/diy/bootstrap',{cookie})).data.me.mustChange,false);
    assert.equal((await h.call('/api/diy/t/tasks/diy-task',{method:'PUT',cookie,body:{title:'After change'}})).status,200);
    assert.equal((await h.call('/api/diy/profile',{method:'POST',cookie,body:{name:'Changed DIY'}})).status,200);
    assert.equal((await h.call('/api/diy/t/tasks/diy-task',{method:'DELETE',cookie})).status,200);
  } finally {h.db.close();}
});
