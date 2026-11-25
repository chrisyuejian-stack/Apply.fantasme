(function () {
  'use strict';
  const embedded=location.pathname==='/embed-login';
  function enterApp(){ if(embedded && window.parent!==window) parent.postMessage({type:'fq-login-success'},'*'); else location.href='/'; }
  if(embedded) {
    new ResizeObserver(()=>parent.postMessage({type:'fq-login-height',height:document.body.scrollHeight},'*')).observe(document.body);
  }
  const $ = id => document.getElementById(id);
  const call = async (path, body) => {
    const res = await fetch('/api' + path, { method: body ? 'POST' : 'GET', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-FQ': '1' }, body: body ? JSON.stringify(body) : undefined });
    let data = {}; try { data = await res.json(); } catch (e) { }
    if (!res.ok) throw new Error(data.error || ('请求失败（' + res.status + '）'));
    return data;
  };
  const msg = (id, text, ok) => { const m = $(id); m.textContent = text; m.className = 'msg ' + (ok ? 'ok' : 'err'); };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let openRegister = false;
  const tab = t => {
    for (const b of $('seg').querySelectorAll('button')) b.classList.toggle('on', b.dataset.tab === t);
    $('login').hidden = t !== 'login'; $('reg').hidden = t !== 'reg';
    (t === 'login' ? $('u') : $('rp')).focus();
  };

  if (embedded && document.body.dataset.sessionReady) {
    $('login').hidden=true;
    const panel=document.createElement('div');
    const title=document.createElement('h2'); title.textContent='已登录申请管理系统';
    const detail=document.createElement('p'); detail.textContent='当前账号可以直接进入申请工作台。';
    const button=document.createElement('button'); button.type='button';button.id='fq-enter-session';button.textContent='进入申请工作台';button.addEventListener('click',enterApp);
    panel.append(title,detail,button);document.querySelector('.card').appendChild(panel);
    return;
  }

  // Login fields are present in the initial HTML. Optional checks never block typing.
  function focusIfIdle(){ if(!embedded && document.activeElement===document.body) $('u').focus(); }
  call('/setup-status').then(r => {
    if (r.needsSetup && embedded) { msg('loginMsg','登录服务尚未初始化，请联系工作人员'); return; }
    if (r.needsSetup) {
      $('login').hidden = true; $('reg').hidden = true; $('seg').hidden = true;
      $('setup').hidden = false; if(document.activeElement===document.body) $('sk').focus();
    }
  }).catch(() => { /* The login API remains authoritative even when this check fails. */ });
  call('/diy/status').then(d => {
    openRegister = !!d.openRegister;
    $('rm').innerHTML = (d.majors || []).map(m => `<option value="${esc(m.id)}">${esc(m.zh)} · ${esc(m.en)}</option>`).join('');
    if (openRegister && $('setup').hidden) $('seg').hidden = false;
  }).catch(() => { /* Registration options are optional for existing account login. */ });
  focusIfIdle();

  $('seg').addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if (b) tab(b.dataset.tab); });

  $('login').addEventListener('submit', async e => {
    e.preventDefault(); const b = e.target.querySelector('button[type=submit]'); b.disabled = true;
    const name = $('u').value.trim(), pw = $('p').value;
    try {
      // 11 位手机号 → DIY 免费版账号；其他 → 枫琴员工与学员账号
      if (/^1\d{10}$/.test(name)) await call('/diy/login', { phone: name, password: pw });
      else await call('/login', { username: name, password: pw });
      enterApp();
    } catch (err) { msg('loginMsg', err.message); $('p').value = ''; $('p').focus(); }
    finally { b.disabled = false; }
  });

  $('reg').addEventListener('submit', async e => {
    e.preventDefault();
    if ($('rw').value !== $('rw2').value) return msg('regMsg', '两次输入的密码不一致');
    if (!$('ra').checked) return msg('regMsg', '请先阅读并同意用户协议与隐私政策');
    const b = e.target.querySelector('button[type=submit]'); b.disabled = true;
    try {
      const phone = $('rp').value.trim();
      await call('/diy/register', { phone, name: $('rn').value.trim(), password: $('rw').value, level: $('rl').value, season: $('rs').value.trim(), majorId: $('rm').value, agree: true });
      e.target.reset(); tab('login'); $('u').value = phone; $('p').focus();
      msg('loginMsg', '注册成功，请用手机号和密码登录', true);
    } catch (err) { msg('regMsg', err.message); }
    finally { b.disabled = false; }
  });

  $('setup').addEventListener('submit', async e => {
    e.preventDefault();
    if ($('sp').value !== $('sp2').value) return msg('setupMsg', '两次输入的密码不一致');
    const b = e.target.querySelector('button'); b.disabled = true; msg('setupMsg', '正在初始化，请稍候…', true);
    try {
      const r = await call('/setup', { setupKey: $('sk').value, name: $('sn').value.trim(), username: $('su').value.trim(), password: $('sp').value, demo: $('sd').checked });
      if (r.accounts && r.accounts.length) {
        $('setup').hidden = true; $('done').hidden = false;
        $('acc').querySelector('tbody').innerHTML = r.accounts.map(a => `<tr><td>${esc(a.name)}</td><td>${esc(a.username)}</td><td><code>${esc(a.password)}</code></td></tr>`).join('');
      } else enterApp();
    } catch (err) { msg('setupMsg', err.message); }
    finally { b.disabled = false; }
  });
  $('enter').addEventListener('click', () => { enterApp(); });
})();
