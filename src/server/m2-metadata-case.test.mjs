import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

// Grok-Ops #55 残留 5：真实 R2 读回的 customMetadata 键名可能被转为小写，fqFileInfo 必须对大小写不敏感。
test('M2: fqFileInfo 对 customMetadata 键名大小写不敏感', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'm2-meta-'));
  const modulePath = join(directory, 'worker.mjs');
  await writeFile(modulePath, (await readFile(new URL('../../dist/_worker.js', import.meta.url), 'utf8')) + '\nexport {fqFileInfo};');
  try {
    const {fqFileInfo} = await import(pathToFileURL(modulePath).href);
    const sha256 = 'a'.repeat(64);
    const base = {key: 'docs/stu-1/doc-1/00000000-0000-4000-8000-000000000000', size: 64, httpMetadata: {contentType: 'application/pdf'}};
    for (const customMetadata of [
      {fileName: 'Lin_PS.pdf', sha256, uploadedBy: 'u-1'},
      {filename: 'Lin_PS.pdf', sha256, uploadedby: 'u-1'},
      {FILENAME: 'Lin_PS.pdf', SHA256: sha256},
    ]) {
      const info = fqFileInfo({...base, customMetadata});
      assert.equal(info.name, 'Lin_PS.pdf');
      assert.equal(info.sha256, sha256);
      assert.equal(info.type, 'application/pdf');
    }
    assert.throws(() => fqFileInfo({...base, customMetadata: {filename: 'Lin_PS.pdf'}}), /文件元数据无效/);
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});
