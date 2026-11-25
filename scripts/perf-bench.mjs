import os from 'node:os';
import { performance } from 'node:perf_hooks';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import https from 'node:https';
import { LocalDatabase } from './local-d1.mjs';

const ROOT = new URL('../', import.meta.url);
const SETUP_KEY = 'PerfBenchSetupKey2026!';

function stats(arr) {
  if (!arr.length) return { n: 0, min: 0, p50: 0, p95: 0, max: 0 };
  const s = [...arr].sort((a, b) => a - b);
  const idx = p => s[Math.min(s.length - 1, Math.floor((s.length - 1) * p))];
  return {
    n: s.length,
    min: +s[0].toFixed(2),
    p50: +idx(0.5).toFixed(2),
    p95: +idx(0.95).toFixed(2),
    max: +s[s.length - 1].toFixed(2),
  };
}

async function startServer({ dataDir, pbkdf2 }) {
  const t0 = performance.now();
  const child = spawn(process.execPath, ['scripts/dev.mjs'], {
    cwd: ROOT,
    env: {
      ...process.env,
      PORT: '0',
      LOCAL_DATA_DIR: dataDir,
      APPLY_SETUP_KEY: SETUP_KEY,
      ...(pbkdf2 ? { PBKDF2_ITERATIONS: String(pbkdf2) } : {}),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  const port = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server timeout: ' + output)), 20000);
    child.stderr.on('data', d => { output += d; });
    child.once('exit', c => { clearTimeout(timeout); reject(new Error(`Exited ${c}: ${output}`)); });
    child.stdout.on('data', d => {
      output += d;
      const m = output.match(/Local application: https:\/\/localhost:(\d+)/);
      if (m) { clearTimeout(timeout); resolve(Number(m[1])); }
    });
  });
  const coldStartMs = +(performance.now() - t0).toFixed(2);
  const ca = await readFile(join(dataDir, 'localhost-cert.pem'));
  const agent = new https.Agent({ keepAlive: true, ca, maxSockets: 64 });

  async function req(path, { method = 'GET', body, cookie = '' } = {}) {
    const t = performance.now();
    const textBody = body === undefined ? undefined : JSON.stringify(body);
    return new Promise((resolve, reject) => {
      const r = https.request({
        hostname: '127.0.0.1', port, path, method, agent, timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'X-FQ': '1',
          Origin: `https://localhost:${port}`,
          ...(cookie ? { Cookie: cookie } : {}),
        },
      }, res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          const ms = performance.now() - t;
          let data = null;
          if ((res.headers['content-type'] || '').includes('json')) {
            try { data = JSON.parse(buf.toString()); } catch {}
          }
          resolve({ status: res.statusCode, headers: res.headers, bytes: buf.length, ms, data });
        });
      });
      r.on('timeout', () => { r.destroy(new Error('HTTP timeout')); });
      r.on('error', reject);
      if (textBody !== undefined) r.write(textBody);
      r.end();
    });
  }

  async function stop() {
    agent.destroy();
    if (child.exitCode === null) {
      const exited = once(child, 'exit');
      child.kill('SIGTERM');
      await exited;
    }
  }
  return { port, coldStartMs, req, stop };
}

