import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {LocalR2} from '../../scripts/local-r2.mjs';
import {createWorkerHarness,extractCookie,startHttpsServer} from '../../tests/regression/helpers.mjs';

async function fixture(bound=true) {
  const directory=await mkdtemp(join(tmpdir(),'gpt-r2-'));
  const files=new LocalR2(join(directory,'objects'));
  const h=await createWorkerHarness(bound?{FILES:files}:{});
  const sup=extractCookie((await h.call('/api/setup',{method:'POST',body:{setupKey:h.env.APPLY_SETUP_KEY,name:'Supervisor',username:'sup',password:'Supervisor2026',demo:false}})).headers);
  const put=(tbl,row,cookie=sup)=>h.call('/api/t/'+tbl+'/'+row.id,{method:'PUT',cookie,body:row});
  async function account(username,role,studentId) {
    const created=await h.call('/api/users',{method:'POST',cookie:sup,body:{username,name:username,role,studentId}});assert.equal(created.status,200,created.text);
    const auth=extractCookie((await h.call('/api/login',{method:'POST',body:{username,password:created.data.password}})).headers);
    assert.equal((await h.call('/api/password',{method:'POST',cookie:auth,body:{old:created.data.password,new:'ChangedPassword2026'}})).status,200);
    return {id:created.data.user.id,cookie:auth};
  }
  const advisor=await account('advisor','advisor'),foreign=await account('foreign.advisor','advisor'),writer=await account('writer','writer');
  assert.equal((await put('students',{id:'student-one',name:'Synthetic One',advisorId:advisor.id,writerIds:[writer.id]})).status,200);
  assert.equal((await put('students',{id:'student-two',name:'Synthetic Two',advisorId:foreign.id})).status,200);
  const student=await account('student.one','student','student-one'),otherStudent=await account('student.two','student','student-two');
  const document=(await put('documents',{id:'doc-one',studentId:'student-one',title:'Synthetic essay',writerId:writer.id})).data.record;
  assert.equal((await put('documents',{id:'doc-other',studentId:'student-one',title:'Other document',writerId:writer.id})).status,200);
  await h.call('/api/diy/register',{method:'POST',body:{phone:'13800001128',name:'Synthetic DIY',password:'DiyPassword2026',agree:true}});
  const diy=extractCookie((await h.call('/api/diy/login',{method:'POST',body:{phone:'13800001128',password:'DiyPassword2026'}})).headers,'__Host-fq_diy');
  const upload=(cookie=advisor.cookie,bytes='%PDF-1.7\nSynthetic file',headers={},documentId='doc-one')=>h.call('/api/files?documentId='+documentId,{method:'POST',cookie,rawBody:bytes,headers:{'Content-Type':'application/pdf','X-File-Name':encodeURIComponent('合成文书.pdf'),...headers}});
  const download=(key,cookie=advisor.cookie,method='GET')=>h.worker.fetch(new Request('https://apply.test/api/files/'+encodeURIComponent(key),{method,headers:{Cookie:cookie,'X-FQ':'1'}}),h.env);
  return {...h,files,directory,sup,advisor,foreign,writer,student,otherStudent,diy,document,put,upload,download,cleanup:async()=>{h.db.close();await rm(directory,{recursive:true,force:true});}};
}

