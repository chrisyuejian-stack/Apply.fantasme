const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const root = process.argv[2], SP = process.argv[3];
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'm4-'));
const KEY = 'M4MockupKey2026!!';
const srv = spawn('node', ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dataDir, APPLY_SETUP_KEY: KEY, PBKDF2_ITERATIONS: '10000' } });
let out = ''; const base = new Promise((res, rej) => { srv.stdout.on('data', d => { out += d; const m = out.match(/https:\/\/localhost:(\d+)/); if (m) res(m[0]); }); setTimeout(() => rej(new Error(out)), 20000); });
const svg = d => `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px">${d}</svg>`;
const CHECK = svg('<path d="M20 6 9 17l-5-5"/>'), X = svg('<path d="M18 6 6 18M6 6l12 12"/>'), COPY = svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'), DL = svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>'), CARD = svg('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'), PLUS = svg('<path d="M12 5v14M5 12h14"/>');
// 示例二维码（伪图案，仅示意）
function fakeQR(size) { let s = `<svg width="${size}" height="${size}" viewBox="0 0 29 29" style="background:#fff;border-radius:8px"><g fill="#1E1A26">`; let seed = 7; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280; for (let y = 0; y < 29; y++) for (let x = 0; x < 29; x++) { const f = (x < 8 && y < 8) || (x > 20 && y < 8) || (x < 8 && y > 20); if (f) { const ix = x > 20 ? x - 21 : x, iy = y > 20 ? y - 21 : y; if (ix === 0 || iy === 0 || ix === 6 || iy === 6 || (ix > 1 && ix < 5 && iy > 1 && iy < 5)) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`; } else if (r() > .55) s += `<rect x="${x}" y="${y}" width="1" height="1"/>`; } return s + '</g></svg>'; }
const CSS = `<style>
.fb-amount{font-size:30px;font-weight:750;color:var(--accent);letter-spacing:.01em}.fb-amount small{font-size:15px;font-weight:600;margin-right:2px}
.fb-items{width:100%;border-collapse:collapse;font-size:13px}.fb-items td{padding:9px 0;border-bottom:1px dashed var(--line)}.fb-items td:last-child{text-align:right;font-weight:600;white-space:nowrap}
.fb-ref{display:inline-flex;align-items:center;gap:8px;background:#FFF4E8;color:#8A3B12;border-radius:8px;padding:6px 10px;font-weight:700;font-size:15px;letter-spacing:.06em}
.fb-qr{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px;background:var(--panel2);border-radius:12px}
.fb-seg{display:flex;gap:6px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:3px}.fb-seg span{padding:5px 12px;border-radius:8px;font-size:12.5px;font-weight:600}.fb-seg .on{background:var(--accent);color:#fff}
.fb-steps{display:flex;gap:6px;font-size:11.5px;color:var(--muted2);flex-wrap:wrap}.fb-steps b{color:var(--accent)}
.fb-row{display:grid;grid-template-columns:1fr auto auto;gap:14px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:10px}
.fb-row .t{font-weight:650;font-size:14px}.fb-row .m{font-size:12px;color:var(--muted2);margin-top:4px;display:flex;gap:10px;flex-wrap:wrap}
.fb-money{font-weight:700;font-size:15px;color:var(--fg);white-space:nowrap}
.fb-note{font-size:12.5px;color:#8A3B12;background:#FFF4E8;border-radius:8px;padding:6px 9px;margin-top:6px}
.fb-grp{margin:16px 0 8px;font-size:12px;font-weight:700;color:var(--muted);display:flex;gap:8px}.fb-grp .n{color:var(--muted2);font-weight:600}
.fb-line{display:grid;grid-template-columns:1fr 130px 32px;gap:8px;align-items:center;margin-bottom:8px}
.fb-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}.fb-th{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}.fb-th .img{height:64px;background:linear-gradient(135deg,#EDE7F6,#F7F5F9);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted2)}.fb-th .cap{font-size:11px;padding:5px 6px;color:var(--fg);line-height:1.3}
.fb-up{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.fb-upc{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff}.fb-upc .img{height:74px;background:linear-gradient(135deg,#EDE7F6,#F7F5F9);display:flex;align-items:center;justify-content:center;font-size:10.5px;color:var(--muted2);position:relative}.fb-upc .x{position:absolute;top:4px;right:4px;background:#fff;border-radius:6px;padding:1px 4px;font-size:11px}.fb-upc input{border:0;border-top:1px solid var(--line);width:100%;padding:7px 8px;font-size:12px;outline:none}.fb-upc .bar{height:3px;background:#E7E2EC}.fb-upc .bar i{display:block;height:3px;background:var(--accent)}
</style>`;
(async () => {
  const url = await base; const browser = await chromium.launch();
  const mk = async (w, h) => { const c = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: w, height: h }, deviceScaleFactor: 2 }); return [c, await c.newPage()]; };
  let [c0, p0] = await mk(1280, 860); await p0.goto(url + '/login');
  const api = (p, m, u, b) => p.evaluate(async ([m, u, b]) => { const r = await fetch('/api' + u, { method: m, headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: b ? JSON.stringify(b) : undefined }); return r.json().catch(() => null); }, [m, u, b]);
  const setup = await api(p0, 'POST', '/setup', { setupKey: KEY, name: '主管', username: 'sup', password: 'SupPassword2026', demo: true }); await c0.close();
  const acct = re => (setup.accounts || []).find(a => re.test(a.name + ' ' + (a.role || '') + ' ' + a.username));
  const stu = acct(/学生|student|林同学|lin/i), adv = acct(/顾问|advisor/i);
  const creds = {};
  async function shot(user, pass, route, name, w, h, html, modal, badge) {
    pass = creds[user] || pass; const [c, p] = await mk(w, h); await p.goto(url + '/login');
    await api(p, 'POST', '/login', { username: user, password: pass });
    const me = await api(p, 'GET', '/me'); if (me && me.me && me.me.mustChange) { await api(p, 'POST', '/password', { old: pass, new: pass + 'Zz9!' }); creds[user] = pass + 'Zz9!'; }
    await p.goto(url + '/' + route); await p.waitForTimeout(1300);
    await p.evaluate(({ CSS, html, modal, badge }) => { document.head.insertAdjacentHTML('beforeend', CSS); const ct = document.querySelector('.content'); if (ct) ct.innerHTML = html; if (modal) document.body.insertAdjacentHTML('beforeend', modal); if (badge) { const nb = [...document.querySelectorAll('.nav-btn')].find(b => b.textContent.includes(badge.after)); if (nb) nb.insertAdjacentHTML('afterend', badge.html); } }, { CSS, html, modal, badge });
    await p.waitForTimeout(300); await p.screenshot({ path: path.join(SP, name), fullPage: w < 500 }); await c.close();
  }
  // A 学生端（手机 375）
  const A = `<div class="page-head"><div><h2>付款<em>Payments</em></h2><p>需要你先付款、我们再代为缴纳的费用</p></div></div>
  <section class="panel"><div class="panel-body stack">
   <div class="row between"><b>12 月第一批申请费用</b><span class="pill warn">待付款</span></div>
   <div class="fb-amount"><small>¥</small>1,326.00</div>
   <table class="fb-items"><tr><td>IU Jacobs 申请费（USD 75）</td><td>¥545.00</td></tr><tr><td>WES 成绩单认证费</td><td>¥621.00</td></tr><tr><td>成绩单翻译（2 份）</td><td>¥160.00</td></tr></table>
   <div class="small muted">顾问备注：学校 12/1 截止，请在 11/29 前付款，我们收到后当天代缴。</div><div><div class="small muted" style="margin-bottom:6px">缴费截图（6 张，点击查看大图）</div><div class="fb-gal"><div class="fb-th"><div class="img">缴费截图 1</div><div class="cap">IU Jacobs 申请费</div></div><div class="fb-th"><div class="img">缴费截图 2</div><div class="cap">WES 认证缴费页</div></div><div class="fb-th"><div class="img">缴费截图 3</div><div class="cap">RNCM 平台费</div></div><div class="fb-th"><div class="img">缴费截图 4</div><div class="cap">翻译报价单</div></div><div class="fb-th"><div class="img">缴费截图 5</div><div class="cap">Curtis 申请费</div></div><div class="fb-th"><div class="img">缴费截图 6</div><div class="cap">Common App 费用</div></div></div></div>
   <div class="small muted">付款截止 <b style="color:#B26A00">11/29</b> · 顾问 李顾问</div>
   <div class="fb-qr"><div class="fb-seg"><span class="on">微信</span><span>支付宝</span></div>${fakeQR(170)}<div class="small"><b>收款人：主管（经营收款码）</b></div>
     <div class="tiny muted2" style="text-align:center">手机上：点「保存收款码」，再在微信里「扫一扫 → 相册」识别</div>
     <button class="btn sm">${DL} 保存收款码</button></div>
   <div><div class="small muted" style="margin-bottom:6px">付款时请在备注里填写：</div><span class="fb-ref">FQ-7K3M <span style="opacity:.7">${COPY}</span></span></div>
   <button class="btn primary" style="width:100%;justify-content:center;padding:12px">${CHECK} 我已付款</button>
   <div class="tiny muted2">付款截图选填，可在点「我已付款」时上传。顾问核实到账后会确认。</div>
  </div></section>
  <div class="fb-grp">已完成<span class="n">2</span></div>
  <div class="fb-row" style="grid-template-columns:1fr auto"><div><div class="t">RNCM 申请费</div><div class="m"><span>¥840.00</span><span>11/20 已代缴</span></div></div><span class="pill ok">已完成</span></div>`;
  if (stu) await shot(stu.username, stu.password, '#/home', 'm4-A-student-mobile.png', 375, 812, A);
  // B 顾问/主管：收款列表
  const B = `<div class="page-head"><div><h2>收款<em>Payments</em></h2><p>费用单：发给学生付款，确认到账后再代缴</p></div><div class="page-actions"><button class="btn primary">${PLUS} 新建费用单</button></div></div>
  <div class="tabs"><button class="tab active">待确认收款<span class="count hot">2</span></button><button class="tab">待付款<span class="count">3</span></button><button class="tab">待代缴<span class="count">1</span></button><button class="tab">已完成</button><button class="tab">已取消</button></div>
  <div class="fb-grp" style="margin-top:14px">学生已点「我已付款」，请核实到账<span class="n">2</span></div>
  <div class="fb-row"><div><div class="t">林同学 · 12 月第一批申请费用</div><div class="m"><span>备注码 <b style="color:#8A3B12">FQ-7K3M</b></span><span>11/27 14:05 学生标记已付</span><span>附付款截图 1 张</span><span>顾问 李顾问</span></div></div><div class="fb-money">¥1,326.00</div><div class="row" style="gap:8px"><button class="btn sm">${X} 未收到</button><button class="btn sm primary">${CHECK} 确认收到</button></div></div>
  <div class="fb-row"><div><div class="t">王同学 · Curtis 成绩单认证</div><div class="m"><span>备注码 <b style="color:#8A3B12">FQ-2PQ9</b></span><span>11/27 10:22 学生标记已付</span><span>无截图</span><span>顾问 周顾问</span></div></div><div class="fb-money">¥498.00</div><div class="row" style="gap:8px"><button class="btn sm">${X} 未收到</button><button class="btn sm primary">${CHECK} 确认收到</button></div></div>
  <div class="fb-grp">已收款，待代缴<span class="n">1</span></div>
  <div class="fb-row"><div><div class="t">陈同学 · Juilliard 申请费</div><div class="m"><span>11/26 主管确认收到</span><span>顾问 周顾问</span></div></div><div class="fb-money">¥1,170.00</div><button class="btn sm">${CARD} 已代缴，上传凭证</button></div>
  <div class="fb-grp">待学生付款<span class="n">1</span>（仅展示一条）</div>
  <div class="fb-row"><div><div class="t">张同学 · Berklee 申请费</div><div class="m"><span>截止 12/02</span><span>11/27 发送</span></div><div class="fb-note">上次被标记「未收到」：学生付到了旧收款码，已请重新付款（11/26 李顾问）</div></div><div class="fb-money">¥625.00</div><span class="pill warn">待付款</span></div>`;
  await shot('sup', 'SupPassword2026', '#/home', 'm4-B-staff-list.png', 1280, 900, B, null, { after: '文书协作', html: '' });
  // C 新建费用单弹窗
  const C = B; const M = `<div class="modal-bg"><form class="modal wide" role="dialog"><div class="modal-head"><div><h2>新建费用单</h2><p>发送后学生可在「付款」里看到并扫码付款</p></div></div><div class="modal-body stack">
   <div class="form-grid"><label class="field"><span class="label">学生 *</span><select class="input"><option>林同学</option></select></label><label class="field"><span class="label">标题 *</span><input class="input" value="12 月第一批申请费用"></label></div>
   <div><div class="label" style="margin-bottom:6px">费用明细（人民币）*</div>
    <div class="fb-line"><input class="input" value="IU Jacobs 申请费（USD 75）"><input class="input" value="545.00"><button type="button" class="btn sm icon">${X}</button></div>
    <div class="fb-line"><input class="input" value="WES 成绩单认证费"><input class="input" value="621.00"><button type="button" class="btn sm icon">${X}</button></div>
    <div class="fb-line"><input class="input" value="成绩单翻译（2 份）"><input class="input" value="160.00"><button type="button" class="btn sm icon">${X}</button></div>
    <button type="button" class="btn sm">${PLUS} 添加一行</button><div style="text-align:right;margin-top:6px">合计 <b class="fb-amount" style="font-size:20px">¥1,326.00</b></div></div>
   <div class="form-grid"><label class="field"><span class="label">付款截止</span><input class="input" value="2026-11-29"></label></div>
   <label class="field full"><span class="label">给学生的备注</span><textarea class="textarea" rows="2">学校 12/1 截止，请在 11/29 前付款，我们收到后当天代缴。</textarea></label>
   <div><div class="row between" style="margin-bottom:8px"><span class="label">学校缴费截图（可多选，最多 30 张，每张可写备注）</span><span class="tiny muted2">已上传 5 / 30 · 1 张上传中</span></div><div class="fb-up"><div class="fb-upc"><div class="img">缴费截图 1<span class="x">✕</span></div><input value="IU Jacobs 申请费" placeholder="这张是什么（选填）"></div><div class="fb-upc"><div class="img">缴费截图 2<span class="x">✕</span></div><input value="WES 认证缴费页" placeholder="这张是什么（选填）"></div><div class="fb-upc"><div class="img">缴费截图 3<span class="x">✕</span></div><input value="RNCM 平台费" placeholder="这张是什么（选填）"></div><div class="fb-upc"><div class="img">缴费截图 4<span class="x">✕</span></div><input value="翻译报价单" placeholder="这张是什么（选填）"></div><div class="fb-upc"><div class="img">缴费截图 5<span class="x">✕</span></div><input value="Curtis 申请费" placeholder="这张是什么（选填）"></div><div class="fb-upc"><div class="img">缴费截图 6<span class="x">✕</span></div><div class="bar"><i style="width:60%"></i></div><input value="Common App 费用" placeholder="这张是什么（选填）"></div></div><div class="row" style="gap:10px;margin-top:8px"><button type="button" class="btn sm">${PLUS} 选择图片（可多选）</button><span class="tiny muted2">支持 JPG/PNG/WEBP/PDF，单张 ≤10 MB，过大图片自动压缩；收款码由主管在「设置 → 收款码」统一上传；备注码自动生成</span></div></div>
  </div><div class="modal-foot"><span class="spacer"></span><button type="button" class="btn">保存草稿</button><button type="button" class="btn primary">${CHECK} 发送给学生</button></div></form></div>`;
  await shot('sup', 'SupPassword2026', '#/home', 'm4-C-create-dialog.png', 1280, 900, C, M);
  await browser.close(); srv.kill(); console.log('done', stu && stu.username, adv && adv.username);
})().catch(e => { console.error('ERR', e.message); srv.kill(); process.exit(1); });