function generateSyntheticBackup(studentCount) {
  const now = new Date().toISOString();
  const backup = {
    format: 'fq-admissions',
    version: 2,
    exportedAt: now,
    users: [],
    students: [],
    applications: [],
    submissions: [],
    rounds: [],
    tasks: [],
    documents: [],
    versions: [],
    reviews: [],
    materials: [],
    repertoire: [],
    recommenders: [],
    refRequests: [],
    activity: [],
    templates: [],
  };
  for (let i = 0; i < studentCount; i++) {
    const sid = `syn-stu-${i}`;
    backup.students.push({
      id: sid, name: `合成压测学生_${i}`, level: i % 2 ? 'PG' : 'UG', majorId: 'piano',
      season: '2027 Fall', status: 'active', advisorId: 'u-adv-1', writerIds: ['u-wrt-1'],
      profile: { tests: [{ type: 'IELTS', overall: '6.5', subs: '6.0/6.0/6.0/6.0' }] },
      createdAt: now, updatedAt: now,
    });
    for (let j = 0; j < 3; j++) {
      const subId = `syn-sub-${i}-${j}`;
      const appId = `syn-app-${i}-${j}`;
      backup.submissions.push({ id: subId, studentId: sid, platform: 'school_portal', name: `Portal ${j}`, status: 'in_progress', createdAt: now, updatedAt: now });
      backup.applications.push({
        id: appId, studentId: sid, schoolId: ['rcm', 'ram', 'rncm'][j], program: 'Piano', level: i % 2 ? 'PG' : 'UG', majorId: 'piano',
        parts: [{ submissionId: subId, label: '主申请', required: true, deadline: { date: '2026-12-01', verified: true } }],
        createdAt: now, updatedAt: now,
      });
      backup.rounds.push({ id: `syn-rnd-${i}-${j}`, studentId: sid, applicationId: appId, kind: 'prescreen', status: 'preparing', deadline: '2026-11-15', createdAt: now, updatedAt: now });
    }
    for (let k = 0; k < 10; k++) {
      backup.tasks.push({
        id: `syn-tsk-${i}-${k}`, studentId: sid, applicationId: `syn-app-${i}-${k % 3}`,
        title: `合成任务_${i}_${k}`, category: 'materials', status: k % 4 === 0 ? 'done' : 'todo',
        dueDate: '2026-11-20', assigneeId: 'u-adv-1', createdAt: now, updatedAt: now,
      });
    }
    for (let d = 0; d < 2; d++) {
      const docId = `syn-doc-${i}-${d}`;
      const verId = `syn-ver-${i}-${d}`;
      backup.documents.push({ id: docId, studentId: sid, title: `文书_${i}_${d}`, type: 'ps', status: 'supervisor_review', currentVersionId: verId, writerId: 'u-wrt-1', needStudentConfirm: true, createdAt: now, updatedAt: now });
      backup.versions.push({ id: verId, documentId: docId, studentId: sid, no: 1, kind: 'text', text: 'I have studied classical piano for twelve years across solo and chamber repertoire. '.repeat(12), words: 168, createdAt: now, updatedAt: now });
      backup.reviews.push({ id: `syn-rev-${i}-${d}`, documentId: docId, studentId: sid, versionId: verId, stage: 'advisor', decision: 'approve', comment: 'Good draft', createdAt: now, updatedAt: now });
    }
    for (let m = 0; m < 2; m++) {
      backup.materials.push({ id: `syn-mat-${i}-${m}`, studentId: sid, title: `材料_${m}`, status: 'approved', createdAt: now, updatedAt: now });
      backup.repertoire.push({ id: `syn-rep-${i}-${m}`, studentId: sid, composer: 'Chopin', title: `Piece ${m}`, duration: '8:00', applicationIds: [`syn-app-${i}-0`], createdAt: now, updatedAt: now });
      const recId = `syn-rec-${i}-${m}`;
      backup.recommenders.push({ id: recId, studentId: sid, name: `Prof_${i}_${m}`, createdAt: now, updatedAt: now });
      backup.refRequests.push({ id: `syn-ref-${i}-${m}`, studentId: sid, recommenderId: recId, target: `sub:syn-sub-${i}-0`, status: 'invited', dueAt: '2026-11-01', createdAt: now, updatedAt: now });
      backup.activity.push({ id: `syn-act-${i}-${m}`, studentId: sid, text: `合成动态_${m}`, at: now, studentVisible: true, createdAt: now, updatedAt: now });
    }
  }
  const totalRecords = ['students', 'applications', 'submissions', 'rounds', 'tasks', 'documents', 'versions', 'reviews', 'materials', 'repertoire', 'recommenders', 'refRequests', 'activity']
    .reduce((acc, k) => acc + backup[k].length, 0);
  return { backup, totalRecords };
}

