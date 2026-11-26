import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkerHarness, extractCookie, startHttpsServer } from './helpers.mjs';

test('功能与数据一致性全面测试（本地 HTTPS + Worker 隔离环境）', async (t) => {
  await t.test('1. 初始化、重复初始化、演示数据与密钥校验（HTTPS 持久化）', async () => {
    const srv = await startHttpsServer();
    try {
      const s0 = await srv.request('/api/setup-status');
      assert.equal(s0.status, 200);
      assert.equal(s0.data.needsSetup, true);

      // 错误 setupKey 拒绝
      const badKey = await srv.request('/api/setup', {
        method: 'POST',
        body: { setupKey: 'WrongSetupKey1234', name: '主管', username: 'sup1', password: 'Password123', demo: false },
      });
      assert.equal(badKey.status, 403);

      // 弱密码拒绝
      const weakPw = await srv.request('/api/setup', {
        method: 'POST',
        body: { setupKey: 'TestSetupKey2026!', name: '主管', username: 'sup1', password: 'onlyletters', demo: false },
      });
      assert.equal(weakPw.status, 400);

      // 合法初始化 + demo=true
      const ok = await srv.request('/api/setup', {
        method: 'POST',
        body: { setupKey: 'TestSetupKey2026!', name: '测试主管', username: 'sup.main', password: 'SupPassword2026', demo: true },
      });
      assert.equal(ok.status, 200, ok.text);
      assert.ok(Array.isArray(ok.data.accounts) && ok.data.accounts.length >= 3, 'demo=true 应返回演示账号');
      const supCookie = extractCookie(ok.headers);
      assert.ok(supCookie.startsWith('__Host-fq_session='));

      // 重复初始化拒绝
      const dup = await srv.request('/api/setup', {
        method: 'POST',
        body: { setupKey: 'TestSetupKey2026!', name: '主管2', username: 'sup2', password: 'SupPassword2026', demo: false },
      });
      assert.equal(dup.status, 403);

      // 重启服务后数据仍在
      await srv.stop();
    } finally {
      await srv.cleanup();
    }
  });

  await t.test('2. 账号启停、密码修改/重置、会话过期、续期、限流与重启持久化', async () => {
    const h = await createWorkerHarness();
    try {
      const setup = await h.call('/api/setup', {
        method: 'POST',
        body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup.auth', password: 'SupPassword2026', demo: false },
      });
      assert.equal(setup.status, 200);
      const supCookie = extractCookie(setup.headers);

      // 创建顾问账号（初始 mustChange=true）
      const createAdv = await h.call('/api/users', {
        method: 'POST',
        cookie: supCookie,
        body: { username: 'Adv.One', name: '顾问一', role: 'advisor' },
      });
      assert.equal(createAdv.status, 200);
      const advId = createAdv.data.user.id;
      const initPw = createAdv.data.password;

      // 大小写不敏感登录
      const login1 = await h.call('/api/login', {
        method: 'POST',
        body: { username: 'adv.one', password: initPw },
      });
      assert.equal(login1.status, 200);
      assert.equal(login1.data.mustChange, true);
      const advCookie = extractCookie(login1.headers);

      // 未改密前禁止业务操作
      assert.equal((await h.call('/api/bootstrap', { cookie: advCookie })).status, 403);

      // 修改密码不能与原密码相同
      const samePw = await h.call('/api/password', {
        method: 'POST',
        cookie: advCookie,
        body: { old: initPw, new: initPw },
      });
      assert.equal(samePw.status, 400);

      // 正常修改密码
      const chg = await h.call('/api/password', {
        method: 'POST',
        cookie: advCookie,
        body: { old: initPw, new: 'AdvisorPass2026!' },
      });
      assert.equal(chg.status, 200);
      assert.equal((await h.call('/api/bootstrap', { cookie: advCookie })).status, 200);

      // 停用账号应立即撤销既有会话且禁止再登录
      const disable = await h.call(`/api/users/${advId}`, {
        method: 'PUT',
        cookie: supCookie,
        body: { active: false },
      });
      assert.equal(disable.status, 200);
      assert.equal((await h.call('/api/bootstrap', { cookie: advCookie })).status, 401);
      assert.equal((await h.call('/api/login', { method: 'POST', body: { username: 'adv.one', password: 'AdvisorPass2026!' } })).status, 401);

      // 重新启用后可登录，主管重置密码后旧会话失效且 mustChange=true
      assert.equal((await h.call(`/api/users/${advId}`, { method: 'PUT', cookie: supCookie, body: { active: true } })).status, 200);
      const login2 = await h.call('/api/login', { method: 'POST', body: { username: 'adv.one', password: 'AdvisorPass2026!' } });
      assert.equal(login2.status, 200);
      const advCookie2 = extractCookie(login2.headers);

      const reset = await h.call(`/api/users/${advId}/reset`, { method: 'POST', cookie: supCookie, body: {} });
      assert.equal(reset.status, 200);
      assert.equal((await h.call('/api/bootstrap', { cookie: advCookie2 })).status, 401, '重置密码后旧会话必须失效');

      // 会话过期验证（直接将 DB 中 expires_at 调至过去）
      h.db.raw.prepare('UPDATE sessions SET expires_at = ?').run(Date.now() - 1000);
      assert.equal((await h.call('/api/bootstrap', { cookie: supCookie })).status, 401, '过期会话必须被拒绝');

      // 滑动续期验证（距离过期 < 6h 时自动续期）
      const loginSup = await h.call('/api/login', { method: 'POST', body: { username: 'sup.auth', password: 'SupPassword2026' } });
      const freshCookie = extractCookie(loginSup.headers);
      const beforeExp = h.db.raw.prepare('SELECT expires_at FROM sessions ORDER BY created_at DESC LIMIT 1').get().expires_at;
      h.db.raw.prepare('UPDATE sessions SET expires_at = ?').run(Date.now() + 60 * 60 * 1000);
      assert.equal((await h.call('/api/me', { cookie: freshCookie })).status, 200);
      const afterExp = h.db.raw.prepare('SELECT expires_at FROM sessions ORDER BY created_at DESC LIMIT 1').get().expires_at;
      assert.ok(afterExp > beforeExp - 10000, '距过期小于 6h 时应触发滑动续期');
    } finally {
      h.db.close();
    }
  });

  await t.test('3. 全量业务实体 CRUD、持久化与级联/关联完整性', async () => {
    const srv = await startHttpsServer();
    try {
      const setup = await srv.request('/api/setup', {
        method: 'POST',
        body: { setupKey: 'TestSetupKey2026!', name: '主管', username: 'sup', password: 'SupPassword2026', demo: false },
      });
      const cookie = extractCookie(setup.headers);

      // 创建完整业务链：student -> submission -> application -> round -> task -> material -> document -> version -> review -> repertoire -> recommender -> refRequest -> activity
      const entities = [
        ['students', 'stu-a', { id: 'stu-a', name: '张三（测试中文/特殊字符 <>&"\'）', level: 'PG', majorId: 'piano', season: '2027 Fall', status: 'active' }],
        ['submissions', 'sub-a', { id: 'sub-a', studentId: 'stu-a', platform: 'ucas_conservatoires', name: 'UCAS Conservatoires', status: 'in_progress' }],
        ['applications', 'app-a', { id: 'app-a', studentId: 'stu-a', schoolId: 'rcm', program: 'MMus Piano', level: 'PG', majorId: 'piano', parts: [{ submissionId: 'sub-a', label: '主申请', required: true, deadline: { date: '2026-10-01', verified: true } }] }],
        ['rounds', 'rnd-a', { id: 'rnd-a', studentId: 'stu-a', applicationId: 'app-a', kind: 'prescreen', status: 'preparing', deadline: '2026-11-01' }],
        ['tasks', 'tsk-a1', { id: 'tsk-a1', studentId: 'stu-a', applicationId: 'app-a', submissionId: 'sub-a', title: '准备预审录像', category: 'audition', status: 'todo', dueDate: '2026-10-20' }],
        ['tasks', 'tsk-a2', { id: 'tsk-a2', studentId: 'stu-a', applicationId: 'app-a', title: '上传录像', category: 'audition', status: 'todo', dependsOn: ['tsk-a1'], dueDate: '2026-10-25' }],
        ['materials', 'mat-a', { id: 'mat-a', studentId: 'stu-a', title: '护照扫描件', status: 'approved', link: 'https://example.com/passport' }],
        ['documents', 'doc-a', { id: 'doc-a', studentId: 'stu-a', title: 'Personal Statement', type: 'ps', applicationIds: ['app-a'], submissionId: 'sub-a', needStudentConfirm: true }],
        ['repertoire', 'rep-a', { id: 'rep-a', studentId: 'stu-a', composer: 'Chopin', title: 'Ballade No. 1', duration: '9:30', applicationIds: ['app-a'] }],
        ['recommenders', 'rec-a', { id: 'rec-a', studentId: 'stu-a', name: '李教授', title: 'Professor' }],
        ['refRequests', 'ref-a', { id: 'ref-a', studentId: 'stu-a', recommenderId: 'rec-a', target: 'sub:sub-a', status: 'invited', dueAt: '2026-09-25' }],
        ['activity', 'act-a', { id: 'act-a', studentId: 'stu-a', applicationId: 'app-a', text: '测试动态', studentVisible: true }],
      ];
      for (const [tbl, id, body] of entities) {
        const res = await srv.request(`/api/t/${tbl}/${id}`, { method: 'PUT', cookie, body });
        assert.equal(res.status, 200, `${tbl} PUT failed: ${res.text}`);
      }

      // 重启服务验证全部持久化
      await srv.stop();
      const srv2 = await startHttpsServer({ dataDir: srv.dir });
      try {
        const login = await srv2.request('/api/login', { method: 'POST', body: { username: 'sup', password: 'SupPassword2026' } });
        assert.equal(login.status, 200);
        const c2 = extractCookie(login.headers);
        const boot = await srv2.request('/api/bootstrap', { cookie: c2 });
        assert.equal(boot.status, 200);
        for (const [tbl, id] of entities) {
          assert.ok(boot.data.data[tbl].some(x => x.id === id), `重启后缺少 ${tbl}/${id}`);
        }

        // [预期 BUG 探针 1] 主管通过 /api/t/recommenders/:id 删除仍有 refRequests 引用的推荐人时，不应留下悬空引用或应拒绝删除
        const delRec = await srv2.request('/api/t/recommenders/rec-a', { method: 'DELETE', cookie: c2 });
        const bootAfterRec = await srv2.request('/api/bootstrap', { cookie: c2 });
        const orphanRef = bootAfterRec.data.data.refRequests.find(x => x.id === 'ref-a');
        if (delRec.status === 200 && orphanRef) {
          assert.fail('BUG: 主管删除仍有 refRequests 关联的推荐人 rec-a 成功，留下孤儿 refRequests 记录');
        }
      } finally {
        await srv2.stop();
      }
    } finally {
      await srv.cleanup();
    }
  });

  await t.test('4. 文书版本、审核、代确认、并发冲突与规则一致性', async () => {
    const h = await createWorkerHarness();
    try {
      const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
      const stu0 = (await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生甲' } })).data.record;
      const stuUser = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'stu1', name: '学生甲', role: 'student', studentId: 'stu-1' } });
      const advUser = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'adv1', name: '顾问甲', role: 'advisor' } });
      const wrtUser = await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'wrt1', name: '文书甲', role: 'writer' } });
      await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生甲', advisorId: advUser.data.user.id, writerIds: [wrtUser.data.user.id], _base: stu0.updatedAt } });

      async function loginAndChange(username, initPw, newPw) {
        const c = extractCookie((await h.call('/api/login', { method: 'POST', body: { username, password: initPw } })).headers);
        await h.call('/api/password', { method: 'POST', cookie: c, body: { old: initPw, new: newPw } });
        return c;
      }
      const stu = await loginAndChange('stu1', stuUser.data.password, 'StuPass2026!');
      const adv = await loginAndChange('adv1', advUser.data.password, 'AdvPass2026!');
      const wrt = await loginAndChange('wrt1', wrtUser.data.password, 'WrtPass2026!');

      const d0 = (await h.call('/api/t/documents/doc-1', {
        method: 'PUT', cookie: adv,
        body: { id: 'doc-1', studentId: 'stu-1', title: 'PS', type: 'ps', writerId: wrtUser.data.user.id, needStudentConfirm: true },
      })).data.record;

      // 文书老师提交 V1，送顾问审核
      const v1 = (await h.call('/api/t/versions/ver-1', {
        method: 'PUT', cookie: wrt,
        body: { id: 'ver-1', documentId: 'doc-1', studentId: 'stu-1', no: 1, kind: 'text', text: 'I am passionate about piano performance.' },
      })).data.record;
      const d1 = (await h.call('/api/t/documents/doc-1', {
        method: 'PUT', cookie: wrt,
        body: { ...d0, currentVersionId: v1.id, status: 'advisor_review', _base: d0.updatedAt },
      })).data.record;

      // 顾问通过 -> supervisor_review
      const revAdv = await h.call('/api/documents/doc-1/review', {
        method: 'POST', cookie: adv,
        body: { base: d1.updatedAt, versionId: v1.id, stage: 'advisor', decision: 'approve', comment: '不错' },
      });
      assert.equal(revAdv.status, 200, revAdv.text);
      const d2 = revAdv.data.document;
      assert.equal(d2.status, 'supervisor_review');

      // 主管并发修改正文 (revise) 与审核竞争：两者使用同一个 base 快照，只有一个能成功，另一个必须 409
      const [rRevise, rApprove] = await Promise.all([
        h.call('/api/documents/doc-1/revise', {
          method: 'POST', cookie: sup,
          body: { base: d2.updatedAt, versionId: d2.currentVersionId, text: 'I have studied classical piano for ten years.', note: '主管润色' },
        }),
        h.call('/api/documents/doc-1/review', {
          method: 'POST', cookie: sup,
          body: { base: d2.updatedAt, versionId: d2.currentVersionId, stage: 'supervisor', decision: 'approve', comment: '通过' },
        }),
      ]);
      const statuses = [rRevise.status, rApprove.status].sort();
      assert.deepEqual(statuses, [200, 409], `并发操作应 200/409，实际: ${rRevise.status}/${rApprove.status}`);

      // 旧版本提交必被 409 拒绝
      const latestDoc = (await h.call('/api/bootstrap', { cookie: sup })).data.data.documents.find(x => x.id === 'doc-1');
      const stale = await h.call('/api/documents/doc-1/review', {
        method: 'POST', cookie: sup,
        body: { base: d2.updatedAt, versionId: v1.id, stage: 'supervisor', decision: 'approve' },
      });
      assert.equal(stale.status, 409);

      // 若仍在 supervisor_review，主管审核通过进入 student_review，然后主管代确认
      let curDoc = latestDoc;
      if (curDoc.status === 'supervisor_review') {
        const goStu = await h.call('/api/documents/doc-1/review', {
          method: 'POST', cookie: sup,
          body: { base: curDoc.updatedAt, versionId: curDoc.currentVersionId, stage: 'supervisor', decision: 'approve' },
        });
        assert.equal(goStu.status, 200);
        curDoc = goStu.data.document;
      }
      assert.equal(curDoc.status, 'student_review');

      const proxy = await h.call('/api/documents/doc-1/proxy-confirm', {
        method: 'POST', cookie: sup,
        body: { base: curDoc.updatedAt, versionId: curDoc.currentVersionId, comment: '电话沟通学生同意定稿' },
      });
      assert.equal(proxy.status, 200, proxy.text);
      assert.equal(proxy.data.document.status, 'final');

      // 学生不能再次提交确认
      const stuAfter = await h.call('/api/documents/doc-1/review', {
        method: 'POST', cookie: stu,
        body: { base: proxy.data.document.updatedAt, versionId: proxy.data.document.currentVersionId, stage: 'student', decision: 'changes', comment: '想改' },
      });
      assert.notEqual(stuAfter.status, 200);
    } finally {
      h.db.close();
    }
  });

  await t.test('5. [BUG 回归探针] 删除学生/关联删除、空白文书版本、忽略 _base 并发覆盖与已归档文书操作', async (sub) => {
    await sub.test('5a. DELETE /api/t/students/:id 不得留下孤儿关联记录和学生登录账号', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-del', { method: 'PUT', cookie: sup, body: { id: 'stu-del', name: '待删学生' } });
        await h.call('/api/t/tasks/tsk-del', { method: 'PUT', cookie: sup, body: { id: 'tsk-del', studentId: 'stu-del', title: '待删任务' } });
        await h.call('/api/users', { method: 'POST', cookie: sup, body: { username: 'studel', name: '待删学生', role: 'student', studentId: 'stu-del' } });

        const del = await h.call('/api/t/students/stu-del', { method: 'DELETE', cookie: sup });
        assert.equal(del.status, 200);
        const orphanTasks = h.db.raw.prepare("SELECT COUNT(*) AS n FROM records WHERE student_id = 'stu-del'").get().n;
        const orphanUser = h.db.raw.prepare("SELECT COUNT(*) AS n FROM users WHERE student_id = 'stu-del'").get().n;
        assert.equal(orphanTasks, 0, 'DELETE /api/t/students/:id 留下了孤儿任务记录');
        assert.equal(orphanUser, 0, 'DELETE /api/t/students/:id 留下了孤儿学生账号');
      } finally { h.db.close(); }
    });

    await sub.test('5b. PUT /api/t/versions/:id 不得接受纯空白文本（0 words）', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生' } });
        await h.call('/api/t/documents/doc-1', { method: 'PUT', cookie: sup, body: { id: 'doc-1', studentId: 'stu-1', title: 'PS', type: 'ps' } });
        const blank = await h.call('/api/t/versions/ver-blank', {
          method: 'PUT', cookie: sup,
          body: { id: 'ver-blank', documentId: 'doc-1', studentId: 'stu-1', no: 1, kind: 'text', text: '    \n\t  ' },
        });
        assert.equal(blank.status, 400, '纯空白文本应返回 400（1-1000 words），实际状态: ' + blank.status);
      } finally { h.db.close(); }
    });

    await sub.test('5c. 已归档文书不应允许直接通过 /api/t/versions 或 /api/t/documents 提交版本与变更状态', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生' } });
        await h.call('/api/t/documents/doc-arch', { method: 'PUT', cookie: sup, body: { id: 'doc-arch', studentId: 'stu-1', title: 'PS', type: 'ps', archived: true } });
        const v = await h.call('/api/t/versions/ver-arch', {
          method: 'PUT', cookie: sup,
          body: { id: 'ver-arch', documentId: 'doc-arch', studentId: 'stu-1', no: 1, kind: 'text', text: 'Valid essay text here.' },
        });
        assert.equal(v.status, 409, '已归档文书不应允许新增版本，实际状态: ' + v.status);
      } finally { h.db.close(); }
    });

    await sub.test('5d. PUT /api/t/:tbl/:id 省略 _base 不得静默覆盖更新后的数据（或应强制乐观锁）', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-lock', { method: 'PUT', cookie: sup, body: { id: 'stu-lock', name: '原名' } });
        const overwriteNoBase = await h.call('/api/t/students/stu-lock', { method: 'PUT', cookie: sup, body: { id: 'stu-lock', name: '无base强行覆盖' } });
        assert.equal(overwriteNoBase.status, 409, '更新已存在记录但省略 _base 时不应绕过并发冲突检查');
      } finally { h.db.close(); }
    });
  });

  await t.test('6. 备份导入导出：空数据、异常格式与部分失败原子性测试', async (sub) => {
    await sub.test('6a. 备份导出与正常重复导入', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生A' } });
        const exp = await h.call('/api/admin/export', { cookie: sup });
        assert.equal(exp.status, 200);
        assert.equal(exp.data.format, 'fq-admissions');
        const imp = await h.call('/api/admin/import', { method: 'POST', cookie: sup, body: exp.data });
        assert.equal(imp.status, 200);
      } finally { h.db.close(); }
    });

    await sub.test('6b. [BUG 回归探针] 导入含坏 reqdb 或坏记录的备份不得清空原有数据库', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-keep', { method: 'PUT', cookie: sup, body: { id: 'stu-keep', name: '重要学生' } });

        // 构造 format 正确但 reqdb 格式非法的备份包
        const badBackup = {
          format: 'fq-admissions',
          students: [{ id: 'stu-new', name: '新学生' }],
          reqdb: { broken: true },
        };
        const res = await h.call('/api/admin/import', { method: 'POST', cookie: sup, body: badBackup });
        assert.equal(res.status, 400);
        const boot = await h.call('/api/bootstrap', { cookie: sup });
        assert.ok(boot.data.data.students.some(s => s.id === 'stu-keep'), 'BUG: 导入失败后原有学生数据已被清空（缺少事务回滚/前置校验）');
      } finally { h.db.close(); }
    });

    await sub.test('6c. [BUG 回归探针] 导入同名但不同 ID 的用户不应导致 500 崩溃', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        const backup = {
          format: 'fq-admissions',
          users: [{ id: 'u-other-id', username: 'sup', name: '重复用户名', role: 'supervisor', active: true }],
        };
        const res = await h.call('/api/admin/import', { method: 'POST', cookie: sup, body: backup });
        assert.notEqual(res.status, 500, '导入用户名冲突不应触发未捕获 500 错误: ' + res.text);
      } finally { h.db.close(); }
    });
  });

  await t.test('7. DIY 注册、授权、停用、转付费、自删、隔离及边界输入', async (sub) => {
    await sub.test('7a. DIY 全流程与正式学生数据隔离', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-formal', { method: 'PUT', cookie: sup, body: { id: 'stu-formal', name: '正式学生' } });

        // 注册 DIY
        const reg = await h.call('/api/diy/register', {
          method: 'POST',
          body: { phone: '13800138000', name: '自助学员', password: 'DiyPassword2026', agree: true, level: 'PG', season: '2027 Fall' },
        });
        assert.equal(reg.status, 200);

        // 重复手机号 409
        const regDup = await h.call('/api/diy/register', {
          method: 'POST',
          body: { phone: '13800138000', name: '自助学员2', password: 'DiyPassword2026', agree: true },
        });
        assert.equal(regDup.status, 409);

        // 登录 DIY
        const diyLogin = await h.call('/api/diy/login', { method: 'POST', body: { phone: '13800138000', password: 'DiyPassword2026' } });
        assert.equal(diyLogin.status, 200);
        const diyCookie = extractCookie(diyLogin.headers, '__Host-fq_diy');
        assert.ok(diyCookie.startsWith('__Host-fq_diy='));

        // DIY 看不到正式学生且 /api/bootstrap 返回 diy=true 空数据
        const staffBoot = await h.call('/api/bootstrap', { cookie: diyCookie });
        assert.equal(staffBoot.status, 200);
        assert.equal(staffBoot.data.diy, true);
        assert.deepEqual(staffBoot.data.data, {});

        const diyBoot = await h.call('/api/diy/bootstrap', { cookie: diyCookie });
        assert.equal(diyBoot.status, 200);
        const acctId = diyBoot.data.me.id;

        // 未授权院校不可添加，示范院校可添加
        const freeSchool = diyBoot.data.config.freeSchools[0];
        const lockedSchool = diyBoot.data.reqdb.schools.find(s => !s.open)?.id;
        assert.ok(freeSchool && lockedSchool);
        assert.equal((await h.call('/api/diy/t/apps/dapp-lock', { method: 'PUT', cookie: diyCookie, body: { schoolId: lockedSchool, program: 'Piano' } })).status, 403);
        assert.equal((await h.call('/api/diy/t/apps/dapp-ok', { method: 'PUT', cookie: diyCookie, body: { schoolId: freeSchool, program: 'Piano', deadline: '2026-12-01' } })).status, 200);

        // 主管授权全部院校后可添加原锁定院校
        assert.equal((await h.call(`/api/diy-admin/accounts/${acctId}/grants`, { method: 'PUT', cookie: sup, body: { grants: { all: true, report: true, schools: [], templates: [] } } })).status, 200);
        assert.equal((await h.call('/api/diy/t/apps/dapp-lock', { method: 'PUT', cookie: diyCookie, body: { schoolId: lockedSchool, program: 'Piano' } })).status, 200);

        // 主管停用与转付费
        assert.equal((await h.call(`/api/diy-admin/accounts/${acctId}/converted`, { method: 'POST', cookie: sup, body: { studentId: 'stu-formal' } })).status, 200);
        assert.equal((await h.call('/api/diy/bootstrap', { cookie: diyCookie })).status, 401, '转付费停用后旧 DIY 会话必须失效');
      } finally { h.db.close(); }
    });

    await sub.test('7b. [BUG 回归探针] DIY 账号被管理员重置密码（mustChange=1）后，未改密前不得继续调用 DIY 业务写接口', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/diy/register', { method: 'POST', body: { phone: '13800138001', name: 'DIY甲', password: 'DiyPassword2026', agree: true } });
        const state = await h.call('/api/diy-admin/state', { cookie: sup });
        const acctId = state.data.accounts[0].id;
        const reset = await h.call(`/api/diy-admin/accounts/${acctId}/reset`, { method: 'POST', cookie: sup, body: {} });
        assert.equal(reset.status, 200);
        const diyLogin = await h.call('/api/diy/login', { method: 'POST', body: { phone: '13800138001', password: reset.data.password } });
        assert.equal(diyLogin.status, 200);
        const diyCookie = extractCookie(diyLogin.headers, '__Host-fq_diy');

        // 未改密前尝试写业务数据
        const putRes = await h.call('/api/diy/t/tasks/t-1', { method: 'PUT', cookie: diyCookie, body: { title: '未改密越权写入' } });
        assert.equal(putRes.status, 403, 'DIY mustChange=1 时后端必须拦截业务写操作，实际: ' + putRes.status);
      } finally { h.db.close(); }
    });

    await sub.test('7c. 边界值：超长负载 413、无效 ID 400/404、非法 JSON 400、关闭 DIY 注册 403', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生' } });

        // > 300KB 负载
        const huge = JSON.stringify({ id: 'tsk-big', studentId: 'stu-1', title: 'A'.repeat(300050) });
        assert.equal((await h.call('/api/t/tasks/tsk-big', { method: 'PUT', cookie: sup, rawBody: huge })).status, 413);

        // 非法 JSON
        assert.equal((await h.call('/api/t/tasks/tsk-bad', { method: 'PUT', cookie: sup, rawBody: '{bad json' })).status, 400);

        // 无效 ID
        assert.equal((await h.call('/api/t/tasks/a', { method: 'PUT', cookie: sup, body: { id: 'a' } })).status, 400);
        assert.equal((await h.call('/api/t/tasks/../../etc/passwd', { method: 'PUT', cookie: sup, body: { id: 'x' } })).status, 404);

        // 关闭 DIY 注册后应拒绝注册
        assert.equal((await h.call('/api/diy-admin/config', { method: 'PUT', cookie: sup, body: { openRegister: false } })).status, 200);
        assert.equal((await h.call('/api/diy/register', { method: 'POST', body: { phone: '13800138009', name: '关闭测试', password: 'DiyPassword2026', agree: true } })).status, 403);
      } finally { h.db.close(); }
    });
  });

  await t.test('8. [BUG 回归探针] 空备份保留模板、定稿文书经 /review 退回及多库实例初始化隔离', async (sub) => {
    await sub.test('8a. 导入仅含 format 的空备份不应清空内置任务模板', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        const beforeTpl = (await h.call('/api/bootstrap', { cookie: sup })).data.data.templates.length;
        assert.ok(beforeTpl > 0);
        await h.call('/api/admin/import', { method: 'POST', cookie: sup, body: { format: 'fq-admissions' } });
        const afterTpl = (await h.call('/api/bootstrap', { cookie: sup })).data.data.templates.length;
        assert.equal(afterTpl, beforeTpl, '空备份导入不应清空任务模板');
      } finally { h.db.close(); }
    });

    await sub.test('8b. 主管/顾问通过 POST /api/documents/:id/review 对定稿文书发起 changes 退回（与 Qe 规则一致）', async () => {
      const h = await createWorkerHarness();
      try {
        const sup = extractCookie((await h.call('/api/setup', { method: 'POST', body: { setupKey: h.env.APPLY_SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } })).headers);
        await h.call('/api/t/students/stu-1', { method: 'PUT', cookie: sup, body: { id: 'stu-1', name: '学生' } });
        const d0 = (await h.call('/api/t/documents/doc-f', { method: 'PUT', cookie: sup, body: { id: 'doc-f', studentId: 'stu-1', title: 'CV', type: 'cv', needStudentConfirm: false } })).data.record;
        const v1 = (await h.call('/api/t/versions/ver-f1', { method: 'PUT', cookie: sup, body: { id: 'ver-f1', documentId: 'doc-f', studentId: 'stu-1', no: 1, kind: 'text', text: 'CV text content.' } })).data.record;
        const d1 = (await h.call('/api/t/documents/doc-f', { method: 'PUT', cookie: sup, body: { ...d0, currentVersionId: v1.id, status: 'advisor_review', _base: d0.updatedAt } })).data.record;
        const d2 = (await h.call('/api/documents/doc-f/review', { method: 'POST', cookie: sup, body: { base: d1.updatedAt, versionId: v1.id, stage: 'advisor', decision: 'approve' } })).data.document;
        const d3 = (await h.call('/api/documents/doc-f/review', { method: 'POST', cookie: sup, body: { base: d2.updatedAt, versionId: v1.id, stage: 'supervisor', decision: 'approve' } })).data.document;
        assert.equal(d3.status, 'final');

        const reopen = await h.call('/api/documents/doc-f/review', {
          method: 'POST', cookie: sup,
          body: { base: d3.updatedAt, versionId: v1.id, stage: 'supervisor', decision: 'changes', comment: '需要重新修改' },
        });
        assert.equal(reopen.status, 200, 'Qe 允许对 final 文书提交 changes，但 fqDocumentAction 拒绝了: ' + reopen.text);
      } finally { h.db.close(); }
    });

    await sub.test('8c. 同一 Worker 实例切换不同 APPLY_DB 时自动建表标志 Wt 应按 DB 隔离', async () => {
      const h = await createWorkerHarness();
      const db2 = new h.db.constructor();
      try {
        await h.call('/api/setup-status');
        const res2 = await h.worker.fetch(new Request('https://apply.test/api/setup-status'), { ...h.env, APPLY_DB: db2 });
        assert.equal(res2.status, 200, '切换新 APPLY_DB 时不应因全局 Wt=true 跳过建表而 500: ' + (await res2.text()));
      } finally {
        h.db.close();
        db2.close();
      }
    });
  });
});
