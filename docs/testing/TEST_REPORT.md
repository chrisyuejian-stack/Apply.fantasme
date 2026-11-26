# 枫琴申请工作站（v2.2.1 恢复基线）全面测试与安全性能诊断报告

> 测试分支：`recovery/apply-v2.2.1-baseline`（commit 基准之上未修改任何业务代码）
> 测试日期：2026-11-25
> 报告原则：仅记录本地实测可复现的事实与证据；未连生产、未使用真实学生数据、不修改历史哈希或弱化断言。

---

## 一、测试环境、执行命令与结果统计

### 1.1 测试环境

| 项目 | 实际配置 |
| --- | --- |
| 操作系统 | Linux `6.18.57` (Ubuntu 24.04 x64) |
| CPU / 内存 | `2x Intel(R) Xeon(R) CPU @ 2.30GHz`，`7,959 MB RAM` |
| Node.js / npm | `v24.22.3` / `11.19.1`（满足 `package.json` `>=24` 与 `.node-version` `24` 要求） |
| 本地 HTTPS / SQLite | `scripts/dev.mjs`（OpenSSL 自签名证书 + `node:sqlite` `LocalDatabase` 串行队列） |
| 浏览器自动化 | Google Chrome `158.0.8127.36` + Python Playwright `sync_playwright`（headless） |
| AI / 外部服务 | 默认关闭（`DEEPSEEK_API_KEY` 未配置；鉴权顺序与配额测试使用局部假密钥且未发外网请求） |

### 1.2 执行命令与用例汇总

| 测试套件 | 执行命令 | 总数 | 通过 | 失败 | 跳过 | 未执行 / 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| 原始基线文件校验 | `npm run verify:baseline` | 16 | 16 | 0 | 0 | 另有 `dist/` 12 个构建产物校验 12/12 一致 |
| 原有回归测试 | `npm test` | 12 | 12 | 0 | 0 | `dev.test.mjs` 1 项 + `standalone.test.mjs` 11 项 |
| 功能与数据一致性回归 | `node --test tests/regression/functional.test.mjs` | 22（18 叶子用例） | 6 | 16（12 叶子失败） | 0 | 12 项失败均为已确认业务/一致性 Bug 探针 |
| 权限矩阵与安全回归 | `node --test tests/regression/security.test.mjs` | 12（9 叶子用例） | 5 | 7（3 叶子失败） | 0 | 3 项叶子失败均为已确认权限/安全缺陷探针 |
| 浏览器端到端（Playwright） | `/opt/pyenv/shims/python tests/e2e/browser_audit.py` | 33（功能检查）+ 9（响应式视口） | 32 + 8 | 1 + 1 | 0 | 发现 DIY 空链接 `#`、移动端 `#/home` 横向溢出 |
| 深度 UI 全路由与交互巡检 | `python3 tests/e2e/ui_deep_audit.py` | 25 路由 + 2 AI 面板动作 + 37 视口检查 | 24 路由 + 2 AI 动作 + 32 视口 | 1 路由 + 5 视口 + 1 UI 校验 | 0 | 发现 `na()` 永久缓存导致新 DIY 注册不显示、`ftp://` 链接校验失效、5 处 375px 溢出 |
| 性能与并发基准 | `node scripts/perf-bench.mjs` | 3 档规模 + 5 组并发 | 全部完成 | 0（工具错误） | 0 | 详见第 4 节数据；本地串行队列不可等价 D1 线上并发 |

> 说明：`node --test` 的统计总数同时计入父测试与子测试；上表已同时标明叶子用例数，所有失败回归均为故意暴露代码缺陷的失败用例（未跳过、未弱化断言）。

---

## 二、功能与角色权限覆盖矩阵

### 2.1 六类角色接口权限矩阵（实测）

