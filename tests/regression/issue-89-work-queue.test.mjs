import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

function bjtDay(offsetDays = 0) {
  return new Date(Date.now() + 8 * 3600e3 + offsetDays * 864e5).toISOString().slice(0, 10);
}

test('#89: GET /api/ai/queue enforces role gates, sort-all-then-truncate (<=7), priority ties, overload hints, and 0 model calls', async () => {
  // Deliberately omit DEEPSEEK_API_KEY to verify zero-LLM queue still works
  const h = await createWorkerHarness({});
  const prevModel = globalThis.__fqaiModelHook;
  try {
    let modelHookCalls = 0;
    globalThis.__fqaiModelHook = async () => {
      modelHookCalls++;
      throw new Error('__fqaiModelHook must never be invoked by /api/ai/queue');
    };

    const setup = await h.call('/api/setup', {
      method: 'POST',
      body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'Supervisor2026', demo: false },
    });
    assert.equal(setup.status, 200);
    const supCookie = extractCookie(setup.headers);

    const mkUser = async (username, name, role) => {
      const r = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username, name, role } });
      assert.equal(r.status, 200);
      const login = await h.call('/api/login', { method: 'POST', body: { username, password: r.data.password } });
      const cookie = extractCookie(login.headers);
      assert.equal((await h.call('/api/password', { method: 'POST', cookie, body: { old: r.data.password, new: 'StaffPass2026!' } })).status, 200);
      return { id: r.data.user.id, cookie };
    };

    const advA = await mkUser('adv.a', '李顾问', 'advisor');
    const advB = await mkUser('adv.b', '陈顾问', 'advisor');
    const wrtA = await mkUser('wrt.a', '周文书', 'writer');
    const wrtB = await mkUser('wrt.b', '吴文书', 'writer');

    const today = bjtDay(0);
    const dMinus2 = bjtDay(-2);
    const dMinus5 = bjtDay(-5);
    const dPlus2 = bjtDay(2);
    const dPlus5 = bjtDay(5);
    const dPlus20 = bjtDay(20);
    const staleAt = bjtDay(-20) + 'T10:00:00.000Z';
    const freshAt = bjtDay(-1) + 'T10:00:00.000Z';

    // Advisor A students (stu-a1..a8) — seed stale/missing FIRST and overdue LAST to prove sort happens BEFORE slice(0, 7)
    for (let i = 1; i <= 5; i++) {
      const sid = `stu-a${i}`;
      assert.equal((await h.call(`/api/t/students/${sid}`, {
        method: 'PUT',
        cookie: supCookie,
        body: {
          id: sid,
          name: `林生${i}`,
          advisorId: advA.id,
          writerIds: i === 1 ? [wrtA.id, wrtB.id] : [],
          status: 'active',
          level: 'UG',
          majorId: 'violin',
          season: 'Fall 2027',
          profile: { phone: `1380000000${i}`, email: `lin${i}@example.com`, passport: `E123456${i}`, birthDate: '2007-05-01' },
        },
      })).status, 200);
      if (i === 2) {
        assert.equal((await h.call('/api/t/submissions/sub-a2', { method: 'PUT', cookie: supCookie, body: { id: 'sub-a2', studentId: sid, platform: 'school_portal', status: 'in_progress' } })).status, 200);
      }
      assert.equal((await h.call(`/api/t/applications/app-a${i}`, {
        method: 'PUT',
        cookie: supCookie,
        body: { id: `app-a${i}`, studentId: sid, schoolId: 'jhu', program: 'BM Violin', level: 'UG', majorId: 'violin', parts: i === 2 ? [{ submissionId: 'sub-a2', label: '主申', deadline: { date: dPlus20 } }] : [] },
      })).status, 200);
      // Old activity => stale (score 100): PUT /api/t/activity normalizes `at` to now(), so backdate in DB for historical test
      assert.equal((await h.call(`/api/t/activity/act-a${i}`, {
        method: 'PUT',
        cookie: supCookie,
        body: { id: `act-a${i}`, studentId: sid, at: staleAt, text: '历史记录' },
      })).status, 200);
      h.db.raw.prepare("UPDATE records SET data = json_set(data, '$.at', ?) WHERE tbl = 'activity' AND id = ?").run(staleAt, `act-a${i}`);
    }

    // Fresh activity for stu-a1 so stu-a1 isn't marked stale
    assert.equal((await h.call('/api/t/activity/act-a1-new', {
      method: 'PUT', cookie: supCookie, body: { id: 'act-a1-new', studentId: 'stu-a1', at: freshAt, text: '今日跟进' },
    })).status, 200);

    // Give stu-a2 missing material (score 200)
    assert.equal((await h.call('/api/t/materials/mat-a2', {
      method: 'PUT', cookie: supCookie, body: { id: 'mat-a2', studentId: 'stu-a2', title: '成绩单扫描件', status: 'collecting' },
    })).status, 200);

    // Later-inserted tasks on stu-a1 & stu-a4: 7-day deadlines (score 300) and overdue (score 400)
    assert.equal((await h.call('/api/t/tasks/task-soon-5', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-soon-5', studentId: 'stu-a1', title: '5天后提交申请表', assigneeId: advA.id, status: 'todo', dueDate: dPlus5 },
    })).status, 200);
    assert.equal((await h.call('/api/t/tasks/task-soon-2', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-soon-2', studentId: 'stu-a1', title: '2天后核对语言分', assigneeId: advA.id, status: 'doing', dueDate: dPlus2 },
    })).status, 200);
    assert.equal((await h.call('/api/t/tasks/task-od-2', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-od-2', studentId: 'stu-a4', title: '逾期2天催推荐信', assigneeId: advA.id, status: 'todo', dueDate: dMinus2 },
    })).status, 200);
    assert.equal((await h.call('/api/t/tasks/task-od-5', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-od-5', studentId: 'stu-a1', title: '逾期5天签字表', assigneeId: advA.id, status: 'todo', dueDate: dMinus5 },
    })).status, 200);

    // Advisor review doc + supervisor review doc + blocked task on stu-a1 (new documents default to drafting via PUT /api/t/documents)
    assert.equal((await h.call('/api/t/documents/doc-adv-rev', {
      method: 'PUT', cookie: supCookie, body: { id: 'doc-adv-rev', studentId: 'stu-a1', title: 'PS 待顾问审核', type: 'ps', status: 'advisor_review', writerId: wrtA.id },
    })).status, 200);
    h.db.raw.prepare("UPDATE records SET data = json_set(data, '$.status', 'advisor_review') WHERE tbl = 'documents' AND id = 'doc-adv-rev'").run();
    assert.equal((await h.call('/api/t/documents/doc-sup-rev', {
      method: 'PUT', cookie: supCookie, body: { id: 'doc-sup-rev', studentId: 'stu-a1', title: 'Artist Statement 待主管审核', type: 'artist_statement', status: 'supervisor_review', writerId: wrtA.id },
    })).status, 200);
    h.db.raw.prepare("UPDATE records SET data = json_set(data, '$.status', 'supervisor_review') WHERE tbl = 'documents' AND id = 'doc-sup-rev'").run();
    assert.equal((await h.call('/api/t/tasks/task-blocked', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-blocked', studentId: 'stu-a1', title: '等待家长签字受阻任务', assigneeId: advA.id, status: 'doing', blocked: true, blockedReason: '等待护照扫描' },
    })).status, 200);

    // Writer A docs (revising + drafting) and Writer B doc on shared student stu-a1
    assert.equal((await h.call('/api/t/documents/doc-wrt-a-rev', {
      method: 'PUT', cookie: supCookie, body: { id: 'doc-wrt-a-rev', studentId: 'stu-a1', title: '被退回文书A', type: 'supplemental', status: 'revising', writerId: wrtA.id },
    })).status, 200);
    h.db.raw.prepare("UPDATE records SET data = json_set(data, '$.status', 'revising') WHERE tbl = 'documents' AND id = 'doc-wrt-a-rev'").run();
    assert.equal((await h.call('/api/t/documents/doc-wrt-a-draft', {
      method: 'PUT', cookie: supCookie, body: { id: 'doc-wrt-a-draft', studentId: 'stu-a1', title: '撰写中文书A', type: 'cv', status: 'drafting', writerId: wrtA.id, dueDate: dPlus2 },
    })).status, 200);
    assert.equal((await h.call('/api/t/documents/doc-wrt-b-draft', {
      method: 'PUT', cookie: supCookie, body: { id: 'doc-wrt-b-draft', studentId: 'stu-a1', title: '另一位文书的草稿', type: 'ps', status: 'drafting', writerId: wrtB.id, dueDate: dMinus2 },
    })).status, 200);

    // Advisor B foreign student (must NOT appear in Advisor A or Writer A queues)
    assert.equal((await h.call('/api/t/students/stu-b1', {
      method: 'PUT', cookie: supCookie, body: { id: 'stu-b1', name: '陈同学外校生', advisorId: advB.id, status: 'active', level: 'PG', majorId: 'piano', season: 'Fall 2027' },
    })).status, 200);
    assert.equal((await h.call('/api/t/tasks/task-b-od', {
      method: 'PUT', cookie: supCookie, body: { id: 'task-b-od', studentId: 'stu-b1', title: '陈生逾期外校任务', assigneeId: advB.id, status: 'todo', dueDate: dMinus5 },
    })).status, 200);

    // Student account (must get 403 on GET /api/ai/queue)
    const stuUser = await h.call('/api/users', { method: 'POST', cookie: supCookie, body: { username: 'stu.u', name: '林生1', role: 'student', studentId: 'stu-a1' } });
    const stuLogin = await h.call('/api/login', { method: 'POST', body: { username: 'stu.u', password: stuUser.data.password } });
    const stuCookie = extractCookie(stuLogin.headers);
    assert.equal((await h.call('/api/password', { method: 'POST', cookie: stuCookie, body: { old: stuUser.data.password, new: 'StudentPass2026!' } })).status, 200);

    // Auth / Role matrix
    assert.equal((await h.call('/api/ai/queue')).status, 401);
    assert.equal((await h.call('/api/ai/queue', { cookie: stuCookie })).status, 403);

    // Advisor A Queue verification
    const qAdv = await h.call('/api/ai/queue', { cookie: advA.cookie });
    assert.equal(qAdv.status, 200);
    assert.equal(qAdv.data.today, today);
    assert.equal(qAdv.data.role, 'advisor');
    assert.equal(qAdv.data.items.length, 7);
    assert.ok(qAdv.data.total > 7);

    // Must never contain foreign student stu-b1 or PII
    const advJson = JSON.stringify(qAdv.data);
    assert.ok(!advJson.includes('stu-b1'));
    assert.ok(!advJson.includes('陈同学外校生'));
    assert.ok(!advJson.includes('138000000'));
    assert.ok(!advJson.includes('E123456'));

    // Verify exact priority ordering: overdue (-5 before -2) > 7-day (+2 before +5) > advisor_review (250) > missing (200) > stale (100)
    const advIds = qAdv.data.items.map(x => x.id);
    assert.deepEqual(advIds.slice(0, 6), [
      'task:task-od-5',
      'task:task-od-2',
      'task:task-soon-2',
      'task:task-soon-5',
      'doc:doc-adv-rev',
      'mat:mat-a2',
    ]);
    assert.equal(qAdv.data.items[6].kind, 'stale');
    for (const item of qAdv.data.items) {
      assert.match(item.href, /^#\/(student\/|app\/|doc\/)/);
    }

    // Supervisor Queue verification: sees blocked + supervisor_review + all students + advisor overload hint
    const qSup = await h.call('/api/ai/queue', { cookie: supCookie });
    assert.equal(qSup.status, 200);
    assert.equal(qSup.data.role, 'supervisor');
    assert.equal(qSup.data.items.length, 7);
    const supIds = qSup.data.items.map(x => x.id);
    assert.ok(supIds.includes('task:task-od-5'));
    assert.ok(supIds.includes('task:task-b-od'));
    assert.ok(supIds.includes('task:task-blocked'));
    assert.ok(supIds.includes('doc:doc-sup-rev'));
    // Blocked task sorts right after overdue items (score 350 > 300)
    assert.ok(supIds.indexOf('task:task-blocked') > supIds.indexOf('task:task-od-2'));
    assert.ok(supIds.indexOf('task:task-blocked') < supIds.indexOf('task:task-soon-2'));
    assert.ok(qSup.data.overload.some(x => x.advisorId === advA.id && x.overdue >= 2 && x.blocked >= 1));

    // Writer A Queue verification: only Writer A's own drafting/revising/due docs, zero Writer B docs
    const qWrt = await h.call('/api/ai/queue', { cookie: wrtA.cookie });
    assert.equal(qWrt.status, 200);
    assert.equal(qWrt.data.role, 'writer');
    assert.deepEqual(qWrt.data.items.map(x => x.id), [
      'doc:doc-wrt-a-draft', // <= 7d (score 300) beats revising without dueDate (250)
      'doc:doc-wrt-a-rev',
    ]);
    const wrtJson = JSON.stringify(qWrt.data);
    assert.ok(!wrtJson.includes('doc-wrt-b-draft'));
    assert.ok(!wrtJson.includes('stu-b1'));
    assert.ok(!wrtJson.includes('doc-sup-rev'));

    // Zero model invocations and zero usage quota touched
    assert.equal(modelHookCalls, 0);
    assert.equal(h.db.raw.prepare('SELECT COALESCE(SUM(n), 0) AS total FROM fq_ai_usage').get().total, 0);
  } finally {
    globalThis.__fqaiModelHook = prevModel;
    h.db.close();
  }
});

test('#89 UI: brief button removed, first-screen queue renders and persists 今天不看 per BJT day', async () => {
  const aiJs = await readFile(new URL('../../public/apply/app/ai.js', import.meta.url), 'utf8');
  assert.ok(!aiJs.includes("id: 'brief'"), 'TOOLS must remove brief button');
  assert.ok(!aiJs.includes('data-tool="brief"'), 'Quick actions must remove brief button');
  assert.ok(aiJs.includes('/api/ai/queue'), 'Frontend must fetch GET /api/ai/queue');
  assert.ok(aiJs.includes('data-qhide'), 'Queue items must render 今天不看 button');
  assert.ok(aiJs.includes('fqai:qhide:'), 'Queue hide state must persist in localStorage');
  assert.ok(aiJs.includes('status.assistant || status.essay'), 'Writer role must also mount queue panel');
});
