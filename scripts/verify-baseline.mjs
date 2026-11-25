import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('docs/recovery/manifest.json', root), 'utf8'));
let count = 0;
for (const [path, expected] of Object.entries(manifest.files)) {
  if (!(path.startsWith('public/') || path.startsWith('src/') || path === 'scripts/build.mjs' || path === 'tests/standalone.test.mjs')) continue;
  const actual = createHash('sha256').update(await readFile(new URL(path, root))).digest('hex');
  assert.equal(actual, expected, `Original baseline changed: ${path}. Review intentional changes and update the recovery notes; never rewrite the original manifest.`);
  count++;
}
console.log(`${count} original source/assets/build/test files match the uploaded package.`);
