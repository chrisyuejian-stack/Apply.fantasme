async function Wn(t, e, i) {
  let n = i.pathname,
    o = await Ce(e, t),
    r = a => e.ASSETS.fetch(new Request(new URL(a, i.origin), t)),
    s = o ? null : await Ne(e, t);
  if (n === '/embed-login') {
    let origins;
    try { origins = [new URL(e.SITE_URL).origin]; } catch {
      const base=i.hostname.replace(/^apply\./,'');
      origins=['https://'+base,'https://www.'+base];
    }
    const html = (await (await r('/login.html')).text()).replace('<body>','<body class="fq-embedded"'+(o||s?' data-session-ready="1"':'')+'>');
    const res = Te(new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}}),{'Cache-Control':'no-store','Content-Security-Policy':ot['Content-Security-Policy'].replace("frame-ancestors 'none'","frame-ancestors "+origins.join(' '))});
    res.headers.delete('X-Frame-Options'); return res;
  }
  if (n === "/" || n === "/index.html") {
    if (s) {
      let a = (await (await r("/app/index.html")).text()).replace("<body>", '<body data-diy="1">');
      return Te(new Response(a, {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      }), {
        "Cache-Control": "no-store"
      });
    }
    return o ? Te(await r("/app/index.html"), {
      "Cache-Control": "no-store"
    }) : Response.redirect(i.origin + "/login", 302);
  }
  return n === "/login" || n === "/login.html" ? o || s ? Response.redirect(i.origin + "/", 302) : Te(await r("/login.html"), {
    "Cache-Control": "no-store"
  }) : n.startsWith("/app/") ? !o && !s ? new Response("\u9700\u8981\u767B\u5F55", {
    status: 401,
    headers: ot
  }) : Te(await e.ASSETS.fetch(t), {
    "Cache-Control": "private, no-cache"
  }) : Te(await e.ASSETS.fetch(t), {"Cache-Control":"no-cache"});
}
function fqApplicationSameOrigin(request) {
  if (request.method === 'GET' || request.method === 'HEAD') return;
  const origin = request.headers.get('Origin');
  if ((origin !== null && origin !== new URL(request.url).origin) || request.headers.get('Sec-Fetch-Site') === 'cross-site') throw new I(403, '请求来源不一致');
}
async function Yn(t, e, i) {
  let n = i.pathname.replace(/^\/api/, ""),
    o = t.method;
  if (n === "/integrations/assistant" || n.startsWith("/integrations/assistant/")) return fqAssistant(t,e,i);
  if (o !== "GET" && t.headers.get("X-FQ") !== "1") throw new I(403, "\u8BF7\u6C42\u88AB\u62D2\u7EDD");
  fqApplicationSameOrigin(t);
  if (n === "/setup-status" && o === "GET") {
    let d = await e.DB.prepare("SELECT COUNT(*) AS n FROM users").first();
    return D({
      needsSetup: !d.n
    });
  }
  if (n === "/setup" && o === "POST") return Zn(t, e);
  if (n === "/login" && o === "POST") return Xn(t, e);
  if (n.startsWith("/diy/") || n.startsWith("/diy-admin/")) return await Vt(t, e, n, o, {
    json: D,
    HttpError: I,
    body: X,
    audit: N,
    readSession: Ce,
    reqdbHead: xe,
    reqdbSchool: async (p, f) => {
      let u = await p.DB.prepare("SELECT value FROM meta WHERE key = ?").bind("reqdb:school:" + f).first();
      return u ? JSON.parse(u.value) : [];
    }
  });
  let r = await Ce(e, t);
  if (!r && n === "/bootstrap" && o === "GET" && (await Ne(e, t))) return D({
    diy: !0,
    me: null,
    users: [],
    data: {},
    reqdb: null
  });
  if (!r) throw new I(401, "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55");
  let s = r.user;
  if (n === "/logout" && o === "POST") return await _t(e, r.tokenHash), D({
    ok: !0
  }, 200, {
    "Set-Cookie": Ie("", 0)
  });
  if (n === "/me" && o === "GET") return D({
    me: s
  });
  if (n === "/password" && o === "POST") {
    let d = await X(t),
      p = await e.DB.prepare("SELECT pw_hash, pw_salt FROM users WHERE id = ?").bind(s.id).first();
    if (!(await ae(String(d.old || ""), p.pw_hash, p.pw_salt))) throw new I(400, "\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E");
    let f = re(d.new);
    if (f) throw new I(400, f);
    if (d.new === d.old) throw new I(400, "\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E0E\u5F53\u524D\u5BC6\u7801\u76F8\u540C");
    let u = await H(d.new);
    return await e.DB.prepare("UPDATE users SET pw_hash = ?, pw_salt = ?, must_change = 0, updated_at = ? WHERE id = ?").bind(u.hash, u.salt, j(), s.id).run(), await Pe(e, s.id, r.tokenHash), await N(e, s.id, "password-change"), D({
      ok: !0
    });
  }
  if (s.mustChange) throw new I(403, "\u8BF7\u5148\u4FEE\u6539\u521D\u59CB\u5BC6\u7801", {
    mustChange: !0
  });
  if (n === '/files' || n.startsWith('/files/')) return fqFiles(t,e,s,i);
  const fqAction = n.match(/^\/documents\/([A-Za-z0-9_-]{2,80})\/(revise|proxy-confirm|review)$/);
  if (fqAction && o === 'POST') return fqDocumentAction(t,e,s,fqAction[1],fqAction[2]);
  if (n === "/bootstrap" && o === "GET") return Jn(e, s);
  let a;
  if ((a = n.match(/^\/reqdb\/school\/([A-Za-z0-9_-]+)$/)) && o === "GET") {
    if (!ve(s)) throw new I(403, "\u6CA1\u6709\u6743\u9650");
    let d = await e.DB.prepare("SELECT value FROM meta WHERE key = ?").bind("reqdb:school:" + a[1]).first();
    return D({
      records: d ? JSON.parse(d.value) : []
    });
  }
  if (n === "/reqdb") {
    if (s.role !== "supervisor") throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5BFC\u5165\u5BFC\u51FA\u9662\u6821\u5E93");
    if (o === "GET") return await N(e, s.id, "reqdb-export"), D((await Xt(e)) || {});
    if (o === "PUT") return await at(e, await X(t)), await N(e, s.id, "reqdb-import"), D({
      ok: !0,
      head: await xe(e)
    });
  }
  if ((a = n.match(/^\/students\/([A-Za-z0-9_-]+)$/)) && o === "DELETE") return Vn(e, s, a[1]);
  if (a = n.match(/^\/t\/([A-Za-z]+)\/([A-Za-z0-9_-]+)$/)) return $n(t, e, s, a[1], a[2], o);
  if (n === "/users" && o === "POST") return Qn(t, e, s);
  if ((a = n.match(/^\/users\/([A-Za-z0-9_-]+)$/)) && o === "PUT") return ei(t, e, s, a[1], r);
  if ((a = n.match(/^\/users\/([A-Za-z0-9_-]+)\/reset$/)) && o === "POST") return ti(e, s, a[1]);
  if (n.startsWith("/admin/")) return ni(t, e, s, n.slice(7), o);
  throw new I(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
