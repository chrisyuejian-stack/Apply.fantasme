import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

function parseSse(text) {
  const events = [];
  for (const chunk of String(text || '').split('\n\n')) {
    const line = chunk.split('\n').find(x => x.startsWith('data: '));
    if (line) {
      try { events.push(JSON.parse(line.slice(6))); } catch {}
    }
  }
  const result = [...events].reverse().find(e => e.type === 'result')?.result || null;
  const err = events.find(e => e.type === 'error')?.text || null;
  return { events, result, err };
}

async function seedStudentAndApps(h, cookie) {
  const head = {
    exportedAt: '2026-11-27',
    taxonomy: { majors: [{ id: 'piano', zh: '钢琴' }], cats: [{ id: 'audition', zh: '考试' }], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
    schools: [
      { id: 's-juilliard', abbr: 'Juilliard', zh: '茱莉亚音乐学院', en: 'The Juilliard School', country: 'US', offers: { UG: ['piano'] }, deadlines: [] },
    ],
  };
  h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify(head));
  h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:s-juilliard', JSON.stringify([
    { id: 'jui-ug-audition', school: 's-juilliard', country: 'US', level: 'UG', majors: ['piano'], cat: 'audition', prog: 'BM Piano', zh: '提交两首对比鲜明的独奏作品' },
  ]));

  assert.equal((await h.call('/api/t/students/stu-90', {
    method: 'PUT',
    cookie,
    body: {
      id: 'stu-90',
      name: '林同学九零',
      status: 'active',
      level: 'UG',
      majorId: 'piano',
      profile: { guardians: [{ name: '林妈妈', relation: '母亲' }] },
    },
  })).status, 200);

  assert.equal((await h.call('/api/t/submissions/sub-90', {
    method: 'PUT',
    cookie,
    body: { id: 'sub-90', studentId: 'stu-90', portal: 'Acceptd', status: 'in_progress' },
  })).status, 200);

  assert.equal((await h.call('/api/t/applications/app-90', {
    method: 'PUT',
    cookie,
    body: {
      id: 'app-90',
      studentId: 'stu-90',
      schoolId: 's-juilliard',
      program: 'BM Piano',
      level: 'UG',
      majorId: 'piano',
      parts: [{ submissionId: 'sub-90', label: '主申请', deadline: { date: '2026-12-01' } }],
    },
  })).status, 200);

  // Two duplicate open tasks so fqaiAuditIssues flags an issue programmatically
  assert.equal((await h.call('/api/t/tasks/t-90-1', {
    method: 'PUT',
    cookie,
    body: { id: 't-90-1', studentId: 'stu-90', applicationId: 'app-90', submissionId: 'sub-90', title: '录制初试曲目', category: 'audition', status: 'todo', dueDate: '2026-11-29' },
  })).status, 200);
  assert.equal((await h.call('/api/t/tasks/t-90-2', {
    method: 'PUT',
    cookie,
    body: { id: 't-90-2', studentId: 'stu-90', applicationId: 'app-90', submissionId: 'sub-90', title: '录制初试曲目', category: 'audition', status: 'todo', dueDate: '2026-11-30' },
  })).status, 200);

  // Recommender + pending invitation for refs draft
  assert.equal((await h.call('/api/t/recommenders/rec-90', {
    method: 'PUT',
    cookie,
    body: { id: 'rec-90', studentId: 'stu-90', name: '张教授', title: '钢琴系教授', relation: '专业导师' },
  })).status, 200);
  assert.equal((await h.call('/api/t/refRequests/rr-90', {
    method: 'PUT',
    cookie,
    body: { id: 'rr-90', studentId: 'stu-90', recommenderId: 'rec-90', target: 'sub:sub-90', status: 'invited', invitedAt: '2026-11-10', dueAt: '2026-12-01' },
  })).status, 200);
}