test('#51: upload, trusted metadata version, private download and historical version compatibility',async()=>{
  const h=await fixture();
  try {
    const bytes=Buffer.from('%PDF-1.7\nSynthetic file');
    const saved=await h.upload(h.writer.cookie,bytes);assert.equal(saved.status,200,saved.text);
    const upload=saved.data.upload;
    assert.match(upload.key,/^docs\/student-one\/doc-one\/[a-f0-9-]{36}$/);
    assert.equal(upload.name,'合成文书.pdf');assert.equal(upload.size,bytes.length);assert.equal(upload.type,'application/pdf');
    assert.equal(upload.sha256,createHash('sha256').update(bytes).digest('hex'));
    const head=await h.files.head(upload.key);assert.equal(head.customMetadata.uploadedBy,h.writer.id);
    assert.equal(head.customMetadata.fileName,upload.name);
    const version=await h.put('versions',{id:'uploaded-version',documentId:'doc-one',kind:'upload',upload:{key:upload.key,name:'forged.html',size:1,type:'text/html',sha256:'0'.repeat(64)},text:'forged',link:'https://evil.example',words:999},h.writer.cookie);
    assert.equal(version.status,200,version.text);assert.deepEqual(version.data.record.upload,upload);
    assert.equal(version.data.record.text,undefined);assert.equal(version.data.record.link,undefined);assert.equal(version.data.record.words,undefined);
    for(const cookie of [h.sup,h.advisor.cookie,h.writer.cookie,h.student.cookie]) {
      const response=await h.download(upload.key,cookie);assert.equal(response.status,200);
      assert.match(response.headers.get('Content-Disposition'),/^attachment;/);assert.match(response.headers.get('Content-Disposition'),/filename\*=UTF-8''/);
      assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.match(response.headers.get('Cache-Control'),/private/);assert.match(response.headers.get('Cache-Control'),/no-store/);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes);
    }
    const onlyHead=await h.download(upload.key,h.student.cookie,'HEAD');assert.equal(onlyHead.status,200);assert.equal(await onlyHead.text(),'');
    const oldFile=await h.put('versions',{id:'old-file-version',documentId:'doc-one',kind:'file',link:'https://files.example/old.pdf'});
    assert.equal(oldFile.status,200);assert.equal(oldFile.data.record.kind,'file');assert.equal(oldFile.data.record.link,'https://files.example/old.pdf');
    assert.equal((await h.put('versions',{id:'text-version',documentId:'doc-one',kind:'text',text:'Existing text workflow.'})).status,200);
    const textUpload=await h.upload(h.sup,'',{ 'Content-Type':'text/plain','X-File-Name':'empty.txt'});assert.equal(textUpload.status,200,textUpload.text);
    assert.equal(textUpload.data.upload.size,0);
  } finally {await h.cleanup();}
});

test('#51: unauthorized actors, cross-origin writes and invalid keys cannot access storage',async()=>{
  const h=await fixture();
  try {
    let puts=0;const put=h.files.put.bind(h.files);h.files.put=async(...args)=>{puts++;return put(...args);};
    for(const [cookie,status] of [['',401],[h.diy,401],[h.student.cookie,403],[h.otherStudent.cookie,403],[h.foreign.cookie,403]]) assert.equal((await h.upload(cookie)).status,status);
    assert.equal((await h.upload(h.advisor.cookie,undefined,{Origin:'https://evil.example'})).status,403);assert.equal(puts,0);
    const valid=await h.upload();assert.equal(valid.status,200);const key=valid.data.upload.key;
    for(const [cookie,status] of [['',401],[h.diy,401],[h.otherStudent.cookie,403],[h.foreign.cookie,403]]) assert.equal((await h.download(key,cookie)).status,status);
    assert.equal((await h.download(key.replace('student-one','student-two'),h.foreign.cookie)).status,404);
    for(const invalid of [key+'/extra',key.replace('doc-one','../doc-one'),key.replace('docs/','docs\\'),'%2e%2e/'+key]) {
      assert.equal((await h.download(invalid)).status,400);
      assert.equal((await h.put('versions',{id:'invalid-key',documentId:'doc-one',kind:'upload',upload:{key:invalid}})).status,400);
    }
    assert.equal((await h.put('versions',{id:'foreign-key',documentId:'doc-one',kind:'upload',upload:{key:key.replace('student-one','student-two')}})).status,403);
    assert.equal((await h.put('versions',{id:'wrong-doc-key',documentId:'doc-other',kind:'upload',upload:{key}})).status,403);
    await h.files.delete(key);
    assert.equal((await h.put('versions',{id:'missing-object',documentId:'doc-one',kind:'upload',upload:{key}})).status,409);
    assert.equal((await h.download(key)).status,404);
  } finally {await h.cleanup();}
});

