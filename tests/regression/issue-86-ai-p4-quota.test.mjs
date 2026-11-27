import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

function parseSse(text) {
  return String(text || '')
    .split('\n\n')
    .map(s => s.trim())
    .filter(Boolean)
    .map(chunk => {
      const line = chunk.split('\n').find(l => l.startsWith('data:'));
      return line ? JSON.parse(line.slice(5).trim()) : null;
    })
    .filter(Boolean);
}

function seedReqdb(db) {
  const head = {
    exportedAt: '2026-11-27',
    taxonomy: { majors: [{ id: 'violin', zh: '小提琴' }], cats: [{ id: 'audition', zh: '考试' }], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
    schools: [{ id: 'jhu', abbr: 'Peabody', zh: '皮博迪音乐学院', en: 'Peabody Institute Johns Hopkins', country: 'US', city_en: 'Baltimore', web: 'https://peabody.jhu.edu', cycle: 'Fall 2027', offers: { UG: ['violin'] }, deadlines: [{ lv: 'UG', mj: ['violin'], k: ['app'], d: '2026-12-01', p: 'RD' }] }],
  };
  db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify(head));
  db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:jhu', JSON.stringify([
    { id: 'jhu-ug-audition', school: 'jhu', country: 'US', level: 'UG', majors: ['violin'], cat: 'audition', prog: 'BM Violin', zh: '需预审录像', src: ['https://peabody.jhu.edu/audition'] },
  ]));
}

async function setupUsers(h) {
  const setup = await h.call('/api/setup', {
    method: 'POST',
    body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
  });
  assert.equal(setup.status, 200);
  const supCookie = extractCookie(setup.headers);

  const advRes = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username: 'adv.p4', name: '王顾问', role: 'advisor' } });
  assert.equal(advRes.status, 200);
  const advLogin = await h.call('/api/login', { method: 'POST', body: { username: 'adv.p4', password: advRes.data.password } });
  const advCookie = extractCookie(advLogin.headers);
  assert.equal((await h.call('/api/password', { method: 'POST', cookie: advCookie, body: { old: advRes.data.password, new: 'AdvisorPass2026!' } })).status, 200);
  const supRow = h.db.raw.prepare("SELECT id FROM users WHERE username = 'sup'").get();
  return { supId: supRow.id, supCookie, advId: advRes.data.user.id, advCookie };
}

test('#86 P4+P5: concurrent chat quota enforces exact limit and missing reqdb consumes zero quota', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_DAILY_CHAT: '2', AI_DAILY_PRO: '1', AI_DAILY_GLOBAL: '5', AI_WEB: 'off' });
  const prevModel = globalThis.__fqaiModelHook;
  try {
    const { advId, advCookie } = await setupUsers(h);

    // 1) Missing reqdb:head (503) before taking chat/verify/pro/global quota
    h.db.raw.prepare("DELETE FROM meta WHERE key LIKE 'reqdb:%'").run();
    let hookCalls = 0;
    globalThis.__fqaiModelHook = async () => {
      hookCalls++;
      return { choices: [{ message: { role: 'assistant', content: 'ok' } }], usage: { prompt_tokens: 5, completion_tokens: 3 } };
    };
    const missingChat = parseSse((await h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'hello', mode: 'pro' } })).text);
    assert.ok(missingChat.some(e => e.type === 'error' && e.text.includes('院校库')));
    const missingVerify = parseSse((await h.call('/api/ai/verify', { method: 'POST', cookie: advCookie, body: { id: 'jhu-ug-audition', mode: 'pro' } })).text);
    assert.ok(missingVerify.some(e => e.type === 'error' && e.text.includes('院校库')));
    assert.equal(hookCalls, 0);
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);

    // 2) Concurrent burst of 10 /api/ai/chat requests with AI_DAILY_CHAT=2 -> strictly 2 succeed, 8 get 429
    seedReqdb(h.db);
    const burst = await Promise.all(
      Array.from({ length: 10 }, (_, i) => h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: `问题 ${i}` } })),
    );
    const eventsList = burst.map(r => parseSse(r.text));
    const okCount = eventsList.filter(evs => evs.some(e => e.type === 'answer')).length;
    const errCount = eventsList.filter(evs => evs.some(e => e.type === 'error' && e.text.includes('已达上限（2 次）'))).length;
    assert.equal(okCount, 2);
    assert.equal(errCount, 8);
    assert.equal(hookCalls, 2);
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = ? AND kind = 'chat'").get(advId).n, 2);
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = '__global__' AND kind = 'global'").get().n, 2);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});