| 接口 / 资源 | 匿名 | DIY | 学生 `student` | 文书 `writer` | 顾问 `advisor` | 主管 `supervisor` | 实测结论 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `GET /login`, `/login.js`, `/logo.png` | 200 | 302 (`/`) / 200 | 302 (`/`) / 200 | 302 (`/`) / 200 | 302 (`/`) / 200 | 302 (`/`) / 200 | 正常 |
| `GET /app/app.js` 等工作站静态资源 | **401** | 200 | 200 | 200 | 200 | 200 | 正常 |
| `GET /api/bootstrap` | **401** | 200（`diy:true`，空业务数据） | 200（仅本人脱敏） | 200（关联学生，去 `accounts`） | 200（名下学生） | 200（全量） | 正常（`mustChange=1` 时 返回 403） |
| `POST /api/users`（开员工账号） | 401 | 401 | 403 | 403 | 403 | 200 | 顾问仅可为名下学生开学生号 |
| `PUT /api/users/:id` | 401 | 401 | 403 | 403 | 403 | 200 | 主管不可停用/降权自己 |
| `POST /api/users/:id/reset` | 401 | 401 | 403 | 403 | 仅名下学生 200，其余 403 | 200 | 重置后旧会话立即失效 |
| `GET /api/admin/export`, `/admin/audit` | 401 | 401 | 403 | 403 | 403 | 200 | 正常 |
| `POST /api/admin/import`, `/demo`, `/clear` | 401 | 401 | 403 | 403 | 403 | 200 | 仅主管，但 `import` 缺原子性（见 Bug-02） |
| `GET / PUT /api/reqdb` | 401 | 401 | 403 | 403 | 403 | 200 | 正常 |
| `GET /api/reqdb/school/:id` | 401 | 401 | 403 | 200 | 200 | 200 | 正常 |
| `DELETE /api/students/:id` | 401 | 401 | 403 | 403 | 403 | 200（级联） | 与 `DELETE /api/t/students/:id` 行为不一致（见 Bug-01） |
| `PUT / DELETE /api/t/:tbl/:id` | 401 | 401 | 仅采集表/确认文书/自建推荐人 | 仅被指派任务状态/文书版本送审 | 仅名下学生 | 全量 | 存在学生覆盖顾问推荐人、删除不级联、缺 `_base` 覆盖、无 `Origin` 校验等缺陷 |
| `POST /api/documents/:id/revise` | 401 | 401 | 403 | 403 | 403 | 200 | 仅主管可修订正文 |
| `POST /api/documents/:id/proxy-confirm` | 401 | 401 | 403 | 403 | 403 | 200（`student_review`） | 缺版本时先报 409 后鉴权（见提示） |
| `POST /api/documents/:id/review` | 401 | 401 | `student_review` 200 | 403 | `advisor_review` 200 | `supervisor_review` 200 | `final` 状态被阻塞（见 Bug-09） |
| `GET/POST/PUT/DELETE /api/diy/*` | 仅 status/reg/login | 仅本人 `acct` 隔离 | 无 DIY 会话则 401 | 无 DIY 会话则 401 | 无 DIY 会话则 401 | 无 DIY 会话则 401 | `mustChange=1` 时后端未拦截（见 Bug-05） |
| `GET/POST/PUT/DELETE /api/diy-admin/*` | 403 | 403 | 403 | 403 | 403 | 200 | 正常 |
| `GET /api/ai/status` | 401 | 401 | 200 | 200 | 200 | 200 | 正常 |
| `GET /api/ai/record/:id` | 401 | 401 | 403 | 200 | 200 | 200 | 正常 |
| `POST /api/ai/run`, `/chat`, `/verify`, `/feedback` | 401 | 401 | 403 | 403 | 200（仅名下学生） | 200 | `run` 先扣配额后鉴权（见 Bug-08） |
| `POST /api/ai/essay` | 401 | 401 | 403 | 200（仅可见学生/文书） | 200（仅名下学生） | 200 | `review` 仅主管与顾问可用 |

### 2.2 功能范围覆盖明细

| 模块 | 覆盖场景 | 结果 |
| --- | --- | --- |
| 初始化与认证 | 空库初始化、错误密钥、弱密码、重复初始化拒绝、demo 账号生成、大小写用户名登录、登出撤销会话、5 次错误密码 429 锁定、账号启停撤销会话、修改/重置密码、会话过期与 `<6h` 滑动续期、重启后持久化 | 全部通过 |
| 业务实体 CRUD | `students`, `applications`, `submissions`, `rounds`, `tasks`（含 `dependsOn`）, `materials`, `documents`, `versions`, `reviews`, `repertoire`, `recommenders`, `refRequests`, `activity`, `templates` 落库及重启持久化 | 落库通过；级联删除与推荐人覆盖存在缺陷 |
| 文书工作流 | `drafting → advisor_review → supervisor_review → student_review → final`，主管 `revise`、主管 `proxy-confirm`、旧版本/旧快照 `409`、10 并发竞争写入 | 主流程与并发 `409` 通过；`final` 退回与空白版本校验存在缺陷 |
| 导入导出与院校库 | 正常导出 `fq-admissions` 与重复导入、院校库读取、空备份、坏 `reqdb`、同名不同 ID 用户 | 正常流程通过；异常/空备份存在破坏性缺陷 |
| DIY 模块 | 注册限流、关闭注册、重复手机号、示范/付费授权、停用、转付费、与正式学生隔离 | 核心隔离通过；`mustChange` 未拦截、空链接渲染缺陷 |
| AI 模块（离线） | 无 Key 状态、`brief` 与 `auditAll` 纯计算、脱敏输出、越权 `studentId` 拦截 | 脱敏与基础隔离通过；配额先扣、全局缓存等缺陷 |
| 浏览器 E2E | 登录/首次改密 UI、5 角色登录切换、全路由渲染、弹窗表单、搜索筛选、XSS 载荷、30 次路由切换、200 学生列表、桌面与 375px 窄屏 | 32/33 通过；发现 `#/home` 移动端溢出与 DIY 空链接 `#` |