test('#51: reject oversize, filename/header forgery, binary mismatch and archived/reviewing documents',async()=>{
  const h=await fixture();
  try {
    let puts=0;const put=h.files.put.bind(h.files);h.files.put=async(...args)=>{puts++;return put(...args);};
    const limit=20*1024*1024;
    assert.equal((await h.upload(undefined,'tiny',{'Content-Length':String(limit+1)})).status,413);
    assert.equal((await h.upload(undefined,new Uint8Array(limit+1),{'Content-Length':'1'})).status,413);
    for(const [bytes,headers,status] of [
      ['<script>bad</script>',{},415],['%PDF-1.7',{'Content-Type':'text/html'},415],
      ['%PDF-1.7',{'X-File-Name':'attack.html'},415],['%PDF-1.7',{'X-File-Name':'..%2Fescape.pdf'},400],
      ['%PDF-1.7',{'X-File-Name':'inject%0D%0Aheader.pdf'},400],['%PDF-1.7',{'X-File-Name':'%'},400],
      ['not PNG',{'X-File-Name':'fake.png','Content-Type':'image/png'},415],
      ['%PDF-1.7',{'X-File-Name':'file.__proto__'},415],['%PDF-1.7',{'X-File-Name':'file.constructor'},415]
    ]) assert.equal((await h.upload(undefined,bytes,headers)).status,status);
    assert.equal(puts,0);
    const archived=await h.put('documents',{...h.document,archived:true,_base:h.document.updatedAt});assert.equal(archived.status,200);
    assert.equal((await h.upload()).status,409);
    const restored=await h.put('documents',{...archived.data.record,archived:false,_base:archived.data.record.updatedAt});assert.equal(restored.status,200);
    const version=await h.put('versions',{id:'review-version',documentId:'doc-one',kind:'text',text:'Reviewable text.'});assert.equal(version.status,200);
    assert.equal((await h.put('documents',{...restored.data.record,status:'advisor_review',currentVersionId:version.data.record.id,_base:restored.data.record.updatedAt})).status,200);
    assert.equal((await h.upload()).status,403);assert.equal(puts,0);
  } finally {await h.cleanup();}
});

test('#51: missing FILES binding does not affect text/file versions; local adapter supports opaque keys',async()=>{
  const h=await fixture(false);
  try {
    assert.equal((await h.upload()).status,503);
    assert.equal((await h.put('versions',{id:'missing-binding',documentId:'doc-one',kind:'upload',upload:{key:'docs/student-one/doc-one/12345678-1234-4123-8123-123456789abc'}})).status,503);
    assert.equal((await h.put('versions',{id:'legacy-unbound',documentId:'doc-one',kind:'file',link:'https://files.example/legacy'})).status,200);
    assert.equal((await h.put('versions',{id:'text-unbound',documentId:'doc-one',kind:'text',text:'Text remains supported.'})).status,200);
    await h.files.put('../../outside.txt',Buffer.from('Local opaque key'),{httpMetadata:{contentType:'text/plain'},customMetadata:{fileName:'local.txt'}});
    assert.equal((await h.files.head('../../outside.txt')).size,16);
    assert.equal(await (await h.files.get('../../outside.txt')).text(),'Local opaque key');
    assert.equal((await readdir(h.directory)).length,1);
    await h.files.delete('../../outside.txt');assert.equal(await h.files.head('../../outside.txt'),null);
  } finally {await h.cleanup();}
});

