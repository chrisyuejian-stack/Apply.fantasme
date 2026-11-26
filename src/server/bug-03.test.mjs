import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('BUG-03: setup and every business write reject cross-origin requests before side effects',async()=>{
  const h=await createWorkerHarness();
  try {
    const setup={setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false};
    for(const Origin of ['https://evil.example','null','https://apply.test:443','https://apply.test:8443','https://APPLY.test','https://child.apply.test']) {
      assert.equal((await h.call('/api/setup',{method:'POST',body:setup,headers:{Origin}})).status,403,Origin);
      assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM users').get().n,0);
    }
    assert.equal((await h.call('/api/setup',{method:'POST',body:setup,headers:{'Sec-Fetch-Site':'cross-site'}})).status,403);
    const initialized=await h.call('/api/setup',{method:'POST',body:setup});assert.equal(initialized.status,200,initialized.text);
    const cookie=extractCookie(initialized.headers);
    for(const path of ['/api/login','/api/t/students/blocked','/api/diy/register','/api/diy-admin/config']) {
      for(const method of ['POST','PUT','DELETE']) {
        const denied=await h.call(path,{method,cookie,body:{id:'blocked'},headers:{Origin:'https://evil.example','X-Forwarded-Host':'evil.example',Referer:'https://apply.test'}});
        assert.equal(denied.status,403,path+' '+method);
      }
    }
    assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM records WHERE id='blocked'").get().n,0);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM diy_accounts').get().n,0);
    for(const headers of [{},{Origin:null},{Referer:'https://evil.example'}]) {
      const login=await h.call('/api/login',{method:'POST',body:{username:'sup',password:'Supervisor2026'},headers});assert.equal(login.status,200,login.text);
    }
    assert.equal((await h.call('/api/setup-status',{headers:{Origin:'https://evil.example','Sec-Fetch-Site':'cross-site'}})).status,200);
    assert.equal((await h.call('/api/me',{method:'HEAD',cookie,headers:{Origin:'https://evil.example','Sec-Fetch-Site':'cross-site'}})).status,404);
    assert.equal((await h.call('/embed-login')).status,200);
    // Match the actual request's non-default port, not an assumed deployment hostname.
    const response=await h.worker.fetch(new Request('https://apply.test:8443/api/login',{method:'POST',headers:{'Content-Type':'application/json','X-FQ':'1',Origin:'https://apply.test:8443'},body:JSON.stringify({username:'sup',password:'Supervisor2026'})}),h.env);
    assert.equal(response.status,200);
  } finally {h.db.close();}
});
