import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// BUG-09（前端）：doc-reopen 必须走服务端原子审核接口，而不是前端分两次写 reviews 与 documents。
const src = await readFile(new URL('../public/apply/app/app.js', import.meta.url), 'utf8');
const start = src.indexOf('"doc-reopen"(t) {');
assert.ok(start > 0, '未找到 doc-reopen');
const body = src.slice(start, src.indexOf('"mat-new"(t) {', start));

test('doc-reopen 调用 POST /documents/:id/review，decision=changes', () => {
  assert.match(body, /ge\.call\("POST", `\/documents\/\$\{encodeURIComponent\(e\.id\)\}\/review`/);
  assert.match(body, /decision: "changes"/);
  assert.match(body, /base: e\.updatedAt/);
});

test('doc-reopen 不再在前端分两次写 reviews 与 documents', () => {
  assert.doesNotMatch(body, /st\.put\("reviews"/);
  assert.doesNotMatch(body, /st\.patch\("documents"/);
});
