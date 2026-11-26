var $t = {
  async fetch(t, e) {
    let i = new URL(t.url),
      n = i.pathname;
    try {
      Bt(e);
      if ((t.method === 'GET' || t.method === 'HEAD') && ['/login.js','/logo.png'].includes(n)) {
        return Te(await e.ASSETS.fetch(t), {'Cache-Control':'public, max-age=86400'});
      }
      // Anonymous login HTML has no database dependency. Setup/session validation
      // still runs on authenticated requests and all API operations as before.
      if ((t.method === 'GET' || t.method === 'HEAD') && ['/login','/login.html','/embed-login'].includes(n) && !Xe(t,'__Host-fq_session') && !Xe(t,Kt)) return await Wn(t,e,i);
      await Hn(e);
      return n.startsWith('/api/') ? await Yn(t,e,i) : await Wn(t,e,i);
    } catch (o) {
      return o instanceof I ? D(Object.assign({
        error: o.message
      }, o.extra || {}), o.status) : (console.error(o), D({
        error: "\u670D\u52A1\u5668\u9519\u8BEF\uFF1A" + (o.message || o)
      }, 500));
    }
  }
};
// Additive application upgrade. Existing records and authentication stay in place.
