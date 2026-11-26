import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// BUG-11：S() 对非 http(s) 链接必须返回假值，调用方的 `!S(link)` 校验才有效。
const src = await readFile(new URL('../public/apply/app/app.js', import.meta.url), 'utf8');
const m = src.match(/function S\(t\) \{[\s\S]*?\n  \}/);
assert.ok(m, '未找到 S()');
const S = new Function(`${m[0]}; return S;`)();

test('S() 接受 http(s) 并去除首尾空白', () => {
  assert.equal(S('https://example.com/a'), 'https://example.com/a');
  assert.equal(S('  http://example.com  '), 'http://example.com');
});

test('S() 对空值与危险协议返回空字符串（假值）', () => {
  for (const v of ['', '   ', null, undefined, 'javascript:alert(1)', 'data:text/html,x', 'ftp://x', '#', 'example.com']) {
    assert.equal(S(v), '', String(v));
  }
});

test('S() 不再以 "#" 作为回退值', () => {
  assert.ok(!/:\s*"#";/.test(m[0]));
});