---

## 三、已确认 Bug 清单（均附本地可复现测试证据）

### [High] BUG-01：`DELETE /api/t/students/:id` 未级联删除关联数据与学生登录账号
- **代码位置**：`src/server/application.js` [`Qe`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8136-L8140)、[`$n`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L9224-L9232)（对比 [`Vn`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8841-L8850)）
- **最小复现**：主管调用 `DELETE /api/t/students/stu-del`（带关联任务及 `student` 用户账号）。
- **预期与实际**：预期与 `DELETE /api/students/:id` 一致级联清理关联 `records`、`users` 与 `sessions`（或禁止经 `/api/t/students/:id` 删除）；实际返回 `200`，数据库留下 `records` 孤儿任务（`count=1`）和 `users` 学生账号（`count=1`），且该账号之后甚至无法在 `PUT /api/users/:id` 被停用（`en` 检查学生档案不存在报错 400）。
- **证据**：`tests/regression/functional.test.mjs` 用例 `5a` 失败。
- **修复建议**：禁止 `DELETE /api/t/students/:id`（强制走 `DELETE /api/students/:id`），或在 `$n` 中转调 `Vn`。

### [High] BUG-02：`POST /api/admin/import` 先全量清空再校验，异常备份会破坏现有生产数据
- **代码位置**：`src/server/application.js` [`ni`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L9362-L9384)、[`rt`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8904-L8912)
- **最小复现**：库内已有 `stu-keep`，主管提交 `POST /api/admin/import` 传入 `{ format: "fq-admissions", students: [{ id: "stu-new", name: "新" }], reqdb: { broken: true } }`；或传入含同名不同 ID 用户的备份；或传入空备份 `{ format: "fq-admissions" }`。
- **预期与实际**：
  1. `reqdb` 校验失败返回 `400` 时，原有 `stu-keep` **已被 `rt(..., { wipe: true })` 清空**；
  2. `users` 中存在同名不同 `id` 用户时直接抛出 `UNIQUE constraint failed: users.username` 导致 **500 崩溃**，且此时业务表已被清空；
  3. 仅含 `format` 的空备份导入会把内置 10 条 `templates` 也一并清空（实际 `0 !== 10`）。
- **证据**：`tests/regression/functional.test.mjs` 用例 `6b`、`6c`、`8a` 均失败。
- **修复建议**：导入前完整校验 `records`/`reqdb`/`users` 结构（含用户名唯一性预检）；若非空才覆盖且保留或合并 `templates`；在单个事务或先校验后批量原子替换中执行。

