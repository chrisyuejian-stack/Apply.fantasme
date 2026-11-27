// PR 风险分级、自动合并判定与「下一步」文案。纯函数，供 .github/workflows/pr-*.yml 通过 github-script 引用；
// tests/pr-policy.test.mjs 覆盖。原则：任何不确定都「不自动合并」（fail closed）。

// 任何情况下都不自动合并（需要主人本人）：工作流、恢复基线证据、受保护的原始测试。
const NEVER = [/^\.github\/workflows\//, /^docs\/recovery\//, /^tests\/standalone\.test\.mjs$/, /^\.github\/CODEOWNERS$/];
// 低风险（文档、测试、模板、各工具入口文件）：打了 risk:low 且 CI 绿即可自动合并。
const LOW = [/^docs\//, /^tests\//, /^[^/]+\.md$/, /^\.github\/ISSUE_TEMPLATE\//, /^\.cursor\//];
// 低风险路径里仍需主人批准的文件：含技术红线。
const NEEDS_APPROVAL = [/^AGENTS\.md$/];

const matches = (list, file) => list.some(re => re.test(file));

function classify(files, labels) {
  const reasons = [];
  if (labels.includes('risk:high')) return { risk: 'high', reasons: ['标签 risk:high'] };
  const never = files.filter(f => matches(NEVER, f));
  if (never.length) return { risk: 'high', reasons: ['改动了受保护路径：' + never.slice(0, 3).join('、')] };
  const needsApproval = files.filter(f => matches(NEEDS_APPROVAL, f) || !matches(LOW, f));
  if (needsApproval.length) return { risk: 'medium', reasons: ['含代码或红线文件：' + needsApproval.slice(0, 3).join('、')] };
  if (files.length === 0) return { risk: 'medium', reasons: ['无法获取改动文件列表'] };
  return { risk: 'low', reasons: ['仅文档/测试/模板'] };
}

// 能否自动合并。state: { draft, labels, files, ciConclusion, mergeableState }
function decideAutoMerge(state) {
  const { draft, labels = [], files = [], ciConclusion, mergeableState } = state;
  const { risk, reasons } = classify(files, labels);
  const no = reason => ({ ok: false, risk, reason });
  if (draft) return no('草稿 PR 不自动合并');
  if (risk === 'high') return no('高风险，需主人合并：' + reasons.join('；'));
  if (ciConclusion !== 'success') return no('CI 未通过');
  if (mergeableState !== 'clean') return no('不可干净合并（' + (mergeableState || '未知') + '）');
  if (risk === 'medium') return labels.includes('approved') ? { ok: true, risk, reason: '中风险，已有 approved 标签且 CI 通过' } : no('中风险，需 approved 标签');
  if (!labels.includes('risk:low')) return no('低风险需打 risk:low 标签才自动合并');
  return { ok: true, risk, reason: '低风险且 CI 通过' };
}

// 状态评论：返回 markdown，含隐藏标记以便更新同一条评论。
function statusComment(state) {
  const { draft, labels = [], files = [], ciConclusion, mergeableState } = state;
  const { risk, reasons } = classify(files, labels);
  const has = l => labels.includes(l);
  const ci = ciConclusion === 'success' ? '✅ 通过' : ciConclusion === 'failure' ? '❌ 失败' : '⏳ 进行中/未运行';
  const riskTxt = { high: '🔴 高', medium: '🟠 中', low: '🟢 低' }[risk];
  const rows = [
    ['风险', `${riskTxt}（${reasons.join('；')}）`],
    ['CI', ci],
    ['状态', draft ? '草稿' : '可合并检查'],
  ];
  const need = [];
  if (risk === 'high') {
    rows.push(['Grok 红队', has('gate:redteam-passed') ? '✅' : '—（需要）']);
    rows.push(['Antigravity 验收', has('gate:accepted') ? '✅' : '—（需要）']);
    rows.push(['主人批准', has('approved') ? '✅' : '—（需要）']);
    if (!has('gate:redteam-passed')) need.push('Grok-Ops 红队审阅');
    if (!has('gate:accepted')) need.push('Antigravity 验收');
    if (!has('approved')) need.push('主人加 `approved` 标签');
  } else if (risk === 'medium') {
    rows.push(['批准', has('approved') ? '✅ approved' : '—（需要 approved 标签）']);
    if (!has('approved')) need.push('Claude 审阅后加 `approved`（或主人加）');
  } else if (!has('risk:low')) {
    need.push('加 `risk:low` 标签即可自动合并');
  }
  let next;
  if (ciConclusion === 'failure') next = '**修复 CI 失败**（作者）';
  else if (draft) next = need.length ? `转为正式 PR 后，仍需：${need.join('、')}` : '作者转为正式 PR（Ready for review）';
  else if (ciConclusion !== 'success') next = '等待 CI 完成';
  else if (need.length) next = `需要：${need.join(' → ')}`;
  else if (mergeableState && mergeableState !== 'clean') next = `解决合并状态：${mergeableState}`;
  else next = '✅ 条件已满足，将自动合并（或可由 Claude 合并）';
  return '<!-- fq-pr-status -->\n### PR 状态\n\n| 项 | 状态 |\n|---|---|\n' + rows.map(r => `| ${r[0]} | ${r[1]} |`).join('\n') + `\n\n**下一步：** ${next}\n\n<sub>由 \`scripts/pr-policy.cjs\` 自动生成；规则见 docs/collab.md「自动化」。</sub>`;
}

module.exports = { classify, decideAutoMerge, statusComment, NEVER, LOW };