test('#90 check without DEEPSEEK_API_KEY: programmatic checks run with 0 model calls and 0 quota', async () => {
  const h = await createWorkerHarness({ AI_WEB: 'off' }); // No DEEPSEEK_API_KEY
  const prevModel = globalThis.__fqaiModelHook;
  let hookCalls = 0;
  globalThis.__fqaiModelHook = async () => { hookCalls++; throw new Error('must not call model'); };
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const sup = extractCookie(setup.headers);
    await seedStudentAndApps(h, sup);

    const statusRes = await h.call('/api/ai/status', { cookie: sup });
    assert.equal(statusRes.status, 200);
    assert.equal(statusRes.data.enabled, false);

    // Default programmatic check even with mode: 'pro' must NOT require key, call model, or take quota
    const res = await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'check', studentId: 'stu-90', applicationId: 'app-90', mode: 'pro', web: false },
    });
    assert.equal(res.status, 200);
    const { result, err } = parseSse(res.text);
    assert.equal(err, null);
    assert.ok(result);
    assert.match(result.title, /检查这位学生/);
    assert.equal(result.model, undefined);
    assert.deepEqual(result.cards, []);
    assert.ok(result.checks.length >= 2, 'should include both audit issues and precheck items');
    assert.ok(result.checks.some(c => c.id), 'should include programmatic issue checks');
    assert.ok(result.checks.some(c => /Juilliard/.test(c.label)), 'should include target application precheck items');
    assert.equal(hookCalls, 0);
    const usageCount = h.db.raw.prepare('SELECT COUNT(*) n FROM fq_ai_usage').get().n;
    assert.equal(usageCount, 0);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});

test('#90 merged entries: check (prog + generate), draft (4 types, no fake parent card), and legacy aliases', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_WEB: 'off' });
  const prevModel = globalThis.__fqaiModelHook;
  const calls = [];
  globalThis.__fqaiModelHook = async (_cfg, body) => {
    const payload = JSON.parse(body.messages[body.messages.length - 1].content);
    calls.push({ fqAction: body.fqAction, sub: payload.sub || '', payload });
    if (body.fqAction === 'check' || body.fqAction === 'audit' || body.fqAction === 'tasks' || body.fqAction === 'precheck') {
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: JSON.stringify({
              summary: '已综合检查，发现重复任务可合并。',
              cards: [
                { kind: 'merge', keep: 't-90-1', drop: 't-90-2', reason: '两个任务重复，合并后关闭后者', evidence: [{ ref: 'task:t-90-1' }, { ref: 'task:t-90-2' }], issue: 'I1' },
              ],
              manual: ['主申请截止日为 2026-12-01，请准备提交'],
              ok: [],
            }),
          },
        }],
        usage: { prompt_tokens: 10, completion_tokens: 10 },
      };
    }
    if (body.fqAction === 'comms') {
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: JSON.stringify({ body: `这是 ${payload.sub} 草稿正文。`, note: '请核对后发送' }),
          },
        }],
        usage: { prompt_tokens: 10, completion_tokens: 10 },
      };
    }
    if (body.fqAction === 'refs') {
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: JSON.stringify({ drafts: [{ id: 'rr-90', body: '张教授您好，请留意推荐信截止日期。' }] }),
          },
        }],
        usage: { prompt_tokens: 10, completion_tokens: 10 },
      };
    }
    return { choices: [{ message: { role: 'assistant', content: '{}' } }], usage: { prompt_tokens: 5, completion_tokens: 5 } };
  };
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const sup = extractCookie(setup.headers);
    await seedStudentAndApps(h, sup);

    // 1. Default check (no generate): 0 model calls, 0 quota, follow has 生成建议卡片 (generate: true, ai: true)
    const progRes = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'check', studentId: 'stu-90', web: false },
    })).text);
    assert.equal(progRes.err, null);
    assert.equal(calls.length, 0);
    assert.equal(progRes.result.cards.length, 0);
    const genChip = progRes.result.follow.find(f => f.label === '生成建议卡片');
    assert.ok(genChip, 'programmatic check with API key should expose 生成建议卡片 follow chip');
    assert.equal(genChip.action, 'check');
    assert.equal(genChip.generate, true);
    assert.equal(genChip.ai, true);
    assert.equal(h.db.raw.prepare('SELECT COUNT(*) n FROM fq_ai_usage').get().n, 0);

    // 2. Check with generate: true (plus pro mode): calls model once, consumes 1 chat + 1 pro quota, returns cards
    const genRes = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'check', studentId: 'stu-90', applicationId: 'app-90', generate: true, mode: 'pro', web: false },
    })).text);
    assert.equal(genRes.err, null);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].fqAction, 'check');
    assert.equal(genRes.result.model, 'pro');
    assert.ok(genRes.result.cards.length >= 1);
    assert.ok(genRes.result.checks.length >= 2);
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE kind = 'chat'").get().n, 1);
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE kind = 'pro'").get().n, 1);

    // 3. Draft sub=parent: no fake '已向家长发送' activity card, switches across all 4 types
    const draftParent = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'draft', studentId: 'stu-90', sub: 'parent' },
    })).text);
    assert.equal(draftParent.err, null);
    assert.equal(draftParent.result.title, '起草 · 家长进度汇报');
    assert.equal(draftParent.result.cards.length, 0);
    assert.ok(!JSON.stringify(draftParent.result).includes('已向家长发送'));
    assert.deepEqual(draftParent.result.follow.map(f => f.sub).sort(), ['exam', 'materials', 'refs']);
    assert.ok(draftParent.result.follow.every(f => f.action === 'draft' && f.ai === true));

    const draftExam = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'draft', studentId: 'stu-90', sub: 'exam' },
    })).text);
    assert.equal(draftExam.result.title, '起草 · 考试 / 面试提醒');
    assert.match(draftExam.result.drafts[0].body, /exam 草稿正文/);

    const draftMats = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'draft', studentId: 'stu-90', sub: 'materials' },
    })).text);
    assert.equal(draftMats.result.title, '起草 · 催交材料');
    assert.match(draftMats.result.drafts[0].body, /materials 草稿正文/);

    const draftRefs = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: sup,
      body: { action: 'draft', studentId: 'stu-90', sub: 'refs' },
    })).text);
    assert.equal(draftRefs.result.title, '起草 · 推荐人提醒');
    assert.match(draftRefs.result.drafts[0].body, /张教授/);
    assert.deepEqual(draftRefs.result.follow.map(f => f.sub).sort(), ['exam', 'materials', 'parent']);

    // 4. Backward compatibility for legacy action keys (including comms parent having no fake activity card)
    for (const [action, sub] of [['audit', ''], ['tasks', ''], ['precheck', ''], ['comms', 'parent'], ['refs', '']]) {
      const legacy = await h.call('/api/ai/run', {
        method: 'POST',
        cookie: sup,
        body: { action, studentId: 'stu-90', applicationId: 'app-90', sub, web: false },
      });
      assert.equal(legacy.status, 200, `${action} should keep working`);
      const parsed = parseSse(legacy.text);
      assert.equal(parsed.err, null, `${action} should not error`);
      assert.ok(parsed.result);
      if (action === 'comms') {
        assert.equal(parsed.result.cards.length, 0);
        assert.ok(!JSON.stringify(parsed.result).includes('已向家长发送'));
      }
    }
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});

