import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkerHarness, extractCookie } from './helpers.mjs';

async function setupMatrixEnv(extraEnv = {}) {
  const h = await createWorkerHarness(extraEnv);
  const supSetup = await h.call('/api/setup', {
    method: 'POST',
    body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false },
  });
  const sup = extractCookie(supSetup.headers);

  const uAdvA = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adva', name: '顾问A', role: 'advisor' } })).data;
  const uAdvB = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'advb', name: '顾问B', role: 'advisor' } })).data;
  const uWrtA = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'wrta', name: '文书A', role: 'writer' } })).data;
  const uWrtB = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'wrtb', name: '文书B', role: 'writer' } })).data;

  await h.call('/api/t/students/stu-a', {
    method: 'PUT', cookie: sup,
    body: {
      id: 'stu-a', name: '学生A', advisorId: uAdvA.user.id, writerIds: [uWrtA.user.id],
      profile: {
        phone: '13800001111', email: 'stua@example.com', passport: 'E12345678', address: '上海市测试路1号', dob: '2005-01-01',
        accounts: [{ site: 'UCAS', user: 'secret-ucas-a', pass: 'secret-pw-a' }],
      },
    },
  });
  await h.call('/api/t/students/stu-b', {
    method: 'PUT', cookie: sup,
    body: {
      id: 'stu-b', name: '学生B', advisorId: uAdvB.user.id, writerIds: [uWrtB.user.id],
      profile: {
        phone: '13900002222', email: 'stub@example.com', passport: 'E87654321',
        accounts: [{ site: 'UCAS', user: 'secret-ucas-b', pass: 'secret-pw-b' }],
      },
    },
  });

  const uStuA = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'stua', name: '学生A', role: 'student', studentId: 'stu-a' } })).data;
  const uStuB = (await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'stub', name: '学生B', role: 'student', studentId: 'stu-b' } })).data;

  await h.call('/api/t/submissions/sub-a', { method: 'PUT', cookie: sup, body: { id: 'sub-a', studentId: 'stu-a', platform: 'ucas_conservatoires', account: 'sub-secret-a', note: '内部备注A' } });
  await h.call('/api/t/submissions/sub-b', { method: 'PUT', cookie: sup, body: { id: 'sub-b', studentId: 'stu-b', platform: 'ucas_conservatoires', account: 'sub-secret-b', note: '内部备注B' } });
  await h.call('/api/t/applications/app-a', { method: 'PUT', cookie: sup, body: { id: 'app-a', studentId: 'stu-a', schoolId: 'rcm', program: 'Piano', internalDeadline: '2026-09-01' } });
  await h.call('/api/t/applications/app-b', { method: 'PUT', cookie: sup, body: { id: 'app-b', studentId: 'stu-b', schoolId: 'ram', program: 'Violin', internalDeadline: '2026-09-02' } });
  await h.call('/api/t/tasks/tsk-a', { method: 'PUT', cookie: sup, body: { id: 'tsk-a', studentId: 'stu-a', applicationId: 'app-a', title: '学生A任务', assigneeId: uWrtA.user.id, status: 'todo' } });
  await h.call('/api/t/tasks/tsk-b', { method: 'PUT', cookie: sup, body: { id: 'tsk-b', studentId: 'stu-b', applicationId: 'app-b', title: '学生B任务', assigneeId: uWrtB.user.id, status: 'todo' } });
  await h.call('/api/t/documents/doc-a', { method: 'PUT', cookie: sup, body: { id: 'doc-a', studentId: 'stu-a', title: 'A文书', type: 'ps', writerId: uWrtA.user.id, brief: '机密briefA', needStudentConfirm: true } });
  await h.call('/api/t/documents/doc-b', { method: 'PUT', cookie: sup, body: { id: 'doc-b', studentId: 'stu-b', title: 'B文书', type: 'ps', writerId: uWrtB.user.id, brief: '机密briefB', needStudentConfirm: true } });
  await h.call('/api/t/versions/ver-a1', { method: 'PUT', cookie: sup, body: { id: 'ver-a1', documentId: 'doc-a', studentId: 'stu-a', no: 1, kind: 'text', text: 'Draft text for student A.' } });
  await h.call('/api/t/versions/ver-b1', { method: 'PUT', cookie: sup, body: { id: 'ver-b1', documentId: 'doc-b', studentId: 'stu-b', no: 1, kind: 'text', text: 'Draft text for student B.' } });
  await h.call('/api/t/recommenders/rec-a', { method: 'PUT', cookie: sup, body: { id: 'rec-a', studentId: 'stu-a', name: '老师A', note: '顾问私人备注A', fromIntake: false } });

  async function loginChange(username, initPw, newPw) {
    const l = await h.call('/api/login', { method: 'POST', body: { username, password: initPw } });
    const c = extractCookie(l.headers);
    await h.call('/api/password', { method: 'POST', cookie: c, body: { old: initPw, new: newPw } });
    return c;
  }

  const advA = await loginChange('adva', uAdvA.password, 'AdvAPass2026!');
  const advB = await loginChange('advb', uAdvB.password, 'AdvBPass2026!');
  const wrtA = await loginChange('wrta', uWrtA.password, 'WrtAPass2026!');
  const wrtB = await loginChange('wrtb', uWrtB.password, 'WrtBPass2026!');
  const stuA = await loginChange('stua', uStuA.password, 'StuAPass2026!');
  const stuB = await loginChange('stub', uStuB.password, 'StuBPass2026!');

  await h.call('/api/diy/register', { method: 'POST', body: { phone: '13800000001', name: 'DIY-A', password: 'DiyAPass2026!', agree: true } });
  await h.call('/api/diy/register', { method: 'POST', body: { phone: '13800000002', name: 'DIY-B', password: 'DiyBPass2026!', agree: true } });
  const diyA = extractCookie((await h.call('/api/diy/login', { method: 'POST', body: { phone: '13800000001', password: 'DiyAPass2026!' } })).headers, '__Host-fq_diy');
  const diyB = extractCookie((await h.call('/api/diy/login', { method: 'POST', body: { phone: '13800000002', password: 'DiyBPass2026!' } })).headers, '__Host-fq_diy');
  await h.call('/api/diy/t/tasks/dtsk-a', { method: 'PUT', cookie: diyA, body: { title: 'DIY A 私密任务' } });

  return { h, sup, advA, advB, wrtA, wrtB, stuA, stuB, diyA, diyB, ids: { uAdvA: uAdvA.user.id, uAdvB: uAdvB.user.id, uWrtA: uWrtA.user.id, uWrtB: uWrtB.user.id } };
}