test('#86 P4+P5: global daily limit shared across users, status exposes global, and 429 leaves no partial leak', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_DAILY_CHAT: '1', AI_DAILY_PRO: '1', AI_DAILY_GLOBAL: '3', AI_WEB: 'off' });
  const prevModel = globalThis.__fqaiModelHook;
  try {
    const { advCookie } = await setupUsers(h);
    seedReqdb(h.db);

    globalThis.__fqaiModelHook = async () => ({
      choices: [{ message: { role: 'assistant', content: 'ok' } }],
      usage: { prompt_tokens: 5, completion_tokens: 3 },
    });

    // Advisor hits personal AI_DAILY_CHAT=1: 1 succeeds, 2nd fails 429 WITHOUT consuming __global__
    const adv1 = parseSse((await h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'q1' } })).text);
    const adv2 = parseSse((await h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'q2' } })).text);
    assert.ok(adv1.some(e => e.type === 'answer'));
    assert.ok(adv2.some(e => e.type === 'error' && e.text.includes('今日 AI 使用已达上限（1 次）')));
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = '__global__' AND kind = 'global'").get().n, 1);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }

  // Dedicated Pro-limit rollback test (chat=5 > pro=1): hitting Pro limit must roll back chat & not leak global
  const hPro = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_DAILY_CHAT: '5', AI_DAILY_PRO: '1', AI_DAILY_GLOBAL: '3', AI_WEB: 'off' });
  try {
    const { supId, supCookie } = await setupUsers(hPro);
    seedReqdb(hPro.db);
    globalThis.__fqaiModelHook = async () => ({
      choices: [{ message: { role: 'assistant', content: 'pro-ok' } }],
      usage: { prompt_tokens: 5, completion_tokens: 3 },
    });
    const sup1 = parseSse((await hPro.call('/api/ai/chat', { method: 'POST', cookie: supCookie, body: { message: 's1', mode: 'pro' } })).text);
    assert.ok(sup1.some(e => e.type === 'answer'));
    const supProFail = parseSse((await hPro.call('/api/ai/chat', { method: 'POST', cookie: supCookie, body: { message: 's-pro-fail', mode: 'pro' } })).text);
    assert.ok(supProFail.some(e => e.type === 'error' && e.text.includes('Pro 模型已达上限')));
    assert.equal(hPro.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = ? AND kind = 'chat'").get(supId).n, 1);
    assert.equal(hPro.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = '__global__' AND kind = 'global'").get().n, 1);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    hPro.db.close();
  }

  // Dedicated concurrent multi-user global limit test (AI_DAILY_CHAT=5, AI_DAILY_GLOBAL=3)
  const h2 = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_DAILY_CHAT: '5', AI_DAILY_GLOBAL: '3', AI_WEB: 'off' });
  try {
    const { supCookie, advCookie } = await setupUsers(h2);
    seedReqdb(h2.db);
    let calls = 0;
    globalThis.__fqaiModelHook = async () => {
      calls++;
      return { choices: [{ message: { role: 'assistant', content: 'global-ok' } }], usage: { prompt_tokens: 4, completion_tokens: 2 } };
    };
    const mixed = await Promise.all([
      h2.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'a1' } }),
      h2.call('/api/ai/chat', { method: 'POST', cookie: supCookie, body: { message: 's1' } }),
      h2.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'a2' } }),
      h2.call('/api/ai/chat', { method: 'POST', cookie: supCookie, body: { message: 's2' } }),
      h2.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'a3' } }),
      h2.call('/api/ai/chat', { method: 'POST', cookie: supCookie, body: { message: 's3' } }),
    ]);
    const parsed = mixed.map(r => parseSse(r.text));
    assert.equal(parsed.filter(evs => evs.some(e => e.type === 'answer')).length, 3);
    assert.equal(parsed.filter(evs => evs.some(e => e.type === 'error' && e.text.includes('团队 AI 总调用已达上限（3 次）'))).length, 3);
    assert.equal(calls, 3);

    const status = await h2.call('/api/ai/status', { cookie: advCookie });
    assert.equal(status.status, 200);
    assert.equal(status.data.usage.global, 3);
    assert.equal(status.data.usage.globalLimit, 3);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h2.db.close();
  }
});

