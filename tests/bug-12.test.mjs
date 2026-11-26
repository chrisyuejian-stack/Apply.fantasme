import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// BUG-12：主管进入 DIY 页面时，过期（>15s）的 /diy-admin/state 缓存必须重新拉取，
// 且失败/成功都要记录尝试时间，避免 na().then(Vs) 无限重试。
const src = await readFile(new URL('../public/apply/app/app.js', import.meta.url), 'utf8');

test('na() 在 finally 中记录最近一次拉取时间', () => {
  assert.match(src, /\.finally\(\(\) => \{\s*da = null, daAt = Date\.now\(\);\s*\}\)/);
});

test('DIY 页面渲染前对过期缓存重新拉取，且仅限 DIY 路由', () => {
  assert.match(src, /Date\.now\(\) - daAt > 15e3 && \["diy-students", "diy-student", "diy-settings"\]\.includes\(Ps\(\)\.name\)/);
});