test('#51: supported MIME/extension pairs and exact size boundary',async()=>{
  const h=await fixture();
  try {
    const formats=[
      ['report.doc','application/msword',Uint8Array.from([208,207,17,224,161,177,26,225])],
      ['report.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',Uint8Array.from([80,75,3,4])],
      ['report.pages','application/vnd.apple.pages',Uint8Array.from([80,75,3,4])],
      ['note.md','text/markdown; charset=utf-8','# Synthetic note'],
      ['note.rtf','application/rtf','{\\rtf1 Synthetic}'],
      ['image.jpg','image/jpeg',Uint8Array.from([255,216,255])],
      ['image.png','image/png',Uint8Array.from([137,80,78,71,13,10,26,10])]
    ];
    for(const [name,type,bytes] of formats) {
      const response=await h.upload(h.advisor.cookie,bytes,{'X-File-Name':encodeURIComponent(name),'Content-Type':type});
      assert.equal(response.status,200,name+' '+response.text);
      assert.equal(response.data.upload.type,type.split(';')[0]);
    }
    const boundary=new Uint8Array(20*1024*1024).fill(120);
    const full=await h.upload(h.advisor.cookie,boundary,{'X-File-Name':'boundary.txt','Content-Type':'text/plain'});
    assert.equal(full.status,200,full.text);assert.equal(full.data.upload.size,boundary.length);
    assert.equal((await h.files.head(full.data.upload.key)).size,boundary.length);
  } finally {await h.cleanup();}
});

test('#51: dev HTTPS wiring and local R2 bytes survive process restart',async()=>{
  const server=await startHttpsServer();let restarted;
  try {
    const setup=await server.request('/api/setup',{method:'POST',body:{setupKey:'TestSetupKey2026!',name:'Transport supervisor',username:'r2.transport',password:'TransportPassword2026',demo:false}});
    assert.equal(setup.status,200,setup.text);const cookie=extractCookie(setup.headers);
    assert.equal((await server.request('/api/t/students/transport-student',{method:'PUT',cookie,body:{id:'transport-student',name:'Synthetic'}})).status,200);
    assert.equal((await server.request('/api/t/documents/transport-doc',{method:'PUT',cookie,body:{id:'transport-doc',studentId:'transport-student',title:'Transport essay'}})).status,200);
    const bytes='%PDF-1.7\nPersistent synthetic document';
    const upload=await server.request('/api/files?documentId=transport-doc',{method:'POST',cookie,rawBody:bytes,headers:{'Content-Type':'application/pdf','X-File-Name':'persistent.pdf'}});
    assert.equal(upload.status,200,upload.text);const key=upload.data.upload.key;
    await server.stop();restarted=await startHttpsServer({dataDir:server.dir});
    const download=await restarted.request('/api/files/'+encodeURIComponent(key),{cookie});
    assert.equal(download.status,200,download.text);assert.equal(download.text,bytes);
    assert.match(download.headers['content-disposition'],/^attachment;/);
  } finally {if(restarted) await restarted.stop();await server.cleanup();}
});

test('#51: storage failures do not leak provider errors or create version references',async()=>{
  const h=await fixture();
  try {
    const saved=await h.upload();assert.equal(saved.status,200);const key=saved.data.upload.key;
    h.files.head=async()=>{throw new Error('Synthetic private provider detail');};
    const version=await h.put('versions',{id:'failed-reference',documentId:'doc-one',kind:'upload',upload:{key}});
    assert.equal(version.status,502);assert.doesNotMatch(version.text,/private provider/);
    assert.equal(h.db.raw.prepare("SELECT 1 FROM records WHERE tbl='versions' AND id='failed-reference'").get(),undefined);
    h.files.get=async()=>{throw new Error('Synthetic private provider detail');};
    const download=await h.download(key);assert.equal(download.status,502);assert.doesNotMatch(await download.text(),/private provider/);
    h.files.put=async()=>{throw new Error('Synthetic private provider detail');};
    const upload=await h.upload();assert.equal(upload.status,502);assert.doesNotMatch(upload.text,/private provider/);
  } finally {await h.cleanup();}
});
