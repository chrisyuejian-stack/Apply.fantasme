const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
// BUG-10：375px 视口下页面不得出现横向滚动，且员工端顶栏保留全局搜索入口。
// 运行：NODE_PATH=$(npm root -g) node tests/e2e/mobile_overflow.cjs（需要 playwright；不在 npm test 内）
const root = process.argv[2] || path.resolve(__dirname, '../..');
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ovf-'));
const KEY = 'OverflowCheck2026!';
const srv = spawn('node', ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dataDir, APPLY_SETUP_KEY: KEY, PBKDF2_ITERATIONS: '10000' } });
let out = '';
const base = new Promise((res, rej) => {
  srv.stdout.on('data', d => { out += d; const m = out.match(/https:\/\/localhost:(\d+)/); if (m) res(m[0]); });
  srv.on('exit', c => rej(new Error('server exit ' + c + out)));
  setTimeout(() => rej(new Error('timeout ' + out)), 20000);
});
(async () => {
  const url = await base;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto(url + '/login');
  const setup = await page.evaluate(async key => {
    const r = await fetch('/api/setup', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: JSON.stringify({ setupKey: key, name: '主管', username: 'sup', password: 'SupPassword2026', demo: true }) });
    return { status: r.status, body: await r.json() };
  }, KEY);
  const accts = setup.body.created || [];
  const results = {};
  const roles = [['sup', 'SupPassword2026']];
  const wr = accts.find(a => /writer|文书/i.test(a.name + a.username));
  if (wr) roles.push([wr.username, wr.password]);
  for (const [u, p] of roles) {
    const c2 = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 375, height: 812 } });
    const pg = await c2.newPage();
    await pg.goto(url + '/login');
    const login = await pg.evaluate(async ([u, p]) => (await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: JSON.stringify({ username: u, password: p }) })).status, [u, p]);
    const routes = ['#/home', '#/app/app-1/overview', '#/app/app-1/req', '#/app/app-1/tasks'];
    for (const r of routes) {
      await pg.goto(url + '/' + r); await pg.waitForTimeout(900);
      const m = await pg.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const wide = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > vw + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 4).map(e => e.tagName.toLowerCase() + '.' + String(e.className).split(' ').slice(0, 2).join('.') + ':' + Math.round(e.getBoundingClientRect().right));
        return { scrollW: document.documentElement.scrollWidth, vw, search: !!document.querySelector('[data-act="global-search"]') && getComputedStyle(document.querySelector('[data-act="global-search"]')).display !== 'none', wide };
      });
      results[u + ' ' + r] = { login, ...m };
    }
    await c2.close();
  }
  console.log(JSON.stringify(results, null, 1));
  await browser.close(); srv.kill();
  const bad = Object.entries(results).filter(([, v]) => v.login !== 200 || v.scrollW > v.vw + 1 || (v.search === false && /^sup /.test(v[0] || '')));
  const noSearch = Object.entries(results).filter(([k, v]) => k.startsWith('sup ') && !v.search);
  if (bad.length || noSearch.length) { console.error('FAIL', bad.map(b => b[0]), noSearch.map(b => b[0])); process.exit(1); }
  console.log('OK: 无横向溢出，主管端顶栏有搜索入口');
})().catch(e => { console.error(e.message); srv.kill(); process.exit(1); });
