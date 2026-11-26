import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

// public/apply/app/app.js 由 src/client/app/parts/ 生成（npm run build:client），二者必须逐字节一致。
test('public/apply/app/app.js 与 src/client/app/parts/ 拼接结果一致', async () => {
  const dir = new URL('../src/client/app/parts/', import.meta.url);
  let joined = '';
  for (const name of (await readdir(dir)).filter(n => n.endsWith('.js')).sort()) joined += await readFile(new URL(name, dir), 'utf8');
  const generated = await readFile(new URL('../public/apply/app/app.js', import.meta.url), 'utf8');
  assert.ok(joined === generated, '前端片段与 public/apply/app/app.js 不一致：请改 src/client/app/parts/ 后运行 npm run build:client，并一起提交');
});
