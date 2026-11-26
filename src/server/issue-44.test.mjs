import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

test('#44: AI studentRows excludes request-scoped and historical import staging',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'gpt-44-'));
  const path=join(directory,'worker.mjs');
  await writeFile(path,(await readFile(new URL('../../dist/_worker.js',import.meta.url),'utf8'))+'\nexport {fqaiD1Data};');
  const api=await import(pathToFileURL(path).href);const h=await createWorkerHarness();
  try {
    await h.call('/api/setup-status');
    const insert=h.db.raw.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES(?,?,?,?,?)');
    for(const [tbl,id,sid] of [['students','student-one','student-one'],['tasks','task-one','student-one'],['__imp:request:tasks','hidden-one','student-one'],['__imp:tasks','hidden-two','student-one'],['tasks','other-task','student-other']]) insert.run(tbl,id,sid,JSON.stringify({id,studentId:sid}),'2026-01-01');
    const rows=await api.fqaiD1Data(h.db).studentRows('student-one');
    assert.deepEqual(rows.map(row=>row.id).sort(),['student-one','task-one']);
  } finally {h.db.close();await rm(directory,{recursive:true,force:true});}
});

test('#44: import limit uses actual UTF-8 bytes and rejects before writes; exact 20 MiB accepted',async()=>{
  const h=await createWorkerHarness();
  try {
    const cookie=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
    const snapshot=()=>JSON.stringify(['records','meta','users','sessions','audit'].map(tbl=>h.db.raw.prepare('SELECT * FROM '+tbl+' ORDER BY rowid').all()));
    const before=snapshot(),limit=20*1024*1024;
    const post=(rawBody,headers={})=>h.call('/api/admin/import',{method:'POST',cookie,rawBody,headers});
    const declared=await post('{}',{'Content-Length':String(limit+1)});assert.equal(declared.status,413);
    const unicode=await post('界'.repeat(Math.ceil(limit/3)),{'Content-Length':'1'});assert.equal(unicode.status,413);
    const oversized=await post(' '.repeat(limit+1));assert.equal(oversized.status,413);
    assert.equal(snapshot(),before);
    assert.equal((await post('{invalid')).status,400);assert.equal(snapshot(),before);
    const body=JSON.stringify({format:'fq-admissions',templates:[]});
    const boundary=await post(body+' '.repeat(limit-Buffer.byteLength(body)));assert.equal(boundary.status,200,boundary.text);
  } finally {h.db.close();}
});
