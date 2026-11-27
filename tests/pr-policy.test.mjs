import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { classify, decideAutoMerge, statusComment } = createRequire(import.meta.url)('../scripts/pr-policy.cjs');

const base = { draft: false, labels: ['risk:low'], files: ['docs/status.md'], ciConclusion: 'success', mergeableState: 'clean' };

test('纯文档且打了 risk:low、CI 绿、可干净合并 → 自动合并', () => {
  assert.equal(decideAutoMerge(base).ok, true);
});
test('未打 risk:low 不自动合并', () => assert.equal(decideAutoMerge({ ...base, labels: [] }).ok, false));
test('草稿、CI 未过、有冲突都不合并', () => {
  assert.equal(decideAutoMerge({ ...base, draft: true }).ok, false);
  assert.equal(decideAutoMerge({ ...base, ciConclusion: 'failure' }).ok, false);
  assert.equal(decideAutoMerge({ ...base, ciConclusion: undefined }).ok, false);
  assert.equal(decideAutoMerge({ ...base, mergeableState: 'dirty' }).ok, false);
  assert.equal(decideAutoMerge({ ...base, mergeableState: undefined }).ok, false);
});
test('改了工作流 / 恢复基线 / 受保护测试 → 高风险，即使打了 risk:low 和 approved 也不自动合并', () => {
  for (const f of ['.github/workflows/deploy-production.yml', 'docs/recovery/manifest.json', 'docs/recovery/original/x.js', 'tests/standalone.test.mjs']) {
    const d = decideAutoMerge({ ...base, labels: ['risk:low', 'approved'], files: ['docs/a.md', f] });
    assert.equal(d.ok, false, f);
    assert.equal(d.risk, 'high', f);
  }
});
test('risk:high 标签优先，不能被 risk:low / approved 覆盖', () => {
  assert.equal(decideAutoMerge({ ...base, labels: ['risk:low', 'risk:high', 'approved'] }).ok, false);
});
test('代码或 AGENTS.md → 中风险：risk:low 不够，需要 approved', () => {
  for (const f of ['src/server/parts/80-records.js', 'scripts/build.mjs', 'package.json', 'public/apply/app/app.js', 'AGENTS.md']) {
    assert.equal(classify([f], []).risk, 'medium', f);
    assert.equal(decideAutoMerge({ ...base, files: [f] }).ok, false, f);
    assert.equal(decideAutoMerge({ ...base, files: [f], labels: ['approved'] }).ok, true, f);
  }
});
test('文件列表为空（取不到）→ 不自动合并', () => assert.equal(decideAutoMerge({ ...base, files: [] }).ok, false));
test('文档与代码混合 → 按最高风险（中）', () => assert.equal(classify(['docs/a.md', 'src/x.js'], []).risk, 'medium'));
test('状态评论：高风险列出缺失的门禁与下一步', () => {
  const c = statusComment({ draft: false, labels: ['risk:high', 'gate:accepted'], files: ['src/server/a.js'], ciConclusion: 'success', mergeableState: 'clean' });
  assert.match(c, /fq-pr-status/);
  assert.match(c, /Grok-Ops 红队审阅/);
  assert.match(c, /主人加 `approved` 标签/);
  assert.doesNotMatch(c, /Antigravity 验收[^|]*—/);
});
test('状态评论：条件满足时给出可合并提示', () => {
  assert.match(statusComment(base), /条件已满足/);
});