test('#86 P4+P5: per-run bounds enforce maxChatRounds, maxRunModelCalls, and maxModelChars', async () => {
  const h = await createWorkerHarness({
    DEEPSEEK_API_KEY: 'synthetic-offline-hook-key',
    AI_WEB: 'on',
    AI_MAX_CHAT_ROUNDS: '2',
    AI_MAX_RUN_CALLS: '2',
    AI_MAX_MODEL_CHARS: '4000',
  });
  const prevModel = globalThis.__fqaiModelHook;
  const prevWeb = globalThis.__fqaiWebHook;
  try {
    const { supCookie, advId, advCookie } = await setupUsers(h);
    seedReqdb(h.db);

    assert.equal((await h.call('/api/t/students/stu-p4', {
      method: 'PUT',
      cookie: supCookie,
      body: { id: 'stu-p4', name: '张测试', advisorId: advId, status: 'active', level: 'UG', majorId: 'violin', season: 'Fall 2027' },
    })).status, 200);
    assert.equal((await h.call('/api/t/submissions/sub-p4', {
      method: 'PUT',
      cookie: supCookie,
      body: { id: 'sub-p4', studentId: 'stu-p4', platform: 'school_portal', status: 'in_progress' },
    })).status, 200);
    assert.equal((await h.call('/api/t/applications/app-p4', {
      method: 'PUT',
      cookie: supCookie,
      body: { id: 'app-p4', studentId: 'stu-p4', schoolId: 'jhu', program: 'BM Violin', level: 'UG', majorId: 'violin', parts: [{ submissionId: 'sub-p4', label: '主申请', deadline: { date: '2026-12-15' } }] },
    })).status, 200);

    // 1) AI_MAX_CHAT_ROUNDS=2 stops infinite tool loop cleanly
    let chatModelCalls = 0;
    const seenToolFlags = [];
    globalThis.__fqaiModelHook = async (_cfg, body) => {
      chatModelCalls++;
      seenToolFlags.push(Array.isArray(body.tools) && body.tools.length > 0);
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: '',
            tool_calls: [{ id: `c_${chatModelCalls}`, type: 'function', function: { name: 'find_schools', arguments: '{"major":"violin"}' } }],
          },
        }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      };
    };
    const loopedChat = parseSse((await h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: 'loop test', web: false } })).text);
    assert.equal(chatModelCalls, 2);
    assert.deepEqual(seenToolFlags, [true, false]);
    assert.ok(loopedChat.some(e => e.type === 'answer'));

    // 2) AI_MAX_RUN_CALLS=2 stops multi-call /api/ai/run (research loop + final audit) at 2 calls
    globalThis.__fqaiWebHook = async (kind) => {
      if (kind === 'search') return { ok: true, data: { results: [{ title: 'Peabody', url: 'https://peabody.jhu.edu/audition', summary: 'audition' }] } };
      if (kind === 'fetch') return { ok: true, data: { title: 'Peabody', content: 'Prescreen recordings due December 1.' } };
      return { ok: false, status: 404 };
    };
    let runModelCalls = 0;
    globalThis.__fqaiModelHook = async (_cfg, body) => {
      runModelCalls++;
      if (body.fqAction === 'research') {
        if (runModelCalls === 1) {
          return {
            choices: [{
              message: {
                role: 'assistant',
                content: '',
                tool_calls: [{ id: 'w1', type: 'function', function: { name: 'web_search', arguments: '{"query":"Peabody violin 2027","school":"jhu"}' } }],
              },
            }],
            usage: { prompt_tokens: 10, completion_tokens: 5 },
          };
        }
        return { choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: 'done', findings: [], gaps: [] }) } }], usage: { prompt_tokens: 10, completion_tokens: 5 } };
      }
      return { choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: 'ok', cards: [], manual: [] }) } }], usage: { prompt_tokens: 10, completion_tokens: 5 } };
    };
    const cappedRun = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: advCookie,
      body: { action: 'precheck', studentId: 'stu-p4', web: true },
    })).text);
    assert.equal(runModelCalls, 2);
    assert.ok(cappedRun.some(e => e.type === 'error' && e.text.includes('单次任务的 AI 调用已达上限（2 次）')));

    // 3) AI_MAX_MODEL_CHARS=4000 rejects oversized payload without invoking __fqaiModelHook
    let hookInvokedForOversized = false;
    globalThis.__fqaiModelHook = async () => {
      hookInvokedForOversized = true;
      return { choices: [{ message: { role: 'assistant', content: 'should not run' } }] };
    };
    const hugeHistory = [
      { role: 'user', content: 'x'.repeat(2400) },
      { role: 'assistant', content: 'y'.repeat(2400) },
    ];
    const usageBeforeOversized = h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total;
    const oversized = parseSse((await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: advCookie,
      body: { message: '请继续', history: hugeHistory, web: false },
    })).text);
    assert.equal(hookInvokedForOversized, false);
    assert.ok(oversized.some(e => e.type === 'error' && e.text.includes('内容过长')));
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, usageBeforeOversized);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    globalThis.__fqaiWebHook = prevWeb;
    h.db.close();
  }
});

