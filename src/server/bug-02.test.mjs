import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createWorkerHarness,extractCookie} from '../../tests/regression/helpers.mjs';

async function fixture() {
  const h=await createWorkerHarness();
  const cookie=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
  assert.equal((await h.call('/api/t/students/keep-student',{method:'PUT',cookie,body:{id:'keep-student',name:'Synthetic original'}})).status,200);
  const backup=body=>h.call('/api/admin/import',{method:'POST',cookie,body});
  const digest=()=>{
    const tables=h.db.raw.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
    return createHash('sha256').update(JSON.stringify(tables.map(({name})=>[name,h.db.raw.prepare('SELECT * FROM '+name+' ORDER BY rowid').all()]))).digest('hex');
  };
  return {...h,cookie,backup,digest};
}
const payload=(count=1)=>({format:'fq-admissions',students:Array.from({length:count},(_,i)=>({id:'new-'+i,name:'Synthetic '+i}))});
const stagedCount=h=>h.db.raw.prepare("SELECT COUNT(*) n FROM records WHERE tbl GLOB '__imp:*'").get().n;

test('BUG-02: pure validation and user conflicts never change existing tables',async()=>{
  const h=await fixture();
  try {
    const before=h.digest();
    for(const body of [
      {format:'fq-admissions'}, {...payload(),reqdb:{broken:true}}, {...payload(),tasks:{}}, {...payload(),students:[null]},
      {...payload(),students:[{id:'duplicate'},{id:'duplicate'}]},
      {...payload(),users:[{id:'new-user',username:'SUP',name:'Conflict',role:'advisor'}]},
      {...payload(),users:[{id:'one',username:'Duplicate'},{id:'two',username:'duplicate'}]},
      {...payload(),users:[{id:'same',username:'first'},{id:'same',username:'second'}]}
    ]) {
      const r=await h.backup(body);assert.equal(r.status,400,r.text);assert.equal(h.digest(),before);
    }
  } finally {h.db.close();}
});

test('BUG-02: partial import preserves omitted tables, templates, old users/sessions and backup contracts',async()=>{
  const h=await fixture();
  try {
    const supervisor=h.db.raw.prepare("SELECT * FROM users WHERE username='sup'").get();
    const templates=h.db.raw.prepare("SELECT data FROM records WHERE tbl='templates' ORDER BY id").all();
    h.db.raw.prepare("INSERT INTO meta(key,value) VALUES('reqdb:chunk:legacy','legacy-preserved')").run();
    const library={format:'fantasme-reqdb',version:1,taxonomy:{},schools:[{id:'school-one',zh:'Synthetic school'}],records:[{id:'req-one',school:'school-one'}]};
    const result=await h.backup({...payload(),reqdb:library,users:[{id:supervisor.id,username:'sup'},{id:'new-advisor',username:'new.advisor',name:'Synthetic advisor',role:'advisor',active:true}]});
    assert.equal(result.status,200,result.text);assert.equal(result.data.created.length,1);
    assert.deepEqual(h.db.raw.prepare("SELECT data FROM records WHERE tbl='templates' ORDER BY id").all(),templates);
    assert.equal(h.db.raw.prepare("SELECT 1 FROM records WHERE tbl='students' AND id='keep-student'").get(),undefined);
    assert.ok(h.db.raw.prepare("SELECT 1 FROM records WHERE tbl='students' AND id='new-0'").get());
    assert.equal(h.db.raw.prepare('SELECT pw_hash FROM users WHERE id=?').get(supervisor.id).pw_hash,supervisor.pw_hash);
    assert.equal((await h.call('/api/me',{cookie:h.cookie})).status,200);
    assert.equal((await h.call('/api/admin/export',{cookie:h.cookie})).data.format,'fq-admissions');
    assert.equal((await h.call('/api/reqdb',{cookie:h.cookie})).data.records[0].id,'req-one');
    assert.equal(h.db.raw.prepare("SELECT value FROM meta WHERE key='reqdb:chunk:legacy'").get().value,'legacy-preserved');
    const login=await h.call('/api/login',{method:'POST',body:{username:'new.advisor',password:result.data.created[0].password}});assert.equal(login.status,200);
    assert.equal(h.db.raw.prepare("SELECT must_change FROM users WHERE id='new-advisor'").get().must_change,1);
    assert.equal(stagedCount(h),0);
    assert.equal((await h.backup({format:'fq-admissions',templates:[]})).status,200);
    assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM records WHERE tbl='templates'").get().n,0);
    assert.ok(h.db.raw.prepare("SELECT 1 FROM records WHERE tbl='students' AND id='new-0'").get());
  } finally {h.db.close();}
});

