const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const root = process.argv[2], SP = process.argv[3];
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'm3-'));
const KEY = 'M3MockupKey2026!!';
const srv = spawn('node', ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dataDir, APPLY_SETUP_KEY: KEY, PBKDF2_ITERATIONS: '10000' } });
let out = ''; const base = new Promise((res, rej) => { srv.stdout.on('data', d => { out += d; const m = out.match(/https:\/\/localhost:(\d+)/); if (m) res(m[0]); }); setTimeout(() => rej(new Error(out)), 20000); });

const icon = (d) => `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px">${d}</svg>`;
const CHECK = icon('<path d="M20 6 9 17l-5-5"/>'), ALERT = icon('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>'), BELL = icon('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>');
const CSS = `<style>
.rm-group{margin:18px 0 8px;font-size:12px;font-weight:700;color:var(--muted);letter-spacing:.04em;display:flex;align-items:center;gap:8px}
.rm-group .n{font-weight:600;color:var(--muted2)}
.rm-card{display:grid;grid-template-columns:4px 1fr auto;gap:0 14px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px 12px 0;margin-bottom:10px;align-items:center}
.rm-bar{align-self:stretch;border-radius:0 4px 4px 0}
.rm-bar.high{background:#C0392B}.rm-bar.normal{background:#D98E2B}.rm-bar.low{background:#B9B3C2}
.rm-title{font-weight:650;font-size:14px;color:var(--fg)}
.rm-note{font-size:12.5px;color:var(--muted);margin-top:3px;line-height:1.55}
.rm-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;font-size:12px;color:var(--muted2)}
.rm-meta .due-late{color:#B3261E;font-weight:650}.rm-meta .due-today{color:#B26A00;font-weight:650}
.rm-acts{display:flex;gap:8px}
.rm-card.done{opacity:.62}.rm-card.done .rm-title{text-decoration:line-through}
.rm-block{margin-top:6px;font-size:12.5px;color:#8A3B12;background:#FFF4E8;border-radius:8px;padding:6px 9px}
.rm-sync{font-size:11.5px;color:var(--muted2)}
.rm-filter{display:flex;gap:8px;align-items:center;margin:4px 0 4px}
</style>`;
const card = (r, me) => `<div class="rm-card ${r.st==='done'?'done':''}"><div class="rm-bar ${r.imp}"></div><div>
<div class="rm-title">${r.t}</div>${r.note?`<div class="rm-note">${r.note}</div>`:''}
${r.st==='blocked'?`<div class="rm-block">${ALERT} 遇阻：${r.reason}</div>`:''}
<div class="rm-meta">${r.dueCls?`<span class="${r.dueCls}">${r.dueTxt}</span>`:`<span>${r.dueTxt}</span>`}<span>${{high:'重要',normal:'普通',low:'低'}[r.imp]}</span>${me?'':`<span>负责：${r.who}</span>`}<span>来自主管 · ${r.at}</span>${r.st!=='open'?`<span class="rm-sync">${r.st==='done'?'已完成':'已报遇阻'} · 已同步给主管</span>`:''}</div>
</div><div class="rm-acts">${me && r.st==='open'?`<button class="btn sm">${ALERT} 遇阻</button><button class="btn sm primary">${CHECK} 完成</button>`: me && r.st==='blocked' ? `<button class="btn sm primary">${CHECK} 完成</button>` : r.st==='done'?`<span class="pill ok">已完成</span>`:r.st==='blocked'?`<span class="pill warn">遇阻</span>`:`<span class="pill">待办</span>`}</div></div>`;
const advisorRows = [
 {g:'逾期',t:'给林同学补交 IU Jacobs 成绩单公证件',note:'学校邮件说 12/1 前必须收到纸质件，确认是否已寄出。',imp:'high',dueTxt:'已逾期 2 天 · 11/25',dueCls:'due-late',at:'11/22',st:'open'},
 {g:'今天',t:'确认 RNCM 面试时间并告知学生',note:'',imp:'normal',dueTxt:'今天截止',dueCls:'due-today',at:'11/26',st:'open'},
 {g:'本周',t:'整理王同学三封推荐信状态',note:'Curtis 截止前要齐，缺哪封列出来。',imp:'normal',dueTxt:'11/30 截止',at:'11/27',st:'blocked',reason:'第二推荐人李老师出国，邮件未回，已改约 12/2 电话。'},
 {g:'已完成',t:'把陈同学的作品集链接发给 Juilliard',note:'',imp:'low',dueTxt:'11/24',at:'11/20',st:'done'},
];
(async () => {
  const url = await base;
  const browser = await chromium.launch();
  const mk = async () => { const c = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 860 }, deviceScaleFactor: 2 }); return [c, await c.newPage()]; };
  let [c0, p0] = await mk(); await p0.goto(url + '/login');
  const api = (p, m, u, b) => p.evaluate(async ([m, u, b]) => { const r = await fetch('/api' + u, { method: m, headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: b ? JSON.stringify(b) : undefined }); return r.json().catch(() => null); }, [m, u, b]);
  const setup = await api(p0, 'POST', '/setup', { setupKey: KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: true });
  const adv = (setup.accounts || []).find(a => /顾问|advisor/i.test(a.name + a.role + a.username));
  await c0.close();
  const creds = {};
  async function shot(user, pass, name, inject) {
    pass = creds[user] || pass;
    const [c, p] = await mk(); await p.goto(url + '/login');
    await api(p, 'POST', '/login', { username: user, password: pass });
    const me = await api(p, 'GET', '/me'); if (me && me.me && me.me.mustChange) { await api(p, 'POST', '/password', { old: pass, new: pass + 'Zz9!' }); creds[user] = pass + 'Zz9!'; }
    await p.goto(url + '/#/tasks'); await p.waitForTimeout(1300);
    await p.evaluate(({ CSS, html, modal, badge }) => {
      document.head.insertAdjacentHTML('beforeend', CSS);
      const content = document.querySelector('.content'); content.innerHTML = html;
      if (badge) { const nb = document.querySelector('.nav-btn[data-href="#/tasks"]'); if (nb) { const ex = nb.querySelector('.count'); if (ex) ex.textContent = badge; else nb.insertAdjacentHTML('beforeend', `<span class="count hot">${badge}</span>`); nb.classList.add('active'); } }
      if (modal) document.body.insertAdjacentHTML('beforeend', modal);
    }, inject);
    await p.waitForTimeout(300); await p.screenshot({ path: path.join(SP, name) }); await c.close();
  }
  const groups = (rows, me) => { let h = '', last = ''; for (const r of rows) { if (r.g !== last) { const n = rows.filter(x => x.g === r.g).length; h += `<div class="rm-group">${r.g}<span class="n">${n}</span></div>`; last = r.g; } h += card(r, me); } return h; };
  const head = (title, sub, tabs) => `<div class="page-head"><div><h2>${title}</h2><p>${sub}</p></div></div><div class="tabs">${tabs}</div>`;
  // A 顾问视角
  const A = { CSS, badge: '3', html: head('我的任务<em>Tasks</em>', '申请任务与主管交办的提醒', `<button class="tab">申请任务<span class="count">6</span></button><button class="tab active">${BELL} 主管提醒<span class="count hot">3</span></button>`) + `<div class="notice info" style="margin-top:14px"><div>主管经助理推送的提醒。点「完成」或「遇阻」后会自动同步给主管。</div></div>` + groups(advisorRows, true) };
  await shot(adv.username, adv.password, 'm3-A-advisor.png', A);
  // B 遇阻弹窗
  const B = { ...A, modal: `<div class="modal-bg"><form class="modal" role="dialog"><div class="modal-head"><div><h2>报告遇阻</h2><p>给林同学补交 IU Jacobs 成绩单公证件</p></div></div><div class="modal-body"><label class="field full"><span class="label">卡在哪里 / 需要什么帮助 <b style="color:#B3261E">*</b></span><textarea class="textarea" rows="4">公证处要求学生本人到场，学生 12/3 才回国，需要主管决定是否改用电子件先行提交。</textarea></label><div class="tiny muted2" style="margin-top:8px">提交后会同步给主管，在主管的待办里生成一条「待处理：遇阻」。之后仍可点「完成」。</div></div><div class="modal-foot"><span class="spacer"></span><button type="button" class="btn">取消</button><button type="button" class="btn primary">${ALERT} 提交遇阻</button></div></form></div>` };
  await shot(adv.username, adv.password, 'm3-B-blocked-dialog.png', B);
  // C 主管视角
  const supRows = [
   {g:'遇阻',t:'整理王同学三封推荐信状态',imp:'normal',dueTxt:'11/30 截止',at:'11/27',st:'blocked',who:'李顾问',reason:'第二推荐人李老师出国，邮件未回，已改约 12/2 电话。'},
   {g:'逾期',t:'给林同学补交 IU Jacobs 成绩单公证件',imp:'high',dueTxt:'已逾期 2 天 · 11/25',dueCls:'due-late',at:'11/22',st:'open',who:'李顾问'},
   {g:'进行中',t:'确认 RNCM 面试时间并告知学生',imp:'normal',dueTxt:'今天截止',dueCls:'due-today',at:'11/26',st:'open',who:'李顾问'},
   {g:'进行中',t:'核对张同学 Berklee 申请费付款',imp:'low',dueTxt:'12/02 截止',at:'11/27',st:'open',who:'周顾问'},
   {g:'近 7 天已完成',t:'把陈同学的作品集链接发给 Juilliard',imp:'low',dueTxt:'11/24',at:'11/20',st:'done',who:'周顾问'},
  ];
  const C = { CSS, html: head('任务<em>Tasks</em>', '全部顾问的申请任务与主管提醒', `<button class="tab">申请任务<span class="count">14</span></button><button class="tab active">${BELL} 主管提醒<span class="count hot">1 遇阻</span></button>`) + `<div class="rm-filter" style="margin-top:14px"><select class="input" style="width:160px"><option>全部顾问</option></select><select class="input" style="width:140px"><option>全部状态</option></select><span class="small muted2" style="margin-left:auto">提醒只能从助理推送；完成与遇阻会自动回到你的待办</span></div>` + groups(supRows, false) };
  await shot('sup', 'SupPassword2026', 'm3-C-supervisor.png', C);
  await browser.close(); srv.kill(); console.log('done', adv.username);
})().catch(e => { console.error('ERR', e.message); srv.kill(); process.exit(1); });