### [High] BUG-03：业务写接口 `/api/*` 未校验 `Origin` 头（与 `/api/ai/*` 防护不一致）
- **代码位置**：`src/server/application.js` [`Yn`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L9051)（对比 `src/server/ai.js` [`fqaiSameOrigin`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/ai.js#L66-L70)）
- **最小复现**：携带有效 Cookie 与 `X-FQ: 1`、伪造 `Origin: https://evil.attacker.example` 请求 `PUT /api/t/students/stu-csrf`。
- **预期与实际**：预期与 `/api/ai/*` 一致返回 `403`；实际返回 `200` 并完成写入。虽然默认无 CORS 头且 Cookie 为 `SameSite=Strict`，但防御深度不如 AI 模块一致。
- **证据**：`tests/regression/security.test.mjs` 用例 `4b` 失败（实际 `200 !== 403`）。
- **修复建议**：在 `Yn` 非 `GET/HEAD` 请求中增加与 `fqaiSameOrigin` 相同的 `Origin` / `Sec-Fetch-Site` 同源校验。

### [Medium] BUG-04：学生可覆盖顾问录入的推荐人（`fromIntake=false`）且篡改字段，且主管删除推荐人可留下孤儿 `refRequests`
- **代码位置**：`src/server/application.js` [`Qe`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8208-L8220)
- **最小复现**：
  1. 顾问创建 `rec-a`（`fromIntake: false`），学生调用 `PUT /api/t/recommenders/rec-a` 修改 `name`；
  2. 为 `rec-a` 创建 `refRequests`，主管调用 `DELETE /api/t/recommenders/rec-a`。
- **预期与实际**：
  1. 学生对非采集表创建或已有请求的推荐人应被拒绝（`403`），实际返回 `200`，成功修改 `name` 并把 `fromIntake` 覆写为 `true`；
  2. 主管删除已有 `refRequests` 的推荐人返回 `200`，留下悬空 `refRequests`（指向已删除 `rec-a`）。
- **证据**：`tests/regression/security.test.mjs` 用例 `2b` 失败；`tests/regression/functional.test.mjs` 用例 `3` 失败。
- **修复建议**：学生修改推荐人前校验 `n.fromIntake` 且无关联 `refRequests`；主管/顾问删除推荐人前检查 `refRequestsOf`（或同步提示/清理）。

### [Medium] BUG-05：DIY 账号被重置密码（`mustChange=1`）后，后端未阻止业务读写操作
- **代码位置**：`src/server/application.js` [`Vt`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8535-L8704)、[`Fn`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8768-L8775)
- **最小复现**：主管调用 `POST /api/diy-admin/accounts/:id/reset` 置 `must_change=1`；DIY 用户用临时密码登录后，不改密直接调用 `PUT /api/diy/t/tasks/t-1`。
- **预期与实际**：预期与正式账号一致返回 `403`（仅允许 `/diy/bootstrap`、`/diy/password`、`/diy/logout`）；实际返回 `200` 允许直接写入业务数据（仅前端弹窗提示）。
- **证据**：`tests/regression/functional.test.mjs` 用例 `7b` 失败（实际 `200 !== 403`）。
- **修复建议**：在 `Vt` 解析会话 `y` 之后、`/diy/password` 与 `/diy/logout` 与 `/diy/bootstrap` 之后增加 `if (y.mustChange) throw new s(403, "请先修改初始密码")`。

### [Medium] BUG-06：`PUT /api/t/:tbl/:id` 省略 `_base` 时绕过乐观锁，且 `versions` 允许纯空白文本、已归档文书仍可直接写版本
- **代码位置**：`src/server/application.js` [`$n`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L9249)、[`Qe`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8232-L8248)
- **最小复现**：
  1. 对已存在记录 `stu-lock` 调用 `PUT /api/t/students/stu-lock` 不传 `_base`；
  2. 调用 `PUT /api/t/versions/ver-blank` 传 `text: "    \n\t  "`；
  3. 对 `archived: true` 的文书 `doc-arch` 调用 `PUT /api/t/versions/ver-arch`。
- **预期与实际**：三者分别应返回 `409`、`400`、`409`，实际全部返回 `200` 成功落库（绕过并发锁、绕过 `1–1000 words` 校验、向已归档文书写入新版本）。
- **证据**：`tests/regression/functional.test.mjs` 用例 `5b`、`5c`、`5d` 均失败。
- **修复建议**：`Qe` 中 `versions` 强制 `.trim()` 且 `words >= 1`，校验 `!c.archived`；`$n` 对已存在记录要求携带 `_base`（或逐步在各写端强制）。

### [Medium] BUG-07：跨 DB 实例复用同一 Worker 模块时，全局 `Wt` 与 `fqaiMemo` 导致建表跳过 (`500`) 与跨库缓存风险
- **代码位置**：`src/server/application.js` [`Wt` / `Hn`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8796-L8802)、`src/server/ai.js` [`fqaiMemo` / `fqaiLoad`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/ai.js#L107-L124)
- **最小复现**：同一 Worker 模块先以 `db1` 触发请求（置 `Wt=true`），再以全新的 `db2` 调用 `GET /api/setup-status`。
- **预期与实际**：预期按 DB 实例初始化建表并返回 `200`；实际跳过建表，直接抛出 `500 服务器错误：no such table: users`。同理 `fqaiMemo` 也为全局单例（虽然 `ai.js` 的 `fqaiReady` 正确使用了 `WeakMap`）。
- **证据**：`tests/regression/functional.test.mjs` 用例 `8c` 失败；`scripts/perf-bench.mjs` 初次运行触发该错误。
- **修复建议**：将 `Wt` 改为 `new WeakSet()` 按 `t.DB` 记录（与 `fqaiReady` 对齐），`fqaiMemo` 改为 `WeakMap` 按 `db` 隔离。

### [Low/Medium] BUG-08：`POST /api/ai/run` 在校验学生权限之前先扣除 `dailyChat` / `dailyPro` 配额
- **代码位置**：`src/server/ai.js` [`fqaiRunAction`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/ai.js#L1988-L2001)
- **最小复现**：在配置 `DEEPSEEK_API_KEY` 下，顾问 A 对非名下学生 `stu-other` 调用 `POST /api/ai/run` (`{ action: "audit", studentId: "stu-other" }`)。
- **预期与实际**：预期返回 `403` 且不扣配额；实际先调用 `fqaiTake(..., 'chat')` 使今日 `used` 从 `0` 增至 `1`，随后才抛出 `403`。
- **证据**：`tests/regression/security.test.mjs` 用例 `5a` 失败（实际 `1 !== 0`）。
- **修复建议**：将 `if (!scope.manage.has(sid))` 权限校验前移到 `fqaiTake` 扣额之前。

### [Low] BUG-09：`POST /api/documents/:id/review` 与 `Qe` 规则不一致（阻止对 `final` 文书发起 `changes` 退回）
- **代码位置**：`src/server/application.js` [`fqDocumentAction`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8989)（对比 [`Qe`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L8266-L8267) 与前端 `doc-reopen`）
- **最小复现**：将文书 `doc-f` 推进到 `final`，主管调用 `POST /api/documents/doc-f/review` 传入 `{ stage: "supervisor", decision: "changes", comment: "需要重新修改" }`。
- **预期与实际**：`Qe` 明确允许顾问/主管对 `final` 文书提交 `changes`，但 `fqDocumentAction` 第 8989 行硬编码拦截 `doc.status === 'final'` 返回 `400`。前端 `doc-reopen` 目前绕过该端点改走非原子的 `PUT /api/t/reviews` + `PUT /api/t/documents`。
- **证据**：`tests/regression/functional.test.mjs` 用例 `8b` 失败（`400 !== 200`）。
- **修复建议**：在 `fqDocumentAction` 中放行 `doc.status === 'final' && record.decision === 'changes' && ['advisor','supervisor'].includes(record.stage)`，并让前端 `doc-reopen` 统一走原子接口。

### [Medium/UI] BUG-10（浏览器实测）：375px 窄屏多页面横向溢出（最高 776px）且移动端隐藏全局搜索无替代入口
- **代码位置**：`public/apply/app/app.css` [`@media(max-width:1180px) .cols-main`、`@media(max-width:860px)` 及 `.stack`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.css#L1-L2)
- **最小复现**：Headless Chrome 在 `375x812` 视口分别访问主管端 `#/home`、`#/app/app-1/overview`、`#/app/app-1/req`、`#/app/app-1/tasks` 及文书端 `#/home`。
- **预期与实际**：所有 5 处均出现水平滚动条——主管 `#/home` 达 `776px`、文书 `#/home` 达 `680px`、申校详情 `#/app/app-1/{overview,req,tasks}` 均达 `402px`（超出 `375px`）。根因：`@media(max-width:1180px)` 下 `.cols-main` 与 `@media(max-width:860px)` 下 `.shell`/`.cols-2`/`.form-grid` 均写死 `1fr`（非 `minmax(0, 1fr)`），`.stack` 缺 `min-width: 0`，且 `.card`/`.fact` 在窄屏未允许内容收缩折行。此外 `@media(max-width:860px)` 直接隐藏 `.top-actions .input` 全局搜索框且无移动搜索入口。
- **证据**：`tests/e2e/browser_audit.py` 与 `tests/e2e/ui_deep_audit.py`（37 项 375px 视口检查中 5 处溢出）。
- **修复建议**：响应式单列网格统一改为 `minmax(0, 1fr)`，`.stack`/`.panel`/`.card` 补齐 `min-width: 0`，`.fact` 在窄屏允许断行或改为单列。

### [Medium/UI] BUG-11（浏览器实测）：URL 清洗函数 `S()` 返回真值 `"#"`，导致 DIY 链接校验形同虚设且多处渲染无效 `<a href="#">打开</a>`
- **代码位置**：`public/apply/app/app.js` [`S()`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L105-L108)、DIY `#/files`（[第 5796 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L5796)）、DIY 文书/材料校验（[第 6232/6252 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L6232-L6252)）、`mat-open`（[第 3318 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L3318)）、`mat-version`（[第 3334–3344 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L3334-L3344)）、采集表附件表（[第 4679 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L4679)）
- **最小复现**：
  1. DIY 端在 `#/files` 新增材料不填链接，表格渲染可点击的 `<a href="#">打开</a>` 而非 `—`；
  2. DIY 端在 `#/files` 或 `#/docs` 提交 `ftp://bad.example/file`（非 `http(s)://` 链接）。
- **预期与实际**：预期前端提示“链接需以 http(s):// 开头”并保留弹窗；实际因 `S("ftp://...")` 返回 `"#"`（JavaScript 真值），`if (s.link && !S(s.link))` 永远为 `false` 导致校验被跳过，弹窗直接关闭并由后端 `Ft()` 静默清为空字符串，随后列表再次渲染为 `<a href="#">打开</a>`。同理正式端 `mat-open` 与采集表第 11 节附件表也会对非法/空链接输出 `href="#"`，`mat-version` 与 `ver-new` 正文空白（[第 3170 行](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L3170)未 `.trim()`）也缺同级别前端校验。
- **证据**：`tests/e2e/browser_audit.py`（`bad_hash_link=1`）与 `tests/e2e/ui_deep_audit.py`（`ui_bugs` 复现 `ftp://bad.example/file` 未被拦截）。
- **修复建议**：区分纯校验函数（如 `isHttpUrl(v)` 返回布尔值）与安全链接取值；空/无效链接渲染 `—` 而非 `<a href="#">`。

### [Medium/UI] BUG-12（浏览器实测）：主管端 `na()` 永久缓存 `/api/diy-admin/state`，登录期间新注册或新申请授权的 DIY 学员不刷新整页无法看到
- **代码位置**：`public/apply/app/app.js` [`na()`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L5589-L5598)、[`Vs` DIY 钩子](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L6571-L6572)
- **最小复现**：主管登录后停留在工作站（`#/home` 时即已触发 `na()` 并将 Promise 缓存在 `da` 且置 `ea.d`）；随后新 DIY 学员通过 `/api/diy/register` 注册成功（`200 {"ok":true}`），主管点击侧边栏进入 `#/diy-students` 并切换“全部”标签。
- **预期与实际**：预期实时拉取或提供刷新入口展示新注册 DIY 学员；实际 `#/diy-students` 页面始终显示 `注册人数 0 / 全部 0 / 没有符合条件的 DIY 学员`，必须强刷整页才可见。
- **证据**：`tests/e2e/ui_deep_audit.py`（`diy_reg_res: 200 {"ok":true}`，但 `#/diy-students` 实测渲染 `注册人数 0`，导致 `#/diy-student/:id` 检查失败）。
- **修复建议**：进入 `#/diy-students` / `#/diy-student/:id` 路由时允许按需刷新 `na(true)`（如超过短 TTL 或切换进页面时后台刷新），并在页面右上角提供显式刷新按钮。

### 额外静态发现（待核实 / 低风险契约项）
- **`fqaiVerify` 未对院校库条目里的 `r.src` 走 `fqaiSafeUrl` 校验**（[`fqaiVerify`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/ai.js#L427-L430)）：虽然 `open_page` 使用了 `fqaiSafeUrl` 过滤内网/IP 地址，但 `fqaiVerify` 直接按 `/^https?:\/\//i` 从 `reqdb` 读取 `r.src` 发起服务端抓取（仅主管可导入 `reqdb`，风险面较低，建议统一走 `fqaiSafeUrl`）。
- **关联删除不完整**：除推荐人外，直接调用 `DELETE /api/t/applications/:id`、`submissions/:id`、`documents/:id`、`tasks/:id` 时后端也不做关联引用的级联/拦截检查（`documents` 删除后版本和审核记录成为孤儿数据；`tasks` 删除后 `dependsOn` 悬空）。
- **首次改密与登出切换期间产生额外 401/403 控制台噪音**：浏览器实测登录首次改密页及切换账号时，前端并行请求 `/api/bootstrap`（`403` 后回退 `/api/me`）及 `/api/ai/status`（特定时机触发 `401`），虽界面功能正常，但控制台与网络面板存在报错噪音。
- **文书重新打开 `doc-reopen` 非原子写入**（[`doc-reopen`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/public/apply/app/app.js#L3267-L3291)）：因后端 `fqDocumentAction` 拦截 `final` 文书（BUG-09），前端被迫连发两条 `st.put("reviews")` + `st.patch("documents")`，若第二条失败或网络中断将导致状态半写入。

---

## 四、性能与稳定性基准结果

### 4.1 测量说明与限制
- **数据规模**：合成数据（`tests/e2e/browser_audit.py` 与 `scripts/perf-bench.mjs` 生成，不含任何真实学生数据），每名学生固定配置 3 申请、3 提交平台、3 考试轮次、10 任务、2 文书、2 版本、2 审核、2 材料、2 曲目、2 推荐人、2 推荐请求、2 动态（约 36 条记录/学生）。
- **限制说明**：`scripts/dev.mjs` 通过单一 Promise 队列串行进入单进程 `node:sqlite` (`DatabaseSync`)。本节测得的并发指标反映本地串行排队与 SQLite 事务行为，**不能据此宣称 Cloudflare D1 分布式并发、I/O 延迟或 Workers 128 MB / CPU 限额已验收**。

### 4.2 三档规模性能数据（内存 Worker + SQLite，PBKDF2=10,000）

| 规模 | 学生 / 记录数 | 导入耗时 (ms) | `GET /api/bootstrap` p50 / p95 / max (ms, n=15) | `bootstrap` 响应体 | `PUT task` p50 / p95 (ms, n=15) | `doc/revise` p50 / p95 (ms, n=10) | `admin/export` p50 (ms, n=5) / 体积 | `ai/run (auditAll)` p50 / p95 (ms, n=5) | 进程 RSS / HeapUsed (MB) | 错误率 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Small** | 10 / 360 | 23.84 | 4.99 / 6.53 / 6.64 | 115.0 KB | 0.95 / 1.37 | 1.21 / 2.87 | 12.21 / 346.2 KB | 11.10 / 14.12 | 72.3 / 10.7 | 0% |
| **Medium** | 100 / 3,600 | 209.86 | 36.64 / 40.81 / 48.67 | 1.02 MB | 1.66 / 2.22 | 1.70 / 1.82 | 50.20 / 1.24 MB | 49.05 / 59.37 | 127.6 / 22.5 | 0% |
| **Large** | 500 / 18,000 | 970.06 | **188.78 / 377.07 / 406.19** | **5.08 MB** | 3.92 / 5.40 | 3.59 / 3.69 | 215.28 / 5.31 MB | **344.99 / 354.81** | **428.5 / 90.7** | 0% |

### 4.3 冷启动、登录与 HTTPS 并发 / 竞争写入（Medium 100 学生）

| 指标 | 样本数 | 结果 (ms) | 错误率 / 说明 |
| --- | --- | --- | --- |
| 本地 HTTPS 服务冷启动 | 1 | `614.76` | 包含加载 `dist/_worker.js` 与开启 TLS 监听 |
| 登录耗时（`PBKDF2_ITERATIONS=100000` 生产默认） | 5 | p50 `112.22` / p95 `113.07` / max `118.15` | 0% 错误 |
| 登录耗时（`PBKDF2_ITERATIONS=10000` 开发档） | 5 | p50 `60.99` / p95 `62.68` / max `104.54` | 0% 错误 |
| HTTPS 并发 `GET /api/bootstrap` (`c=5`) | 5 | min `88.00` / p50 `296.01` / p95 `359.47` / max `393.15` | 0% 错误 |
| HTTPS 并发 `GET /api/bootstrap` (`c=10`) | 10 | min `58.34` / p50 `206.66` / p95 `337.41` / max `384.89` | 0% 错误 |
| HTTPS 并发 `GET /api/bootstrap` (`c=20`) | 20 | min `66.04` / p50 `434.22` / p95 `744.48` / max `791.50` | 0% 错误（本地串行排队延迟线性叠加） |
| 10 并发竞争 `POST /api/documents/:id/revise`（同快照） | 10 | p50 `39.16` / max `44.72` | **精确 1× `200` + 9× `409`**, 0 个 `500` |
| 10 并发竞争 `PUT /api/t/tasks/:id`（同 `_base`） | 10 | p50 `52.77` / max `62.15` | **精确 1× `200` + 9× `409`**, 0 个 `500` |

### 4.4 浏览器长列表与重复切换稳定性（Headless Chrome）
- **200 名合成学生列表渲染**：`166.9 ms`（DOM 节点数 `4,200`）。
- **连续 30 次跨页面路由切换**：切换前后 DOM 节点维持 `4,200`（无 DOM 残留），JS Heap 从 `48.05 MB` 稳定回落至 `30.10 MB`，弹窗点击仅创建 `1` 个 `#modalForm`（全局事件代理未发生重复绑定或监听泄漏）。

### 4.5 识别出的主要性能瓶颈（含建议目标）
1. **`GET /api/bootstrap` 全表拉取 + 全量反序列化**：[`Jn`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/application.js#L9182) 执行无 `WHERE` 条件的 `SELECT tbl, data FROM records`，即使学生或单个顾问只看少数学生，也会把全库 18,000 条记录全部读入并 `JSON.parse()`。500 学生规模下已产生 `5.08 MB` 响应体与 `428.5 MB` 进程 RSS（`heapUsed 90.7 MB`），接近 Cloudflare Workers `128 MB` Isolate 内存上限。
   - **建议目标**（无现成产品 SLA 依据，属工程建议目标）：按角色在 SQL 层用 `WHERE student_id IN (...)` 或分页/按需拉取裁剪，单次工作台加载控制在大规模下 `< 1 MB` / `< 150 ms`。
2. **`fqaiAuditAll` 存在 $O(S \cdot R)$ 平方级过滤**：[`fqaiAuditAll`](file:///home/antigravity/chrisyuejian-stack/Apply.fantasme/src/server/ai.js#L1559) 对每个学生遍历全部 `rows.filter(r => r.studentId === sid)`，500 学生规模下耗时 `345 ms`；建议先用 `Map<studentId, rows[]>` 线性分组为 $O(R)$。

---

## 五、按优先级排列的修复建议

1. **[P0 - 数据完整性] 修复 `POST /api/admin/import` 的非原子性与模板清空问题**：先做全量格式与用户唯一性校验再写入；避免部分失败导致原库被清空，且空备份不误删 `templates`。
2. **[P0 - 孤儿数据与越权] 统一并收紧学生/推荐人/文书权限边界**：
   - 修复 `DELETE /api/t/students/:id` 仅删主记录不级联的问题（建议直接禁用或转调 `Vn`）；
   - 限制学生不得覆盖顾问录入的推荐人（`fromIntake=false`）及已有请求的推荐人；
   - 修复 DIY 账号 `mustChange=1` 在后端未拦截读写操作。
3. **[P1 - 安全加固与并发一致]**：
   - 在 `Yn` 写接口补齐与 `ai.js` 一致的 `Origin` 同源校验；
   - `Qe` 对 `versions` 强制正文非空与 `!doc.archived` 校验，`$n` 考虑对更新强制要求 `_base`；
   - 修复 `fqaiRunAction` 鉴权先于扣额、`fqDocumentAction` 放行 `final` 文档退回、以及 `Wt`/`fqaiMemo` 改为按 `db` 隔离的 `WeakSet`/`WeakMap`。
4. **[P1 - 规模化与 Workers 内存风险] 优化 `Jn` (`bootstrap`) 全表扫描与 `fqaiAuditAll`**：按 `de()` 计算出的 `visible` 集合在 SQL 层过滤 `records`，或拆分为轻量工作台列表 + 按学生详情加载；`fqaiAuditAll` 改用分组索引。
5. **[P2 - 前端体验、状态同步与移动端适配]**：
   - 修复 `app.css` 在 `<=1180px` / `<=860px` 响应式栅格（`.cols-main`、`.shell`、`.cols-2`、`.form-grid` 统一使用 `minmax(0,1fr)`）与 `.stack`/`.panel`/`.card` 补齐 `min-width:0`，解决 `#/home`、`#/app/:id/*` 及文书端移动端溢出，并补齐移动端全局搜索入口；
   - 修复 `app.js` 中 `S()` 返回 `"#"` 导致 DIY 链接校验失效与多处空链接渲染为 `#` 的问题，补齐 `mat-version`/`ver-new` 空白与链接校验；
   - 修复 `na()` 永久缓存导致 `#/diy-students` 看不到新注册/新申请 DIY 学员的问题；修复 `doc-reopen` 随 BUG-09 统一走原子接口，并清理 `mustChange`/切号时的冗余 401/403 请求。

---

## 六、仍需 Cloudflare 测试环境或外部服务才能完成的验证

以下项目受限于本地单机环境与禁止连生产/产生付费调用原则，**尚未验证**，需后续在独立 Cloudflare Pages + D1 测试项目验证：

1. **Cloudflare Pages / Workers 运行时约束**：
   - 500+ 学生规模下 `bootstrap` 全量 `JSON.parse` 与 `PBKDF2_ITERATIONS=100000` 在 Workers 128 MB 内存和 CPU 时间限制下的真实表现；
   - 真实 Cloudflare D1 分布式事务、`batch()` 语句数/SQL 绑定参数上限（当前 `at()` 院校库导入未分批，`rt()` 按 80 条分批）及高并发真实延迟。
2. **真实 AI 与联网检索链路**：
   - `DEEPSEEK_API_KEY` 配置后 `/api/ai/chat`、`/api/ai/run`（`audit`/`tasks`/`precheck` 联网核对）、`/api/ai/verify`、`/api/ai/essay` 的端到端流式 SSE、模型 JSON 格式稳定性、超时重试及实际 DeepSeek Search/Fetch 接口可用性。
3. **跨域名嵌入登录与真实浏览器人工体验**：
   - 真实官网（`SITE_URL`）通过 `iframe` 嵌入 `/embed-login` 时的跨站 `SameSite=Strict` Cookie 与 `postMessage` 通信兼容性。

---

## 附录：本次新增的可重复测试与脚本清单

- 功能与数据一致性回归：`tests/regression/functional.test.mjs`
- 角色权限矩阵与安全回归：`tests/regression/security.test.mjs`
- 测试辅助模块：`tests/regression/helpers.mjs`
- Playwright 真实浏览器巡检脚本：`tests/e2e/browser_audit.py`
- Playwright 全路由/多角色/AI 面板深度 UI 巡检脚本：`tests/e2e/ui_deep_audit.py`
- 三档规模与并发性能基准脚本：`scripts/perf-bench.mjs`