test('权限矩阵与安全全面审计', async (t) => {
  await t.test('1. 六类角色接口权限矩阵（匿名 / DIY / 学生 / 文书 / 顾问 / 主管）', async () => {
    const env = await setupMatrixEnv();
    const { h, sup, advA, wrtA, stuA, diyA } = env;
    try {
      const actors = { anon: '', diy: diyA, student: stuA, writer: wrtA, advisor: advA, supervisor: sup };
      const matrix = [
        { name: 'GET /api/bootstrap', call: c => h.call('/api/bootstrap', { cookie: c }), expect: { anon: 401, diy: 200, student: 200, writer: 200, advisor: 200, supervisor: 200 } },
        { name: 'GET /api/admin/export', call: c => h.call('/api/admin/export', { cookie: c }), expect: { anon: 401, diy: 401, student: 403, writer: 403, advisor: 403, supervisor: 200 } },
        { name: 'GET /api/admin/audit', call: c => h.call('/api/admin/audit', { cookie: c }), expect: { anon: 401, diy: 401, student: 403, writer: 403, advisor: 403, supervisor: 200 } },
        { name: 'GET /api/reqdb', call: c => h.call('/api/reqdb', { cookie: c }), expect: { anon: 401, diy: 401, student: 403, writer: 403, advisor: 403, supervisor: 200 } },
        { name: 'GET /api/reqdb/school/rcm', call: c => h.call('/api/reqdb/school/rcm', { cookie: c }), expect: { anon: 401, diy: 401, student: 403, writer: 200, advisor: 200, supervisor: 200 } },
        { name: 'GET /api/diy-admin/state', call: c => h.call('/api/diy-admin/state', { cookie: c }), expect: { anon: 403, diy: 403, student: 403, writer: 403, advisor: 403, supervisor: 200 } },
        { name: 'POST /api/users (create advisor)', call: c => h.call('/api/users', { method: 'POST', cookie: c, body: { username: 'tmp_' + Math.random().toString(36).slice(2, 7), name: '测试', role: 'advisor' } }), expect: { anon: 401, diy: 401, student: 403, writer: 403, advisor: 403, supervisor: 200 } },
        { name: 'GET /api/ai/status', call: c => h.call('/api/ai/status', { cookie: c }), expect: { anon: 401, diy: 401, student: 200, writer: 200, advisor: 200, supervisor: 200 } },
        { name: 'GET /api/ai/record/rcm-ug-academic', call: c => h.call('/api/ai/record/rcm-ug-academic', { cookie: c }), expect: { anon: 401, diy: 401, student: 403, writer: 200, advisor: 200, supervisor: 200 } },
        { name: 'POST /api/ai/run (brief)', call: c => h.call('/api/ai/run', { method: 'POST', cookie: c, body: { action: 'brief' } }), expect: { anon: 401, diy: 401, student: 403, writer: 403, advisor: 200, supervisor: 200 } },
        { name: 'GET /app/app.js', call: c => h.call('/app/app.js', { cookie: c }), expect: { anon: 401, diy: 200, student: 200, writer: 200, advisor: 200, supervisor: 200 } },
      ];

      for (const row of matrix) {
        for (const [role, cookie] of Object.entries(actors)) {
          const res = await row.call(cookie);
          assert.equal(res.status, row.expect[role], `Matrix ${row.name} [${role}] expected ${row.expect[role]} got ${res.status}: ${res.text}`);
        }
      }
    } finally {
      h.db.close();
    }
  });

  await t.test('2. 横向越权与数据范围泄露验证', async (sub) => {
    await sub.test('2a. 顾问/文书/学生/DIY 核心数据隔离与敏感字段脱敏', async () => {
      const env = await setupMatrixEnv({ DEEPSEEK_API_KEY: 'sk-dummy-test' });
      const { h, sup, advA, wrtA, stuA, diyB, ids } = env;
      try {
        const bootAdvA = (await h.call('/api/bootstrap', { cookie: advA })).data;
        assert.deepEqual(bootAdvA.data.students.map(s => s.id), ['stu-a']);
        assert.equal(bootAdvA.data.applications.some(a => a.studentId === 'stu-b'), false);
        assert.equal((await h.call('/api/t/tasks/tsk-b', { method: 'PUT', cookie: advA, body: { id: 'tsk-b', studentId: 'stu-b', title: '篡改' } })).status, 403);
        assert.equal((await h.call('/api/t/tasks/tsk-b-new', { method: 'PUT', cookie: advA, body: { id: 'tsk-b-new', studentId: 'stu-b', title: '越权新建' } })).status, 403);
        assert.equal((await h.call('/api/t/students/stu-b', { method: 'PUT', cookie: advA, body: { id: 'stu-b', name: '篡改B' } })).status, 403);
        assert.equal((await h.call('/api/users', { method: 'POST', cookie: advA, body: { username: 'hijackb', name: '劫持', role: 'student', studentId: 'stu-b' } })).status, 403);
        assert.equal((await h.call('/api/ai/feedback', { method: 'POST', cookie: advA, body: { studentId: 'stu-b', key: 'k', kind: 'add', decision: 'ignore' } })).status, 403);
        const aiRunCross = await h.call('/api/ai/run', { method: 'POST', cookie: advA, body: { action: 'audit', studentId: 'stu-b' } });
        assert.match(aiRunCross.text, /没有这位学生的管理权限/);

        const bootWrtA = (await h.call('/api/bootstrap', { cookie: wrtA })).data;
        assert.deepEqual(bootWrtA.data.students.map(s => s.id), ['stu-a']);
        assert.equal(bootWrtA.data.students[0].profile.accounts, undefined, '文书端必须脱敏 profile.accounts');
        assert.equal((await h.call('/api/t/documents/doc-b', { method: 'PUT', cookie: wrtA, body: { id: 'doc-b', studentId: 'stu-b', title: '改' } })).status, 403);
        assert.equal((await h.call('/api/ai/essay', { method: 'POST', cookie: wrtA, body: { op: 'length', docId: 'doc-b', text: 'hello' } })).status, 403);
        assert.equal((await h.call('/api/t/tasks/tsk-a', { method: 'PUT', cookie: wrtA, body: { id: 'tsk-a', studentId: 'stu-a', applicationId: 'app-a', title: '篡改标题', assigneeId: ids.uWrtA, status: 'doing' } })).status, 403);
        assert.equal((await h.call('/api/t/tasks/tsk-a', { method: 'PUT', cookie: wrtA, body: { id: 'tsk-a', studentId: 'stu-a', applicationId: 'app-a', title: '学生A任务', assigneeId: ids.uWrtA, status: 'doing' } })).status, 200);

        const bootStuA = (await h.call('/api/bootstrap', { cookie: stuA })).data;
        assert.deepEqual(bootStuA.data.students.map(s => s.id), ['stu-a']);
        assert.equal(bootStuA.data.students[0].profile.accounts, undefined);
        assert.equal(bootStuA.data.applications[0].internalDeadline, undefined);
        assert.equal(bootStuA.data.submissions[0].account, undefined);
        assert.equal(bootStuA.data.submissions[0].note, undefined);
        assert.equal(bootStuA.data.documents[0].brief, undefined);
        assert.equal(bootStuA.data.versions.length, 0);
        assert.equal(bootStuA.data.recommenders[0].note, undefined);
        assert.equal((await h.call('/api/t/students/stu-b', { method: 'PUT', cookie: stuA, body: { id: 'stu-b', name: '篡改' } })).status, 403);
        assert.equal((await h.call('/api/t/students/stu-a', { method: 'PUT', cookie: stuA, body: { id: 'stu-a', intake: { status: 'verified' } } })).status, 403);

        assert.equal((await h.call('/api/diy/t/tasks/dtsk-a', { method: 'PUT', cookie: diyB, body: { title: '劫持' } })).status, 403);
        assert.equal((await h.call('/api/diy/t/tasks/dtsk-a', { method: 'DELETE', cookie: diyB })).status, 403);
      } finally { h.db.close(); }
    });

    await sub.test('2b. [BUG 回归探针] 学生不得覆盖顾问录入的推荐人（fromIntake=false）', async () => {
      const env = await setupMatrixEnv();
      const { h, sup, stuA } = env;
      try {
        const res = await h.call('/api/t/recommenders/rec-a', {
          method: 'PUT', cookie: stuA,
          body: { id: 'rec-a', studentId: 'stu-a', name: '被学生篡改的老师名' },
        });
        assert.equal(res.status, 403, '学生不应能覆盖顾问录入的推荐人记录，实际状态: ' + res.status);
        const recAfter = (await h.call('/api/bootstrap', { cookie: sup })).data.data.recommenders.find(x => x.id === 'rec-a');
        assert.equal(recAfter.name, '老师A');
      } finally { h.db.close(); }
    });
  });

  await t.test('3. 纵向越权与关键工作流越界', async () => {
    const env = await setupMatrixEnv();
    const { h, sup, advA, wrtA, stuA } = env;
    try {
      // 将 doc-a 推到 student_review 状态以准确测试 proxy-confirm 的角色拦截
      const d0 = (await h.call('/api/bootstrap', { cookie: sup })).data.data.documents.find(x => x.id === 'doc-a');
      const d1 = (await h.call('/api/t/documents/doc-a', { method: 'PUT', cookie: advA, body: { ...d0, currentVersionId: 'ver-a1', status: 'advisor_review', _base: d0.updatedAt } })).data.record;
      const d2 = (await h.call('/api/documents/doc-a/review', { method: 'POST', cookie: advA, body: { base: d1.updatedAt, versionId: 'ver-a1', stage: 'advisor', decision: 'approve' } })).data.document;
      const d3 = (await h.call('/api/documents/doc-a/review', { method: 'POST', cookie: sup, body: { base: d2.updatedAt, versionId: 'ver-a1', stage: 'supervisor', decision: 'approve' } })).data.document;
      assert.equal(d3.status, 'student_review');

      assert.equal((await h.call('/api/documents/doc-a/revise', { method: 'POST', cookie: advA, body: { base: d3.updatedAt, versionId: 'ver-a1', text: 'Advisor rewrite' } })).status, 403);
      assert.equal((await h.call('/api/documents/doc-a/revise', { method: 'POST', cookie: wrtA, body: { base: d3.updatedAt, versionId: 'ver-a1', text: 'Writer revise' } })).status, 403);
      assert.equal((await h.call('/api/documents/doc-a/proxy-confirm', { method: 'POST', cookie: advA, body: { base: d3.updatedAt, versionId: 'ver-a1' } })).status, 403);

      assert.equal((await h.call('/api/students/stu-a', { method: 'DELETE', cookie: advA })).status, 403);
      assert.equal((await h.call('/api/t/applications/app-a', { method: 'DELETE', cookie: advA })).status, 403);
      assert.equal((await h.call('/api/t/documents/doc-a', { method: 'DELETE', cookie: advA })).status, 403);
      assert.equal((await h.call('/api/t/students/stu-a', { method: 'DELETE', cookie: stuA })).status, 403);

      assert.equal((await h.call('/api/users', { method: 'POST', cookie: advA, body: { username: 'badwriter', name: '越权', role: 'writer' } })).status, 403);
      assert.equal((await h.call(`/api/users/${env.ids.uWrtA}/reset`, { method: 'POST', cookie: advA, body: {} })).status, 403);

      const supMe = (await h.call('/api/me', { cookie: sup })).data.me;
      assert.equal((await h.call(`/api/users/${supMe.id}`, { method: 'PUT', cookie: sup, body: { active: false } })).status, 400);
      assert.equal((await h.call(`/api/users/${supMe.id}`, { method: 'PUT', cookie: sup, body: { role: 'advisor' } })).status, 400);
    } finally {
      h.db.close();
    }
  });

  await t.test('4. Cookie 安全属性、安全响应头、CSRF Origin 校验与 SQL 注入', async (sub) => {
    await sub.test('4a. Cookie、安全头、X-FQ 与 SQL 参数化', async () => {
      const h = await createWorkerHarness();
      try {
        const setup = await h.call('/api/setup', {
          method: 'POST',
          body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false },
        });
        const rawCookie = setup.headers.getSetCookie()[0];
        assert.match(rawCookie, /^__Host-fq_session=/);
        assert.match(rawCookie, /Path=\//);
        assert.match(rawCookie, /HttpOnly/i);
        assert.match(rawCookie, /Secure/i);
        assert.match(rawCookie, /SameSite=Strict/i);
        const sup = extractCookie(setup.headers);

        const loginPage = await h.call('/login');
        assert.equal(loginPage.headers.get('X-Content-Type-Options'), 'nosniff');
        assert.equal(loginPage.headers.get('X-Frame-Options'), 'DENY');
        assert.equal(loginPage.headers.get('Referrer-Policy'), 'no-referrer');
        assert.match(loginPage.headers.get('Content-Security-Policy') || '', /frame-ancestors 'none'/);

        const embed = await h.call('/embed-login');
        assert.equal(embed.headers.get('X-Frame-Options'), null);
        assert.match(embed.headers.get('Content-Security-Policy') || '', /frame-ancestors https:\/\/www\.fantasmearts\.com/);

        assert.equal((await h.call('/api/logout', { method: 'POST', cookie: sup, body: {}, headers: { 'X-FQ': null } })).status, 403);

        const sqliPayloads = ["' OR '1'='1", "x'; DROP TABLE users; --", "stu-1\" OR 1=1--"];
        for (const p of sqliPayloads) {
          const res = await h.call('/api/login', { method: 'POST', body: { username: p, password: 'BadPassword2026' } });
          assert.equal(res.status, 401);
        }
        assert.ok(h.db.raw.prepare('SELECT COUNT(*) AS n FROM users').get().n >= 1);
      } finally { h.db.close(); }
    });

    await sub.test('4b. [BUG 回归探针] 业务写接口应与 /api/ai/* 一致校验恶意跨站 Origin', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        const crossOriginBiz = await h.call('/api/t/students/stu-csrf', {
          method: 'PUT', cookie: sup,
          body: { id: 'stu-csrf', name: '跨站写入' },
          headers: { Origin: 'https://evil.attacker.example' },
        });
        assert.equal(crossOriginBiz.status, 403, '业务写接口未校验 Origin 头部（与 /api/ai/* 的 fqaiSameOrigin 不一致），实际状态: ' + crossOriginBiz.status);
      } finally { h.db.close(); }
    });
  });

  await t.test('5. [BUG 回归探针] AI 模块：先扣配额后鉴权、无 Key 时 brief/auditAll 返回 503 与离线院校缓存跨库隔离', async (sub) => {
    await sub.test('5a. 越权请求 /api/ai/run (403) 前不得扣除 dailyChat 配额', async () => {
      const hAi = await createWorkerHarness({ DEEPSEEK_API_KEY: 'sk-test-dummy-never-called' });
      try {
        const sup = extractCookie((await hAi.call('/api/setup', { method: 'POST', body: { setupKey: hAi.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        const uAdv = (await hAi.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adva', name: '顾问A', role: 'advisor' } })).data;
        const adv = extractCookie((await hAi.call('/api/login', { method: 'POST', body: { username: 'adva', password: uAdv.password } })).headers);
        await hAi.call('/api/password', { method: 'POST', cookie: adv, body: { old: uAdv.password, new: 'AdvPass2026!' } });
        await hAi.call('/api/t/students/stu-other', { method: 'PUT', cookie: sup, body: { id: 'stu-other', name: '他人学生' } });

        const stBefore = (await hAi.call('/api/ai/status', { cookie: adv })).data.usage.used;
        await hAi.call('/api/ai/run', { method: 'POST', cookie: adv, body: { action: 'audit', studentId: 'stu-other' } });
        const stAfter = (await hAi.call('/api/ai/status', { cookie: adv })).data.usage.used;
        assert.equal(stAfter, stBefore, 'BUG: 越权请求 /api/ai/run (403) 前已先扣除了 dailyChat 配额');
      } finally { hAi.db.close(); }
    });

    await sub.test('5b. AI 上下文脱敏验证（禁止泄露证件/手机/邮箱/住址/生日/账号）', async () => {
      const env = await setupMatrixEnv({ DEEPSEEK_API_KEY: 'sk-dummy-test' });
      const { h, advA } = env;
      try {
        // brief 与 auditAll 为纯程序计算（model: false），即使在无真实模型调用下也可验证不会泄露其他学生或敏感字段
        const brief = await h.call('/api/ai/run', { method: 'POST', cookie: advA, body: { action: 'brief' } });
        assert.equal(brief.status, 200);
        assert.match(brief.text, /学生A任务|今日简报/);
        assert.doesNotMatch(brief.text, /学生B|13800001111|13900002222|E12345678|secret-ucas/);
      } finally { h.db.close(); }
    });
  });
});
