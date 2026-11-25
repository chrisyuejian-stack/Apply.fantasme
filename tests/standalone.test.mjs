import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";

class LocalDatabase {
  constructor() { this.raw = new DatabaseSync(":memory:"); }
  prepare(query) {
    const database = this.raw;
    return {
      query, values: [],
      bind(...values) { this.values = values; return this; },
      async first() { return database.prepare(query).get(...this.values) || null; },
      async all() { return { results: database.prepare(query).all(...this.values) }; },
      async run() {
        const result = database.prepare(query).run(...this.values);
        return { meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
      },
    };
  }
  async batch(statements) {
    this.raw.exec("BEGIN IMMEDIATE");
    try {
      const results = [];
      for (const statement of statements) {
        results.push(this.raw.prepare(statement.query).columns().length ? await statement.all() : await statement.run());
      }
      this.raw.exec("COMMIT");
      return results;
    } catch (error) {
      this.raw.exec("ROLLBACK");
      throw error;
    }
  }
}
const entry = process.env.ORIGINAL_WORKER_PATH
  ? pathToFileURL(process.env.ORIGINAL_WORKER_PATH).href
  : new URL("../dist/_worker.js", import.meta.url).href;
const worker = (await import(entry + "?test=" + randomUUID())).default;
const db = new LocalDatabase();
const env = {
  APPLY_DB: db,
  APPLY_SETUP_KEY: "LocalTestSetupOnly2026",
  SITE_URL: "https://www.fantasmearts.com",
  ASSETS: {
    async fetch(request) {
      const path = new URL(request.url).pathname;
      if (path.includes("..")) return new Response("", { status: 404 });
      try {
        const data = await readFile(new URL("../public" + path, import.meta.url));
        const mime = path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".png") ? "image/png" : "text/html";
        return new Response(request.method === "HEAD" ? null : data, { headers: { "Content-Type": mime } });
      } catch { return new Response("", { status: 404 }); }
    },
  },
};
let cookie = "";
async function call(path, method = "GET", body, auth = cookie) {
  const request = new Request("https://apply.test" + path, {
    method,
    headers: { Cookie: auth, "X-FQ": "1", Origin: "https://apply.test", "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const response = await worker.fetch(request, env);
  const text = await response.text();
  return { status: response.status, headers: response.headers, text, data: response.headers.get("Content-Type")?.includes("json") ? JSON.parse(text) : null };
}
test("独立申请系统正常入口和状态流程", async (suite) => {
  try {
    await suite.test("匿名登录页、脚本和Logo直接读取，工作站未登录401", async () => {
      for (const path of ["/login", "/login.js", "/logo.png"]) assert.equal((await call(path)).status, 200, path);
      assert.equal((await call("/app/app.js")).status, 401);
      assert.equal((await call("/api/bootstrap")).status, 401);
      assert.equal((await call("/api/ai/status")).status, 401);
    });
    await suite.test("初始化主管、自动建表和内置院校库，重复初始化拒绝", async () => {
      const response = await call("/api/setup", "POST", { setupKey: env.APPLY_SETUP_KEY, name: "提取验证主管", username: "extract.test", password: "ExtractTest2026", demo: false });
      assert.equal(response.status, 200, response.text);
      cookie = response.headers.get("Set-Cookie").split(";")[0];
      assert.ok(cookie.startsWith("__Host-fq_session="));
      assert.equal((await call("/api/setup-status")).data.needsSetup, false);
      assert.equal((await call("/api/setup", "POST", {})).status, 403);
      assert.ok(db.raw.prepare("SELECT COUNT(*) n FROM meta WHERE key LIKE 'reqdb:%'").get().n > 0);
    });
    let student, document;
    await suite.test("主管保存学生、申请、任务、文书和曲目，刷新后仍存在", async () => {
      student = { id: "student-extract", name: "验证学员" };
      const rows = {
        students: student,
        applications: { id: "application-extract", studentId: student.id, schoolId: "rcm", status: "planning" },
        tasks: { id: "task-extract", studentId: student.id, title: "核实申请要求", status: "todo" },
        documents: { id: "document-extract", studentId: student.id, title: "个人陈述", type: "personal_statement", status: "drafting" },
        repertoire: { id: "repertoire-extract", studentId: student.id, title: "验证曲目" },
      };
      for (const [table, row] of Object.entries(rows)) {
        const response = await call("/api/t/" + table + "/" + row.id, "PUT", row);
        assert.equal(response.status, 200, response.text);
        if (table === "documents") document = response.data.record;
      }
      const bootstrap = await call("/api/bootstrap");
      assert.equal(bootstrap.status, 200);
      for (const [table, row] of Object.entries(rows)) assert.ok(bootstrap.data.data[table].some(x => x.id === row.id), table);
    });
    await suite.test("文书独立修订保存新版本，旧快照再次提交409", async () => {
      const payload = { versionId: document.currentVersionId || null, base: document.updatedAt, text: "I study music and explore new interpretations.", note: "验证修订" };
      const saved = await call("/api/documents/" + document.id + "/revise", "POST", payload);
      assert.equal(saved.status, 200, saved.text);
      assert.ok(saved.data.document.currentVersionId);
      assert.equal((await call("/api/documents/" + document.id + "/revise", "POST", payload)).status, 409);
    });
    await suite.test("学生账号关联档案、首次改密、个人范围和员工接口拒绝", async () => {
      const created = await call("/api/users", "POST", { username: "extract.student", name: "验证学员", role: "student", studentId: student.id });
      assert.equal(created.status, 200, created.text);
      const login = await call("/api/login", "POST", { username: "extract.student", password: created.data.password }, "");
      assert.equal(login.status, 200);
      const studentCookie = login.headers.get("Set-Cookie").split(";")[0];
      assert.equal((await call("/api/bootstrap", "GET", undefined, studentCookie)).status, 403);
      const changed = await call("/api/password", "POST", { old: created.data.password, new: "StudentExtract2026" }, studentCookie);
      assert.equal(changed.status, 200, changed.text);
      const own = await call("/api/bootstrap", "GET", undefined, studentCookie);
      assert.equal(own.status, 200, own.text);
      assert.deepEqual(own.data.data.students.map(x => x.id), [student.id]);
      assert.equal((await call("/api/users", "POST", { username: "illegal", name: "越权", role: "supervisor" }, studentCookie)).status, 403);
    });
    await suite.test("DIY 注册、登录与基础状态接口保留", async () => {
      assert.equal((await call("/api/diy/status", "GET", undefined, "")).status, 200);
      const registered = await call("/api/diy/register", "POST", { phone: "13900001234", name: "验证自助学员", password: "DiyExtract2026", agree: true, level: "UG" }, "");
      assert.equal(registered.status, 200, registered.text);
    });
    await suite.test("AI状态显示ai-2.2，无密钥时状态可读取", async () => {
      const response = await call("/api/ai/status");
      assert.equal(response.status, 200, response.text);
      assert.equal(response.data.version, "ai-2.2");
      assert.equal(response.data.enabled, false);
      assert.equal(response.data.assistant, true);
    });
    await suite.test("导出备份含业务记录，院校库可导出", async () => {
      const exported = await call("/api/admin/export");
      assert.equal(exported.status, 200, exported.text);
      assert.equal(exported.data.format, "fq-admissions");
      assert.ok(exported.data.students.some(x => x.id === student.id));
      assert.equal((await call("/api/reqdb")).status, 200);
    });
    await suite.test("全部前端资源与官网返回入口保留", async () => {
      for (const path of ["/app/app.js", "/app/app.css", "/app/ai.js", "/app/ai.css", "/app/diy-preview.jpg", "/embed-login"]) assert.equal((await call(path)).status, 200, path);
      const response = await call("/__portal");
      assert.equal(response.status, 302);
      assert.equal(response.headers.get("Location"), env.SITE_URL + "/portal");
      assert.equal((await call("/api/unknown")).status, 404);
    });
    await suite.test("登出撤销会话，正确密码可重登，连续错误密码仍限流", async () => {
      assert.equal((await call("/api/logout", "POST", {})).status, 200);
      assert.equal((await call("/api/bootstrap")).status, 401);
      const login = await call("/api/login", "POST", { username: "extract.test", password: "ExtractTest2026" }, "");
      assert.equal(login.status, 200);
      for (let i = 0; i < 5; i++) assert.equal((await call("/api/login", "POST", { username: "extract.test", password: "BadPassword2026" }, "")).status, 401);
      assert.equal((await call("/api/login", "POST", { username: "extract.test", password: "ExtractTest2026" }, "")).status, 429);
    });
  } finally { db.raw.close(); }
});
