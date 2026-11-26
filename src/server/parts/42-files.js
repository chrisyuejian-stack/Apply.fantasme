const fqFileLimit = 20 * 1024 * 1024;
const fqFileTypes = {
  pdf:['application/pdf'], doc:['application/msword'],
  docx:['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  pages:['application/vnd.apple.pages','application/x-iwork-pages-sffpages'],
  txt:['text/plain'], md:['text/markdown','text/plain'], rtf:['application/rtf','text/rtf'],
  jpg:['image/jpeg'], jpeg:['image/jpeg'], png:['image/png']
};
function fqFileName(value) {
  if (typeof value !== 'string' || !value.trim() || /[\\/\x00-\x1f\x7f]/.test(value) || new TextEncoder().encode(value).length > 255) throw new I(400,'文件名无效');
  return value.trim();
}
function fqFileType(name, contentType) {
  const extension = name.split('.').pop().toLowerCase(), type = String(contentType || '').split(';')[0].trim().toLowerCase();
  if (!Object.hasOwn(fqFileTypes,extension) || !fqFileTypes[extension].includes(type)) throw new I(415,'文件扩展名或类型不支持');
  return {extension,type};
}
function fqFileSignature(bytes, extension) {
  const starts = values => values.every((value,index) => bytes[index] === value);
  let valid = false;
  if (extension === 'pdf') valid = starts([37,80,68,70,45]);
  else if (extension === 'doc') valid = starts([208,207,17,224,161,177,26,225]);
  else if (extension === 'docx' || extension === 'pages') valid = starts([80,75,3,4]) || starts([80,75,5,6]) || starts([80,75,7,8]);
  else if (extension === 'jpg' || extension === 'jpeg') valid = starts([255,216,255]);
  else if (extension === 'png') valid = starts([137,80,78,71,13,10,26,10]);
  else if (extension === 'rtf') valid = starts([123,92,114,116,102]);
  else {
    try {
      const decoder = new TextDecoder('utf-8',{fatal:true});
      for (let offset = 0; offset < bytes.length; offset += 65536) {
        const chunk = bytes.subarray(offset,offset + 65536);
        if (chunk.includes(0)) throw new Error('Binary text');
        decoder.decode(chunk,{stream:true});
      }
      decoder.decode(); valid = true;
    } catch { valid = false; }
  }
  if (!valid) throw new I(415,'文件内容与声明的类型不一致');
}
function fqFileKey(key) {
  if (typeof key !== 'string') throw new I(400,'文件键无效');
  const segments = key.split('/');
  if (segments.length !== 4 || segments[0] !== 'docs' || !Kn.test(segments[1]) || !Kn.test(segments[2]) || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(segments[3])) throw new I(400,'文件键无效');
  return {studentId:segments[1],documentId:segments[2]};
}
function fqFileStorage(storage) {
  if (!storage || ['put','get','head'].some(method=>typeof storage[method] !== 'function')) throw new I(503,'文件存储未配置');
  return storage;
}
async function fqFileObject(storage, key, method) {
  try { return await storage[method](key); }
  catch { throw new I(502,'文件读取失败，请稍后重试'); }
}
function fqFileInfo(object) {
  if (!object) throw new I(404,'文件不存在');
  // R2 读回的 customMetadata 键名大小写不作假设（S3 兼容层会转小写），统一按小写匹配。
  const meta = Object.fromEntries(Object.entries(object.customMetadata || {}).map(([k,v]) => [String(k).toLowerCase(),v]));
  const name = fqFileName(meta.filename), {type} = fqFileType(name,object.httpMetadata?.contentType);
  const size = object.size, sha256 = meta.sha256;
  if (!Number.isSafeInteger(size) || size < 0 || size > fqFileLimit || !/^[0-9a-f]{64}$/.test(sha256 || '')) throw new I(409,'文件元数据无效');
  return {key:object.key,name,size,type,sha256};
}
async function fqFileVersion(storage, key, document) {
  const parsed = fqFileKey(key);
  if (parsed.studentId !== document.studentId || parsed.documentId !== document.id) throw new I(403,'文件不属于当前文书');
  const object = await fqFileObject(fqFileStorage(storage),key,'head');
  if (!object) throw new I(409,'上传文件不存在，请重新上传');
  if (object.key !== key) throw new I(409,'文件键与存储元数据不一致');
  return fqFileInfo(object);
}
function fqFileWriteAccess(context, document) {
  if (!(document.writerId === context.user.id || De(context,document.studentId))) throw new I(403,'只有负责的文书老师或顾问可以上传文件');
  if (document.archived === true) throw new I(409,'文书已归档，请先恢复后操作');
  if (!['drafting','revising'].includes(document.status || 'drafting')) throw new I(403,'文书当前不在撰写 / 修改阶段');
}
async function fqFiles(request, env, user, url) {
  if (url.pathname === '/api/files' && request.method === 'POST') {
    const documentId = url.searchParams.get('documentId');
    if (!Kn.test(documentId || '')) throw new I(400,'文书编号无效');
    const document = await ue(env,'documents',documentId);
    if (!document) throw new I(404,'文书不存在');
    fqFileWriteAccess(await de(env,user),document);
    const storage = fqFileStorage(env.FILES);
    let name;
    try { name = decodeURIComponent(request.headers.get('X-File-Name') || ''); }
    catch { throw new I(400,'文件名编码无效'); }
    name = fqFileName(name);
    const {type,extension} = fqFileType(name,request.headers.get('Content-Type'));
    const bytes = await fqReadLimitedBody(request,fqFileLimit);
    fqFileSignature(bytes,extension);
    const latest = await ue(env,'documents',documentId);
    if (!latest) throw new I(404,'文书不存在');
    fqFileWriteAccess(await de(env,user),latest);
    const sha256 = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),value=>value.toString(16).padStart(2,'0')).join('');
    const key = `docs/${latest.studentId}/${latest.id}/${crypto.randomUUID()}`;
    // Also reject legacy malformed IDs before deriving any object key.
    fqFileKey(key);
    try { await storage.put(key,bytes,{httpMetadata:{contentType:type},customMetadata:{uploadedBy:user.id,fileName:name,sha256}}); }
    catch { throw new I(502,'文件上传失败，请稍后重试'); }
    return D({upload:{key,name,size:bytes.byteLength,type,sha256}});
  }
  if (url.pathname.startsWith('/api/files/') && ['GET','HEAD'].includes(request.method)) {
    let key;
    try { key = decodeURIComponent(url.pathname.slice('/api/files/'.length)); }
    catch { throw new I(400,'文件键编码无效'); }
    const parsed = fqFileKey(key), context = await de(env,user);
    if (!$e(context,parsed.studentId)) throw new I(403,'没有这位学生的文件访问权限');
    const storage = fqFileStorage(env.FILES);
    const object = await fqFileObject(storage,key,request.method === 'HEAD' ? 'head' : 'get');
    const info = fqFileInfo(object);
    const name = encodeURIComponent(info.name).replace(/[!'()*]/g,value=>'%'+value.charCodeAt(0).toString(16).toUpperCase());
    return Te(new Response(request.method === 'HEAD' ? null : object.body,{headers:{
      'Content-Type':info.type,'Content-Length':String(info.size),
      'Content-Disposition':`attachment; filename="download"; filename*=UTF-8''${name}`,
      'X-Content-Type-Options':'nosniff','Cache-Control':'private, no-store'
    }}));
  }
  throw new I(405,'不支持的文件操作');
}
