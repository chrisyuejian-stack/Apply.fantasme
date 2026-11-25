/* 枫琴申请工作站 · AI 助手 · ai-2.2
 * 院校库问答 + 流程体检 / 任务建议（逐项人工采纳）+ 联网核对官网 + 文书助手 + 简报 / 检查 / 草稿。
 * 权限边界：AI 服务端只读；所有修改都要在卡片上由人点击「采纳」，
 * 再由当前登录者的浏览器调用系统原有的保存函数（window.FQAPP），权限与冲突检查不变。 */
(function () {
  'use strict';
  if (window.__fqai || document.body.dataset.diy) return;
  window.__fqai = true;

  const toast = (m, err) => { try { APP().Ae(m, err ? { error: true } : undefined); } catch (_) {} };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const APP = () => window.FQAPP || null;
  const me = () => { try { return APP()?.ae() || null; } catch (_) { return null; } };
  const KEY = 'fqai:conv:v3';
  const SS = {
    get(k, d) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };
  const P = (d, w) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const S = 'stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    spark: P('<path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" fill="currentColor"/><path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" fill="currentColor" opacity=".7"/>'),
    close: P(`<path d="M6 6l12 12M18 6L6 18" ${S}/>`),
    send: P('<path d="M4 12l16-8-6 16-2.5-6.5z" fill="currentColor"/>'),
    reset: P(`<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" ${S}/>`),
    back: P(`<path d="M15 5l-7 7 7 7" ${S}/>`),
    globe: P(`<circle cx="12" cy="12" r="9" ${S}/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" ${S}/>`),
    tasks: P(`<rect x="4" y="4" width="16" height="16" rx="3" ${S}/><path d="M8 12l3 3 5-6" ${S}/>`),
    check: P(`<path d="M5 12.5l4.5 4.5L19 7.5" ${S}/>`),
    music: P(`<path d="M9 18V6l10-2v12" ${S}/><circle cx="6.5" cy="18" r="2.5" ${S}/><circle cx="16.5" cy="16" r="2.5" ${S}/>`),
    school: P(`<path d="M3 9l9-5 9 5-9 5z" ${S}/><path d="M7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5" ${S}/>`),
    msg: P(`<path d="M4 5h16v11H9l-5 4z" ${S}/>`),
    mail: P(`<rect x="3" y="5" width="18" height="14" rx="2" ${S}/><path d="M3 7l9 6 9-6" ${S}/>`),
    sun: P(`<circle cx="12" cy="12" r="4" ${S}/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" ${S}/>`),
    db: P(`<ellipse cx="12" cy="6" rx="7" ry="3" ${S}/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" ${S}/>`),
    paste: P(`<rect x="6" y="4" width="12" height="17" rx="2" ${S}/><path d="M9 4h6v3H9zM9 12h6M9 16h4" ${S}/>`),
    pen: P(`<path d="M4 20l4-1 11-11-3-3L5 16z" ${S}/>`),
    undo: P(`<path d="M9 7L4 12l5 5M4 12h11a5 5 0 0 1 0 10h-2" ${S}/>`),
    copy: P(`<rect x="8" y="8" width="12" height="12" rx="2" ${S}/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" ${S}/>`),
    shield: P(`<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" ${S}/>`),
    flow: P(`<circle cx="6" cy="6" r="2.5" ${S}/><circle cx="18" cy="12" r="2.5" ${S}/><circle cx="6" cy="18" r="2.5" ${S}/><path d="M8.5 6H12a3 3 0 0 1 3 3v.5M8.5 18H12a3 3 0 0 0 3-3v-.5" ${S}/>`),
    list: P(`<path d="M9 6h11M9 12h11M9 18h11" ${S}/><circle cx="4.5" cy="6" r="1.3" fill="currentColor"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor"/>`),
    warn: P(`<path d="M12 4l9 16H3z" ${S}/><path d="M12 10v4M12 17v.5" ${S}/>`)
  };
  const TOOLS = [
    { id: 'audit', label: '流程体检', icon: 'flow', need: 'student', tip: '程序逐项检查重复、顺序颠倒、关联挂错和日期冲突；AI 结合官网（可联网）梳理流程，给出合并 / 删除 / 改关联 / 顺延等修改卡片' },
    { id: 'tasks', label: '建议任务', icon: 'tasks', need: 'student', tip: '对照院校库和官网（可联网）：给出新增 / 调整 / 关闭任务建议，并把官网要求的文书一起建档、查重、关联任务' },
    { id: 'precheck', label: '提交前检查', icon: 'check', need: 'student', tip: '逐项检查某一所学校的申请是否齐备' },
    { id: 'repertoire', label: '曲目对照', icon: 'music', need: 'student', tip: '把曲目表和各校考试曲目要求逐校对照' },
    { id: 'schools', label: '选校建议', icon: 'school', need: 'student', tip: '按专业、层次、语言成绩和剩余时间从院校库里找候选校' },
    { id: 'comms', label: '沟通草稿', icon: 'msg', need: 'student', tip: '家长进度汇报、催材料、考试提醒的微信草稿' },
    { id: 'refs', label: '推荐人提醒', icon: 'mail', need: 'student', tip: '按推荐信状态起草邀请 / 提醒消息' },
    { id: 'brief', label: '今日简报', icon: 'sun', need: null, tip: '你名下的逾期、即将到期、待审文书和关键日期' },
    { id: 'auditAll', label: '体检总览', icon: 'list', need: null, tip: '名下所有学生的任务问题一览（程序计算，不调用 AI、不联网）' },
    { id: 'dbscan', label: '院校库更新检查', icon: 'db', need: null, tip: '院校库导入新版本后，找出受影响的申请和任务' }
  ];
  const KIND = { add: ['新增任务', 'info'], update: ['调整任务', 'warn'], close: ['关闭任务', 'muted'], activity: ['记录动态', 'blue'], merge: ['合并重复', 'warn'], delete: ['删除任务', 'bad'], relink: ['改关联', 'blue'], deps: ['改前置', 'blue'], cascade: ['连锁顺延', 'warn'], essay: ['文书', 'doc'] };
  const ESSAY_MODE = { new: '新建文书', merge: '合并文书', replace: '更新文书要求', link: '建档并关联任务' };
  const SRC = { official: '学校官网', platform: '官方平台', other: '第三方' };
  const webOn = () => status?.web !== false && LS.get('fqai:web', true) !== false;
  const LV = { UG: '本科', PG: '研究生', ALL: '通用' };

  let status = null, conv = SS.get(KEY, []), busy = false, built = false, userId = null;
  let sel = SS.get('fqai:sel', { studentId: '', applicationId: '' });
  let root, panel, body, input, sendBtn, pasteBtn, drawer, foot, ctxBar;

  /* ---------------- Markdown（先转义，只支持有限格式） ---------------- */
  function inline(s) {
    return s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\[\[([A-Za-z0-9_.:-]{2,120})\]\]/g, (m, id) => `<button type="button" class="fqai-ref" data-rec="${id}" title="查看院校库条目">${id}</button>`)
      .replace(/\[([^\]]{1,120})\]\((#\/[A-Za-z0-9_\-/]+)\)/g, '<a href="$2" data-nav="1">$1</a>')
      .replace(/\[([^\]]{1,120})\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  }
  function md(text) {
    const lines = esc(text || '').split('\n');
    let html = '', list = null, i = 0;
    const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
    while (i < lines.length) {
      const l = lines[i];
      if (/^\s*\|.*\|\s*$/.test(l) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
        closeList();
        const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim()));
        const head = cells(l); i += 2;
        let rows = '';
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { rows += '<tr>' + cells(lines[i]).map(c => `<td>${c}</td>`).join('') + '</tr>'; i++; }
        html += `<div class="fqai-tw"><table><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
        continue;
      }
      let m;
      if ((m = l.match(/^\s*#{1,4}\s+(.*)$/))) { closeList(); html += `<h4>${inline(m[1])}</h4>`; }
      else if ((m = l.match(/^\s*[-*•]\s+(.*)$/))) { if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = l.match(/^\s*\d+[.)、]\s+(.*)$/))) { if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += `<li>${inline(m[1])}</li>`; }
      else if (!l.trim()) closeList();
      else { closeList(); html += `<p>${inline(l)}</p>`; }
      i++;
    }
    closeList();
    return html;
  }

  /* ---------------- 系统数据（只读引用） ---------------- */
  const A = {
    student: id => APP()?.bt.student(id) || null,
    app: id => APP()?.bt.app(id) || null,
    task: id => APP()?.st.get('tasks', id) || null,
    user: id => APP()?.bt.user(id) || null,
    students() { try { return APP().ce.students().filter(s => APP().ce.manage(s.id)); } catch (_) { return []; } },
    apps(sid) { try { return APP().st.where('applications', a => a.studentId === sid); } catch (_) { return []; } },
    appLabel(a) { try { return APP().ft(a); } catch (_) { return a?.program || ''; } },
    ctxLabel(c) {
      try {
        if (c.applicationId) return A.appLabel(A.app(c.applicationId));
        if (c.submissionId) return APP().It(APP().bt.sub(c.submissionId));
      } catch (_) {}
      return '学生通用';
    },
    userName: id => { try { return APP().$t(id); } catch (_) { return id || '未分配'; } },
    doc: id => { try { return APP().st.get('documents', id) || null; } catch (_) { return null; } },
    writers() { try { return APP().st.all('users').filter(u => u.active !== false && u.role === 'writer'); } catch (_) { return []; } },
    docType(k) { try { return APP().F[k]?.label || k; } catch (_) { return k || '文书'; } },
    docTypes() { try { return Object.keys(APP().F).map(k => [k, APP().F[k].label]); } catch (_) { return [['supplemental', '院校补充文书']]; } },
    subLabel(id) { try { return APP().It(APP().bt.sub(id)); } catch (_) { return ''; } },
    openTasks(sid) { try { return APP().st.where('tasks', t => t.studentId === sid && !['done', 'na'].includes(t.status)); } catch (_) { return []; } },
    staff() { try { return APP().st.all('users').filter(u => u.active !== false && ['supervisor', 'advisor', 'writer'].includes(u.role)); } catch (_) { return []; } },
    cats() { try { return Object.entries(APP().O); } catch (_) { return [['other', '其他']]; } },
    fmt(d) { try { return d ? APP().p(d) : '未定'; } catch (_) { return d || '未定'; } },
    rel(d) { try { const n = APP().u(d); return n == null ? '' : n < 0 ? `已过 ${-n} 天` : n === 0 ? '今天' : `还有 ${n} 天`; } catch (_) { return ''; } }
  };

  /* ---------------- 页面上下文 ---------------- */
  function pageCtx() {
    const h = location.hash; let m;
    if ((m = h.match(/^#\/student\/([^/]+)/))) return { studentId: decodeURIComponent(m[1]), applicationId: '' };
    if ((m = h.match(/^#\/app\/([^/]+)/))) { const a = A.app(decodeURIComponent(m[1])); return a ? { studentId: a.studentId, applicationId: a.id } : null; }
    if ((m = h.match(/^#\/doc\/([^/]+)/))) { const d = APP()?.bt.doc(decodeURIComponent(m[1])); return d ? { studentId: d.studentId, applicationId: '' } : null; }
    return null;
  }
  function syncCtx(force) {
    const c = pageCtx();
    if (c && c.studentId && (force || c.studentId !== sel.studentId || (c.applicationId && c.applicationId !== sel.applicationId))) {
      if (A.students().some(s => s.id === c.studentId)) { sel = c; SS.set('fqai:sel', sel); }
    }
    if (sel.studentId && !A.students().some(s => s.id === sel.studentId)) { sel = { studentId: '', applicationId: '' }; SS.set('fqai:sel', sel); }
    renderCtx();
  }

  /* ---------------- 界面 ---------------- */
  function build() {
    root = document.createElement('div');
    root.className = 'fqai';
    root.innerHTML = `
      <button type="button" class="fqai-fab" aria-label="打开 AI 助手">${ICON.spark}<span>AI 助手</span></button>
      <section class="fqai-panel" role="dialog" aria-label="AI 助手" hidden>
        <header class="fqai-head">
          <div class="fqai-title"><b>AI 助手</b><span class="fqai-sub">${ICON.shield}只提建议 · 每项修改都需你确认</span></div>
          <button type="button" class="fqai-icon" data-fq="reset" title="清空对话" aria-label="清空对话">${ICON.reset}</button>
          <button type="button" class="fqai-icon" data-fq="close" title="关闭" aria-label="关闭">${ICON.close}</button>
        </header>
        <div class="fqai-ctx"></div>
        <div class="fqai-body" aria-live="polite"></div>
        <form class="fqai-input">
          <textarea rows="1" maxlength="6000" placeholder="问院校库或学生情况；粘贴邮件后可点「转任务」" aria-label="输入问题或粘贴内容"></textarea>
          <div class="fqai-ibtns">
            <button type="button" class="fqai-paste" title="从粘贴的内容里提取待办，生成任务建议卡片">${ICON.paste}<span>转任务</span></button>
            <button type="submit" class="fqai-send" aria-label="发送提问">${ICON.send}</button>
          </div>
        </form>
        <div class="fqai-foot"></div>
        <div class="fqai-drawer" hidden></div>
      </section>`;
    document.body.appendChild(root);
    panel = root.querySelector('.fqai-panel');
    body = root.querySelector('.fqai-body');
    input = root.querySelector('textarea');
    sendBtn = root.querySelector('.fqai-send');
    pasteBtn = root.querySelector('.fqai-paste');
    drawer = root.querySelector('.fqai-drawer');
    foot = root.querySelector('.fqai-foot');
    ctxBar = root.querySelector('.fqai-ctx');
    root.querySelector('.fqai-fab').addEventListener('click', () => toggle(true));
    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);
    root.querySelector('form').addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
    pasteBtn.addEventListener('click', () => paste(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); ask(input.value); } });
    input.addEventListener('input', autosize);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden && !document.querySelector('#modal .modal')) { if (!drawer.hidden) closeDrawer(); else toggle(false); } });
    built = true;
    syncCtx(true);
    renderFoot();
    renderAll();
  }
  function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 150) + 'px'; }
  function toggle(open) {
    panel.hidden = !open;
    root.classList.toggle('open', open);
    if (open) { syncCtx(false); refreshCards(); scrollEnd(); }
  }
  function scrollEnd() { requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; }); }
  function renderCtx() {
    if (!ctxBar) return;
    const studs = A.students();
    const apps = sel.studentId ? A.apps(sel.studentId) : [];
    ctxBar.innerHTML = `
      <div class="fqai-ctx-row">
        <label><span>学生</span><select data-sel="student"><option value="">选择学生…</option>${studs.map(s => `<option value="${esc(s.id)}" ${s.id === sel.studentId ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label>
        <label><span>申请</span><select data-sel="app" ${sel.studentId ? '' : 'disabled'}><option value="">全部申请</option>${apps.map(a => `<option value="${esc(a.id)}" ${a.id === sel.applicationId ? 'selected' : ''}>${esc(A.appLabel(a))} · ${esc(a.program || '')}</option>`).join('')}</select></label>
      </div>
      <div class="fqai-tools">${TOOLS.map(t => `<button type="button" data-tool="${t.id}" title="${esc(t.tip)}" ${t.need === 'student' && !sel.studentId ? 'data-dim="1"' : ''}>${ICON[t.icon]}<span>${t.label}</span></button>`).join('')}</div>`;
  }
  function renderFoot() {
    const u = status?.usage;
    const mode = LS.get('fqai:mode', 'flash');
    const w = status?.web !== false;
    foot.innerHTML = `<label class="fqai-mode">模型<select data-sel="mode"><option value="flash" ${mode !== 'pro' ? 'selected' : ''}>自动 · Flash</option><option value="pro" ${mode === 'pro' ? 'selected' : ''}>Pro</option></select></label>
      <label class="fqai-webt" title="${w ? '体检、提交前检查和提问时，允许 AI 搜索并阅读学校官网；检索词不含学生个人信息' : '服务器已关闭联网检索（AI_WEB=off）'}"><input type="checkbox" data-sel="web" ${webOn() ? 'checked' : ''} ${w ? '' : 'disabled'}>${ICON.globe}联网</label>
      <span>${u ? `今日 ${u.used}${u.limit ? '/' + u.limit : ''} 次${w && u.webLimit ? ` · 联网 ${u.web || 0}/${u.webLimit}` : ''}` : ''} · 发给 AI 的学生信息已去除证件号、手机号、邮箱、住址与生日</span>`;
  }
  function renderAll() {
    if (!status?.enabled) {
      body.innerHTML = `<div class="fqai-empty"><b>AI 助手尚未启用</b><p>需要在 Cloudflare 项目中配置 DEEPSEEK_API_KEY 后才能使用。请联系申请主管。</p></div>`;
      input.disabled = sendBtn.disabled = pasteBtn.disabled = true;
      return;
    }
    if (!conv.length) {
      body.innerHTML = `<div class="fqai-empty"><b>选一个学生，再点上方的功能</b>
        <p>AI 会读取院校库和这位学生的申请、任务、文书、曲目与推荐信，给出建议卡片。<b>每一项修改都要你点「采纳」才会生效</b>，采纳后和你手动操作一样记录在动态里，可以撤销。</p>
        <div class="fqai-quick">
          <button type="button" data-tool="brief">${ICON.sun}<span><b>今日简报</b><small>我名下的逾期、到期、待审文书和关键日期</small></span></button>
          <button type="button" data-tool="audit">${ICON.flow}<span><b>流程体检</b><small>查重复、顺序颠倒、关联挂错、日期冲突，并联网核对官网</small></span></button>
          <button type="button" data-tool="tasks">${ICON.tasks}<span><b>建议任务</b><small>对照院校库与已有任务，给出新增 / 调整 / 关闭建议</small></span></button>
          <button type="button" data-fq="paste-demo">${ICON.paste}<span><b>粘贴转任务</b><small>把学校邮件、家长微信粘进输入框，提取待办</small></span></button>
        </div></div>`;
      return;
    }
    body.innerHTML = conv.map((m, i) => renderMsg(m, i)).join('');
    scrollEnd();
  }
  function appendMsg(i) {
    const e = body.querySelector('.fqai-empty'); if (e) body.innerHTML = '';
    body.insertAdjacentHTML('beforeend', renderMsg(conv[i], i));
    const el = body.lastElementChild;
    if (conv[i].role === 'result' || conv[i].role === 'verify') requestAnimationFrame(() => { body.scrollTop = Math.max(0, el.offsetTop - body.offsetTop - 8); });
    else scrollEnd();
  }
  function renderMsg(m, i) {
    if (m.role === 'user') return `<div class="fqai-msg user"><div class="fqai-bubble">${esc(m.content).replace(/\n/g, '<br>')}</div></div>`;
    if (m.role === 'action') return `<div class="fqai-msg user"><div class="fqai-bubble fqai-act">${ICON[m.icon] || ICON.spark}<span>${esc(m.content)}</span></div></div>`;
    if (m.role === 'error') return `<div class="fqai-msg error"><div class="fqai-bubble">${esc(m.content)}</div></div>`;
    if (m.role === 'verify') return `<div class="fqai-msg bot">${renderReport(m.report)}</div>`;
    if (m.role === 'result') return `<div class="fqai-msg bot" data-mi="${i}">${renderResult(m, i)}</div>`;
    const srcs = (m.sources || []).map(x => `<li><span class="fqai-src k-${esc(x.kind)}">${esc(SRC[x.kind] || '网页')}</span><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.ref)} · ${esc(x.title || x.url)}</a>${x.opened ? '' : '<small>仅看过搜索摘要</small>'}</li>`).join('');
    const recs = (m.records || []).map(r => `<button type="button" class="fqai-card" data-rec="${esc(r.id)}"><span class="fqai-card-school">${esc(r.school)}</span><span class="fqai-card-main">${esc(r.prog || r.catName)}<small>${esc(LV[r.level] || r.level)} · ${esc(r.catName || r.cat)}</small></span></button>`).join('');
    return `<div class="fqai-msg bot"><div class="fqai-bubble fqai-md">${md(m.content)}</div>${srcs ? `<div class="fqai-srcs"><div class="fqai-cards-label">联网来源${m.web ? `（搜索 ${m.web.searches} 次 · 读 ${m.web.opens} 页）` : ''}</div><ul>${srcs}</ul></div>` : ''}${recs ? `<div class="fqai-cards"><div class="fqai-cards-label">引用的条目</div>${recs}</div>` : ''}</div>`;
  }

  /* ---------------- 结果块 ---------------- */
  function renderResult(r, i) {
    const cards = r.cards || [];
    const done = cards.filter(c => c.state && c.state !== 'pending').length;
    const checks = (r.checks || []).map(c => `<li class="${esc(c.level || 'muted')}"><i></i><div><b>${c.id ? `<span class="fqai-iss">${esc(c.id)}</span>` : ''}${esc(c.label)}</b><span class="fqai-md">${inline(esc(c.text || ''))}</span></div></li>`).join('');
    const okl = (r.okList || []).map(x => `<li>${inline(esc(x))}</li>`).join('');
    const drafts = (r.drafts || []).map((d, k) => `<div class="fqai-draft"><div class="fqai-draft-h"><b>${esc(d.label)}</b>${d.to ? `<span>${esc(d.to)}</span>` : ''}<button type="button" class="fqai-mini" data-copy="${i}:${k}">${ICON.copy}复制</button></div><textarea rows="${Math.min(14, Math.max(4, String(d.body || '').split('\n').length + 1))}" data-draft="${i}:${k}">${esc(d.body)}</textarea>${d.note ? `<div class="fqai-tiny">${esc(d.note)}</div>` : ''}</div>`).join('');
    const manual = (r.manual || []).map(x => `<li>${inline(esc(x))}</li>`).join('');
    const follow = (r.follow || []).map(f => `<button type="button" class="fqai-chip" data-follow='${esc(JSON.stringify(f))}'>${esc(f.label)}</button>`).join('');
    return `<div class="fqai-res">
      <div class="fqai-res-h">${ICON[r.icon] || ICON.spark}<div><b>${esc(r.title)}</b>${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</div>${r.model === 'pro' ? '<span class="fqai-pro">Pro</span>' : ''}</div>
      ${r.md ? `<div class="fqai-md">${md(r.md)}</div>` : ''}
      ${checks ? `<ul class="fqai-checks">${checks}</ul>` : ''}
      ${r.web ? renderWeb(r.web) : ''}
      ${r.md2 ? `<div class="fqai-md">${md(r.md2)}</div>` : ''}
      ${drafts}
      ${okl ? `<details class="fqai-okl"><summary>程序提示、但 AI 判断不需要处理的（${(r.okList || []).length}）</summary><ul>${okl}</ul></details>` : ''}
      ${manual ? `<div class="fqai-manual"><b>以下不是任务，AI 不会修改，请在系统里手动更新：</b><ul>${manual}</ul></div>` : ''}
      ${cards.length ? `<div class="fqai-cards-h"><b>建议 ${cards.length} 项</b><span>已处理 ${done}/${cards.length} · 每项单独确认</span></div><div class="fqai-cardlist">${cards.map((c, k) => cardHTML(c, i, k)).join('')}</div>` : ''}
      ${follow ? `<div class="fqai-follow">${follow}</div>` : ''}
      ${r.note ? `<p class="fqai-tiny">${esc(r.note)}</p>` : ''}
    </div>`;
  }

  function renderWeb(w) {
    const f = (w.findings || []).map(x => `<li><div class="fqai-wf-h"><span class="fqai-src k-${esc(x.kind)}">${esc(SRC[x.kind] || '网页')}</span><b>${esc(x.id)}</b>${x.pageYear ? `<small>页面年度 ${esc(x.pageYear)}</small>` : ''}</div><div>${esc(x.claim)}</div><details><summary>原文 · <a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title || x.url)}</a></summary><blockquote>${esc(x.quote)}</blockquote></details></li>`).join('');
    const n = (w.log || []).filter(l => l.type === 'search').length, o = (w.log || []).filter(l => l.type === 'open' && l.ok).length;
    return `<details class="fqai-web" ${f ? 'open' : ''}><summary>${ICON.globe}<b>联网核对官网</b><span>${(w.findings || []).length} 条结论 · 搜索 ${n} 次 · 读 ${o} 页</span></summary>
      ${w.error ? `<p class="fqai-err">${esc(w.error)}</p>` : ''}${w.summary ? `<p>${esc(w.summary)}</p>` : ''}
      ${f ? `<ul class="fqai-wf">${f}</ul>` : '<p class="fqai-tiny">没有找到能用的官网原文。</p>'}
      ${(w.gaps || []).length ? `<p class="fqai-tiny"><b>没查到：</b>${w.gaps.map(esc).join('；')}</p>` : ''}
      ${w.dropped ? `<p class="fqai-tiny">另有 ${w.dropped} 条 AI 结论在网页原文里找不到出处，已自动丢弃。</p>` : ''}
      <p class="fqai-tiny">每条结论的原文都由程序核对过确实出现在网页上；“第三方”来源只作参考，不能直接作为改日期的依据。</p></details>`;
  }

  /* ---------------- 建议卡片 ---------------- */
  const NEWK = ['merge', 'delete', 'relink', 'deps', 'cascade'];
  const fieldV = (t, f) => f === 'dependsOn' ? (t.dependsOn || []).join(',') : String(t[f] ?? '');
  const isOpen = t => t && !['done', 'na'].includes(t.status);
  const canEdit = t => { try { const ce = APP().ce; return typeof ce.taskEdit === 'function' ? !!ce.taskEdit(t) : true; } catch (_) { return true; } };
  const addDays = (d, n) => new Date(Date.parse(d + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);
  const dayDiff = (a, b) => Math.round((Date.parse(a + 'T00:00:00Z') - Date.parse(b + 'T00:00:00Z')) / 864e5);
  const linkLabel = (appId, subId) => { try { if (appId) return A.appLabel(A.app(appId)); if (subId) return APP().It(APP().bt.sub(subId)); } catch (_) {} return '学生通用'; };
  function liveState(c) {
    if (c.state && c.state !== 'pending') return c.state;
    const ap = APP(); if (!ap) return 'pending';
    try { if (!ap.ce.manage(c.studentId)) return 'denied'; } catch (_) { return 'denied'; }
    if (NEWK.includes(c.kind)) {
      // 建议生成后，卡片要改的字段被人改过，就判定失效
      for (const [id, fs] of Object.entries(c.base || {})) { const t = A.task(id); if (!t || Object.entries(fs || {}).some(([f, v]) => fieldV(t, f) !== v)) return 'stale'; }
      for (const id of [c.targetId, c.keepId, c.dropId].filter(Boolean)) { const t = A.task(id); if (!isOpen(t)) return 'stale'; if (!canEdit(t)) return 'denied'; }
      return 'pending';
    }
    if (c.kind === 'essay') {
      if (c.key && ap.st.where('documents', d => d.ai && d.ai.key === c.key).length) return 'dup';
      if (c.docId) {
        const d = A.doc(c.docId), b = c.docBase || {};
        if (!d || d.archived) return 'stale';
        if (String(d.wordLimit || '') !== b.wordLimit || String(d.brief || '') !== b.brief || String(d.dueDate || '') !== b.dueDate || (d.applicationIds || []).join(',') !== b.applicationIds || String(d.submissionId || '') !== b.submissionId) return 'stale';
      }
      if (c.taskId) { const t = A.task(c.taskId); if (!isOpen(t) || t.documentId) return 'stale'; if (!canEdit(t)) return 'denied'; }
      return 'pending';
    }
    if (c.kind === 'update' || c.kind === 'close') {
      const t = A.task(c.targetId);
      if (!t || ['done', 'na'].includes(t.status)) return 'stale';
      // 只要建议要改的字段在建议生成后被人改过，就判定失效（不依赖服务器时间戳）
      if (c.kind === 'update' && Object.entries(c.changes || {}).some(([f, v]) => String(t[f] || '') !== String(v.from || ''))) return 'stale';
    }
    if (c.kind === 'add' && c.key && ap.st.where('tasks', t => t.ai && t.ai.key === c.key).length) return 'dup';
    return 'pending';
  }
  function fieldRows(c, ck) {
    const rows = [];
    const r = (k, v, cls) => rows.push(`<div class="fqai-f ${cls || ''}"><span>${k}</span><div>${v}</div></div>`);
    const tl = id => esc(A.task(id)?.title || id);
    if (c.kind === 'add') {
      const t = c.task || {};
      r('截止', t.dueDate ? `${esc(A.fmt(t.dueDate))} <small>${esc(A.rel(t.dueDate))}</small>${t.needsDate ? ' <em class="fqai-need">日期待确认</em>' : ''}` : '<em class="fqai-need">日期待定</em>');
      r('负责人', esc(A.userName(t.assigneeId)));
      r('类别', esc((A.cats().find(x => x[0] === t.category) || [0, t.category || '其他'])[1]));
      if (t.note) r('备注', esc(t.note));
    } else if (c.kind === 'update') {
      for (const [f, v] of Object.entries(c.changes || {})) {
        const name = { dueDate: '截止', title: '标题', note: '备注', assigneeId: '负责人', category: '类别' }[f] || f;
        const show = x => f === 'dueDate' ? esc(A.fmt(x)) : f === 'assigneeId' ? esc(A.userName(x)) : f === 'category' ? esc((A.cats().find(y => y[0] === x) || [0, x || '其他'])[1]) : esc(x || '（空）');
        r(name, v.from ? `<s>${show(v.from)}</s> → <b>${show(v.to)}</b>` : `<small>新增</small> <b>${show(v.to)}</b>`, 'chg');
      }
    } else if (c.kind === 'close') {
      const t = A.task(c.targetId);
      r('当前', esc(t ? `${(APP().q[t.status] || [t.status])[0]} · 截止 ${A.fmt(t.dueDate)}` : '任务已不存在'));
      r('改为', (c.options || ['done', 'na']).map(o => `<b>${o === 'done' ? '已完成' : '不适用'}</b>`).join(' 或 '));
    } else if (c.kind === 'activity') {
      r('内容', esc(c.text));
      r('可见', '仅团队（学生看不到）');
    } else if (c.kind === 'merge') {
      r('保留', `<b>${tl(c.keepId)}</b>`);
      r('并入', `<s>${esc(c.dropTitle)}</s> → 标为“不适用”并注明已合并`, 'chg');
      if (c.title) r('新标题', `<b>${esc(c.title)}</b>`, 'chg');
      if ((c.moved || []).length) r('前置', `${c.moved.length} 个任务原来依赖被并入的任务，改为依赖保留的任务`);
    } else if (c.kind === 'delete') {
      const t = A.task(c.targetId);
      if (t) r('当前', esc(`${(APP().q[t.status] || [t.status])[0]} · 截止 ${A.fmt(t.dueDate)}`));
      r('原因', esc(c.why || ''));
      if ((c.unlink || []).length) r('前置', `${c.unlink.length} 个任务以它为前置，删除后自动解除：${c.unlink.map(tl).join('、')}`);
      r('撤销', '采纳后可以撤销，任务会原样恢复');
    } else if (c.kind === 'relink') {
      r('关联', `<s>${esc(linkLabel(c.from?.applicationId, c.from?.submissionId))}</s> → <b>${esc(linkLabel(c.to?.applicationId, c.to?.submissionId))}</b>`, 'chg');
    } else if (c.kind === 'deps') {
      if ((c.add || []).length) r('加前置', c.add.map(x => `<b>${esc(x.title)}</b>${x.due ? ` <small>${esc(A.fmt(x.due))}</small>` : ''}`).join('、'), 'chg');
      if ((c.remove || []).length) r('去掉', c.remove.map(x => `<s>${esc(x.title)}</s>`).join('、'), 'chg');
    } else if (c.kind === 'essay') {
      const e = c.essay || {};
      r('院校', esc(linkLabel(c.applicationId, null)));
      r('平台', c.submissionId ? esc(A.subLabel(c.submissionId)) + ' <small>随平台共用一份</small>' : '<small>指定院校使用</small>');
      r('类型', esc(A.docType(e.type)));
      if (c.mode === 'merge' || c.mode === 'replace') r('已有文书', `<a href="#/doc/${esc(c.docId)}" data-nav="1">${esc(c.docTitle)}</a>${c.mode === 'merge' ? ' <small>采纳后把这所院校加入它的适用范围，不新建</small>' : ''}`);
      const old = c.docBase || {};
      if (c.mode === 'replace' && e.wordLimit && e.wordLimit !== old.wordLimit) r('字数', `<s>${esc(old.wordLimit || '（空）')}</s> → <b>${esc(e.wordLimit)}</b>`, 'chg');
      else r('字数', e.wordLimit ? esc(e.wordLimit) : '<em class="fqai-need">官网未写明，请填写</em>');
      if (e.brief) r(c.mode === 'replace' ? '新要求' : '写作要求', esc(e.brief), c.mode === 'replace' ? 'chg' : '');
      r('截止', e.dueDate ? `${esc(A.fmt(e.dueDate))} <small>${esc(A.rel(e.dueDate))}</small>` : (c.mode === 'replace' || c.mode === 'merge' ? '<small>沿用已有文书</small>' : '<em class="fqai-need">请设定</em>'));
      r('顾问', esc(A.userName(e.advisorId)));
      r('文书老师', e.writerId ? esc(A.userName(e.writerId)) : (c.mode === 'replace' || c.mode === 'merge' ? '<small>沿用已有文书</small>' : '<em class="fqai-need">请选择</em>'));
      r('任务', c.taskId ? `挂到已有任务 <b>${esc(c.taskTitle)}</b>` : c.mode === 'new' ? `新建 <b>撰写${esc(e.title)}</b> <small>负责人：文书老师，截止同上</small>` : '<small>不新建任务</small>');
      if ((c.matched || []).length) r('查重', c.matched.map(m => `<a href="#/doc/${esc(m.id)}" data-nav="1">${esc(m.title)}</a> <small>${esc(m.why)}</small>`).join('；'));
    } else if (c.kind === 'cascade') {
      const to = c.editTo || c.to, delta = dayDiff(to, c.to);
      r('本任务', `<s>${esc(A.fmt(c.from))}</s> → <b>${esc(A.fmt(to))}</b>${c.over ? ` <em class="fqai-need">${esc(c.over)}</em>` : ''}`, 'chg');
      const skip = new Set(c.skip || []);
      r('一起顺延', `<div class="fqai-cas">${(c.items || []).map((x, j) => `<label class="${skip.has(x.id) ? 'off' : ''}"><input type="checkbox" data-cas="${ck}:${j}" ${skip.has(x.id) ? '' : 'checked'} ${c.state && c.state !== 'pending' ? 'disabled' : ''}><span>${esc(x.title)}</span><span><s>${esc(A.fmt(x.from))}</s> → <b>${esc(A.fmt(addDays(x.to, delta)))}</b>${x.over ? ` <em class="fqai-need">${esc(x.over)}</em>` : ''}</span></label>`).join('')}</div><small>取消勾选的任务保持原日期</small>`);
    }
    return rows.join('');
  }
  function editForm(c) {
    const f = [];
    const fld = (label, html, full) => f.push(`<label class="${full ? 'full' : ''}"><span>${label}</span>${html}</label>`);
    if (c.kind === 'essay') {
      const e = c.essay || {}, keep = c.mode === 'replace' || c.mode === 'merge';
      if (!keep) { fld('文书标题', `<input name="title" value="${esc(e.title || '')}" maxlength="120">`, true); fld('类型', `<select name="type">${A.docTypes().map(([k, v]) => `<option value="${k}" ${k === e.type ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select>`); }
      fld('字数 / 篇幅', `<input name="wordLimit" value="${esc(e.wordLimit || '')}" maxlength="60" placeholder="如 500 words">`);
      fld('截止日期', `<input type="date" name="dueDate" value="${esc(e.dueDate || '')}">`);
      if (!keep) {
        fld('文书老师（必选）', `<select name="writerId"><option value="">请选择</option>${A.writers().map(u => `<option value="${esc(u.id)}" ${u.id === e.writerId ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select>`);
        fld('关联任务', `<select name="taskId"><option value="">新建“撰写…”任务</option>${A.openTasks(c.studentId).filter(t => !t.documentId && (!c.applicationId || !t.applicationId || t.applicationId === c.applicationId)).map(t => `<option value="${esc(t.id)}" ${t.id === c.taskId ? 'selected' : ''}>挂到：${esc(t.title)}</option>`).join('')}</select>`, true);
      }
      fld('写作要求', `<input name="brief" value="${esc(e.brief || '')}" maxlength="300">`, true);
      return `<div class="fqai-edit">${f.join('')}</div>`;
    }
    if (c.kind === 'merge') { fld('合并后标题', `<input name="title" value="${esc(c.title || A.task(c.keepId)?.title || '')}" maxlength="120">`, true); return `<div class="fqai-edit">${f.join('')}</div>`; }
    if (c.kind === 'cascade') { fld('本任务新日期', `<input type="date" name="to" value="${esc(c.editTo || c.to)}">`); return `<div class="fqai-edit">${f.join('')}</div>`; }
    if (c.kind === 'relink') { fld('关联到', `<select name="applicationId"><option value="">学生通用（不关联申请）</option>${A.apps(c.studentId).filter(a => !a.withdrawn).map(a => `<option value="${esc(a.id)}" ${a.id === c.to?.applicationId ? 'selected' : ''}>${esc(A.appLabel(a))} · ${esc(a.program || '')}</option>`).join('')}</select>`, true); return `<div class="fqai-edit">${f.join('')}</div>`; }
    const t = c.kind === 'add' ? (c.task || {}) : Object.fromEntries(Object.entries(c.changes || {}).map(([k, v]) => [k, v.to]));
    if (c.kind === 'add' || 'title' in t) fld('标题', `<input name="title" value="${esc(t.title || '')}" maxlength="120">`, true);
    if (c.kind === 'add' || 'dueDate' in t) fld('截止日期', `<input type="date" name="dueDate" value="${esc(t.dueDate || '')}">`);
    if (c.kind === 'add' || 'assigneeId' in t) fld('负责人', `<select name="assigneeId">${A.staff().map(u => `<option value="${esc(u.id)}" ${u.id === t.assigneeId ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select>`);
    if (c.kind === 'add' || 'category' in t) fld('类别', `<select name="category">${A.cats().map(([k, v]) => `<option value="${k}" ${k === t.category ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select>`);
    if (c.kind === 'add' || 'note' in t) fld('备注', `<input name="note" value="${esc(t.note || '')}" maxlength="300">`, true);
    if (c.kind === 'close') fld('改为', `<select name="status">${(c.options || ['done', 'na']).map(o => `<option value="${o}">${o === 'done' ? '已完成' : '不适用'}</option>`).join('')}</select>`);
    if (c.kind === 'activity') fld('动态内容', `<input name="text" value="${esc(c.text || '')}" maxlength="300">`, true);
    return `<div class="fqai-edit">${f.join('')}</div>`;
  }
  function cardTitle(c) {
    if (c.kind === 'add') return c.task?.title;
    if (c.kind === 'activity') return '写入学生动态';
    if (c.kind === 'essay') return c.mode === 'merge' || c.mode === 'replace' ? c.docTitle : c.essay?.title;
    if (c.kind === 'merge') return `${A.task(c.keepId)?.title || c.keepTitle} ← ${c.dropTitle}`;
    return A.task(c.targetId)?.title || c.targetTitle;
  }
  function cardHTML(c, i, k) {
    const st = liveState(c);
    const ck = `${i}:${k}`;
    const [kname, kcls] = c.kind === 'essay' ? [ESSAY_MODE[c.mode] || '文书', 'doc'] : KIND[c.kind] || ['建议', 'info'];
    const ev = (c.evidence || []).map(e => e.rec
      ? `<span class="fqai-ev"><button type="button" class="fqai-ref" data-rec="${esc(e.rec)}">${esc(e.rec)}</button>${e.quote ? `<q>${esc(e.quote)}</q>` : ''}</span>`
      : e.web ? `<span class="fqai-ev"><span class="fqai-src k-${esc(e.kind)}">${esc(SRC[e.kind] || '网页')}</span><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.web)} · ${esc(e.title || e.url)}</a>${e.quote ? `<q>${esc(e.quote)}</q>` : ''}</span>`
      : `<span class="fqai-ev">${esc(e.text)}</span>`).join('');
    const editable = !['deps', 'delete'].includes(c.kind);
    const needEdit = c.kind === 'essay' && (c.mode === 'new' || c.mode === 'link') && (!c.essay?.writerId || !c.essay?.dueDate);
    let actions = '';
    if (st === 'pending' && c.editing) actions = `${editForm(c)}<div class="fqai-cact"><button type="button" class="fqai-b pri" data-card="adopt-edit" data-ck="${ck}">确认采纳</button><button type="button" class="fqai-b" data-card="cancel" data-ck="${ck}">取消</button></div>`;
    else if (st === 'pending' && needEdit) actions = `<div class="fqai-cact"><button type="button" class="fqai-b pri" data-card="edit" data-ck="${ck}">${ICON.pen}${c.essay?.writerId ? '设定日期' : '选择文书老师'}后采纳</button><button type="button" class="fqai-b ghost" data-card="ignore" data-ck="${ck}">忽略</button></div>`;
    else if (st === 'pending' && c.kind === 'add' && !c.task?.dueDate) actions = `<div class="fqai-cact"><button type="button" class="fqai-b pri" data-card="edit" data-ck="${ck}">${ICON.pen}设定日期后采纳</button><button type="button" class="fqai-b ghost" data-card="ignore" data-ck="${ck}">忽略</button></div>`;
    else if (st === 'pending') actions = `<div class="fqai-cact"><button type="button" class="fqai-b pri ${c.kind === 'delete' ? 'danger' : ''}" data-card="adopt" data-ck="${ck}">${ICON.check}${c.kind === 'delete' ? '确认删除' : '采纳'}</button>${editable ? `<button type="button" class="fqai-b" data-card="edit" data-ck="${ck}">${ICON.pen}修改后采纳</button>` : ''}<button type="button" class="fqai-b ghost" data-card="ignore" data-ck="${ck}">忽略</button></div>`;
    else if (st === 'adopted') actions = `<div class="fqai-cdone ok">${ICON.check}<span>已采纳 · ${esc(c.doneText || '')}</span>${c.result?.docId ? `<a href="#/doc/${esc(c.result.docId)}" data-nav="1">查看文书</a>` : ''}${c.result?.taskId || NEWK.includes(c.kind) ? `<a href="#/student/${esc(c.studentId)}/tasks" data-nav="1">查看任务</a>` : ''}<button type="button" class="fqai-mini" data-card="undo" data-ck="${ck}">${ICON.undo}撤销</button></div>`;
    else if (st === 'ignored') actions = `<div class="fqai-cdone">已忽略，以后同类建议不再出现<button type="button" class="fqai-mini" data-card="unignore" data-ck="${ck}">撤回</button></div>`;
    else if (st === 'stale') actions = `<div class="fqai-cdone warn">建议已失效：涉及的任务在建议生成后被修改或关闭了。需要的话请重新检查。</div>`;
    else if (st === 'dup') actions = `<div class="fqai-cdone">已存在相同任务（之前已采纳过这条建议）</div>`;
    else if (st === 'denied') actions = `<div class="fqai-cdone warn">你没有这位学生（或这条任务）的修改权限，不能采纳</div>`;
    else if (st === 'undone') actions = `<div class="fqai-cdone">已撤销<button type="button" class="fqai-mini" data-card="reopen" data-ck="${ck}">重新处理</button></div>`;
    return `<article class="fqai-pc ${st} ${c.risk ? 'risk' : ''} k-${esc(c.kind)}" data-ck="${ck}">
      <div class="fqai-pc-h"><span class="fqai-kind ${kcls}">${kname}</span><span class="fqai-pc-ctx">${esc(A.ctxLabel(c))}</span>${c.issue ? `<span class="fqai-iss" title="对应上方程序检查项">${esc(c.issue)}</span>` : ''}${c.risk ? '<span class="fqai-risk">风险</span>' : ''}</div>
      <div class="fqai-pc-t">${esc(cardTitle(c) || '')}</div>
      <div class="fqai-pc-f">${fieldRows(c, ck)}</div>
      ${c.warn ? `<div class="fqai-warn">${ICON.warn}<span>${esc(c.warn)}</span></div>` : ''}
      ${c.converted ? `<div class="fqai-tiny">${esc(c.converted)}</div>` : ''}
      ${c.reason ? `<div class="fqai-pc-r">${esc(c.reason)}</div>` : ''}
      ${ev ? `<div class="fqai-pc-e"><span>依据</span>${ev}</div>` : ''}
      ${actions}
    </article>`;
  }
  function getCard(ck) { const [i, k] = ck.split(':').map(Number); return { m: conv[i], c: conv[i]?.cards?.[k], i, k }; }
  function rerenderMsg(i) {
    const el = body.querySelector(`.fqai-msg[data-mi="${i}"]`);
    if (el) el.innerHTML = renderResult(conv[i], i);
    SS.set(KEY, conv);
  }
  function refreshCards() { conv.forEach((m, i) => { if (m.role === 'result' && (m.cards || []).length) rerenderMsg(i); }); }
  function focusNext(i, k) {
    const all = [...body.querySelectorAll('.fqai-pc.pending [data-card="adopt"]')];
    const next = all.find(b => { const [a, c] = b.dataset.ck.split(':').map(Number); return a > i || (a === i && c > k); }) || all[0];
    if (next) { next.focus({ preventScroll: true }); next.closest('.fqai-pc').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  }
  function readEdit(ck) {
    const el = body.querySelector(`.fqai-pc[data-ck="${ck}"] .fqai-edit`);
    const v = {}; if (!el) return v;
    el.querySelectorAll('input,select').forEach(x => { v[x.name] = x.value.trim(); });
    return v;
  }
  const snap = t => JSON.stringify(['title', 'dueDate', 'status', 'note', 'assigneeId', 'category', 'applicationId', 'submissionId'].map(f => t[f] || '').concat((t.dependsOn || []).join(',')));
  const clone = o => o === undefined ? undefined : JSON.parse(JSON.stringify(o));
  function addActivity(ap, c, text) {
    return ap.st.put('activity', { id: ap.mk('act'), studentId: c.studentId, applicationId: c.applicationId || null, userId: ap.ae()?.id, text, at: ap.now(), studentVisible: false });
  }
  // 一次采纳可能改多条任务：逐条记下改前的字段，撤销时整体恢复
  function recorder(ap, tag) {
    const U = { tasks: [], removed: [], acts: [] };
    U.patch = (id, fields) => {
      const t = A.task(id); if (!t) throw new Error('任务已不存在');
      let e = U.tasks.find(x => x.id === id);
      if (!e) { e = { id, prev: { ai: clone(t.ai) ?? null } }; U.tasks.push(e); }
      for (const f of Object.keys(fields)) if (!(f in e.prev)) e.prev[f] = t[f] === undefined ? null : clone(t[f]);
      const rec = ap.st.patch('tasks', id, Object.assign({}, fields, { ai: tag }));
      e.snap = snap(rec); return rec;
    };
    U.remove = id => { const t = A.task(id); U.removed.push({ rec: clone(t) }); ap.st.remove('tasks', id); };
    return U;
  }
  function adoptNew(ap, c, edited, tag) {
    const U = recorder(ap, tag);
    const t = A.task(c.targetId || c.keepId);
    if (c.kind === 'merge') {
      const keep = A.task(c.keepId), drop = A.task(c.dropId);
      const title = (edited && edited.title) || c.title || '';
      U.patch(drop.id, { status: 'na', note: (drop.note ? drop.note + '；' : '') + `已合并到“${title || keep.title}”` });
      for (const id of c.moved || []) { const x = A.task(id); if (x) U.patch(id, { dependsOn: [...new Set((x.dependsOn || []).map(d => d === drop.id ? keep.id : d))].filter(d => d !== id) }); }
      const deps = [...new Set([...(keep.dependsOn || []), ...(drop.dependsOn || [])])].filter(d => d !== keep.id && d !== drop.id);
      const kf = {}; if (title && title !== keep.title) kf.title = title; if (deps.join() !== (keep.dependsOn || []).join()) kf.dependsOn = deps;
      if (Object.keys(kf).length) U.patch(keep.id, kf);
      U.acts.push(addActivity(ap, c, `采纳 AI 建议：合并重复任务，“${drop.title}”并入“${title || keep.title}”`).id);
      c.doneText = '已合并，被并入的任务标为不适用';
    } else if (c.kind === 'delete') {
      for (const id of c.unlink || []) { const x = A.task(id); if (x) U.patch(id, { dependsOn: (x.dependsOn || []).filter(d => d !== t.id) }); }
      U.remove(t.id);
      U.acts.push(addActivity(ap, c, `采纳 AI 建议：删除多余任务“${t.title}”（${c.why || ''}）`).id);
      c.doneText = '已删除' + ((c.unlink || []).length ? `，并解除 ${c.unlink.length} 个前置关系` : '');
    } else if (c.kind === 'relink') {
      let to = c.to;
      if (edited && 'applicationId' in edited) to = { applicationId: edited.applicationId || null, submissionId: edited.applicationId === c.to.applicationId ? c.to.submissionId : (edited.applicationId ? null : t.submissionId || null) };
      U.patch(t.id, { applicationId: to.applicationId, submissionId: to.submissionId });
      U.acts.push(addActivity(ap, Object.assign({}, c, { applicationId: to.applicationId }), `采纳 AI 建议：任务“${t.title}”改为关联 ${linkLabel(to.applicationId, to.submissionId)}`).id);
      c.doneText = '已改为关联 ' + linkLabel(to.applicationId, to.submissionId);
    } else if (c.kind === 'deps') {
      const rm = (c.remove || []).map(x => x.id), add = (c.add || []).map(x => x.id).filter(id => A.task(id));
      U.patch(t.id, { dependsOn: [...new Set((t.dependsOn || []).filter(d => !rm.includes(d)).concat(add))] });
      U.acts.push(addActivity(ap, c, `采纳 AI 建议：任务“${t.title}”${add.length ? '加前置“' + c.add.map(x => x.title).join('、') + '”' : ''}${rm.length ? '去掉前置“' + c.remove.map(x => x.title).join('、') + '”' : ''}`).id);
      c.doneText = '已调整前置任务';
    } else if (c.kind === 'cascade') {
      const to = (edited && edited.to) || c.editTo || c.to;
      if (!to) throw new Error('请设定日期');
      const delta = dayDiff(to, c.to), skip = new Set(c.skip || []);
      U.patch(t.id, { dueDate: to });
      const moved = [];
      for (const x of c.items || []) if (!skip.has(x.id) && A.task(x.id)) { U.patch(x.id, { dueDate: addDays(x.to, delta) }); moved.push(x.title); }
      U.acts.push(addActivity(ap, c, `采纳 AI 建议：任务“${t.title}”截止改为 ${ap.p(to)}${moved.length ? '，后续 ' + moved.length + ' 项一起顺延（' + moved.join('、') + '）' : ''}`).id);
      c.doneText = `截止改为 ${ap.p(to)}` + (moved.length ? `，${moved.length} 项后续任务一起顺延` : '');
    }
    return { tasks: U.tasks, removed: U.removed, acts: U.acts };
  }
  const dsnap = d => JSON.stringify(['title', 'type', 'wordLimit', 'brief', 'dueDate', 'writerId', 'status', 'currentVersionId', 'submissionId'].map(f => d[f] || '').concat((d.applicationIds || []).join(',')));
  // 文书卡：建档 / 合并 / 更新要求，并把文书挂到任务上；记下改前状态以便整体撤销
  function adoptEssay(ap, c, edited, tag) {
    const e = Object.assign({}, c.essay, edited || {});
    const U = recorder(ap, tag);
    const R = { tasks: U.tasks, removed: [], acts: [], docNew: null, docPatch: null, taskNew: null };
    const src = c.essay?.source;
    const srcLine = src && (src.url || src.rec) ? `\n官网原文：“${src.quote || ''}”\n来源：${src.url || '院校库条目 ' + src.rec}` : '';
    const taskId = edited && 'taskId' in edited ? edited.taskId : c.taskId;
    let doc;
    if (c.mode === 'new' || c.mode === 'link') {
      if (!e.writerId) throw new Error('请选择文书老师');
      if (!e.dueDate) throw new Error('请设定截止日期');
      doc = ap.st.put('documents', { id: ap.mk('doc'), studentId: c.studentId, type: e.type || 'supplemental', title: e.title || A.docType(e.type), submissionId: c.submissionId || null, applicationIds: c.submissionId ? [] : [c.applicationId].filter(Boolean),
        writerId: e.writerId, dueDate: e.dueDate, wordLimit: e.wordLimit || '', needStudentConfirm: true, brief: ((e.brief || '') + srcLine).trim(), status: 'drafting', currentVersionId: null, ai: tag, source: src || null });
      R.docNew = { id: doc.id, snap: dsnap(doc) };
    } else {
      const d = A.doc(c.docId); if (!d) throw new Error('文书已不存在');
      const f = {};
      if (c.mode === 'merge' && !d.submissionId && c.applicationId && !(d.applicationIds || []).includes(c.applicationId)) f.applicationIds = (d.applicationIds || []).concat(c.applicationId);
      if (e.wordLimit && e.wordLimit !== (d.wordLimit || '')) f.wordLimit = e.wordLimit;
      if (c.mode === 'replace' && (e.brief || srcLine)) f.brief = ((d.brief ? d.brief + '\n\n' : '') + `【官网要求 ${ap.p(String(ap.now()).slice(0, 10))}】` + (e.brief || '') + srcLine).trim();
      if (e.dueDate && (!d.dueDate || e.dueDate < d.dueDate)) f.dueDate = e.dueDate;
      const prev = {}; for (const k of Object.keys(f)) prev[k] = d[k] === undefined ? null : clone(d[k]);
      doc = Object.keys(f).length ? ap.st.patch('documents', d.id, f) : d;
      R.docPatch = { id: d.id, prev, snap: dsnap(doc) };
    }
    if (taskId) U.patch(taskId, { documentId: doc.id });
    else if (c.mode === 'new' || c.mode === 'link') {
      const t = ap.st.put('tasks', { id: ap.mk('t'), studentId: c.studentId, applicationId: c.applicationId || null, submissionId: c.submissionId || null, roundId: null,
        title: '撰写' + (e.title || doc.title), category: 'materials', assigneeId: e.writerId, dueDate: e.dueDate, status: 'todo', blocked: false, blockedReason: '', note: e.wordLimit ? '篇幅：' + e.wordLimit : '', effect: '', templateId: '', scopeKey: '', dependsOn: [], createdBy: ap.ae()?.id, ai: tag, documentId: doc.id });
      R.taskNew = { id: t.id, snap: snap(t) };
    }
    const what = c.mode === 'merge' ? `把${linkLabel(c.applicationId, null)}加入文书“${doc.title}”` : c.mode === 'replace' ? `按官网要求更新文书“${doc.title}”` : `文书立项“${doc.title}”（${A.userName(doc.writerId)}）`;
    R.acts.push(addActivity(ap, c, `采纳 AI 建议：${what}${taskId ? '，关联任务“' + (A.task(taskId)?.title || '') + '”' : R.taskNew ? '，新建任务“撰写' + (e.title || doc.title) + '”' : ''}`).id);
    c.doneText = c.mode === 'merge' ? '已合并到已有文书' : c.mode === 'replace' ? '已按官网要求更新文书' : '已建档' + (taskId ? '并关联任务' : '，并新建撰写任务');
    c.result = { docId: doc.id, taskId: taskId || R.taskNew?.id || null };
    return R;
  }
  function undoEssay(ap, R) {
    const changed = '文书或任务在采纳后又被修改过，无法自动撤销，请手动处理';
    if (R.taskNew) { const t = A.task(R.taskNew.id); if (t && snap(t) !== R.taskNew.snap) return changed; }
    for (const e of R.tasks || []) { const t = A.task(e.id); if (!t || snap(t) !== e.snap) return changed; }
    if (R.docNew) { const d = A.doc(R.docNew.id); if (d && (dsnap(d) !== R.docNew.snap || ap.st.where('versions', v => v.documentId === d.id).length)) return '新建的文书已经有了版本或被修改过，无法自动撤销'; }
    if (R.docPatch) { const d = A.doc(R.docPatch.id); if (!d || dsnap(d) !== R.docPatch.snap) return changed; }
    try {
      if (R.taskNew && A.task(R.taskNew.id)) ap.st.remove('tasks', R.taskNew.id);
      for (const e of R.tasks || []) ap.st.patch('tasks', e.id, e.prev);
      if (R.docNew && A.doc(R.docNew.id)) ap.st.remove('documents', R.docNew.id);
      if (R.docPatch && Object.keys(R.docPatch.prev).length) ap.st.patch('documents', R.docPatch.id, R.docPatch.prev);
    } catch (err) { return '撤销失败：' + err.message; }
    return '';
  }
  function adopt(ck, edited) {
    const { c, i, k } = getCard(ck); const ap = APP();
    if (!c || !ap) return;
    const st = liveState(c);
    if (st !== 'pending') { c.editing = false; return rerenderMsg(i); }
    const u = ap.ae();
    const tag = { key: c.key || '', by: u.id, at: ap.now(), kind: c.kind };
    let undo = { acts: [] };
    try {
      if (c.kind === 'essay') {
        const need = (c.mode === 'new' || c.mode === 'link') && (!(edited?.writerId || c.essay?.writerId) || !(edited?.dueDate || c.essay?.dueDate));
        if (need) { c.editing = true; rerenderMsg(i); toast('请先选择文书老师并设定截止日期', true); body.querySelector(`.fqai-pc[data-ck="${ck}"] select[name="writerId"]`)?.focus(); return; }
        const R = adoptEssay(ap, c, edited, tag);
        undo = { essay: R, acts: R.acts };
      } else if (NEWK.includes(c.kind)) {
        if (c.kind === 'cascade' && edited && edited.to) c.editTo = edited.to;
        undo = adoptNew(ap, c, edited, tag);
        c.result = { taskId: c.targetId || c.keepId };
      } else if (c.kind === 'add') {
        const t = Object.assign({}, c.task, edited || {});
        if (!t.title) return toast('请填写任务标题', true);
        if (!t.dueDate) { // 所有任务都必须有截止日期：没有日期的建议先打开编辑框
          c.editing = true; rerenderMsg(i); toast('这条建议还没有截止日期，请先设定日期再采纳', true);
          body.querySelector(`.fqai-pc[data-ck="${ck}"] input[name="dueDate"]`)?.focus(); return;
        }
        const rec = ap.st.put('tasks', {
          id: ap.mk('t'), studentId: c.studentId, applicationId: c.applicationId || null, submissionId: c.submissionId || null, roundId: c.roundId || null,
          title: t.title, category: t.category || 'other', assigneeId: t.assigneeId || null, dueDate: t.dueDate || '', status: 'todo',
          blocked: false, blockedReason: '', note: t.note || '', effect: '', templateId: '', scopeKey: '', dependsOn: [], createdBy: u.id, ai: tag
        });
        undo.remove = { id: rec.id, snap: snap(rec) };
        undo.acts.push(addActivity(ap, c, `采纳 AI 建议：新增任务“${t.title}”${t.dueDate ? '（截止 ' + ap.p(t.dueDate) + '）' : ''}`).id);
        c.result = { taskId: rec.id }; c.doneText = edited ? '已按修改后的内容新增任务' : '已新增任务';
      } else if (c.kind === 'update') {
        const t = A.task(c.targetId);
        const to = {}; for (const [f, v] of Object.entries(c.changes || {})) to[f] = edited && f in edited ? edited[f] : v.to;
        const prev = {}; for (const f of Object.keys(to)) prev[f] = t[f];
        prev.ai = t.ai;
        const rec = ap.st.patch('tasks', t.id, Object.assign({}, to, { ai: tag }));
        undo.patch = { id: t.id, prev, snap: snap(rec) };
        const what = Object.keys(to).map(f => f === 'dueDate' ? `截止改为 ${ap.p(to[f])}` : f === 'title' ? '修改标题' : f === 'note' ? '补充备注' : f === 'category' ? '调整类别' : f === 'assigneeId' ? '调整负责人' : '调整' + f).join('，');
        undo.acts.push(addActivity(ap, c, `采纳 AI 建议：任务“${t.title}”${what}`).id);
        c.result = { taskId: t.id }; c.doneText = what;
      } else if (c.kind === 'close') {
        const t = A.task(c.targetId);
        const s = (edited && edited.status) || (c.options || ['done'])[0];
        const prev = { status: t.status, doneAt: t.doneAt, ai: t.ai };
        const rec = ap.st.patch('tasks', t.id, { status: s, doneAt: s === 'done' ? ap.now() : t.doneAt, ai: tag });
        undo.patch = { id: t.id, prev, snap: snap(rec) };
        undo.acts.push(addActivity(ap, c, `采纳 AI 建议：任务“${t.title}”标记为${s === 'done' ? '已完成' : '不适用'}`).id);
        c.result = { taskId: t.id }; c.doneText = s === 'done' ? '已标记为已完成' : '已标记为不适用';
      } else if (c.kind === 'activity') {
        const text = (edited && edited.text) || c.text;
        const rec = addActivity(ap, c, text);
        undo.acts.push(rec.id); c.doneText = '已写入动态';
      }
    } catch (err) { toast('保存失败：' + err.message, true); return; }
    c.state = 'adopted'; c.editing = false; c.undo = undo;
    feedback(c, edited ? 'adopt-edited' : 'adopt');
    ap.Vs();
    rerenderMsg(i); focusNext(i, k);
  }
  function undoCard(ck) {
    const { c, i } = getCard(ck); const ap = APP(); const u = c?.undo;
    if (!u || !ap) return;
    const changed = '涉及的任务在采纳后又被修改过，无法自动撤销，请到任务列表里手动处理';
    if (u.essay) {
      const err = undoEssay(ap, u.essay); if (err) return toast(err, true);
      addActivity(ap, c, `撤销刚才采纳的 AI 文书建议：${ESSAY_MODE[c.mode] || '文书'}“${c.essay?.title || c.docTitle || ''}”恢复原状`);
      c.state = 'undone'; delete c.undo; delete c.result; feedback(c, 'undo'); ap.Vs(); return rerenderMsg(i);
    }
    if (u.remove) {
      const t = A.task(u.remove.id);
      if (t && snap(t) !== u.remove.snap) return toast(changed, true);
      if (t) ap.st.remove('tasks', t.id);
    }
    if (u.patch) {
      const t = A.task(u.patch.id);
      if (!t || snap(t) !== u.patch.snap) return toast(changed, true);
      ap.st.patch('tasks', t.id, u.patch.prev);
    }
    if (u.tasks || u.removed) {
      // 先全部检查，确认都没被人改过，再一起恢复
      for (const e of u.tasks || []) { const t = A.task(e.id); if (!t || snap(t) !== e.snap) return toast(changed, true); }
      for (const e of u.removed || []) if (A.task(e.rec.id)) return toast(changed, true);
      try {
        for (const e of u.removed || []) ap.st.put('tasks', clone(e.rec));
        for (const e of u.tasks || []) ap.st.patch('tasks', e.id, e.prev);
      } catch (err) { return toast('撤销失败：' + err.message, true); }
    }
    if (u.acts?.length) addActivity(ap, c, `撤销刚才采纳的 AI 建议：${c.kind === 'add' ? '删除新增任务“' + (c.task?.title || '') + '”' : (KIND[c.kind] || ['建议'])[0] + '“' + (c.targetTitle || c.keepTitle || '') + '”恢复原状'}`);
    c.state = 'undone'; delete c.undo; delete c.result;
    feedback(c, 'undo');
    ap.Vs(); rerenderMsg(i);
  }
  function feedback(c, decision) {
    const ig = LS.get('fqai:ignored', []);
    if (decision === 'ignore' && c.key && !ig.includes(c.key)) LS.set('fqai:ignored', ig.concat(c.key).slice(-500));
    if (decision === 'unignore') LS.set('fqai:ignored', ig.filter(x => x !== c.key));
    fetch('/api/ai/feedback', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: JSON.stringify({ key: c.key, kind: c.kind, decision, studentId: c.studentId }) }).catch(() => {});
  }
  function onCard(btn) {
    const ck = btn.dataset.ck, act = btn.dataset.card;
    const { c, i, k } = getCard(ck); if (!c) return;
    if (act === 'adopt') return adopt(ck, null);
    if (act === 'adopt-edit') return adopt(ck, readEdit(ck));
    if (act === 'edit') { c.editing = true; rerenderMsg(i); body.querySelector(`.fqai-pc[data-ck="${ck}"] .fqai-edit input, .fqai-pc[data-ck="${ck}"] .fqai-edit select`)?.focus(); return; }
    if (act === 'cancel') { c.editing = false; return rerenderMsg(i); }
    if (act === 'ignore') { c.state = 'ignored'; feedback(c, 'ignore'); rerenderMsg(i); return focusNext(i, k); }
    if (act === 'unignore' || act === 'reopen') { c.state = 'pending'; if (act === 'unignore') feedback(c, 'unignore'); return rerenderMsg(i); }
    if (act === 'undo') return undoCard(ck);
  }

  /* ---------------- 交互 ---------------- */
  function onChange(e) {
    const cb = e.target.closest('[data-cas]');
    if (cb) { const [i, k, j] = cb.dataset.cas.split(':').map(Number); const c = conv[i]?.cards?.[k]; const x = c?.items?.[j]; if (!x) return; const sk = new Set(c.skip || []); cb.checked ? sk.delete(x.id) : sk.add(x.id); c.skip = [...sk]; return rerenderMsg(i); }
    const s = e.target.closest('[data-sel]'); if (!s) return;
    if (s.dataset.sel === 'student') { sel = { studentId: s.value, applicationId: '' }; SS.set('fqai:sel', sel); renderCtx(); }
    else if (s.dataset.sel === 'app') { sel.applicationId = s.value; SS.set('fqai:sel', sel); }
    else if (s.dataset.sel === 'mode') LS.set('fqai:mode', s.value);
    else if (s.dataset.sel === 'web') LS.set('fqai:web', !!s.checked);
  }
  function onClick(e) {
    const nav = e.target.closest('a[data-nav]');
    if (nav) { if (window.matchMedia('(max-width:640px)').matches) toggle(false); return; }
    const t = e.target.closest('[data-fq],[data-tool],[data-rec],[data-verify],[data-card],[data-follow],[data-copy]');
    if (!t) return;
    if (t.dataset.card) return onCard(t);
    if (t.dataset.tool) return tool(t.dataset.tool);
    if (t.dataset.follow) { try { const f = JSON.parse(t.dataset.follow); if (f.studentId) { sel = { studentId: f.studentId, applicationId: f.applicationId || '' }; SS.set('fqai:sel', sel); renderCtx(); } return f.text ? paste(f.text) : run(f.action, f); } catch (_) { return; } }
    if (t.dataset.copy) { const ta = body.querySelector(`textarea[data-draft="${t.dataset.copy}"]`); if (ta) copy(ta.value, t); return; }
    if (t.dataset.fq === 'close') return toggle(false);
    if (t.dataset.fq === 'reset') { if (busy) return; conv = []; SS.set(KEY, conv); closeDrawer(); return renderAll(); }
    if (t.dataset.fq === 'back') return closeDrawer();
    if (t.dataset.fq === 'paste-demo') { input.value = status?.pasteExample || ''; autosize(); input.focus(); return; }
    if (t.dataset.verify) return verify(t.dataset.verify, drawer.querySelector('.fqai-vq')?.value || '');
    if (t.dataset.rec) return openRecord(t.dataset.rec);
  }
  function copy(text, btn) {
    const done = () => { const o = btn.innerHTML; btn.innerHTML = ICON.check + '已复制'; setTimeout(() => { btn.innerHTML = o; }, 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {}); else done();
  }
  function tool(id) {
    const t = TOOLS.find(x => x.id === id); if (!t) return;
    if (t.need === 'student' && !sel.studentId) {
      const s = ctxBar.querySelector('[data-sel="student"]'); s.focus(); s.classList.add('fqai-flash'); setTimeout(() => s.classList.remove('fqai-flash'), 900);
      return;
    }
    run(id, {});
  }
  function closeDrawer() { drawer.hidden = true; drawer.innerHTML = ''; }
  async function openRecord(id) {
    drawer.hidden = false;
    drawer.innerHTML = `<div class="fqai-dhead"><button type="button" class="fqai-icon" data-fq="back" aria-label="返回">${ICON.back}</button><b>院校库条目</b></div><div class="fqai-dbody"><p class="fqai-tiny">正在读取…</p></div>`;
    try {
      const res = await fetch('/api/ai/record/' + encodeURIComponent(id), { credentials: 'same-origin' });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || '读取失败');
      const r = j.record, s = j.school || {};
      const para = t => esc(t).replace(/\n/g, '<br>');
      drawer.querySelector('.fqai-dbody').innerHTML = `
        <h3>${esc(s.abbr || r.school)} · ${esc(r.prog)}</h3>
        <div class="fqai-meta"><span>${esc(LV[r.level] || r.level)}</span><span>${esc(r.catName || r.cat)}</span>${r.verified ? `<span>库内核实 ${esc(r.verified)}</span>` : ''}</div>
        ${r.note ? `<div class="fqai-note"><b>注意</b>${para(r.note)}</div>` : ''}
        ${r.zh ? `<p>${para(r.zh)}</p>` : ''}${r.en ? `<p class="fqai-en">${para(r.en)}</p>` : ''}
        ${(r.stages || []).map(x => `<div class="fqai-stage"><div class="fqai-k">${esc(x.t || x.stage || '')}</div>${x.zh ? `<p>${para(x.zh)}</p>` : ''}${x.en ? `<p class="fqai-en">${para(x.en)}</p>` : ''}</div>`).join('')}
        ${(r.src || []).length ? `<h4>官网来源</h4><ul class="fqai-src">${r.src.map(u => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u)}</a></li>`).join('')}</ul>
          <div class="fqai-verify"><input class="fqai-vq" maxlength="300" placeholder="想核实什么？（可不填）"><button type="button" class="fqai-b pri" data-verify="${esc(r.id)}">${ICON.globe}去官网核实</button></div>` : ''}
        <p class="fqai-tiny">条目 ID：${esc(r.id)}</p>`;
    } catch (err) { drawer.querySelector('.fqai-dbody').innerHTML = `<p class="fqai-err">${esc(err.message)}</p>`; }
  }
  function setBusy(b, text) {
    busy = b; input.disabled = sendBtn.disabled = pasteBtn.disabled = b;
    ctxBar.querySelectorAll('button,select').forEach(x => { x.disabled = b; });
    let el = body.querySelector('.fqai-typing');
    if (b) {
      if (!el) { el = document.createElement('div'); el.className = 'fqai-msg bot fqai-typing'; body.appendChild(el); }
      el.innerHTML = `<div class="fqai-bubble"><span class="fqai-dots"><i></i><i></i><i></i></span>${esc(text || '正在思考…')}</div>`;
      scrollEnd();
    } else if (el) el.remove();
  }
  async function stream(path, payload, onEvent) {
    const res = await fetch(path, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: JSON.stringify(payload) });
    if (!res.ok || !(res.headers.get('Content-Type') || '').includes('event-stream')) {
      let j = {}; try { j = await res.json(); } catch (_) {}
      if (res.status === 401) throw new Error('登录已过期，请刷新页面重新登录');
      throw new Error(j.error || '请求失败（' + res.status + '）');
    }
    const reader = res.body.getReader(), dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let k;
      while ((k = buf.indexOf('\n\n')) >= 0) {
        const chunk = buf.slice(0, k); buf = buf.slice(k + 2);
        const line = chunk.split('\n').find(x => x.startsWith('data: '));
        if (line) { try { onEvent(JSON.parse(line.slice(6))); } catch (_) {} }
      }
    }
  }
  function push(m) { conv.push(m); if (conv.length > 40) conv = conv.slice(-40); SS.set(KEY, conv); return conv.length - 1; }
  function events(ev) {
    if (ev.type === 'status') setBusy(true, ev.text);
    else if (ev.type === 'result') {
      const ig = LS.get('fqai:ignored', []);
      ev.result.cards = (ev.result.cards || []).filter(c => !c.key || !ig.includes(c.key)).map(c => Object.assign({ state: 'pending' }, c));
      setBusy(false); appendMsg(push(Object.assign({ role: 'result' }, ev.result))); setBusy(true, '正在整理…');
    } else if (ev.type === 'verify') { setBusy(false); appendMsg(push({ role: 'verify', report: ev.report })); setBusy(true, '正在整理…'); }
    else if (ev.type === 'answer') { setBusy(false); appendMsg(push({ role: 'assistant', content: ev.text, records: ev.records, sources: ev.sources || [], web: ev.web || null })); }
    else if (ev.type === 'error') { setBusy(false); appendMsg(push({ role: 'error', content: ev.text })); }
  }
  async function call(path, payload) {
    setBusy(true, '正在读取数据…');
    try { await stream(path, Object.assign({ mode: LS.get('fqai:mode', 'flash') }, payload), events); }
    catch (err) { setBusy(false); appendMsg(push({ role: 'error', content: err.message })); }
    finally { setBusy(false); refreshStatus(); }
  }
  function ctxText(c) {
    const s = A.student(c.studentId); const a = c.applicationId ? A.app(c.applicationId) : null;
    return [s?.name, a ? A.appLabel(a) : ''].filter(Boolean).join(' · ');
  }
  async function run(action, extra) {
    if (busy || !status?.enabled) return;
    const t = TOOLS.find(x => x.id === action);
    const c = Object.assign({ studentId: sel.studentId, applicationId: sel.applicationId }, extra || {});
    if (t && !t.need) { c.studentId = ''; c.applicationId = ''; }
    appendMsg(push({ role: 'action', icon: t?.icon || 'spark', content: (extra?.label || t?.label || action) + (c.studentId ? ' · ' + ctxText(c) : '') }));
    await call('/api/ai/run', { action, studentId: c.studentId || '', applicationId: c.applicationId || '', sub: c.sub || '', web: webOn() });
  }
  async function paste(text) {
    text = String(text || '').trim();
    if (busy || !status?.enabled) return;
    if (!text) { input.placeholder = '先把学校邮件、家长微信或 Offer 内容粘贴到这里，再点「转任务」'; input.focus(); return; }
    if (!sel.studentId) { tool('tasks'); return; }
    input.value = ''; autosize();
    appendMsg(push({ role: 'action', icon: 'paste', content: '转任务 · ' + ctxText(sel) + '\n' + (text.length > 160 ? text.slice(0, 160) + '…' : text) }));
    await call('/api/ai/run', { action: 'paste', studentId: sel.studentId, applicationId: sel.applicationId || '', text });
  }
  async function ask(text) {
    text = String(text || '').trim();
    if (!text || busy || !status?.enabled) return;
    input.value = ''; autosize();
    const history = conv.filter(m => m.role === 'user' || m.role === 'assistant').slice(-8).map(m => ({ role: m.role, content: m.content }));
    appendMsg(push({ role: 'user', content: text }));
    await call('/api/ai/chat', { message: text, history, studentId: sel.studentId || '', web: webOn() });
  }
  async function verify(id, question) {
    if (busy) return;
    closeDrawer();
    appendMsg(push({ role: 'user', content: '去官网核实条目 ' + id + (question ? '：' + question : '') }));
    await call('/api/ai/verify', { id, question });
  }
  const VERDICT = { '一致': 'ok', '不一致': 'bad', '年度不同': 'warn', '需人工判断': 'warn', '官网未找到': 'muted', '未能核实': 'muted' };
  function renderReport(r) {
    if (!r) return '';
    const items = (r.items || []).map(x => `<tr><td><b>${esc(x.item)}</b></td><td><div><span class="fqai-k">库内</span>${esc(x.db)}</div><div><span class="fqai-k">官网</span>${esc(x.official)}</div>${x.quote ? `<details><summary>官网原文</summary><blockquote>${esc(x.quote)}</blockquote></details>` : ''}</td><td><span class="fqai-pill ${VERDICT[x.verdict] || 'muted'}">${esc(x.verdict)}</span></td></tr>`).join('');
    const src = (r.sources || []).map(s => `<li class="${s.ok ? 'ok' : 'fail'}"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a>${s.found ? ' <span class="fqai-src k-official">官网内搜索找到</span>' : ''}${s.ok ? '' : ` <span class="fqai-tiny">— ${esc(s.error)}</span>`}</li>`).join('');
    return `<div class="fqai-res"><div class="fqai-res-h">${ICON.globe}<div><b>官网核实 · ${esc(r.record?.school || '')} ${esc(r.record?.prog || '')}</b></div></div>${r.summary ? `<p>${esc(r.summary)}</p>` : ''}${items ? `<div class="fqai-tw"><table class="fqai-vt"><tbody>${items}</tbody></table></div>` : ''}<h4>来源页面</h4><ul class="fqai-src">${src}</ul></div>`;
  }
  async function refreshStatus() {
    try { const res = await fetch('/api/ai/status', { credentials: 'same-origin' }); if (res.ok) { status = await res.json(); if (built) renderFoot(); } } catch (_) {}
  }

  /* ================= 文书助手（嵌入「新版本」「修改正文」「审核」窗口） ================= */
  let lastAct = null;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (b && /^(ver-new|doc-edit-body|doc-review)$/.test(b.dataset.act)) lastAct = { act: b.dataset.act, id: b.dataset.id, stage: b.dataset.stage, decision: b.dataset.decision };
  }, true);
  const ESS = [
    { op: 'grammar', label: '只改语法', tip: '拼写、时态、主谓一致、冠词、标点；改动最小' },
    { op: 'polish', label: '润色', tip: '句式、衔接、重复用词、中式英语；不添加新内容' },
    { op: 'structure', label: '结构反馈', tip: '只提问题和方向，不代写' },
    { op: 'facts', label: '事实核对', tip: '对照学生档案、曲目、获奖与申请院校' },
    { op: 'length', label: '篇幅检查', tip: '按这份文书的字数 / 字符上限检查' },
    { op: 'note', label: '生成修改说明', tip: '对比上一版，起草「本版修改说明」' }
  ];
  function limitOf(doc) {
    const m = String(doc?.wordLimit || '').match(/(\d[\d,]*)\s*(词|words?|字符|characters?|字)/i);
    if (!m) return null;
    return { n: Number(m[1].replace(/,/g, '')), unit: /字符|char/i.test(m[2]) ? 'chars' : 'words' };
  }
  const countWords = t => (String(t).match(/[A-Za-z0-9’'-]+/g) || []).length;
  function lengthText(doc, text) {
    const lim = limitOf(doc);
    const w = countWords(text), ch = String(text).length;
    if (!lim) return `${w} 词 · ${ch} 字符`;
    const v = lim.unit === 'chars' ? ch : w;
    return `<b class="${v > lim.n ? 'over' : ''}">${v}</b> / ${lim.n} ${lim.unit === 'chars' ? '字符' : '词'}`;
  }
  function essayHook() {
    const form = document.querySelector('#modal #modalForm');
    if (!form || form.dataset.fqai || !status?.essay || !lastAct) return;
    const ap = APP(); if (!ap) return;
    const doc = ap.bt.doc(lastAct.id); if (!doc) return;
    if (lastAct.act === 'doc-review') {
      const ta = form.querySelector('textarea[name="comment"]');
      if (!ta || lastAct.stage === 'student') return;
      form.dataset.fqai = '1';
      const box = document.createElement('div');
      box.className = 'fqai-ess';
      box.innerHTML = `<div class="fqai-ess-bar"><span class="fqai-ess-t">${ICON.spark}AI 文书助手</span><button type="button" class="fqai-b" data-ess="review">起草${lastAct.decision === 'changes' ? '修改意见' : '审核备注'}</button><span class="fqai-ess-n">读取当前版本，按文书要求与院校库给出意见草稿；你修改后再提交</span></div><div class="fqai-ess-out" hidden></div>`;
      ta.closest('.field')?.before(box) || ta.before(box);
      const ctx = { form, doc, ta, box, review: true };
      box.addEventListener('click', e => essayClick(e, ctx));
      return;
    }
    const ta = form.querySelector('textarea[name="text"]');
    if (!ta) return;
    form.dataset.fqai = '1';
    const box = document.createElement('div');
    box.className = 'fqai-ess';
    box.innerHTML = `<div class="fqai-ess-bar"><span class="fqai-ess-t">${ICON.spark}AI 文书助手</span>${ESS.map(x => `<button type="button" class="fqai-b" data-ess="${x.op}" title="${esc(x.tip)}">${x.label}</button>`).join('')}<span class="fqai-ess-n" data-len>${lengthText(doc, ta.value)}</span></div>
      <div class="fqai-ess-out" hidden></div>
      <div class="fqai-ess-foot">只修改学生自己写的内容的语言，不代写新段落。接受的修改只改动下面的文本框，点「保存」才会生成新版本。</div>`;
    const field = ta.closest('.field') || ta.parentElement;
    field.before(box);
    const upd = () => { const el = box.querySelector('[data-len]'); if (el) el.innerHTML = lengthText(doc, ta.value); };
    ta.addEventListener('input', upd);
    const ctx = { form, doc, ta, box, upd };
    box.addEventListener('click', e => essayClick(e, ctx));
  }
  function prevText(doc) {
    const ap = APP();
    const vs = ap.bt.versionsOf(doc.id).filter(v => v.kind === 'text');
    return vs[0]?.text || '';
  }
  async function essayClick(e, ctx) {
    const b = e.target.closest('[data-ess],[data-sug],[data-fill],[data-loc]'); if (!b) return;
    const out = ctx.box.querySelector('.fqai-ess-out');
    if (b.dataset.ess) {
      if (ctx.box.dataset.busy) return;
      const op = b.dataset.ess;
      const text = ctx.ta.value;
      if (op !== 'review' && !text.trim()) { out.hidden = false; out.innerHTML = '<p class="fqai-tiny">文本框是空的。外部文件版本请先把正文粘贴进来。</p>'; return; }
      ctx.box.dataset.busy = '1';
      ctx.box.querySelectorAll('[data-ess]').forEach(x => x.classList.toggle('on', x === b));
      out.hidden = false; out.innerHTML = `<div class="fqai-ess-wait"><span class="fqai-dots"><i></i><i></i><i></i></span>${op === 'review' ? '正在阅读当前版本…' : '正在分析正文…'}</div>`;
      try {
        const res = await fetch('/api/ai/essay', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: JSON.stringify({ op, docId: ctx.doc.id, text, prev: op === 'note' ? prevText(ctx.doc) : '', accepted: ctx.accepted || [], decision: lastAct?.decision || '', mode: LS.get('fqai:mode', 'flash') }) });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || '请求失败');
        ctx.result = j; ctx.op = op;
        out.innerHTML = essayResult(j, op, ctx);
      } catch (err) { out.innerHTML = `<p class="fqai-err">${esc(err.message)}</p>`; }
      delete ctx.box.dataset.busy;
      return;
    }
    if (b.dataset.sug) {
      const [act, idx] = b.dataset.sug.split(':');
      const list = ctx.result?.suggestions || [];
      const apply = s => {
        if (s.state) return false;
        const v = ctx.ta.value, at = v.indexOf(s.from);
        if (at < 0) { s.state = 'miss'; return false; }
        ctx.ta.value = v.slice(0, at) + s.to + v.slice(at + s.from.length);
        s.state = 'ok'; (ctx.accepted ||= []).push({ type: s.type, from: s.from, to: s.to, why: s.why });
        return true;
      };
      if (act === 'all') list.forEach(s => { if (!s.flag) apply(s); });
      else if (act === 'ok') apply(list[+idx]);
      else if (act === 'no') list[+idx].state = 'no';
      ctx.ta.dispatchEvent(new Event('input', { bubbles: true }));
      out.innerHTML = essayResult(ctx.result, ctx.op, ctx);
      return;
    }
    if (b.dataset.loc) {
      const s = b.dataset.loc, v = ctx.ta.value, at = v.indexOf(s);
      if (at >= 0) { ctx.ta.focus(); ctx.ta.setSelectionRange(at, at + s.length); const lines = v.slice(0, at).split('\n').length; ctx.ta.scrollTop = Math.max(0, (lines - 3) * 22); }
      return;
    }
    if (b.dataset.fill) {
      const name = b.dataset.fill, txt = ctx.box.querySelector('.fqai-ess-out textarea')?.value || '';
      const target = name === 'comment' ? ctx.ta : ctx.form.querySelector(`[name="${name}"]`);
      if (target) { target.value = txt; target.dispatchEvent(new Event('input', { bubbles: true })); target.focus(); }
      b.textContent = '已填入'; b.disabled = true;
    }
  }
  function essayResult(j, op, ctx) {
    const head = j.summary ? `<p class="fqai-ess-sum">${esc(j.summary)}</p>` : '';
    if (op === 'grammar' || op === 'polish') {
      const list = j.suggestions || [];
      if (!list.length) return head + '<p class="fqai-tiny">没有发现需要修改的地方。</p>';
      const left = list.filter(s => !s.state).length;
      const bulk = op === 'grammar' && left > 1 ? `<button type="button" class="fqai-b" data-sug="all">全部接受（${left}）</button>` : '';
      return `${head}<div class="fqai-sug-h"><b>${list.length} 处建议</b><span>剩余 ${left}</span>${bulk}</div>` + list.map((s, k) => `
        <div class="fqai-sug ${s.state || ''}">
          <div class="fqai-sug-t"><span class="fqai-tag">${esc(s.type)}</span>${s.flag ? `<span class="fqai-tag warn">${esc(s.flag)}</span>` : ''}</div>
          <div class="fqai-sug-d"><del>${esc(s.from)}</del><ins>${esc(s.to)}</ins></div>
          <div class="fqai-sug-w">${esc(s.why)}</div>
          <div class="fqai-sug-a">${s.state === 'ok' ? '<span class="ok">已接受</span>' : s.state === 'no' ? '<span>已忽略</span>' : s.state === 'miss' ? '<span class="warn">原句已被改动，无法自动替换</span>' : `<button type="button" class="fqai-b pri" data-sug="ok:${k}">接受</button><button type="button" class="fqai-b ghost" data-sug="no:${k}">忽略</button><button type="button" class="fqai-mini" data-loc="${esc(s.from)}">定位</button>`}</div>
        </div>`).join('');
    }
    if (op === 'facts') {
      const C = { '一致': 'ok', '不一致': 'bad', '档案无记录': 'muted', '需确认': 'warn' };
      return head + (j.facts || []).map(f => `<div class="fqai-fact"><span class="fqai-pill ${C[f.verdict] || 'muted'}">${esc(f.verdict)}</span><div><q>${esc(f.claim)}</q><div class="fqai-tiny">${esc(f.detail)}</div></div><button type="button" class="fqai-mini" data-loc="${esc(f.claim)}">定位</button></div>`).join('');
    }
    if (op === 'note' || op === 'review') {
      const name = op === 'note' ? 'note' : 'comment';
      return `${head}<textarea class="fqai-ess-draft" rows="${op === 'review' ? 8 : 5}">${esc(j.draft || '')}</textarea><div class="fqai-sug-a"><button type="button" class="fqai-b pri" data-fill="${name}">${op === 'note' ? '填入「本版修改说明」' : '填入意见框'}</button><span class="fqai-tiny">可以先在上面改，再填入</span></div>`;
    }
    return head + `<div class="fqai-md">${md(j.md || '')}</div>`;
  }
  new MutationObserver(() => { try { essayHook(); } catch (_) {} }).observe(document.getElementById('modal') || document.body, { childList: true, subtree: true });

  /* ---------------- 启动：服务器确认身份后才显示；登录账号切换时重新判断 ---------------- */
  async function start() {
    const u = me();
    const id = u ? u.id : null;
    if (id === userId) return;
    userId = id;
    conv = id === SS.get('fqai:uid', null) ? SS.get(KEY, []) : [];
    SS.set('fqai:uid', id); SS.set(KEY, conv);
    if (root) { root.remove(); root = null; built = false; }
    status = null;
    if (!id) return;
    try {
      const res = await fetch('/api/ai/status', { credentials: 'same-origin' });
      if (!res.ok) return;
      status = await res.json();
      if (status.assistant) build();
    } catch (_) {}
  }
  window.addEventListener('hashchange', () => { start(); if (built && !panel.hidden) syncCtx(false); else if (built) syncCtx(false); });
  document.addEventListener('click', () => setTimeout(start, 0));
  setTimeout(start, 0);
})();
