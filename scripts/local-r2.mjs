// Local-only R2 subset. A single atomic file contains metadata and bytes.
import {mkdir,open,readFile,writeFile,rename,unlink} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';

export class LocalR2 {
  constructor(directory) {this.directory=resolve(directory);}
  path(key) {return join(this.directory,createHash('sha256').update(key).digest('hex')+'.r2');}
  info(meta) {
    return {...meta,uploaded:new Date(meta.uploaded),writeHttpMetadata(headers) {
      if(meta.httpMetadata.contentType) headers.set('Content-Type',meta.httpMetadata.contentType);
    }};
  }
  async put(key,value,options={}) {
    const bytes=Buffer.from(await new Response(value).arrayBuffer());
    const etag=createHash('md5').update(bytes).digest('hex');
    const meta={key,size:bytes.length,etag,httpEtag:'"'+etag+'"',uploaded:new Date().toISOString(),version:randomUUID(),httpMetadata:options.httpMetadata || {},customMetadata:options.customMetadata || {}};
    const header=Buffer.from(JSON.stringify(meta));
    if(header.length>65536) throw new Error('Local R2 metadata too large');
    const length=Buffer.alloc(4);length.writeUInt32BE(header.length);
    await mkdir(this.directory,{recursive:true,mode:0o700});
    const destination=this.path(key),temporary=destination+'.'+randomUUID()+'.tmp';
    try {
      await writeFile(temporary,Buffer.concat([length,header,bytes]),{mode:0o600});
      await rename(temporary,destination);
    } finally {await unlink(temporary).catch(error=>{if(error.code!=='ENOENT') throw error;});}
    return this.info(meta);
  }
  async head(key) {
    let file;
    try {
      file=await open(this.path(key),'r');
      const length=Buffer.alloc(4);const first=await file.read(length,0,4,0);
      if(first.bytesRead!==4 || length.readUInt32BE()>65536) throw new Error('Corrupt local R2 header');
      const bytes=Buffer.alloc(length.readUInt32BE());const result=await file.read(bytes,0,bytes.length,4);
      if(result.bytesRead!==bytes.length) throw new Error('Corrupt local R2 metadata');
      const meta=JSON.parse(bytes.toString());if(meta.key!==key) throw new Error('Local R2 key mismatch');
      return this.info(meta);
    } catch(error) {if(error.code==='ENOENT') return null;throw error;}
    finally {if(file) await file.close();}
  }
  async get(key) {
    try {
      const stored=await readFile(this.path(key));const size=stored.readUInt32BE(0);
      if(size>65536 || size+4>stored.length) throw new Error('Corrupt local R2 metadata');
      const meta=JSON.parse(stored.subarray(4,size+4).toString()),bytes=stored.subarray(size+4);
      if(meta.key!==key || meta.size!==bytes.length) throw new Error('Corrupt local R2 object');
      return {...this.info(meta),body:new ReadableStream({start(controller){controller.enqueue(new Uint8Array(bytes));controller.close();}}),arrayBuffer:async()=>Uint8Array.from(bytes).buffer,text:async()=>bytes.toString(),json:async()=>JSON.parse(bytes.toString())};
    } catch(error) {if(error.code==='ENOENT') return null;throw error;}
  }
  async delete(key) {await unlink(this.path(key)).catch(error=>{if(error.code!=='ENOENT') throw error;});}
}
