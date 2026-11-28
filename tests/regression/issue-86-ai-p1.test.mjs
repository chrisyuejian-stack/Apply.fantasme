import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

test('#86 P1+P5: chat and audit web search scrub case-insensitive names, nicknames, guardians, formatted phones and omit ori_question', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_WEB: 'on' });
  const prevModel = globalThis.__fqaiModelHook;
  const prevWeb = globalThis.__fqaiWebHook;
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const sup = extractCookie(setup.headers);

    const advUser = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adv.p1', name: '李顾问', role: 'advisor' } });
    assert.equal(advUser.status, 200);
    const adv = extractCookie((await h.call('/api/login', { method: 'POST', body: { username: 'adv.p1', password: advUser.data.password } })).headers);
    assert.equal((await h.call('/api/password', { method: 'POST', cookie: adv, body: { old: advUser.data.password, new: 'AdvisorPass2026!' } })).status, 200);

    const head = {
      exportedAt: '2026-11-27',
      taxonomy: { majors: [{ id: 'violin', zh: '小提琴' }], cats: [{ id: 'audition', zh: '考试' }], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
      schools: [{ id: 'jhu', abbr: 'Peabody', zh: '皮博迪音乐学院', en: 'Peabody Institute Johns Hopkins', country: 'US', city_en: 'Baltimore', web: 'https://peabody.jhu.edu', cycle: 'Fall 2027', offers: { UG: ['violin'] }, deadlines: [{ lv: 'UG', mj: ['violin'], k: ['app'], d: '2026-12-01', p: 'RD' }] }],
    };
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify(head));
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:jhu', JSON.stringify([
      { id: 'jhu-ug-audition', school: 'jhu', country: 'US', level: 'UG', majors: ['violin'], cat: 'audition', prog: 'BM Violin', zh: '需预审录像', src: ['https://peabody.jhu.edu/audition'] },
    ]));

    const student = {
      id: 'stu-p1',
      name: '林测试',
      englishName: 'Alice Wang',
      advisorId: advUser.data.user.id,
      status: 'active',
      level: 'UG',
      majorId: 'violin',
      season: 'Fall 2027',
      profile: {
        nameEn: 'Alice W',
        nickname: 'Ally',
        guardians: [{ name: '林大卫', relation: '父亲' }],
      },
    };
    assert.equal((await h.call('/api/t/students/stu-p1', { method: 'PUT', cookie: sup, body: student })).status, 200);
    assert.equal((await h.call('/api/t/submissions/sub-p1', { method: 'PUT', cookie: sup, body: { id: 'sub-p1', studentId: 'stu-p1', platform: 'school_portal', status: 'in_progress' } })).status, 200);
    assert.equal((await h.call('/api/t/applications/app-p1', { method: 'PUT', cookie: sup, body: { id: 'app-p1', studentId: 'stu-p1', schoolId: 'jhu', program: 'BM Violin', level: 'UG', majorId: 'violin', parts: [{ submissionId: 'sub-p1', label: '主申请', deadline: { date: '2026-12-15' } }] } })).status, 200);

    const searchPayloads = [];
    globalThis.__fqaiWebHook = async (kind, body) => {
      if (kind === 'search') {
        searchPayloads.push(structuredClone(body));
        return { ok: true, data: { results: [{ title: 'Peabody Audition', url: 'https://peabody.jhu.edu/audition', summary: 'Prescreen deadline 2026-12-01' }] } };
      }
      if (kind === 'fetch') {
        return { ok: true, data: { title: 'Peabody Audition', content: 'Pre-screening video recordings for undergraduate violin applicants are due December 1, 2026.' } };
      }
      return { ok: false, status: 404 };
    };

    let chatRound = 0;
    globalThis.__fqaiModelHook = async (_cfg, body) => {
      if (body.fqAction === 'research') {
        if (!searchPayloads.some(p => p.query.includes('2026-2027'))) {
          return {
            choices: [{
              message: {
                role: 'assistant',
                content: '',
                tool_calls: [{
                  id: 'call_res_1',
                  type: 'function',
                  function: {
                    name: 'web_search',
                    arguments: JSON.stringify({
                      query: 'ALICE wang ALLY 林大卫 +86 139-2222-3333 Peabody violin audition 2026-2027',
                      school: 'jhu',
                    }),
                  },
                }],
              },
            }],
            usage: { prompt_tokens: 10, completion_tokens: 10 },
          };
        }
        return {
          choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: '完成', findings: [], gaps: [] }) } }],
          usage: { prompt_tokens: 10, completion_tokens: 10 },
        };
      }
      if (body.fqAction === 'audit') {
        return {
          choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: '体检完成', cards: [], manual: [], ok: [] }) } }],
          usage: { prompt_tokens: 10, completion_tokens: 10 },
        };
      }
      // Chat rounds
      if (chatRound === 0 || chatRound === 2) {
        const tag = chatRound;
        chatRound++;
        return {
          choices: [{
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [{
                id: 'call_web_' + tag,
                type: 'function',
                function: {
                  name: 'web_search',
                  arguments: JSON.stringify({
                    query: 'alice ALLY 林测试 小林 林大卫 138-0000-1111 +86 138 0000 1111 021-62345678 alice@example.com E12345678 Peabody violin 2026-12-01 2027 tag' + tag,
                  }),
                },
              }],
            },
          }],
          usage: { prompt_tokens: 10, completion_tokens: 10 },
        };
      }
      chatRound++;
      return {
        choices: [{ message: { role: 'assistant', content: '已核对，Peabody 小提琴需预审录像。' } }],
        usage: { prompt_tokens: 10, completion_tokens: 10 },
      };
    };

    // 1. Chat WITH studentId selected (sensitive raw question must NEVER leak into ori_question or query)
    const chatSel = await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: adv,
      body: {
        message: '林测试 Alice +86 138 0000 1111 的 Peabody 2027 预审要求',
        studentId: 'stu-p1',
        web: true,
        history: [],
      },
    });
    assert.equal(chatSel.status, 200);
    assert.match(chatSel.text, /Peabody/);
    assert.doesNotMatch(chatSel.text, /"type":"error"/);

    // 2. Chat WITHOUT studentId selected (all visible students must still be blocked!)
    const chatNoSel = await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: adv,
      body: {
        message: '帮我查 alice@example.com 138-0000-1111 林大卫 Peabody 截止',
        web: true,
        history: [],
      },
    });
    assert.equal(chatNoSel.status, 200);
    assert.doesNotMatch(chatNoSel.text, /"type":"error"/, chatNoSel.text);

    // 3. Audit web research path
    const audit = await h.call('/api/ai/run', {
      method: 'POST',
      cookie: adv,
      body: { action: 'audit', studentId: 'stu-p1', web: true },
    });
    assert.equal(audit.status, 200);
    assert.doesNotMatch(audit.text, /"type":"error"/, audit.text);

    assert.equal(searchPayloads.length, 3, JSON.stringify({ searchPayloads, chatNoSel: chatNoSel.text, audit: audit.text }));
    for (const payload of searchPayloads) {
      assert.equal(Object.hasOwn(payload, 'ori_question'), false, 'ori_question must not be sent');
      assert.doesNotMatch(payload.query, /alice|ally|wang|林测试|林大卫|小林|林同学|138|139|0000|1111|2222|3333|62345678|example\.com|E12345678/i);
      assert.match(payload.query, /Peabody/);
      assert.match(payload.query, /violin/i);
    }
    assert.match(searchPayloads[0].query, /2026-12-01/);
    assert.match(searchPayloads[2].query, /2026-2027/);

    // Search cache keys in D1 must also stay scrubbed
    const cachedKeys = h.db.raw.prepare("SELECT url, title FROM fq_ai_page_cache WHERE url LIKE 'search:%'").all();
    assert.equal(cachedKeys.length, 3);
    for (const row of cachedKeys) {
      assert.doesNotMatch(row.url + ' ' + row.title, /alice|ally|林测试|林大卫|138|139|E12345678/i);
    }
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    globalThis.__fqaiWebHook = prevWeb;
    h.db.close();
  }
});

