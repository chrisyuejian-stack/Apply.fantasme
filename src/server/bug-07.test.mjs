import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {MemoryD1} from '../../tests/regression/helpers.mjs';

test('BUG-07: one Worker initializes each D1 and keeps identical-fingerprint caches isolated',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'gpt-07-'));
  const modulePath=join(directory,'worker.mjs');
  // Test-only exports in a temporary copy; the deployed Worker API is unchanged.
  await writeFile(modulePath,(await readFile(new URL('../../dist/_worker.js',import.meta.url),'utf8'))+'\nexport {Hn,fqaiLoad,fqaiDispatch,fqaiTables};');
  const api=await import(pathToFileURL(modulePath).href);
  const first=new MemoryD1(),second=new MemoryD1();
  try {
    const request=()=>new Request('https://apply.test/api/setup-status');
    assert.equal((await api.default.fetch(request(),{APPLY_DB:first})).status,200);
    assert.equal((await api.default.fetch(request(),{APPLY_DB:second})).status,200);
    for(const [db,label] of [[first,'A'],[second,'B']]) {
      const head={exportedAt:label,taxonomy:{},schools:[{id:'school-one',zh:label,recordCount:1}]};
      db.raw.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run('reqdb:head',JSON.stringify(head));
      db.raw.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run('reqdb:school:school-one',JSON.stringify([{id:'requirement-one',school:'school-one',zh:label}]));
    }
    const fingerprint=db=>db.raw.prepare("SELECT key,rowid,length(value) n FROM meta ORDER BY key").all();
    assert.deepEqual(fingerprint(first),fingerprint(second));
    assert.equal((await api.fqaiLoad(first)).records[0].zh,'A');
    assert.equal((await api.fqaiLoad(second)).records[0].zh,'B');
    assert.equal((await api.fqaiLoad(first)).records[0].zh,'A');
    for(const [db,label] of [[first,'A'],[second,'B']]) {
      await api.fqaiTables(db);
      const status=await api.fqaiDispatch('/api/ai/status','GET',{}, {db,user:{id:'synthetic',role:'supervisor'},cfg:{roles:['supervisor'],essayRoles:[]}});
      assert.equal(status.json.data.exportedAt,label);
    }
  } finally {first.close();second.close();await rm(directory,{recursive:true,force:true});}
});
