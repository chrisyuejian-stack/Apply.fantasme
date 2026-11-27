import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {MemoryD1} from '../../tests/regression/helpers.mjs';

const directory=await mkdtemp(join(tmpdir(),'gpt-stage-a-'));
let source=await readFile(new URL('../../dist/_worker.js',import.meta.url),'utf8');
source=source.replace(/const fqaiDay = \(\) => [^;]+;/,"const fqaiDay = () => '2026-11-26';");
source+='\n'+await readFile(new URL('./performance-before.mjs',import.meta.url),'utf8');
source+="\nj=()=> '2026-11-26T00:00:00.000Z';\nexport {Hn,Jn,fqLegacyBootstrap,fqaiAuditAll,fqLegacyAuditAll,fqaiScope,fqaiD1Data,fqaiLoad};";
const modulePath=join(directory,'worker.mjs');await writeFile(modulePath,source);
const api=await import(pathToFileURL(modulePath).href);await rm(directory,{recursive:true,force:true});

async function seed(count) {
  const db=new MemoryD1();await api.Hn({DB:db});
  const insert=db.raw.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES(?,?,?,?,?)');
  const stamp='2026-11-20T00:00:00.000Z';
  const put=(tbl,row)=>insert.run(tbl,row.id,tbl==='students'?row.id:row.studentId || null,JSON.stringify({...row,createdAt:stamp,updatedAt:stamp}),stamp);
  const user=(id,role,studentId=null)=>db.raw.prepare('INSERT INTO users(id,username,name,role,student_id,active,must_change,created_at) VALUES(?,?,?,?,?,1,0,?)').run(id,id,id,role,studentId,stamp);
  user('supervisor','supervisor');
  for(let i=0;i<4;i++) user('advisor-'+i,'advisor');
  for(let i=0;i<3;i++) user('writer-'+i,'writer');
  for(let i=0;i<count;i++) {
    const studentId='stu-'+i;
    user('user-'+i,'student',studentId);
    put('students',{id:studentId,name:'Synthetic '+i,advisorId:'advisor-'+i%4,writerIds:['writer-'+i%3],profile:{accounts:[{user:'synthetic-private'}]}});
    for(let k=0;k<3;k++) {
      put('submissions',{id:`sub-${i}-${k}`,studentId,name:'Submission '+k,status:'in_progress'});
      put('applications',{id:`app-${i}-${k}`,studentId,schoolId:'school-one',status:'planning',parts:[{id:'part-'+k,submissionId:`sub-${i}-${k}`,deadline:{date:'2026-12-01'}}]});
      put('rounds',{id:`round-${i}-${k}`,studentId,applicationId:`app-${i}-${k}`,kind:'prescreen',status:'pending'});
    }
    for(let k=0;k<10;k++) put('tasks',{id:`task-${i}-${k}`,studentId,applicationId:`app-${i}-${k%3}`,title:'Task '+k,status:k%3===0?'done':'todo',dueDate:'2026-11-01',dependsOn:k?[`task-${i}-${k-1}`]:[]});
    for(let k=0;k<2;k++) {
      put('documents',{id:`doc-${i}-${k}`,studentId,title:'Essay '+k,status:k?'drafting':'final',writerId:'writer-'+i%2,brief:'Staff-only synthetic',currentVersionId:`version-${i}-${k}`});
      put('versions',{id:`version-${i}-${k}`,studentId,documentId:`doc-${i}-${k}`,kind:'text',text:'Synthetic essay.',no:1});
      put('reviews',{id:`review-${i}-${k}`,studentId,documentId:`doc-${i}-${k}`,stage:k?'advisor':'student',decision:'approve'});
      put('materials',{id:`material-${i}-${k}`,studentId,title:'Material '+k,status:'review'});
      put('repertoire',{id:`piece-${i}-${k}`,studentId,title:'Piece '+k});
      put('recommenders',{id:`rec-${i}-${k}`,studentId,name:'Synthetic teacher',note:'Staff only'});
      put('refRequests',{id:`ref-${i}-${k}`,studentId,recommenderId:`rec-${i}-${k}`,status:'invited'});
      put('activity',{id:`act-${i}-${k}`,studentId,text:'Synthetic activity',studentVisible:!k});
    }
  }
  for(let k=0;k<2;k++) put('templates',{id:'template-'+k,title:'Shared template '+k});
  const head={taxonomy:{},schools:[{id:'school-one',zh:'Synthetic school'}]};
  db.raw.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run('reqdb:head',JSON.stringify(head));
  db.raw.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run('reqdb:school:school-one','[]');
  assert.equal(db.raw.prepare('SELECT COUNT(*) n FROM records').get().n,count*36+2);
  assert.equal(db.raw.prepare("SELECT COUNT(*) n FROM records WHERE tbl!='templates' AND student_id IS NOT CASE WHEN tbl='students' THEN json_extract(data,'$.id') ELSE json_extract(data,'$.studentId') END").get().n,0);
  return db;
}

for(const count of [10,100,500]) test('Stage A differential: '+count+' students, all roles and empty scope',async()=>{
  const db=await seed(count);
  try {
    const idx=await api.fqaiLoad(db);
    const roles=[{id:'supervisor',role:'supervisor'},{id:'advisor-1',role:'advisor'},{id:'writer-1',role:'writer'},{id:'user-0',role:'student',studentId:'stu-0'},{id:'missing',role:'student',studentId:'missing'}];
    const prepare=db.prepare.bind(db);let monitor=false,loaded=0;
    db.prepare=query=>{
      const stmt=prepare(query);
      if(/SELECT tbl,\s*data FROM records/.test(query)) {
        const all=stmt.all.bind(stmt);
        stmt.all=async()=>{const result=await all();if(monitor) loaded+=result.results.length;return result;};
      }
      return stmt;
    };
    for(const user of roles) {
      const expected=await api.fqLegacyBootstrap({DB:db},user);
      monitor=true;loaded=0;
      const current=await api.Jn({DB:db},user);monitor=false;
      assert.equal(current.status,expected.status);
      const actual=await current.json(),baseline=await expected.json();
      assert.deepEqual(actual.features,{boardV12:false});
      // The feature advertisement is additive; all legacy business payloads remain identical.
      baseline.features={boardV12:false};
      assert.deepEqual(actual,baseline,count+' '+user.role+' bootstrap');
      if(user.role!=='supervisor') assert.ok(loaded<count*36+2,`${user.role} must not load every business row`);
      const data=api.fqaiD1Data(db),scope=await api.fqaiScope(data,user);
      let filterCalls=0;
      const wrapped={...data,rows:async tables=>{
        const rows=await data.rows(tables);
        rows.filter=function(...args){filterCalls++;return Array.prototype.filter.apply(this,args);};
        return rows;
      }};
      const legacy=await api.fqLegacyAuditAll({data:wrapped,idx},user,scope);
      assert.equal(filterCalls,scope.manage.size);
      filterCalls=0;
      const result=await api.fqaiAuditAll({data:wrapped,idx},user,scope);
      assert.deepEqual(result,legacy,count+' '+user.role+' auditAll');
      assert.equal(filterCalls,0,'auditAll must not rescan the source rows for each student');
    }
  } finally {db.close();}
});
