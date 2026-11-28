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
  return [...events].reverse().find(e => e.type === 'result')?.result || null;
}

test('#91 survival report: role gates (non-supervisor 403), feedback validation, zero-PII response, and legacy table auto-alter', async () => {
  // Pre-seed legacy fq_ai_feedback BEFORE any /api/ai/* hits to verify ALTER TABLE preserves rows
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_WEB: 'off' });
  try {
    h.db.raw.exec(`
      CREATE TABLE fq_ai_feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        at TEXT NOT NULL,
        user_id TEXT,
        student_id TEXT,
        key TEXT,
        kind TEXT,
        decision TEXT
      );
      INSERT INTO fq_ai_feedback (at, user_id, student_id, key, kind, decision)
      VALUES ('${new Date(Date.now() - 2 * 86400e3).toISOString()}', 'u-old', 'stu-legacy', 'k-old', 'add', 'ignore');
    `);

    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管九一', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const supCookie = extractCookie(setup.headers);

    const advA = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username: 'adv.91a', name: '顾问甲', role: 'advisor' } });
    const advB = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username: 'adv.91b', name: '顾问乙', role: 'advisor' } });
    const wrt = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username: 'wrt.91', name: '文书老师', role: 'writer' } });

    const loginCookie = async (username, password) => {
      const r = await h.call('/api/login', { method: 'POST', body: { username, password } });
      const ck = extractCookie(r.headers);
      assert.equal((await h.call('/api/password', { method: 'POST', cookie: ck, body: { old: password, new: 'StrongPass2026!' } })).status, 200);
      return ck;
    };
    const advACookie = await loginCookie('adv.91a', advA.data.password);
    const advBCookie = await loginCookie('adv.91b', advB.data.password);
    const wrtCookie = await loginCookie('wrt.91', wrt.data.password);

    assert.equal((await h.call('/api/t/students/stu-91-a', {
      method: 'PUT', cookie: supCookie,
      body: { id: 'stu-91-a', name: '隐私学生张三丰', status: 'active', level: 'UG', majorId: 'piano', advisorId: advA.data.user.id },
    })).status, 200);
    assert.equal((await h.call('/api/t/students/stu-91-b', {
      method: 'PUT', cookie: supCookie,
      body: { id: 'stu-91-b', name: '隐私学生李四光', status: 'active', level: 'UG', majorId: 'piano', advisorId: advB.data.user.id },
    })).status, 200);

    // 1. Role gates on GET /api/ai/survival
    assert.equal((await h.call('/api/ai/survival')).status, 401);
    assert.equal((await h.call('/api/ai/survival', { cookie: wrtCookie })).status, 403);
    assert.equal((await h.call('/api/ai/survival', { cookie: advACookie })).status, 403);
    const supSurv = await h.call('/api/ai/survival', { cookie: supCookie });
    assert.equal(supSurv.status, 200);

    // Legacy row preserved + zero student_id / student names leaked
    const legacyText = JSON.stringify(supSurv.data);
    assert.ok(!legacyText.includes('student_id'));
    assert.ok(!legacyText.includes('studentId'));
    assert.ok(!legacyText.includes('stu-legacy'));
    assert.ok(!legacyText.includes('stu-91-'));
    assert.ok(!legacyText.includes('隐私学生张三丰'));
    assert.ok(supSurv.data.rows.some(r => r.action === 'legacy' && r.kind === 'add' && r.ignored === 1));

    // 2. Feedback write permission & enum validation
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: wrtCookie,
      body: { studentId: 'stu-91-a', key: 'k1', kind: 'add', decision: 'ignore' },
    })).status, 403);
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-b', key: 'k1', kind: 'add', decision: 'ignore' },
    })).status, 403);
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k1', kind: 'invalid_kind', decision: 'ignore' },
    })).status, 400);
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k1', kind: 'add', decision: 'ignore', reason: 'free_text_injection' },
    })).status, 400);
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k1', kind: 'add', decision: 'adopt', reason: 'duplicate' },
    })).status, 400);
    // Client cannot spoof decision='show' (only server fqaiRunAction records 'show')
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k-spoof-show', kind: 'add', decision: 'show' },
    })).status, 400);

    // Clicking ignore then attaching optional reason within 10m updates in place (no duplicate ignore count)
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k-upd-reason', action: 'check', kind: 'update', decision: 'ignore' },
    })).status, 200);
    assert.equal((await h.call('/api/ai/feedback', {
      method: 'POST', cookie: advACookie,
      body: { studentId: 'stu-91-a', key: 'k-upd-reason', action: 'check', kind: 'update', decision: 'ignore', reason: 'handled' },
    })).status, 200);

    const afterReason = await h.call('/api/ai/survival', { cookie: supCookie });
    const updRow = afterReason.data.rows.find(r => r.action === 'check' && r.kind === 'update');
    assert.equal(updRow.ignored, 1);
    assert.equal(updRow.ignoreReasons.handled, 1);
    assert.equal(updRow.ignoreReasons.unspecified, 0);

    // 3. Feedback retention pruning (365d overall, 180d for 'show' rows)
    const h2 = await createWorkerHarness({ AI_FEEDBACK_RETENTION_DAYS: '365', AI_FEEDBACK_SHOW_RETENTION_DAYS: '180' });
    try {
      await h2.call('/api/setup', { method: 'POST', body: { setupKey: h2.env.APPLY_SETUP_KEY, name: 'S', username: 'sup2', password: 'Supervisor2026', demo: false } });
      const ck2 = extractCookie((await h2.call('/api/login', { method: 'POST', body: { username: 'sup2', password: 'Supervisor2026' } })).headers);
      const nowMs = Date.now();
      h2.db.raw.exec(`
        CREATE TABLE IF NOT EXISTS fq_ai_feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, user_id TEXT, student_id TEXT, key TEXT, kind TEXT, decision TEXT, action TEXT NOT NULL DEFAULT '', reason TEXT NOT NULL DEFAULT '', risk INTEGER NOT NULL DEFAULT 0, target_id TEXT NOT NULL DEFAULT '');
      `);
      const ins = (days, key, decision) => h2.db.raw.prepare('INSERT INTO fq_ai_feedback (at, user_id, student_id, key, kind, decision) VALUES (?,?,?,?,?,?)').run(new Date(nowMs - days * 86400e3).toISOString(), 'u1', 's1', key, 'add', decision);
      ins(400, 'old-adopt-pruned', 'adopt');
      ins(200, 'old-show-pruned', 'show');
      ins(200, 'mid-adopt-kept', 'adopt');
      ins(10, 'fresh-show-kept', 'show');
      assert.equal((await h2.call('/api/ai/status', { cookie: ck2 })).status, 200);
      const keysLeft = h2.db.raw.prepare('SELECT key FROM fq_ai_feedback ORDER BY id').all().map(x => x.key);
      assert.deepEqual(keysLeft, ['mid-adopt-kept', 'fresh-show-kept']);
    } finally {
      h2.db.close();
    }
  } finally {
    h.db.close();
  }
});

