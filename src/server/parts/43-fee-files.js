const fqFeeFileLimit=10*1024*1024;
function fqFeeKey(key) {
  if(typeof key!=='string') throw new I(400,'文件键无效');
  const parts=key.split('/'),uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  if(parts.length===4&&parts[0]==='fees'&&Kn.test(parts[1])&&Kn.test(parts[2])&&uuid.test(parts[3])) return {studentId:parts[1],billId:parts[2]};
  if(parts.length===3&&parts[0]==='settings'&&parts[1]==='collect'&&uuid.test(parts[2])) return {collect:true};
  throw new I(400,'费用文件键无效');
}
function fqFeeFileType(name,contentType) {
  const extension=name.split('.').pop().toLowerCase(),type=String(contentType||'').split(';')[0].trim().toLowerCase();
  const allowed={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',pdf:'application/pdf'};
  if(!Object.hasOwn(allowed,extension)||allowed[extension]!==type) throw new I(415,'费用文件仅支持JPG/PNG/WEBP/PDF');
  return {type,extension};
}
function fqFeeFileInfo(object) {
  if(!object) throw new I(404,'文件不存在');
  const metadata=Object.fromEntries(Object.entries(object.customMetadata||{}).map(([key,value])=>[key.toLowerCase(),value]));
  const name=fqFileName(metadata.filename),{type}=fqFeeFileType(name,object.httpMetadata?.contentType);
  if(!Number.isSafeInteger(object.size)||object.size<1||object.size>fqFeeFileLimit||!/^[a-f0-9]{64}$/.test(metadata.sha256||'')) throw new I(409,'费用文件元数据无效');
  return {key:object.key,name,size:object.size,type,sha256:metadata.sha256};
}
async function fqFeeReference(env,key,bill,purpose) {
  const parsed=fqFeeKey(key);
  if(purpose==='collect'?!parsed.collect:parsed.collect||parsed.studentId!==bill.studentId||parsed.billId!==bill.id) throw new I(403,'文件不属于当前费用单');
  const object=await fqFileObject(fqFileStorage(env.FILES),key,'head');
  if(!object) throw new I(409,'上传文件不存在');
  const meta=Object.fromEntries(Object.entries(object.customMetadata||{}).map(([name,value])=>[name.toLowerCase(),value]));
  if(object.key!==key||meta.purpose!==purpose) throw new I(403,'文件用途不符');
  return fqFeeFileInfo(object);
}
function fqFeeUploadAccess(context,bill,purpose) {
  const manage=fqFeeManage(context,bill),user=context.user;
  if(purpose==='attachment'&&manage&&['draft','sent'].includes(bill.status)) return;
  if(purpose==='payment'&&user.role==='student'&&user.studentId===bill.studentId&&['sent','claimed'].includes(bill.status)) return;
  if(purpose==='disburse'&&manage&&['confirmed','disbursed'].includes(bill.status)) return;
  throw new I(403,'当前角色或费用单状态不允许上传此文件');
}
async function fqFeeFiles(request,env,user,url) {
  if(url.pathname==='/api/files'&&request.method==='POST') {
    const purpose=url.searchParams.get('purpose'),billId=url.searchParams.get('billId');
    let bill=null;
    if(purpose==='collect') {if(user.role!=='supervisor') throw new I(403,'只有主管可以上传收款码');}
    else {
      if(!Kn.test(billId||'')) throw new I(400,'费用单编号无效');
      bill=await ue(env,'feeBills',billId);if(!bill) throw new I(404,'费用单不存在');
      fqFeeUploadAccess(await de(env,user),bill,purpose);
    }
    const storage=fqFileStorage(env.FILES);let name;
    try{name=fqFileName(decodeURIComponent(request.headers.get('X-File-Name')||''));}catch{throw new I(400,'文件名无效');}
    const {type,extension}=fqFeeFileType(name,request.headers.get('Content-Type'));
    const bytes=await fqReadLimitedBody(request,fqFeeFileLimit);
    if(!bytes.length) throw new I(400,'文件为空');
    if(extension==='webp') {
      const text=new TextDecoder('ascii');if(bytes.length<12||text.decode(bytes.subarray(0,4))!=='RIFF'||text.decode(bytes.subarray(8,12))!=='WEBP') throw new I(415,'文件内容与声明的类型不一致');
    }else fqFileSignature(bytes,extension);
    if(bill) {bill=await ue(env,'feeBills',billId);if(!bill)throw new I(404,'费用单不存在');fqFeeUploadAccess(await de(env,user),bill,purpose);}
    const key=bill?`fees/${bill.studentId}/${bill.id}/${crypto.randomUUID()}`:`settings/collect/${crypto.randomUUID()}`;
    fqFeeKey(key);
    const sha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),v=>v.toString(16).padStart(2,'0')).join('');
    try{await storage.put(key,bytes,{httpMetadata:{contentType:type},customMetadata:{uploadedBy:user.id,fileName:name,sha256,purpose}});}catch{throw new I(502,'文件上传失败，请稍后重试');}
    await N(env,user.id,'fee-file-upload','feeBills',bill?.id||'',purpose);
    return D({upload:{key,name,size:bytes.length,type,sha256}});
  }
  if(url.pathname.startsWith('/api/files/')&&['GET','HEAD'].includes(request.method)) {
    let key;try{key=decodeURIComponent(url.pathname.slice('/api/files/'.length));}catch{throw new I(400,'文件键无效');}
    const parsed=fqFeeKey(key);
    if(parsed.collect) {
      if(!await fqFeeCollectAllowed(env,user)) throw new I(403,'没有收款码访问权限');
      const value=await env.DB.prepare("SELECT value FROM meta WHERE key='fee:collect'").first(),collect=value?JSON.parse(value.value):{};
      if(![collect.wechat?.key,collect.alipay?.key].includes(key)) throw new I(404,'收款码已更换或未配置');
    }else {
      const bill=await ue(env,'feeBills',parsed.billId);
      if(!bill||bill.studentId!==parsed.studentId) throw new I(404,'费用单不存在');
      if(!fqFeeVisible(await de(env,user),bill)) throw new I(403,'没有这张费用单的文件访问权限');
    }
    const object=await fqFileObject(fqFileStorage(env.FILES),key,request.method==='HEAD'?'head':'get'),info=fqFeeFileInfo(object);
    const name=encodeURIComponent(info.name).replace(/[!'()*]/g,v=>'%'+v.charCodeAt(0).toString(16).toUpperCase());
    return Te(new Response(request.method==='HEAD'?null:object.body,{headers:{'Content-Type':info.type,'Content-Length':String(info.size),'Content-Disposition':`attachment; filename="download"; filename*=UTF-8''${name}`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}}));
  }
  throw new I(405,'不支持的文件操作');
}