async function benchWorkerMemory(studentCounts) {
  const entry = new URL('../dist/_worker.js', import.meta.url).href;
  const results = [];
  for (const count of studentCounts) {
    const worker = (await import(entry + '?perf=' + count + '-' + Date.now())).default;
    const db = new LocalDatabase(':memory:');
    const env = { APPLY_DB: db, APPLY_SETUP_KEY: SETUP_KEY, PBKDF2_ITERATIONS: '10000', SITE_URL: 'https://www.fantasmearts.com', ASSETS: { fetch: async () => new Response('', { status: 404 }) } };
    const call = async (path, method = 'GET', body, cookie = '') => {
      const t0 = performance.now();
      const res = await worker.fetch(new Request('https://perf.test' + path, {
        method, headers: { 'Content-Type': 'application/json', 'X-FQ': '1', Origin: 'https://perf.test', ...(cookie ? { Cookie: cookie } : {}) },
        body: body === undefined ? undefined : JSON.stringify(body),
      }), env);
      const buf = Buffer.from(await res.arrayBuffer());
      return { status: res.status, headers: res.headers, bytes: buf.length, ms: performance.now() - t0, data: JSON.parse(buf.toString() || '{}') };
    };
    const supSetup = await call('/api/setup', 'POST', { setupKey: SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false });
    const cookie = supSetup.headers.get('Set-Cookie').split(';')[0];
    const { backup, totalRecords } = generateSyntheticBackup(count);
    const imp = await call('/api/admin/import', 'POST', backup, cookie);
    const memAfterImport = process.memoryUsage();

    const bootLat = []; let bootBytes = 0; let bootErr = 0;
    for (let i = 0; i < 15; i++) {
      const r = await call('/api/bootstrap', 'GET', undefined, cookie);
      if (r.status === 200) { bootLat.push(r.ms); bootBytes = r.bytes; } else bootErr++;
    }

    const putLat = []; let putErr = 0;
    for (let i = 0; i < 15; i++) {
      const r = await call(`/api/t/tasks/syn-tsk-0-${i % 10}`, 'PUT', {
        id: `syn-tsk-0-${i % 10}`, studentId: 'syn-stu-0', applicationId: 'syn-app-0-0', title: `更新任务_${i}`, status: 'doing',
      }, cookie);
      if (r.status === 200) putLat.push(r.ms); else putErr++;
    }

    // 文书修订耗时（递增版本，每次使用最新 updatedAt）
    const revLat = []; let revErr = 0;
    let docSnap = (await call('/api/bootstrap', 'GET', undefined, cookie)).data.data.documents.find(d => d.id === 'syn-doc-0-0');
    for (let i = 0; i < 10; i++) {
      const r = await call('/api/documents/syn-doc-0-0/revise', 'POST', {
        base: docSnap.updatedAt, versionId: docSnap.currentVersionId, text: `Revised essay version ${i} with unique content ${Math.random()}`, note: `rev ${i}`,
      }, cookie);
      if (r.status === 200) { revLat.push(r.ms); docSnap = r.data.document; } else revErr++;
    }

    const expLat = []; let expBytes = 0;
    for (let i = 0; i < 5; i++) {
      const r = await call('/api/admin/export', 'GET', undefined, cookie);
      expLat.push(r.ms); expBytes = r.bytes;
    }

    // AI 纯计算接口：brief & auditAll（无真实 AI Key 场景也需检查或测算）
    const auditAllLat = [];
    for (let i = 0; i < 5; i++) {
      const t0 = performance.now();
      const res = await worker.fetch(new Request('https://perf.test/api/ai/run', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-FQ': '1', Origin: 'https://perf.test', Cookie: cookie },
        body: JSON.stringify({ action: 'auditAll' }),
      }), env);
      await res.text();
      auditAllLat.push(performance.now() - t0);
    }

    results.push({
      tier: count === 10 ? 'small' : count === 100 ? 'medium' : 'large',
      students: count,
      totalRecords,
      importMs: +imp.ms.toFixed(2),
      importStatus: imp.status,
      bootstrap: { ...stats(bootLat), bytes: bootBytes, errors: bootErr },
      taskPut: { ...stats(putLat), errors: putErr },
      docRevise: { ...stats(revLat), errors: revErr },
      export: { ...stats(expLat), bytes: expBytes },
      aiAuditAll: stats(auditAllLat),
      memoryMB: {
        rss: +(memAfterImport.rss / 1048576).toFixed(1),
        heapUsed: +(memAfterImport.heapUsed / 1048576).toFixed(1),
      },
    });
    db.close();
  }
  return results;
}

