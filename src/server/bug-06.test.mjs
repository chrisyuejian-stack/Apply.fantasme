import test from 'node:test';
import assert from 'node:assert/strict';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

async function fixture() {
  const h=await createWorkerHarness();
  const cookie=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
  const put=(tbl,row)=>h.call('/api/t/'+tbl+'/'+row.id,{method:'PUT',cookie,body:row});
  assert.equal((await put('students',{id:'student-one',name:'Synthetic'})).status,200);
  return {...h,cookie,put};
}

test('BUG-06: text versions reject blank/zero words and archived parents; old fields stay optional',async()=>{
  const h=await fixture();
  try {
    const document=(await h.put('documents',{id:'doc-one',studentId:'student-one',title:'Synthetic essay'})).data.record;
    for(const text of [' \n\t ','...']) {
      const r=await h.put('versions',{id:'blank-version',documentId:document.id,kind:'text',text});
      assert.equal(r.status,400,r.text);
    }
    const valid=await h.put('versions',{id:'valid-version',documentId:document.id,kind:'text',text:'  Meaningful text.  '});
    assert.equal(valid.status,200,valid.text);assert.equal(valid.data.record.words,2);
    const archived=await h.put('documents',{...document,archived:true,_base:document.updatedAt});assert.equal(archived.status,200);
    assert.equal((await h.put('versions',{id:'archived-version',documentId:document.id,kind:'text',text:'New text.'})).status,409);
    assert.equal((await h.put('documents',{...archived.data.record,status:'advisor_review',currentVersionId:valid.data.record.id,_base:archived.data.record.updatedAt})).status,409);
    // Reading a stored historical version is not retroactively validated.
    const old={id:'legacy-version',documentId:document.id,studentId:'student-one',text:'',no:0};
    h.db.raw.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES(?,?,?,?,?)').run('versions',old.id,'student-one',JSON.stringify(old),'2025-01-01');
    const bootstrap=await h.call('/api/bootstrap',{cookie:h.cookie});
    assert.ok(bootstrap.data.data.versions.some(v=>v.id===old.id));
  } finally {h.db.close();}
});

test('BUG-06: all existing records require a current _base, including legacy JSON without timestamps',async()=>{
  const h=await fixture();
  try {
    const row=(await h.put('tasks',{id:'task-one',studentId:'student-one',title:'Original'})).data.record;
    assert.equal((await h.put('tasks',{...row,title:'No base'})).status,409);
    const next=await h.put('tasks',{...row,title:'Valid update',_base:row.updatedAt});assert.equal(next.status,200);
    assert.equal((await h.put('tasks',{...row,title:'Stale',_base:row.updatedAt})).status,409);
    assert.equal(JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='tasks' AND id='task-one'").get().data).title,'Valid update');
    const legacy={id:'legacy-task',studentId:'student-one',title:'Historical'};
    h.db.raw.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES(?,?,?,?,?)').run('tasks',legacy.id,'student-one',JSON.stringify(legacy),'2025-01-01');
    assert.equal((await h.put('tasks',{...legacy,title:'Missing stamp'})).status,409);
    assert.equal((await h.put('tasks',{...legacy,title:'Explicit old snapshot',_base:null})).status,200);
  } finally {h.db.close();}
});

test('BUG-06: an intervening write cannot be overwritten after checking _base',async()=>{
  const h=await fixture();
  try {
    const row=(await h.put('tasks',{id:'race-task',studentId:'student-one',title:'Before'})).data.record;
    const prepare=h.db.prepare.bind(h.db);let raced=false;
    h.db.prepare=query=>{
      if(!raced && query.startsWith('UPDATE records SET data=')) {
        raced=true;
        h.db.raw.prepare("UPDATE records SET data=?,updated_at=? WHERE tbl='tasks' AND id='race-task'").run(JSON.stringify({...row,title:'Competing writer'}),row.updatedAt);
      }
      return prepare(query);
    };
    const res=await h.put('tasks',{...row,title:'Must not overwrite',_base:row.updatedAt});
    assert.equal(res.status,409,res.text);assert.equal(raced,true);
    assert.equal(JSON.parse(h.db.raw.prepare("SELECT data FROM records WHERE tbl='tasks' AND id='race-task'").get().data).title,'Competing writer');
  } finally {h.db.close();}
});
