import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('BUG-08: unauthorized model actions never consume chat/pro quota or call external services',async()=>{
  const h=await createWorkerHarness({DEEPSEEK_API_KEY:'synthetic-unused-key',AI_DAILY_CHAT:'100',AI_DAILY_PRO:'100'});
  const originalFetch=globalThis.fetch;let networkCalls=0;
  globalThis.fetch=async()=>{networkCalls++;throw new Error('External calls forbidden in this regression');};
  try {
    const sup=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
    const account=(await h.call('/api/users',{method:'POST',cookie:sup,body:{username:'advisor',name:'Advisor',role:'advisor'}})).data;
    const cookie=extractCookie((await h.call('/api/login',{method:'POST',body:{username:'advisor',password:account.password}})).headers);
    assert.equal((await h.call('/api/password',{method:'POST',cookie,body:{old:account.password,new:'ChangedPassword2026'}})).status,200);
    assert.equal((await h.call('/api/t/students/foreign-student',{method:'PUT',cookie:sup,body:{id:'foreign-student',name:'Not assigned to this advisor'}})).status,200);
    const before=await h.call('/api/ai/status',{cookie});assert.equal(before.status,200);
    for(const tier of ['flash','pro']) for(const action of ['audit','tasks','precheck','repertoire','schools','comms','refs','paste']) {
      const denied=await h.call('/api/ai/run',{method:'POST',cookie,body:{action,mode:tier,studentId:'foreign-student'}});
      assert.match(denied.text,/没有这位学生的管理权限/);
    }
    const after=await h.call('/api/ai/status',{cookie});
    assert.equal(after.data.usage.used,before.data.usage.used);
    assert.equal(after.data.usage.pro,before.data.usage.pro);
    assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM fq_ai_usage WHERE user_id=? AND kind IN ('chat','pro')").get(account.user.id).n,0);
    assert.equal(networkCalls,0);
    const brief=await h.call('/api/ai/run',{method:'POST',cookie,body:{action:'brief'}});
    assert.equal(brief.status,200);assert.match(brief.text,/今日简报/);
  } finally {globalThis.fetch=originalFetch;h.db.close();}
});
