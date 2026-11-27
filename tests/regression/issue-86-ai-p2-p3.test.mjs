import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

test('#86 P2+P3+P5: context minimization, staff/guardian exclusion, log digest, retention cleanup and footer copy', async () => {
  const h = await createWorkerHarness({
    DEEPSEEK_API_KEY: 'synthetic-offline-hook-key',
    AI_WEB: 'off',
    AI_LOG_RETENTION_DAYS: '90',
    AI_CACHE_RETENTION_DAYS: '7',
  });
  const prevModel = globalThis.__fqaiModelHook;
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const sup = extractCookie(setup.headers);

    const adv1 = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adv.rel', name: '负责顾问', role: 'advisor' } });
    const adv2 = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adv.unrel', name: '无关同事', role: 'advisor' } });
    const advCookie = extractCookie((await h.call('/api/login', { method: 'POST', body: { username: 'adv.rel', password: adv1.data.password } })).headers);
    assert.equal((await h.call('/api/password', { method: 'POST', cookie: advCookie, body: { old: adv1.data.password, new: 'AdvisorPass2026!' } })).status, 200);

    const head = {
      exportedAt: '2026-11-27',
      taxonomy: { majors: [{ id: 'piano', zh: '钢琴' }], cats: [{ id: 'audition', zh: '考试' }], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
      schools: [
        { id: 's-keep', abbr: 'KeepSch', zh: '保留校', en: 'Keep School', country: 'US', offers: { UG: ['piano'] }, deadlines: [] },
        { id: 's-drop', abbr: 'DropSch', zh: '撤回校', en: 'Drop School', country: 'US', offers: { UG: ['piano'] }, deadlines: [] },
      ],
    };
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify(head));
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:s-keep', JSON.stringify([
      { id: 'keep-ug-audition', school: 's-keep', country: 'US', level: 'UG', majors: ['piano'], cat: 'audition', prog: 'BM Piano', zh: '保留校要求' },
    ]));
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:school:s-drop', JSON.stringify([
      { id: 'drop-ug-audition', school: 's-drop', country: 'US', level: 'UG', majors: ['piano'], cat: 'audition', prog: 'BM Piano', zh: '已撤回校要求不应外发' },
    ]));

    // Seed expired & fresh cache/log rows BEFORE first AI HTTP call triggers lazy prune
    const now = Date.now();
    await h.call('/api/ai/status', { cookie: advCookie });
    h.db.raw.prepare('INSERT INTO fq_ai_log (at, user_id, kind, question, tools, tokens_in, tokens_out, ms, ok, detail) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(new Date(now - 95 * 86400e3).toISOString(), adv1.data.user.id, 'chat', 'expired raw log', '[]', 0, 0, 1, 1, '');
    h.db.raw.prepare('INSERT INTO fq_ai_log (at, user_id, kind, question, tools, tokens_in, tokens_out, ms, ok, detail) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(new Date(now - 10 * 86400e3).toISOString(), adv1.data.user.id, 'chat', 'len=5 sha256=1234567890abcdef', '[]', 0, 0, 1, 1, '');
    h.db.raw.prepare('INSERT INTO fq_ai_page_cache (url, fetched_at, status, title, text) VALUES (?,?,?,?,?)')
      .run('search:expired', now - 9 * 86400e3, 200, 'old', '[]');
    h.db.raw.prepare('INSERT INTO fq_ai_page_cache (url, fetched_at, status, title, text) VALUES (?,?,?,?,?)')
      .run('https://example.edu/fresh', now - 2 * 86400e3, 200, 'fresh', 'Fresh official text');

    assert.equal((await h.call('/api/t/students/stu-p2', {
      method: 'PUT',
      cookie: sup,
      body: {
        id: 'stu-p2',
        name: '王同学甲',
        englishName: 'Bob Lin',
        advisorId: adv1.data.user.id,
        status: 'active',
        level: 'UG',
        majorId: 'piano',
        profile: {
          testNote: '联系 138-0000-1111 bob@test.edu',
          activities: [{ period: '2025', name: 'Music Camp', role: 'Pianist' }],
          guardians: [{ name: '王家长甲', relation: '母亲' }],
        },
      },
    })).status, 200);

    assert.equal((await h.call('/api/t/applications/app-keep', {
      method: 'PUT', cookie: sup,
      body: { id: 'app-keep', studentId: 'stu-p2', schoolId: 's-keep', program: 'BM', level: 'UG', majorId: 'piano', parts: [] },
    })).status, 200);
    assert.equal((await h.call('/api/t/applications/app-drop', {
      method: 'PUT', cookie: sup,
      body: { id: 'app-drop', studentId: 'stu-p2', schoolId: 's-drop', program: 'BM', level: 'UG', majorId: 'piano', withdrawn: true, parts: [] },
    })).status, 200);

    for (let idx = 0; idx < 10; idx++) {
      assert.equal((await h.call('/api/t/activity/act-' + idx, {
        method: 'PUT', cookie: sup,
        body: { id: 'act-' + idx, studentId: 'stu-p2', at: `2026-11-${String(10 + idx).padStart(2, '0')}T00:00:00Z`, text: `动态${idx} ` + '超长内容'.repeat(40) },
      })).status, 200);
    }
    assert.equal((await h.call('/api/t/repertoire/rep-1', {
      method: 'PUT', cookie: sup,
      body: { id: 'rep-1', studentId: 'stu-p2', composer: 'Chopin', title: 'Ballade No.1', duration: '9m' },
    })).status, 200);

    const captured = {};
    globalThis.__fqaiModelHook = async (_cfg, body) => {
      const payload = JSON.parse(body.messages[body.messages.length - 1].content);
      if (body.fqAction) captured[body.fqAction] = payload;
      if (body.fqAction === 'comms') {
        captured['comms:' + payload.sub] = payload;
        return { choices: [{ message: { role: 'assistant', content: JSON.stringify({ body: '草稿内容', note: '' }) } }], usage: { prompt_tokens: 5, completion_tokens: 5 } };
      }
      if (body.fqAction === 'repertoire') {
        return { choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: '曲目正常', table: '', cards: [], manual: [] }) } }], usage: { prompt_tokens: 5, completion_tokens: 5 } };
      }
      if (body.fqAction === 'audit' || body.fqAction === 'paste') {
        return { choices: [{ message: { role: 'assistant', content: JSON.stringify({ summary: '完成', cards: [], manual: [], ok: [] }) } }], usage: { prompt_tokens: 5, completion_tokens: 5 } };
      }
      return { choices: [{ message: { role: 'assistant', content: '已收到。' } }], usage: { prompt_tokens: 5, completion_tokens: 5 } };
    };

    // 1. Audit context minimization
    assert.equal((await h.call('/api/ai/run', { method: 'POST', cookie: advCookie, body: { action: 'audit', studentId: 'stu-p2', web: false } })).status, 200);
    const auditData = captured.audit.data;
    assert.equal(auditData.student.guardians, undefined);
    assert.doesNotMatch(auditData.student.testNote, /138-0000-1111|bob@test\.edu/);
    assert.deepEqual(auditData.staff.map(u => u.id), [adv1.data.user.id]);
    assert.ok(!auditData.staff.some(u => u.id === adv2.data.user.id));
    assert.equal(auditData.recentActivity.length, 6);
    assert.ok(auditData.recentActivity.every(x => x.text.length <= 125));
    assert.ok(auditData.schoolRecords.some(r => r.id === 'keep-ug-audition'));
    assert.ok(!auditData.schoolRecords.some(r => r.id === 'drop-ug-audition'));

    // 2. Repertoire context minimization
    assert.equal((await h.call('/api/ai/run', { method: 'POST', cookie: advCookie, body: { action: 'repertoire', studentId: 'stu-p2' } })).status, 200);
    const repData = captured.repertoire.data;
    assert.equal(repData.student.activities, undefined);
    assert.equal(repData.recentActivity, undefined);
    assert.equal(repData.references, undefined);

    // 3. Comms sub=exam omits guardian; sub=parent includes guardian
    assert.equal((await h.call('/api/ai/run', { method: 'POST', cookie: advCookie, body: { action: 'comms', studentId: 'stu-p2', sub: 'exam' } })).status, 200);
    assert.equal(captured['comms:exam'].facts.guardian, null);
    assert.equal((await h.call('/api/ai/run', { method: 'POST', cookie: advCookie, body: { action: 'comms', studentId: 'stu-p2', sub: 'parent' } })).status, 200);
    assert.equal(captured['comms:parent'].facts.guardian.name, '王家长甲');

    // 4. Paste text truncation <= 4000 and PII scrubbed
    const longPaste = '王家长甲 邮箱 test@school.edu 电话 139-1111-2222 通知：' + 'X'.repeat(5000);
    assert.equal((await h.call('/api/ai/run', { method: 'POST', cookie: advCookie, body: { action: 'paste', studentId: 'stu-p2', text: longPaste } })).status, 200);
    assert.ok(captured.paste.pasted.length <= 4000);
    assert.doesNotMatch(captured.paste.pasted, /test@school\.edu|139-1111-2222|王家长甲/);

    // 5. Chat logs store length + sha256 digest only (never raw message)
    const secretQuestion = '王同学甲 身份证 E99887766 刚才发的邮件原话是什么';
    assert.equal((await h.call('/api/ai/chat', { method: 'POST', cookie: advCookie, body: { message: secretQuestion, web: false } })).status, 200);
    const chatLogs = h.db.raw.prepare("SELECT question FROM fq_ai_log WHERE kind = 'chat' ORDER BY id DESC").all();
    assert.ok(chatLogs.some(r => /^len=\d+ sha256=[a-f0-9]{16}$/.test(r.question)));
    assert.ok(!chatLogs.some(r => r.question.includes('E99887766') || r.question.includes('原话是什么')));

    // 6. Verify fqaiPrune deleted >90d logs and >7d caches when fresh DB instance runs fqaiRoute
    const h2 = await createWorkerHarness({ AI_LOG_RETENTION_DAYS: '90', AI_CACHE_RETENTION_DAYS: '7' });
    try {
      await h2.call('/api/setup', { method: 'POST', body: { setupKey: h2.env.APPLY_SETUP_KEY, name: 'S', username: 'sup', password: 'Supervisor2026', demo: false } });
      const cookie2 = extractCookie((await h2.call('/api/login', { method: 'POST', body: { username: 'sup', password: 'Supervisor2026' } })).headers);
      // Create fq_ai_* tables first via status? No, /api/ai/status runs fqaiPrune on first hit so insert after 1st status?
      // Wait: fqaiPrunedAt throttles per db instance, so test on second MemoryD1 with pre-seeded tables and rows BEFORE /api/ai/status!
      h2.db.raw.exec(`
        CREATE TABLE IF NOT EXISTS fq_ai_log (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, user_id TEXT, kind TEXT, question TEXT, tools TEXT, tokens_in INTEGER, tokens_out INTEGER, ms INTEGER, ok INTEGER, detail TEXT);
        CREATE TABLE IF NOT EXISTS fq_ai_page_cache (url TEXT PRIMARY KEY, fetched_at INTEGER NOT NULL, status INTEGER, title TEXT, text TEXT);
      `);
      h2.db.raw.prepare('INSERT INTO fq_ai_log (at, user_id, kind, question, tools, tokens_in, tokens_out, ms, ok, detail) VALUES (?,?,?,?,?,?,?,?,?,?)')
        .run(new Date(now - 95 * 86400e3).toISOString(), 'u1', 'chat', 'old', '[]', 0, 0, 1, 1, '');
      h2.db.raw.prepare('INSERT INTO fq_ai_log (at, user_id, kind, question, tools, tokens_in, tokens_out, ms, ok, detail) VALUES (?,?,?,?,?,?,?,?,?,?)')
        .run(new Date(now - 5 * 86400e3).toISOString(), 'u1', 'chat', 'len=3 sha256=aaaaaaaaaaaaaaaa', '[]', 0, 0, 1, 1, '');
      h2.db.raw.prepare('INSERT INTO fq_ai_page_cache (url, fetched_at, status, title, text) VALUES (?,?,?,?,?)')
        .run('search:old', now - 9 * 86400e3, 200, 'old', '[]');
      h2.db.raw.prepare('INSERT INTO fq_ai_page_cache (url, fetched_at, status, title, text) VALUES (?,?,?,?,?)')
        .run('https://example.edu/fresh', now - 2 * 86400e3, 200, 'fresh', 'ok');

      assert.equal((await h2.call('/api/ai/status', { cookie: cookie2 })).status, 200);
      const logs = h2.db.raw.prepare('SELECT question FROM fq_ai_log').all().map(x => x.question);
      const caches = h2.db.raw.prepare('SELECT url FROM fq_ai_page_cache').all().map(x => x.url);
      assert.deepEqual(logs, ['len=3 sha256=aaaaaaaaaaaaaaaa']);
      assert.deepEqual(caches, ['https://example.edu/fresh']);
    } finally {
      h2.db.close();
    }

    // 7. Footer copy accurately reflects excluded/exported scope
    const clientAi = await readFile(new URL('../../public/apply/app/ai.js', import.meta.url), 'utf8');
    assert.match(clientAi, /已去除监护人、证件号、手机号、邮箱、住址与生日；联网检索不含姓名/);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});