test('#91 survival metric math: 7d survival, 48h na guardrail, risk/delete alwaysOpen, and ignore cannot hide delete/risk cards', async () => {
  const h = await createWorkerHarness({ DEEPSEEK_API_KEY: 'synthetic-offline-hook-key', AI_WEB: 'off' });
  const prevModel = globalThis.__fqaiModelHook;
  try {
    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    const supCookie = extractCookie(setup.headers);

    assert.equal((await h.call('/api/t/students/stu-91m', {
      method: 'PUT', cookie: supCookie,
      body: { id: 'stu-91m', name: '林同学度量', status: 'active', level: 'UG', majorId: 'piano' },
    })).status, 200);
    h.db.raw.prepare('INSERT OR REPLACE INTO meta(key, value) VALUES(?, ?)').run('reqdb:head', JSON.stringify({
      exportedAt: '2026-11-27',
      taxonomy: { majors: [{ id: 'piano', zh: '钢琴' }], cats: [], levels: [{ id: 'UG', zh: '本科' }], stages: [] },
      schools: [],
    }));

    // Seed tasks for metrics & delete/risk cards
    const now = Date.now();
    const isoAgo = days => new Date(now - days * 86400e3).toISOString();
    const putTask = async (id, status, updatedAt, extra = {}) => {
      assert.equal((await h.call('/api/t/tasks/' + id, {
        method: 'PUT', cookie: supCookie,
        body: Object.assign({ id, studentId: 'stu-91m', title: '任务 ' + id, category: 'materials', status, dueDate: '2026-12-10', updatedAt }, extra),
      })).status, 200);
      // Force exact updatedAt in stored JSON row for deterministic 48h guardrail testing
      const row = h.db.raw.prepare('SELECT data FROM records WHERE tbl = ? AND id = ?').get('tasks', id);
      const parsed = JSON.parse(row.data);
      parsed.updatedAt = updatedAt;
      if (extra.ai) parsed.ai = extra.ai;
      h.db.raw.prepare('UPDATE records SET data = ? WHERE tbl = ? AND id = ?').run(JSON.stringify(parsed), 'tasks', id);
    };

    await putTask('t-done-1', 'done', isoAgo(1));      // c1: adopted 10d ago -> survived7d
    await putTask('t-na-fast', 'na', new Date(now - 8 * 86400e3 + 10 * 3600e3).toISOString()); // c3: na within 10h (<=48h)
    await putTask('t-na-slow', 'na', new Date(now - 12 * 86400e3 + 5 * 86400e3).toISOString()); // c4: na after 5d (>48h)
    await putTask('t-recent', 'todo', isoAgo(2));     // c5: adopted 2d ago (<7d)
    await putTask('t-del-keep', 'todo', isoAgo(1), { ai: { kind: 'add', key: 'seed-del' } });   // used for delete card anti-suppression test
    await putTask('t-norm-keep', 'todo', isoAgo(1));  // used for normal close/add suppression test

    // Hit /api/ai/status once so fq_ai_feedback tables exist before seeding historical timestamps
    assert.equal((await h.call('/api/ai/status', { cookie: supCookie })).status, 200);

    const insFb = (at, action, kind, key, decision, { reason = '', risk = 0, targetId = '' } = {}) => {
      h.db.raw.prepare('INSERT INTO fq_ai_feedback (at, user_id, student_id, action, kind, key, decision, reason, risk, target_id) VALUES (?,?,?,?,?,?,?,?,?,?)')
        .run(at, 'u-sup', 'stu-91m', action, kind, key, decision, reason, risk, targetId);
    };

    // Group 1: check x add (6 shown)
    // c1: 10d ago show + adopt -> done task -> survived7d = 1, newTaskAdopted = 1
    insFb(isoAgo(10), 'check', 'add', 'k-c1', 'show', { targetId: 't-done-1' });
    insFb(isoAgo(10), 'check', 'add', 'k-c1', 'adopt', { targetId: 't-done-1' });
    // c2: 9d ago show + adopt-edited + undo -> undone, not survived
    insFb(isoAgo(9), 'check', 'add', 'k-c2', 'show');
    insFb(isoAgo(9), 'check', 'add', 'k-c2', 'adopt-edited', { targetId: 't-missing' });
    insFb(isoAgo(9), 'check', 'add', 'k-c2', 'undo', { targetId: 't-missing' });
    // c3: 8d ago show + adopt -> na 10h later -> na48h = 1, not survived
    insFb(isoAgo(8), 'check', 'add', 'k-c3', 'show');
    insFb(isoAgo(8), 'check', 'add', 'k-c3', 'adopt', { targetId: 't-na-fast' });
    // c4: 12d ago show + adopt -> na 5d later -> na48h = 0, not survived
    insFb(isoAgo(12), 'check', 'add', 'k-c4', 'show');
    insFb(isoAgo(12), 'check', 'add', 'k-c4', 'adopt', { targetId: 't-na-slow' });
    // c5: 2d ago show + adopt -> <7d old -> not matured yet
    insFb(isoAgo(2), 'check', 'add', 'k-c5', 'show');
    insFb(isoAgo(2), 'check', 'add', 'k-c5', 'adopt', { targetId: 't-recent' });
    // c6: 10d ago show + ignore(duplicate)
    insFb(isoAgo(10), 'check', 'add', 'k-c6', 'show');
    insFb(isoAgo(10), 'check', 'add', 'k-c6', 'ignore', { reason: 'duplicate' });

    // Group 2: audit x delete (low survival, MUST stay alwaysOpen=true)
    for (let i = 0; i < 4; i++) {
      insFb(isoAgo(10), 'audit', 'delete', 'k-del-' + i, 'show', { risk: 0 });
      insFb(isoAgo(10), 'audit', 'delete', 'k-del-' + i, 'ignore', { reason: 'wrong' });
    }

    // Group 3: tasks x update with risk=1 (low survival, MUST stay alwaysOpen=true)
    for (let i = 0; i < 4; i++) {
      insFb(isoAgo(10), 'tasks', 'update', 'k-risk-' + i, 'show', { risk: 1 });
      insFb(isoAgo(10), 'tasks', 'update', 'k-risk-' + i, 'ignore', { reason: 'irrelevant' });
    }

    // Group 4: tasks x close with risk=0, 4 ignores, 0 adopts -> lowSurvival=true & alwaysOpen=false (collapsible)
    for (let i = 0; i < 4; i++) {
      insFb(isoAgo(10), 'tasks', 'close', 'k-cls-' + i, 'show', { risk: 0 });
      insFb(isoAgo(10), 'tasks', 'close', 'k-cls-' + i, 'ignore', { reason: 'handled' });
    }

    const rep = await h.call('/api/ai/survival?days=90', { cookie: supCookie });
    assert.equal(rep.status, 200);
    const checkAdd = rep.data.rows.find(r => r.action === 'check' && r.kind === 'add');
    assert.equal(checkAdd.shown, 6);
    assert.equal(checkAdd.matureShown, 5);
    assert.equal(checkAdd.adopted, 5);
    assert.equal(checkAdd.adoptEdited, 1);
    assert.equal(checkAdd.undone, 1);
    assert.equal(checkAdd.ignored, 1);
    assert.equal(checkAdd.ignoreReasons.duplicate, 1);
    assert.equal(checkAdd.survived7d, 1);
    assert.equal(checkAdd.survivalRate, Number((1 / 6).toFixed(4)));
    assert.equal(checkAdd.newTaskAdopted, 4);
    assert.equal(checkAdd.na48h, 1);
    assert.equal(checkAdd.guardrail48hRate, 0.25);

    const auditDel = rep.data.rows.find(r => r.action === 'audit' && r.kind === 'delete');
    assert.equal(auditDel.alwaysOpen, true);
    assert.equal(auditDel.hasRisk, true);
    assert.equal(auditDel.lowSurvival, false);

    const tasksUpd = rep.data.rows.find(r => r.action === 'tasks' && r.kind === 'update');
    assert.equal(tasksUpd.alwaysOpen, true);
    assert.equal(tasksUpd.hasRisk, true);
    assert.equal(tasksUpd.lowSurvival, false);

    const tasksClose = rep.data.rows.find(r => r.action === 'tasks' && r.kind === 'close');
    assert.equal(tasksClose.alwaysOpen, false);
    assert.equal(tasksClose.lowSurvival, true);

    // Anti-suppression red team check: spam ignoring a delete card (even with forged kind/risk=false) or risk=true card must NOT hide them
    globalThis.__fqaiModelHook = async () => ({
      choices: [{
        message: {
          role: 'assistant',
          content: JSON.stringify({
            summary: 'ok',
            cards: [
              { kind: 'delete', target: 't-del-keep', reason: '危险删除卡', evidence: [{ ref: 'task:t-del-keep' }] },
              { kind: 'add', title: '高风险建议', reason: '含风险标记', risk: true, evidence: [{ ref: 'task:t-norm-keep' }] },
              { kind: 'close', target: 't-norm-keep', status: 'done', reason: '普通关闭卡', evidence: [{ ref: 'task:t-norm-keep' }] },
            ],
            manual: [],
            ok: [],
          }),
        },
      }],
      usage: { prompt_tokens: 5, completion_tokens: 5 },
    });

    // Run once so cards are emitted & exact keys recorded as 'show'
    const run1 = parseSse((await h.call('/api/ai/run', {
      method: 'POST', cookie: supCookie,
      body: { action: 'check', studentId: 'stu-91m', generate: true, web: false },
    })).text);
    assert.equal(run1.cards.length, 3);
    const delCard = run1.cards.find(c => c.kind === 'delete');
    const riskCard = run1.cards.find(c => c.risk === true && c.kind === 'add');
    const normCard = run1.cards.find(c => c.kind === 'close');
    assert.ok(delCard && riskCard && normCard);

    // Attacker spams ignore on all three keys (even forging kind='add', risk=false for delCard & riskCard!)
    for (const key of [delCard.key, riskCard.key, normCard.key]) {
      assert.equal((await h.call('/api/ai/feedback', {
        method: 'POST', cookie: supCookie,
        body: { studentId: 'stu-91m', action: 'check', kind: 'add', decision: 'ignore', risk: false, key },
      })).status, 200);
    }

    // Run again: normCard MUST be suppressed, while delCard and riskCard MUST NOT be hidden!
    const run2 = parseSse((await h.call('/api/ai/run', {
      method: 'POST', cookie: supCookie,
      body: { action: 'check', studentId: 'stu-91m', generate: true, web: false },
    })).text);
    assert.ok(run2.cards.some(c => c.key === delCard.key), 'delete card must never be hidden by ignore');
    assert.ok(run2.cards.some(c => c.key === riskCard.key), 'risk-flagged card must never be hidden by ignore');
    assert.ok(!run2.cards.some(c => c.key === normCard.key), 'normal card should still respect ignore');
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});

test('#91 UI assertions: survival report supervisor-only, lowSurvival collapsible while delete/risk alwaysOpen, and reason picker present', async () => {
  const aiJs = await readFile(new URL('../../public/apply/app/ai.js', import.meta.url), 'utf8');
  assert.match(aiJs, /status\?\.user\?\.role === 'supervisor'/);
  assert.match(aiJs, /data-fq="survival"/);
  assert.match(aiJs, /\/api\/ai\/survival/);
  assert.match(aiJs, /data-igwhy=/);
  assert.match(aiJs, /!r\.lowSurvival \|\| r\.alwaysOpen/);
  assert.match(aiJs, /fqai-surv-more/);
  assert.match(aiJs, /c\.risk \|\| c\.kind === 'delete'/);
});