async function benchHttpsAndConcurrency() {
  const dirDefault = await mkdtemp(join(tmpdir(), 'perf-https-100k-'));
  const dirFast = await mkdtemp(join(tmpdir(), 'perf-https-10k-'));
  try {
    // 1. 生产默认 PBKDF2=100000 下的冷启动与登录延迟
    const sProd = await startServer({ dataDir: dirDefault });
    const setupP = await sProd.req('/api/setup', { method: 'POST', body: { setupKey: SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } });
    const login100k = [];
    for (let i = 0; i < 5; i++) {
      const r = await sProd.req('/api/login', { method: 'POST', body: { username: 'sup', password: 'SupPassword2026' } });
      login100k.push(r.ms);
    }
    await sProd.stop();

    // 2. HTTPS 下中规模（100 学生 / 3400 记录）并发压测（PBKDF2=10000）
    const sFast = await startServer({ dataDir: dirFast, pbkdf2: 10000 });
    const setupF = await sFast.req('/api/setup', { method: 'POST', body: { setupKey: SETUP_KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: false } });
    const cookie = setupF.headers['set-cookie'][0].split(';')[0];
    const login10k = [];
    for (let i = 0; i < 5; i++) login10k.push((await sFast.req('/api/login', { method: 'POST', body: { username: 'sup', password: 'SupPassword2026' } })).ms);

    const { backup } = generateSyntheticBackup(100);
    await sFast.req('/api/admin/import', { method: 'POST', cookie, body: backup });

    const concBootstrap = {};
    for (const c of [5, 10, 20]) {
      const res = await Promise.all(Array.from({ length: c }, () => sFast.req('/api/bootstrap', { cookie })));
      const ok = res.filter(r => r.status === 200).map(r => r.ms);
      concBootstrap[`c${c}`] = { ...stats(ok), total: c, errors: c - ok.length };
    }

    // 并发竞争写入测试：10 个并发同时 revise 同一份文书同一版本
    const doc0 = (await sFast.req('/api/bootstrap', { cookie })).data.data.documents.find(d => d.id === 'syn-doc-0-0');
    const raceRevise = await Promise.all(Array.from({ length: 10 }, (_, idx) =>
      sFast.req('/api/documents/syn-doc-0-0/revise', {
        method: 'POST', cookie,
        body: { base: doc0.updatedAt, versionId: doc0.currentVersionId, text: `Concurrent revision ${idx} text.`, note: `race ${idx}` },
      })
    ));
    const revise200 = raceRevise.filter(r => r.status === 200).length;
    const revise409 = raceRevise.filter(r => r.status === 409).length;
    const reviseOther = raceRevise.filter(r => r.status !== 200 && r.status !== 409).map(r => r.status);

    // 并发竞争 PUT /api/t/tasks/:id 带相同 _base
    const task0 = (await sFast.req('/api/bootstrap', { cookie })).data.data.tasks.find(t => t.id === 'syn-tsk-0-0');
    const raceTask = await Promise.all(Array.from({ length: 10 }, (_, idx) =>
      sFast.req('/api/t/tasks/syn-tsk-0-0', {
        method: 'PUT', cookie,
        body: { ...task0, title: `Race_${idx}`, _base: task0.updatedAt },
      })
    ));
    const task200 = raceTask.filter(r => r.status === 200).length;
    const task409 = raceTask.filter(r => r.status === 409).length;

    await sFast.stop();

    return {
      coldStartMs: sProd.coldStartMs,
      loginPbkdf2_100k_ms: stats(login100k),
      loginPbkdf2_10k_ms: stats(login10k),
      httpsMediumBootstrapConcurrency: concBootstrap,
      reviseConcurrencyRace10: { ok200: revise200, conflict409: revise409, other: reviseOther, latenciesMs: stats(raceRevise.map(r => r.ms)) },
      taskPutConcurrencyRace10: { ok200: task200, conflict409: task409, latenciesMs: stats(raceTask.map(r => r.ms)) },
    };
  } finally {
    await rm(dirDefault, { recursive: true, force: true });
    await rm(dirFast, { recursive: true, force: true });
  }
}

const envInfo = {
  node: process.version,
  platform: `${os.platform()} ${os.release()} (${os.arch()})`,
  cpus: `${os.cpus().length}x ${os.cpus()[0]?.model || 'unknown'}`,
  totalMemMB: Math.round(os.totalmem() / 1048576),
  note: 'Local SQLite/D1 adapter (scripts/dev.mjs) serializes requests via a single Promise queue; does not measure Cloudflare D1 distributed concurrency or Worker CPU limits.',
};

const scales = await benchWorkerMemory([10, 100, 500]);
const httpsConcurrency = await benchHttpsAndConcurrency();

console.log(JSON.stringify({ envInfo, scales, httpsConcurrency }, null, 2));