test('#90 UI structure: default toolbar consolidated to check/draft/more and Pro scoped to model actions', async () => {
  const clientAi = await readFile(new URL('../../public/apply/app/ai.js', import.meta.url), 'utf8');
  const toolsMatch = clientAi.match(/const TOOLS = \[([\s\S]*?)\];/);
  assert.ok(toolsMatch, 'TOOLS definition present');
  const primaryIds = [...toolsMatch[1].matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
  assert.deepEqual(primaryIds, ['check', 'draft'], 'default primary tools must be check + draft (plus More button)');

  const moreMatch = clientAi.match(/const MORE_TOOLS = \[([\s\S]*?)\];/);
  assert.ok(moreMatch, 'MORE_TOOLS definition present');
  const moreIds = [...moreMatch[1].matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
  assert.ok(moreIds.includes('repertoire') && moreIds.includes('schools'));
  assert.ok(!primaryIds.includes('audit') && !primaryIds.includes('tasks') && !primaryIds.includes('precheck'));
  assert.ok(!primaryIds.includes('comms') && !primaryIds.includes('refs'));

  // Scoped Pro toggle exists only on AI-enabled sections and skips length check
  assert.match(clientAi, /const aiMore = MORE_TOOLS\.filter\(t => t\.model\);/);
  assert.match(clientAi, /const progMore = MORE_TOOLS\.filter\(t => !t\.model\);/);
  assert.match(clientAi, /followList\.some\(f => f\.ai\) \? proChk\(\) : ''/);
  assert.match(clientAi, /const aiEss = ESS\.filter\(x => x\.op !== 'length'\);/);
  assert.match(clientAi, /payload\.generate\s*=\s*true/);
});
