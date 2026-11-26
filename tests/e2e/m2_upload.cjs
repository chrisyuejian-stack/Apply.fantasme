const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
// M2：在本地开发环境（LocalR2）用真实浏览器走一遍「上传文件 → 保存版本 → 下载」，并核对下载内容逐字节一致。
// 运行：NODE_PATH=$(npm root -g) node tests/e2e/m2_upload.cjs（需要 playwright；不在 npm test 内）
const root = process.argv[2] || path.resolve(__dirname, '../..');
const SP = fs.mkdtempSync(path.join(os.tmpdir(), 'm2-e2e-'));
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'm2-'));
const KEY = 'M2UploadCheck2026!';
const srv = spawn('node', ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dataDir, APPLY_SETUP_KEY: KEY, PBKDF2_ITERATIONS: '10000' } });
let out = '';
const base = new Promise((res, rej) => { srv.stdout.on('data', d => { out += d; const m = out.match(/https:\/\/localhost:(\d+)/); if (m) res(m[0]); }); srv.stderr.on('data', d => out += d); setTimeout(() => rej(new Error('timeout ' + out)), 20000); });
(async () => {
  const url = await base;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, acceptDownloads: true, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(url + '/login');
  const api = (m, p, b) => page.evaluate(async ([m, p, b]) => { const r = await fetch('/api' + p, { method: m, headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: b ? JSON.stringify(b) : undefined }); return { s: r.status, d: await r.json().catch(() => null) }; }, [m, p, b]);
  await api('POST', '/setup', { setupKey: KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: true });
  console.log('login', (await api('POST', '/login', { username: 'sup', password: 'SupPassword2026' })).s);
  const boot = (await api('GET', '/bootstrap')).d;
  const doc = boot.data.documents.find(d => ['drafting', 'revising'].includes(d.status) && !d.archived);
  console.log('doc', doc && doc.id, doc && doc.status);
  await page.goto(url + '/#/doc/' + doc.id); await page.waitForTimeout(1200);
  await page.click(`[data-act="ver-new"][data-id="${doc.id}"]`); await page.waitForTimeout(400);
  await page.click('label:has(input[name="mode"][value="upload"])');
  console.log('upload panel visible', await page.isVisible('#verUpload'), 'text hidden', !(await page.isVisible('#verText')));
  const pdf = path.join(SP, 'Lin_PS_V9.pdf'); fs.writeFileSync(pdf, '%PDF-1.4\n% test file for M2\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n');
  await page.setInputFiles('input[name="file"]', pdf);
  await page.click('button:has-text("保存版本")'); await page.waitForTimeout(2000);
  const after = (await api('GET', '/bootstrap')).d;
  const ver = after.data.versions.filter(v => v.documentId === doc.id).sort((a, b) => b.no - a.no)[0];
  console.log('saved version', ver && ver.kind, ver && ver.upload && ver.upload.name, ver && ver.upload && ver.upload.size, 'sha', ver && ver.upload && ver.upload.sha256 && ver.upload.sha256.slice(0, 12));
  await page.goto(url + '/#/doc/' + doc.id); await page.waitForTimeout(1200);
  const link = page.locator(`a[href^="/api/files/"]`).first();
  console.log('download links', await page.locator('a[href^="/api/files/"]').count());
  const [dl] = await Promise.all([page.waitForEvent('download'), link.click()]);
  const saved = path.join(SP, 'dl.bin'); await dl.saveAs(saved);
  console.log('download name', dl.suggestedFilename(), 'bytes equal', fs.readFileSync(saved).equals(fs.readFileSync(pdf)));
  // 伪装类型应被拒
  const bad = await page.evaluate(async id => { const r = await fetch('/api/files?documentId=' + id, { method: 'POST', headers: { 'Content-Type': 'application/pdf', 'X-File-Name': 'x.pdf', 'X-FQ': '1' }, body: 'not a pdf' }); return r.status; }, doc.id);
  console.log('upload after submit-to-review (stage check)', bad, 'pageerrors', errors.length ? errors : 'none');
  await browser.close(); srv.kill();
  const ok = ver && ver.kind === 'upload' && fs.readFileSync(saved).equals(fs.readFileSync(pdf)) && bad === 403 && !errors.length;
  if (!ok) { console.error('FAIL'); process.exit(1); }
  console.log('OK: 上传、保存、下载一致');
})().catch(e => { console.error('ERR', e.message, out.slice(-500)); srv.kill(); process.exit(1); });