test('#96 (#92 red-team probes): NFKC/spaced/dot/dash/zero-width phones, fullwidth @, split/URL names, open_page PII block, and school-word preservation', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_WEB: 'on' });
  const prevModel = globalThis.__fqaiModelHook;
  const prevWeb = globalThis.__fqaiWebHook;
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const sup = extractCookie(setup.headers);

    const head = {
      exportedAt: '2026-11-27',
      taxonomy: { majors: [{ id: 'violin', zh: '小提琴' }], cats: [{ id: 'audition', zh: '考试' }], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
      schools: [{ id: 'jhu', abbr: 'Peabody', zh: '皮博迪音乐学院', en: 'Peabody Institute Johns Hopkins', country: 'US', city_en: 'Baltimore', web: 'https://peabody.jhu.edu', cycle: 'Fall 2027', offers: { UG: ['violin'] }, deadlines: [] }],
    };
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify(head));
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:jhu', JSON.stringify([
      { id: 'jhu-ug-audition', school: 'jhu', country: 'US', level: 'UG', majors: ['violin'], cat: 'audition', prog: 'BM Violin', zh: '需预审录像', src: ['https://peabody.jhu.edu/audition'] },
    ]));

    // Student with evasive encodings + student whose names collide with school/month/instrument terms
    assert.equal((await h.call('/api/t/students/stu-rt-1', {
      method: 'PUT',
      cookie: sup,
      body: {
        id: 'stu-rt-1',
        name: '林测试',
        englishName: 'Amy Chen',
        status: 'active',
        level: 'UG',
        majorId: 'violin',
        season: 'Fall 2027',
      },
    })).status, 200);

    assert.equal((await h.call('/api/t/students/stu-rt-2', {
      method: 'PUT',
      cookie: sup,
      body: {
        id: 'stu-rt-2',
        name: '小提',
        englishName: 'Peabody',
        status: 'active',
        level: 'UG',
        majorId: 'violin',
        season: 'Fall 2027',
        profile: { nickname: 'Hopkins', preferredName: 'May' },
      },
    })).status, 200);

    const searches = [];
    const fetchedUrls = [];
    globalThis.__fqaiWebHook = async (kind, body) => {
      if (kind === 'search') {
        searches.push(body.query);
        return { ok: true, data: { results: [] } };
      }
      if (kind === 'fetch') {
        fetchedUrls.push(body.url);
        return { ok: true, data: { title: 'Peabody Audition', content: 'Pre-screening deadlines in May 2027 for Peabody violin applicants. '.repeat(4) } };
      }
      return { ok: false, status: 404 };
    };

    const probeQueries = [
      '1 3 8 0 0 0 0 1 1 1 1 １３８００００１１１１ ＋８６　１３８００００１１１１ Peabody 2026-12-01',
      '138－0000－1111 138.0000.1111 138\u200b00001111 secret＠school.edu Hopkins 2026-2027',
      '林 测试 林\u200b测试 %E6%9E%97%E6%B5%8B%E8%AF%95 Amy%20Chen Peabody violin',
      'Peabody Hopkins May violin 小提琴 预审 2027',
    ];
    let step = 0;
    const toolOutputs = [];
    const seenToolIds = new Set();
    globalThis.__fqaiModelHook = async (_cfg, body) => {
      for (const m of body.messages || []) {
        if (m?.role === 'tool' && !seenToolIds.has(m.tool_call_id)) {
          seenToolIds.add(m.tool_call_id);
          toolOutputs.push(m.content);
        }
      }
      if (step < probeQueries.length) {
        const q = probeQueries[step++];
        return {
          choices: [{
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [{ id: `s_${step}`, type: 'function', function: { name: 'web_search', arguments: JSON.stringify({ query: q }) } }],
            },
          }],
        };
      }
      if (step === probeQueries.length) {
        step++;
        return {
          choices: [{
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [
                { id: 'o_pii_1', type: 'function', function: { name: 'open_page', arguments: JSON.stringify({ url: 'https://example.edu/lookup?name=Amy%20Chen&tel=13800001111' }) } },
                { id: 'o_pii_2', type: 'function', function: { name: 'open_page', arguments: JSON.stringify({ url: 'https://example.edu/s/%E6%9E%97%E6%B5%8B%E8%AF%95' }) } },
                { id: 'o_ok', type: 'function', function: { name: 'open_page', arguments: JSON.stringify({ url: 'https://peabody.jhu.edu/audition?term=may-2027' }) } },
              ],
            },
          }],
        };
      }
      return { choices: [{ message: { role: 'assistant', content: '探测完成' } }] };
    };

    const res = await h.call('/api/ai/chat', {
      method: 'POST',
      cookie: sup,
      body: { message: '请查 Peabody 小提琴预审', web: true, history: [] },
    });
    assert.equal(res.status, 200);
    assert.doesNotMatch(res.text, /"type":"error"/, res.text);

    assert.equal(searches.length, 4);
    assert.doesNotMatch(searches[0], /138|0000|1111|86/);
    assert.match(searches[0], /Peabody 2026-12-01/);
    assert.doesNotMatch(searches[1], /138|0000|1111|secret|school\.edu/i);
    assert.match(searches[1], /Hopkins 2026-2027/);
    assert.doesNotMatch(searches[2], /林|测试|Amy|Chen|%E6|%20/i);
    assert.match(searches[2], /Peabody violin/);
    // Item 4: Peabody / Hopkins / May / 小提琴 must NOT be destroyed by stu-rt-2's colliding names
    assert.equal(searches[3], 'Peabody Hopkins May violin 小提琴 预审 2027');

    // Item 3: PII open_page URLs rejected before fetch & page cache; clean school URL succeeds
    assert.deepEqual(fetchedUrls, ['https://peabody.jhu.edu/audition?term=may-2027']);
    const piiToolRejects = toolOutputs.filter(t => t.includes('网址包含学生个人信息，已拒绝打开'));
    assert.equal(piiToolRejects.length, 2);
    const cachedUrls = h.db.raw.prepare('SELECT url FROM fq_ai_page_cache').all().map(r => r.url);
    assert.ok(!cachedUrls.some(u => u.includes('Amy') || u.includes('1380000') || u.includes('%E6')));
    assert.ok(cachedUrls.includes('https://peabody.jhu.edu/audition?term=may-2027'));
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    globalThis.__fqaiWebHook = prevWeb;
    h.db.close();
  }
});