test('#96 (#94 red-team probes): maxModelChars 400 leaves fq_ai_usage=0, upstream failures refund chat/pro/essay/global/web, and __global__ user id rejected', async () => {
  const h = await createWorkerHarness({
    DEEPSEEK_API_KEY: 'synthetic-offline-hook-key',
    AI_WEB: 'on',
    AI_DAILY_CHAT: '5',
    AI_DAILY_ESSAY: '5',
    AI_DAILY_WEB: '5',
    AI_DAILY_PRO: '5',
    AI_DAILY_GLOBAL: '5',
    AI_MAX_MODEL_CHARS: '4000',
  });
  const prevModel = globalThis.__fqaiModelHook;
  const prevWeb = globalThis.__fqaiWebHook;
  try {
    const { supCookie, advId, advCookie } = await setupUsers(h);
    seedReqdb(h.db);

    // 1) Reserved user id '__global__' cannot be created via /api/users
    const reserved = await h.call('/api/users', {
      method: 'POST',
      cookie: supCookie,
      body: { id: '__global__', username: 'fake.global', name: '伪装', role: 'advisor' },
    });
    assert.equal(reserved.status, 400);

    // 2) Oversized chat (pro) hits 400 BEFORE fqaiTakeQuota -> 0 rows/sum in fq_ai_usage
    let called = 0;
    globalThis.__fqaiModelHook = async () => {
      called++;
      throw new Error('upstream model down');
    };
    const huge = [
      { role: 'user', content: 'z'.repeat(2400) },
      { role: 'assistant', content: 'y'.repeat(2400) },
    ];
    for (let i = 0; i < 6; i++) {
      const evs = parseSse((await h.call('/api/ai/chat', {
        method: 'POST',
        cookie: advCookie,
        body: { message: 'hi', mode: 'pro', history: huge, web: false },
      })).text);
      assert.ok(evs.some(e => e.type === 'error' && e.text.includes('内容过长')));
    }
    assert.equal(called, 0);
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);

    // 3) Upstream model failure refunds chat/pro/global on chat, run, and essay
    const failChat = parseSse((await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: advCookie,
      body: { message: 'normal', mode: 'pro', web: false },
    })).text);
    assert.ok(failChat.some(e => e.type === 'error'));
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);

    assert.equal((await h.call('/api/t/students/stu-rf', {
      method: 'PUT',
      cookie: supCookie,
      body: { id: 'stu-rf', name: '李退款', advisorId: advId, status: 'active', level: 'UG', majorId: 'violin', season: 'Fall 2027' },
    })).status, 200);
    assert.equal((await h.call('/api/t/documents/doc-rf', {
      method: 'PUT',
      cookie: supCookie,
      body: { id: 'doc-rf', studentId: 'stu-rf', title: 'PS', type: 'ps' },
    })).status, 200);

    const failRun = parseSse((await h.call('/api/ai/run', {
      method: 'POST',
      cookie: advCookie,
      body: { action: 'audit', studentId: 'stu-rf', mode: 'pro', web: false },
    })).text);
    assert.ok(failRun.some(e => e.type === 'error'));
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);

    const failEssay = await h.call('/api/ai/essay', {
      method: 'POST',
      cookie: advCookie,
      body: { op: 'grammar', docId: 'doc-rf', mode: 'pro', text: 'I plays violin well.' },
    });
    assert.equal(failEssay.status, 500);
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);

    // 4) Upstream web_search failure (!ok) refunds web quota
    let chatTurn = 0;
    globalThis.__fqaiWebHook = async () => ({ ok: false, status: 502 });
    globalThis.__fqaiModelHook = async () => {
      if (chatTurn++ === 0) {
        return {
          choices: [{
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [{ id: 'wfail', type: 'function', function: { name: 'web_search', arguments: '{"query":"Peabody violin deadline"}' } }],
            },
          }],
        };
      }
      return { choices: [{ message: { role: 'assistant', content: '搜索失败，已降级回答' } }] };
    };
    const webFailChat = parseSse((await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: advCookie,
      body: { message: '查 Peabody 截止', web: true },
    })).text);
    assert.ok(webFailChat.some(e => e.type === 'answer'));
    // Chat succeeded (chat=1, global=1), while failed web_search was refunded (web=0)
    assert.equal(h.db.raw.prepare("SELECT n FROM fq_ai_usage WHERE user_id = ? AND kind = 'chat'").get(advId).n, 1);
    assert.equal(h.db.raw.prepare("SELECT COALESCE(n, 0) AS n FROM fq_ai_usage WHERE user_id = ? AND kind = 'web'").get(advId)?.n || 0, 0);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    globalThis.__fqaiWebHook = prevWeb;
    h.db.close();
  }
});