test('BUG-02: failing the second staging batch rolls back logical data and removes temporary rows',async()=>{
  const h=await fixture();
  try {
    const before=h.digest(),batch=h.db.batch.bind(h.db);let staged=0;
    h.db.batch=async statements=>{
      if(statements.some(row=>typeof row.values[0]==='string' && row.values[0].startsWith('__imp:') && row.query.startsWith('INSERT INTO records'))) {
        staged++;if(staged===2) throw new Error('Synthetic second staging batch failure');
        assert.ok(statements.length<=80);
      }
      return batch(statements);
    };
    const result=await h.backup(payload(180));assert.equal(result.status,500);assert.equal(staged,2);
    assert.equal(stagedCount(h),0);assert.equal(h.digest(),before);
  } finally {h.db.close();}
});

test('BUG-02: atomic switch failure restores every table, including reqdb and users',async()=>{
  const h=await fixture();
  try {
    h.db.raw.exec("CREATE TEMP TRIGGER fail_import BEFORE UPDATE OF tbl ON records WHEN OLD.tbl GLOB '__imp:*' BEGIN SELECT RAISE(ABORT,'Synthetic final switch failure'); END");
    const before=h.digest();
    const result=await h.backup({...payload(),reqdb:{taxonomy:{},schools:[],records:[]},users:[{id:'never-created',username:'never.created',name:'Synthetic',role:'advisor'}]});
    assert.equal(result.status,500,result.text);assert.equal(stagedCount(h),0);assert.equal(h.digest(),before);
  } finally {h.db.close();}
});

test('BUG-02: concurrent imports cannot erase each other staging; expired leftovers stay invisible and are cleaned',async()=>{
  const h=await fixture();
  try {
    h.db.raw.prepare('INSERT INTO records(tbl,id,data,updated_at) VALUES(?,?,?,?)').run('__imp:abandoned:students','hidden-id',JSON.stringify({id:'hidden-id',name:'Private staged name'}),'2025-01-01');
    assert.doesNotMatch((await h.call('/api/bootstrap',{cookie:h.cookie})).text,/Private staged name/);
    const batch=h.db.batch.bind(h.db);let release,entered,held=false;
    const gate=new Promise(resolve=>release=resolve),ready=new Promise(resolve=>entered=resolve);
    h.db.batch=async statements=>{
      if(!held && statements.some(row=>row.query.startsWith('INSERT INTO records') || row.query==='DELETE FROM records')) {held=true;entered();await gate;}
      return batch(statements);
    };
    const first=h.backup(payload(100));await ready;
    let firstResult;
    try {assert.equal((await h.backup({format:'fq-admissions',students:[{id:'second-import'}]})).status,409);}
    finally {release();firstResult=await first;}
    assert.equal(firstResult.status,200,firstResult.text);assert.equal(stagedCount(h),0);
    assert.equal(h.db.raw.prepare("SELECT COUNT(*) n FROM records WHERE tbl='students'").get().n,100);
    assert.equal(h.db.raw.prepare("SELECT 1 FROM meta WHERE key='__imp:lock'").get(),undefined);
    h.db.raw.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run('__imp:lock',JSON.stringify({token:'expired',phase:'staging',expiresAt:0}));
    assert.equal((await h.backup(payload())).status,200);
  } finally {h.db.close();}
});

for(const mode of ['lost lease','missing staged row']) test('BUG-02: '+mode+' makes every switch statement a no-op',async()=>{
  const h=await fixture();
  try {
    const before=h.digest(),batch=h.db.batch.bind(h.db);let injected=false;
    h.db.batch=async statements=>{
      if(!injected && statements.some(row=>row.query.startsWith('UPDATE meta SET value=json_set'))) {
        injected=true;
        if(mode==='lost lease') h.db.raw.prepare("UPDATE meta SET value=? WHERE key='__imp:lock'").run(JSON.stringify({token:'other-import',phase:'committing',expiresAt:Date.now()+300000}));
        else h.db.raw.prepare("DELETE FROM records WHERE tbl GLOB '__imp:*' AND id='new-0'").run();
      }
      return batch(statements);
    };
    const result=await h.backup({...payload(2),reqdb:{taxonomy:{},schools:[],records:[]},users:[{id:'not-inserted',username:'not.inserted',name:'Synthetic',role:'advisor'}]});
    assert.equal(result.status,409,result.text);assert.equal(injected,true);assert.equal(stagedCount(h),0);
    if(mode==='lost lease') {
      assert.equal(JSON.parse(h.db.raw.prepare("SELECT value FROM meta WHERE key='__imp:lock'").get().value).token,'other-import');
      h.db.raw.prepare("DELETE FROM meta WHERE key='__imp:lock'").run();
    }
    assert.equal(h.digest(),before);
  } finally {h.db.close();}
});
