var ce = [{
  id: "dt-ps",
  title: "\u5B8C\u6210\u4E2A\u4EBA\u9648\u8FF0",
  cat: "\u6587\u4E66",
  offset: -30
}, {
  id: "dt-ref",
  title: "\u9080\u8BF7\u63A8\u8350\u4EBA\u5E76\u8DDF\u8FDB\u63D0\u4EA4",
  cat: "\u6750\u6599",
  offset: -21
}, {
  id: "dt-submit",
  title: "\u590D\u6838\u7533\u8BF7\u8868\u5E76\u6B63\u5F0F\u63D0\u4EA4",
  cat: "\u63D0\u4EA4",
  offset: -5
}, {
  id: "dt-cv",
  title: "\u51C6\u5907\u7B80\u5386 CV",
  cat: "\u6587\u4E66",
  offset: -35
}, {
  id: "dt-lang",
  title: "\u8BED\u8A00\u8003\u8BD5\u62A5\u540D\u4E0E\u9001\u5206",
  cat: "\u6750\u6599",
  offset: -45
}, {
  id: "dt-docs",
  title: "\u6536\u96C6\u62A4\u7167\u3001\u6210\u7EE9\u5355\u4E0E\u8BC1\u660E\u6750\u6599",
  cat: "\u6750\u6599",
  offset: -40
}, {
  id: "dt-account",
  title: "\u6CE8\u518C\u7533\u8BF7\u7CFB\u7EDF\u8D26\u53F7\u5E76\u6838\u5BF9\u4FE1\u606F",
  cat: "\u63D0\u4EA4",
  offset: -45
}, {
  id: "dt-rep",
  title: "\u786E\u5B9A\u672C\u6821\u66F2\u76EE / \u4F5C\u54C1",
  cat: "\u8003\u8BD5",
  offset: -40
}, {
  id: "dt-rec",
  title: "\u5F55\u5236\u9884\u5F55\u50CF",
  cat: "\u8003\u8BD5",
  offset: -14
}, {
  id: "dt-upload",
  title: "\u4E0A\u4F20\u5F55\u50CF / \u4F5C\u54C1\u96C6",
  cat: "\u8003\u8BD5",
  offset: -3
}, {
  id: "dt-live",
  title: "\u51C6\u5907\u73B0\u573A / \u7EBF\u4E0A\u9762\u8BD5\uFF08\u884C\u7A0B\u3001\u4F34\u594F\u3001\u5F69\u6392\uFF09",
  cat: "\u8003\u8BD5",
  offset: 20
}, {
  id: "dt-offer",
  title: "\u8DDF\u8FDB\u5F55\u53D6\u7ED3\u679C\u4E0E Offer \u6761\u4EF6",
  cat: "\u7ED3\u679C",
  offset: 75
}];
var Ht = ["CREATE TABLE IF NOT EXISTS diy_accounts (id TEXT PRIMARY KEY, phone TEXT NOT NULL UNIQUE, name TEXT NOT NULL, pw_hash TEXT, pw_salt TEXT, active INTEGER NOT NULL DEFAULT 1, must_change INTEGER NOT NULL DEFAULT 0, profile TEXT, grants TEXT, requests TEXT, converted_to TEXT, created_at TEXT, last_login TEXT)", "CREATE TABLE IF NOT EXISTS diy_sessions (token_hash TEXT PRIMARY KEY, acct TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER)", "CREATE TABLE IF NOT EXISTS diy_records (tbl TEXT NOT NULL, id TEXT NOT NULL, acct TEXT NOT NULL, data TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (tbl, id))", "CREATE INDEX IF NOT EXISTS diy_records_acct ON diy_records (acct, tbl)"],
  Kt = "__Host-fq_diy",
  ze = 12,
  Gt = ["apps", "tasks", "docs", "mats"],
  On = 300,
  Dn = /^[A-Za-z0-9_-]{2,80}$/,
  Un = /^1\d{10}$/,
  Bn = /^\d{4}-\d{2}-\d{2}$/,
  _n = ["todo", "doing", "done"],
  zn = ["todo", "doing", "done"],
  Nn = ["school", "template", "report", "library", "service"],
  _e = () => new Date().toISOString(),
  U = (t, e) => String(t ?? "").trim().slice(0, e),
  jt = t => Bn.test(String(t || "")) ? String(t) : "",
  Ft = t => {
    let e = U(t, 500);
    return /^https?:\/\//i.test(e) ? e : "";
  },
  xn = t => (String(t || "").match(/[A-Za-z0-9'’-]+|[㐀-鿿]/g) || []).length,
  et = (t, e) => `${Kt}=${t}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${e}`;
function Gn(t) {
  return {
    qr: "",
    freeSchools: (t?.schools || []).slice().sort((i, n) => (i.order || 0) - (n.order || 0)).slice(0, 3).map(i => i.id),
    freeTemplates: ["dt-ps", "dt-ref", "dt-submit"],
    openRegister: !0,
    serviceTitle: "\u67AB\u7434\u82F1\u7F8E\u97F3\u4E50\u7559\u5B66\u7533\u8BF7\u670D\u52A1",
    serviceText: "\u4E13\u5C5E\u987E\u95EE + \u6587\u4E66\u8001\u5E08\u5168\u7A0B\u966A\u8DD1\uFF1A\u9009\u6821\u5B9A\u4F4D\u3001\u6587\u4E66\u9010\u7A3F\u4FEE\u6539\u3001\u66F2\u76EE\u4E0E\u5F55\u50CF\u6307\u5BFC\u3001\u9762\u8BD5\u8F85\u5BFC\u3002"
  };
}
async function nt(t, e) {
  let i = await t.DB.prepare("SELECT value FROM meta WHERE key = 'diy:config'").first();
  return Object.assign(Gn(e), i ? JSON.parse(i.value) : {});
}
var tt = (t, e) => {
  try {
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
};
function it(t) {
  let e = tt(t.profile, {});
  return {
    id: t.id,
    phone: t.phone,
    name: t.name,
    active: !!t.active,
    mustChange: !!t.must_change,
    level: e.level || "PG",
    majorId: e.majorId || "",
    season: e.season || "",
    currentSchool: e.currentSchool || "",
    countries: e.countries || "",
    lang: e.lang || "",
    grants: Object.assign({
      schools: [],
      templates: [],
      report: !1,
      all: !1
    }, tt(t.grants, {})),
    requests: tt(t.requests, []),
    convertedTo: t.converted_to || "",
    createdAt: t.created_at,
    lastLogin: t.last_login
  };
}
var qt = (t, e, i) => !!i && (e.grants.all || t.freeSchools.includes(i) || e.grants.schools.includes(i)),
  jn = (t, e, i) => e.grants.all || t.freeTemplates.includes(i) || e.grants.templates.includes(i);
async function Ne(t, e) {
  let i = Xe(e, Kt);
  if (!i) return null;
  let n = await ge(i),
    o = Date.now(),
    r = await t.DB.prepare("SELECT s.expires_at, a.* FROM diy_sessions s JOIN diy_accounts a ON a.id = s.acct WHERE s.token_hash = ?").bind(n).first();
  return !r || r.expires_at < o || !r.active ? null : (r.expires_at - o < ze * 18e5 && (await t.DB.prepare("UPDATE diy_sessions SET expires_at = ? WHERE token_hash = ?").bind(o + ze * 36e5, n).run()), {
    tokenHash: n,
    acct: it(r)
  });
}
async function Vt(t, e, i, n, o) {
  let {
      json: r,
      HttpError: s,
      body: a,
      audit: d
    } = o,
    p = t.headers.get("CF-Connecting-IP") || "local";
  if (i.startsWith("/diy-admin/")) {
    let l = await o.readSession(e, t);
    if (!l || l.user.role !== "supervisor" || l.user.mustChange) throw new s(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u7BA1\u7406 DIY \u514D\u8D39\u7248");
    return Fn(t, e, i.slice(10), n, l.user, o);
  }
  if (!i.startsWith("/diy/")) return null;
  let f = i.slice(4),
    u = await o.reqdbHead(e),
    c = await nt(e, u);
  if (f === "/status" && n === "GET") return r({
    openRegister: !!c.openRegister,
    majors: (u?.taxonomy?.majors || []).map(l => ({
      id: l.id,
      zh: l.zh,
      en: l.en
    }))
  });
  if (f === "/register" && n === "POST") {
    if (!c.openRegister) throw new s(403, "\u6682\u672A\u5F00\u653E\u6CE8\u518C\uFF0C\u8BF7\u8054\u7CFB\u67AB\u7434\u987E\u95EE");
    let l = "diyreg|" + p,
      v = Date.now(),
      T = await e.DB.prepare("SELECT count, updated_at FROM login_attempts WHERE key = ?").bind(l).first(),
      A = T && v - T.updated_at < 36e5 ? T.count : 0;
    if (A >= 5) throw new s(429, "\u6CE8\u518C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
    let S = await a(t),
      E = U(S.phone, 20);
    if (!Un.test(E)) throw new s(400, "\u8BF7\u8F93\u5165 11 \u4F4D\u624B\u673A\u53F7");
    let m = U(S.name, 40);
    if (!m) throw new s(400, "\u8BF7\u586B\u5199\u59D3\u540D");
    let g = re(S.password);
    if (g) throw new s(400, g);
    if (!S.agree) throw new s(400, "\u8BF7\u5148\u9605\u8BFB\u5E76\u540C\u610F\u7528\u6237\u534F\u8BAE\u4E0E\u9690\u79C1\u653F\u7B56");
    if (await e.DB.prepare("SELECT 1 FROM diy_accounts WHERE phone = ?").bind(E).first()) throw new s(409, "\u8BE5\u624B\u673A\u53F7\u5DF2\u6CE8\u518C\uFF0C\u8BF7\u76F4\u63A5\u767B\u5F55");
    let k = (u?.taxonomy?.majors || []).map(C => C.id),
      M = {
        level: ["UG", "PG"].includes(S.level) ? S.level : "PG",
        majorId: k.includes(S.majorId) ? S.majorId : k[0] || "",
        season: U(S.season, 30)
      },
      P = await H(S.password),
      R = "diy-" + fe(9).replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
    return await e.DB.batch([e.DB.prepare("INSERT INTO diy_accounts (id, phone, name, pw_hash, pw_salt, active, must_change, profile, grants, requests, created_at, last_login) VALUES (?,?,?,?,?,1,0,?,?,?,?,NULL)").bind(R, E, m, P.hash, P.salt, JSON.stringify(M), "{}", "[]", _e()), e.DB.prepare("INSERT INTO login_attempts (key, count, locked_until, updated_at) VALUES (?,?,0,?) ON CONFLICT(key) DO UPDATE SET count = excluded.count, updated_at = excluded.updated_at").bind(l, A + 1, A ? T.updated_at : v)]), await d(e, "diy:" + R, "diy-register", "diy", R, E.slice(0, 3) + "****" + E.slice(-4)), r({
      ok: !0
    });
  }
  if (f === "/login" && n === "POST") {
    let l = await a(t),
      v = U(l.phone, 20),
      T = "diy:" + v + "|" + p,
      A = await Le(e, T);
    if (A) throw new s(429, `\u767B\u5F55\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7 ${A} \u5206\u949F\u540E\u518D\u8BD5`);
    let S = await e.DB.prepare("SELECT * FROM diy_accounts WHERE phone = ?").bind(v).first();
    if (!(S && S.active && (await ae(String(l.password || ""), S.pw_hash, S.pw_salt)))) throw await Re(e, T), new s(401, "\u624B\u673A\u53F7\u6216\u5BC6\u7801\u4E0D\u6B63\u786E");
    await Oe(e, T);
    let m = fe(),
      g = Date.now();
    return await e.DB.batch([e.DB.prepare("DELETE FROM diy_sessions WHERE expires_at < ?").bind(g), e.DB.prepare("INSERT INTO diy_sessions (token_hash, acct, expires_at, created_at) VALUES (?,?,?,?)").bind(await ge(m), S.id, g + ze * 36e5, g), e.DB.prepare("UPDATE diy_accounts SET last_login = ? WHERE id = ?").bind(_e(), S.id)]), r({
      ok: !0
    }, 200, {
      "Set-Cookie": et(m, ze * 3600)
    });
  }
  let h = await Ne(e, t);
  if (!h) throw new s(401, "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55");
  let y = h.acct;
  if (f === "/logout" && n === "POST") return await e.DB.prepare("DELETE FROM diy_sessions WHERE token_hash = ?").bind(h.tokenHash).run(), r({
    ok: !0
  }, 200, {
    "Set-Cookie": et("", 0)
  });
  if (f === "/password" && n === "POST") {
    let l = await a(t),
      v = await e.DB.prepare("SELECT pw_hash, pw_salt FROM diy_accounts WHERE id = ?").bind(y.id).first();
    if (!(await ae(String(l.old || ""), v.pw_hash, v.pw_salt))) throw new s(400, "\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E");
    let T = re(l.new);
    if (T) throw new s(400, T);
    let A = await H(l.new);
    return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET pw_hash = ?, pw_salt = ?, must_change = 0 WHERE id = ?").bind(A.hash, A.salt, y.id), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ? AND token_hash != ?").bind(y.id, h.tokenHash)]), r({
      ok: !0
    });
  }
  if (f === "/bootstrap" && n === "GET") {
    let l = [],
      v = [];
    for (let E of u?.schools || []) if (qt(c, y, E.id)) {
      let m = Object.assign({}, E, {
        open: !0
      });
      delete m.recordCount, l.push(m), v.push(...(await o.reqdbSchool(e, E.id)));
    } else l.push({
      id: E.id,
      abbr: E.abbr,
      en: E.en,
      zh: E.zh,
      country: E.country,
      order: E.order,
      open: !1
    });
    let T = (await e.DB.prepare("SELECT tbl, data FROM diy_records WHERE acct = ?").bind(y.id).all()).results,
      A = Object.fromEntries(Gt.map(E => [E, []]));
    for (let E of T) A[E.tbl] && A[E.tbl].push(JSON.parse(E.data));
    let S = ce.filter(E => jn(c, y, E.id));
    return r({
      me: y,
      data: A,
      templates: S,
      lockedTemplates: ce.length - S.length,
      config: {
        qr: c.qr,
        serviceTitle: c.serviceTitle,
        serviceText: c.serviceText,
        freeSchools: c.freeSchools,
        freeTemplates: c.freeTemplates.filter(E => S.some(m => m.id === E))
      },
      reqdb: {
        taxonomy: u?.taxonomy || {
          majors: [],
          levels: [],
          cats: []
        },
        schools: l,
        records: v
      }
    });
  }
  if (y.mustChange) throw new s(403, '请先修改初始密码', {mustChange:true});
  if (f === "/profile" && n === "POST") {
    let l = await a(t),
      v = (u?.taxonomy?.majors || []).map(S => S.id),
      T = U(l.name, 40);
    if (!T) throw new s(400, "\u8BF7\u586B\u5199\u59D3\u540D");
    let A = {
      level: ["UG", "PG"].includes(l.level) ? l.level : y.level,
      majorId: v.includes(l.majorId) ? l.majorId : y.majorId,
      season: U(l.season, 30),
      currentSchool: U(l.currentSchool, 120),
      countries: U(l.countries, 80),
      lang: U(l.lang, 80)
    };
    return await e.DB.prepare("UPDATE diy_accounts SET name = ?, profile = ? WHERE id = ?").bind(T, JSON.stringify(A), y.id).run(), r({
      ok: !0,
      me: Object.assign(y, A, {
        name: T
      })
    });
  }
  if (f === "/request" && n === "POST") {
    let l = await a(t),
      v = Nn.includes(l.kind) ? l.kind : "library",
      T = v === "school" && (u?.schools || []).some(S => S.id === l.ref) ? l.ref : "";
    return !y.requests.filter(S => !S.done).some(S => S.kind === v && S.ref === T) && y.requests.length < 100 && y.requests.push({
      id: "req-" + fe(6).replace(/[^A-Za-z0-9]/g, ""),
      kind: v,
      ref: T,
      at: _e(),
      done: !1
    }), await e.DB.prepare("UPDATE diy_accounts SET requests = ? WHERE id = ?").bind(JSON.stringify(y.requests), y.id).run(), r({
      ok: !0,
      requests: y.requests
    });
  }
  if (f === "/delete-self" && n === "POST") return await e.DB.batch([e.DB.prepare("DELETE FROM diy_records WHERE acct = ?").bind(y.id), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(y.id), e.DB.prepare("DELETE FROM diy_accounts WHERE id = ?").bind(y.id)]), await d(e, "diy:" + y.id, "diy-delete-self", "diy", y.id, y.name), r({
    ok: !0
  }, 200, {
    "Set-Cookie": et("", 0)
  });
  let w;
  if (w = f.match(/^\/t\/([a-z]+)\/([A-Za-z0-9_-]+)$/)) {
    let [, l, v] = w;
    if (!Gt.includes(l) || !Dn.test(v)) throw new s(400, "\u8BB0\u5F55\u65E0\u6548");
    let T = await e.DB.prepare("SELECT acct FROM diy_records WHERE tbl = ? AND id = ?").bind(l, v).first();
    if (T && T.acct !== y.id) throw new s(403, "\u6CA1\u6709\u6743\u9650");
    if (n === "DELETE") {
      let m = [e.DB.prepare("DELETE FROM diy_records WHERE tbl = ? AND id = ? AND acct = ?").bind(l, v, y.id)];
      return l === "apps" && m.push(e.DB.prepare("DELETE FROM diy_records WHERE tbl = 'tasks' AND acct = ? AND json_extract(data, '$.appId') = ?").bind(y.id, v)), await e.DB.batch(m), r({
        ok: !0
      });
    }
    if (n !== "PUT") throw new s(405, "\u4E0D\u652F\u6301\u7684\u64CD\u4F5C");
    if (!T && (await e.DB.prepare("SELECT COUNT(*) AS n FROM diy_records WHERE acct = ? AND tbl = ?").bind(y.id, l).first()).n >= On) throw new s(400, "\u8BB0\u5F55\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650");
    let A = await a(t),
      S = _e(),
      E;
    if (l === "apps") {
      let m = U(A.schoolId, 40);
      if (m && !qt(c, y, m)) throw new s(403, "\u8BE5\u9662\u6821\u5C1A\u672A\u5F00\u901A");
      let g = m ? u?.schools?.find(k => k.id === m) : null;
      if (E = {
        id: v,
        acct: y.id,
        schoolId: g ? m : "",
        name: g ? g.en : U(A.name, 120),
        program: U(A.program, 120),
        system: U(A.system, 120),
        deadline: jt(A.deadline),
        stage: Math.max(0, Math.min(5, parseInt(A.stage, 10) || 0)),
        note: U(A.note, 500)
      }, !E.name) throw new s(400, "\u8BF7\u586B\u5199\u9662\u6821\u540D\u79F0");
    } else if (l === "tasks") {
      let m = U(A.appId, 80);
      if (m && !(await e.DB.prepare("SELECT 1 FROM diy_records WHERE tbl = 'apps' AND id = ? AND acct = ?").bind(m, y.id).first()) && (m = ""), E = {
        id: v,
        acct: y.id,
        appId: m,
        title: U(A.title, 200),
        due: jt(A.due),
        status: _n.includes(A.status) ? A.status : "todo",
        src: U(A.src, 40)
      }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u4EFB\u52A1\u540D\u79F0");
    } else if (l === "docs") {
      if (E = {
        id: v,
        acct: y.id,
        title: U(A.title, 120),
        link: Ft(A.link),
        text: String(A.text || "").slice(0, 12e3)
      }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u6807\u9898");
      if (xn(E.text) > 1e3) throw new s(400, "\u6B63\u6587\u8D85\u8FC7 1000 \u8BCD");
    } else if (E = {
      id: v,
      acct: y.id,
      title: U(A.title, 120),
      status: zn.includes(A.status) ? A.status : "todo",
      link: Ft(A.link),
      note: U(A.note, 300)
    }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u6750\u6599\u540D\u79F0");
    return E.createdAt = U(A.createdAt, 40) || S, E.updatedAt = S, await e.DB.prepare("INSERT INTO diy_records (tbl, id, acct, data, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(tbl, id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at").bind(l, v, y.id, JSON.stringify(E), S).run(), r({
      ok: !0,
      record: E
    });
  }
  throw new s(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
async function Fn(t, e, i, n, o, r) {
  let {
      json: s,
      HttpError: a,
      body: d,
      audit: p
    } = r,
    f = await r.reqdbHead(e);
  if (i === "/state" && n === "GET") {
    let c = await nt(e, f),
      h = (await e.DB.prepare("SELECT * FROM diy_accounts ORDER BY created_at DESC").all()).results.map(it),
      y = (await e.DB.prepare("SELECT tbl, data FROM diy_records WHERE tbl IN ('apps','tasks')").all()).results,
      w = {
        apps: [],
        tasks: []
      };
    for (let l of y) w[l.tbl].push(JSON.parse(l.data));
    return s({
      config: c,
      templates: ce,
      accounts: h,
      data: w
    });
  }
  if (i === "/config" && n === "PUT") {
    let c = await d(t),
      h = await nt(e, f),
      y = new Set((f?.schools || []).map(l => l.id)),
      w = new Set(ce.map(l => l.id));
    if ("qr" in c) {
      let l = String(c.qr || "");
      if (l && !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(l)) throw new a(400, "\u4E8C\u7EF4\u7801\u56FE\u7247\u683C\u5F0F\u4E0D\u5BF9");
      if (l.length > 6e5) throw new a(400, "\u4E8C\u7EF4\u7801\u56FE\u7247\u8BF7\u5C0F\u4E8E 400 KB");
      h.qr = l;
    }
    return Array.isArray(c.freeSchools) && (h.freeSchools = c.freeSchools.filter(l => y.has(l))), Array.isArray(c.freeTemplates) && (h.freeTemplates = c.freeTemplates.filter(l => w.has(l))), "openRegister" in c && (h.openRegister = !!c.openRegister), "serviceTitle" in c && (h.serviceTitle = U(c.serviceTitle, 60) || "\u67AB\u7434\u82F1\u7F8E\u97F3\u4E50\u7559\u5B66\u7533\u8BF7\u670D\u52A1"), "serviceText" in c && (h.serviceText = U(c.serviceText, 300)), await e.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('diy:config', ?)").bind(JSON.stringify(h)).run(), await p(e, o.id, "diy-config"), s({
      ok: !0,
      config: h
    });
  }
  let u;
  if (u = i.match(/^\/accounts\/([A-Za-z0-9_-]+)(?:\/([a-z]+))?$/)) {
    let [, c, h] = u,
      y = await e.DB.prepare("SELECT * FROM diy_accounts WHERE id = ?").bind(c).first();
    if (!y) throw new a(404, "\u627E\u4E0D\u5230\u8BE5 DIY \u5B66\u5458");
    let w = it(y);
    if (h === "grants" && n === "PUT") {
      let l = await d(t),
        v = new Set((f?.schools || []).map(E => E.id)),
        T = new Set(ce.map(E => E.id)),
        A = l.grants || {},
        S = {
          all: !!A.all,
          report: !!A.report,
          schools: (A.schools || []).filter(E => v.has(E)),
          templates: (A.templates || []).filter(E => T.has(E))
        };
      return l.clearReq && w.requests.forEach(E => {
        E.done = !0;
      }), await e.DB.prepare("UPDATE diy_accounts SET grants = ?, requests = ? WHERE id = ?").bind(JSON.stringify(S), JSON.stringify(w.requests), c).run(), await p(e, o.id, "diy-grants", "diy", c, `${w.name}\uFF1A${S.all ? "\u5168\u90E8" : `\u9662\u6821 ${S.schools.length}\uFF0C\u6A21\u677F ${S.templates.length}${S.report ? "\uFF0C\u62A5\u544A" : ""}`}`), s({
        ok: !0
      });
    }
    if (h === "reset" && n === "POST") {
      let l = ee(),
        v = await H(l);
      return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET pw_hash = ?, pw_salt = ?, must_change = 1 WHERE id = ?").bind(v.hash, v.salt, c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)]), await p(e, o.id, "diy-reset", "diy", c, w.name), s({
        ok: !0,
        password: l
      });
    }
    if (h === "active" && n === "POST") {
      let l = await d(t),
        v = [e.DB.prepare("UPDATE diy_accounts SET active = ? WHERE id = ?").bind(l.active ? 1 : 0, c)];
      return l.active || v.push(e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)), await e.DB.batch(v), await p(e, o.id, l.active ? "diy-enable" : "diy-disable", "diy", c, w.name), s({
        ok: !0
      });
    }
    if (h === "converted" && n === "POST") {
      let l = await d(t);
      return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET active = 0, converted_to = ? WHERE id = ?").bind(U(l.studentId, 80), c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)]), await p(e, o.id, "diy-convert", "diy", c, w.name), s({
        ok: !0
      });
    }
    if (!h && n === "DELETE") return await e.DB.batch([e.DB.prepare("DELETE FROM diy_records WHERE acct = ?").bind(c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c), e.DB.prepare("DELETE FROM diy_accounts WHERE id = ?").bind(c)]), await p(e, o.id, "diy-delete", "diy", c, w.name), s({
      ok: !0
    });
  }
  throw new a(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
