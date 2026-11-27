# 设计稿：M1 可维护性 / M2 文书文件（R2）/ M3 任务板与助理对接

作者 Claude，2026-11-26。主人已确认：R2；任务板为普通待办（重要性 + 截止日期，关联学生直接写在任务里）；顾问完成后同步回助理系统（助理只需知道）。
通用红线不变：D1 只做加法、JSON 字段只加不删、不改 PBKDF2 与 Cookie 契约；每个里程碑拆成多个小 PR。

---
## M1 可维护性：只搬代码，产物逐字节不变

**事实**：`scripts/build.mjs` 把 `application.js`(9413 行) + `ai.js` + `entry.js` 用 `"\n"` 拼成 `dist/_worker.js`；`application.js` 第 1 行起是内置数据 `Ye`，业务从约 8000 行开始（`var we` 在 8032 行）。前端 `public/` 原样复制进 `dist/`，`scripts/dev.mjs` 直接读 `public/`。

**原则**：第一阶段**只移动不改写**。每一步验收 = 移动前后 `dist/_worker.js`（及前端产物）**sha256 相同**。哈希相同即行为相同，无需额外回归。

| 步 | 内容 | 负责 |
|---|---|---|
| 1a | `build.mjs` 改为按清单拼接 `src/server/parts/*.js`（数字前缀排序），再拼 `ai.js`、`entry.js`；新增 `npm run check:bundle`：构建并与提交前记录的哈希比对 | Claude |
| 1b | 把 `Ye` 内置数据整块搬到 `parts/00-seed-data.js`，其余暂留 `parts/90-application.js` | GPT |
| 1c | 按符号边界继续切：认证与会话（`Xn`/`Ce`/`Je`…）、记录 CRUD（`$n`/`Qe`）、文书动作（`fqDocumentAction`）、DIY（`Vt`）、管理导入导出（`ni`）、路由入口（`Yn`/`$t`）。每个 PR 一块 | GPT |
| 1d | 前端：`app.js` 移到 `src/client/app/` 按片段切分，构建时拼接输出到 `dist/apply/app/app.js`；`dev.mjs` 改为读 `dist/`；`public/apply/app/app.js` 删除 | Claude |
| 1e | 搬完后才开始**命名**：在 `docs/CODE_MAP.md` 建符号→含义表，逐块把短符号改成可读名（此步会改哈希，按普通修复走测试） | Claude 出表，GPT 改 |

注意：`verify:baseline` 因原文件路径消失会持续报错，属预期，在 `CHANGES.md` 记录；`docs/recovery/` 不动。

---
## M2 文书文件上传与下载（R2）

**资源**：R2 桶 `fantasme-apply-files`（生产）、`fantasme-apply-files-preview`；Pages 绑定名 `FILES`。由 Antigravity 扩展 `provision-production` 创建并绑定（production Token 需临时加 R2 Edit）。

**数据（只加字段）**：⚠️ 现有数据中 **`kind: "file"` 表示外部网盘链接**（`Qe` 的 versions 分支把所有非 `text` 版本强制设为 `"file"` 并要求 http(s) `link`；前端显示「网盘文件」）。因此上传文件使用**新值 `kind: "upload"`**，版本 JSON 追加 `upload: { key, name, size, type, sha256 }`，不带 `link`/`text`。历史 `"file"` 版本语义不变、不迁移。

**服务端校验（`Qe` versions 分支）**：在 `text` 分支之后、现有「其余一律按 file 链接」分支之前增加 `upload` 分支：`upload.key` 必须以 `docs/<studentId>/<documentId>/` 开头且对象在 R2 中存在（`FILES.head`），`size`/`type` 以服务端 `head` 结果为准覆盖客户端值，删除 `link`/`text`。写权限沿用该分支已有规则（负责文书老师或可管理该学生者，文书处于 drafting/revising，未归档）。

**接口**
- `POST /api/files?documentId=…`：请求体为文件原始字节，头 `X-File-Name`（URL 编码）。校验：登录、对该文书有写权限（与 `Qe` versions 分支相同的规则）、大小 ≤ **20 MB**（先看 `Content-Length`，再按实际字节数）、类型白名单（pdf、doc/docx、pages、txt、md、rtf、jpg/png，按扩展名+`Content-Type` 双重判断）。键为 `docs/<studentId>/<documentId>/<uuid>`；服务端算 sha256；R2 对象写入 `customMetadata { uploadedBy, fileName }`；返回 `upload` 对象。随后前端照常 `PUT /api/t/versions/:id` 写入 `kind:"upload"` 的版本。该路由受同源校验（BUG-03）约束。
- `GET /api/files/<key>`：按键解析出 `studentId`，用 `de()` 可见性校验；响应 `Content-Disposition: attachment`、`X-Content-Type-Options: nosniff`、`Cache-Control: private`，**不内联展示**（防 XSS）。
- 孤儿文件：上传后未写入版本的对象，由后续清理任务按「键不被任何版本引用且超过 24 小时」删除（M2 第二个 PR）。

**本地开发与测试**：`scripts/local-r2.mjs` 实现 `put/get/head/delete` 子集（存到 `.local/` 目录），`dev.mjs` 与测试注入为 `FILES`；未绑定 `FILES` 时上传接口返回 503「文件存储未配置」，不影响其他功能。

**前端**：新建版本表单加「上传文件」选项（与在线正文、外部链接并列）；`Ue()`/`He()`/`ze()` 增加 `upload` 分支，显示文件名 + 下载按钮（走 `GET /api/files/<key>`）。

**备份**：R2 不在 `/api/admin/export` 的 JSON 内。在 `deploy.md` 增加「R2 备份」：定期复制到 `fengqin-backups-prod` 同类桶或开启对象版本，方案由 Antigravity 实施。

**淘汰外部链接（M2 之后，主人定时间）**：先隐藏「新建外部链接」，旧链接继续可打开；不删历史数据。

---
## M3 任务板与助理系统对接（实施版，2026-11-27）

**主人已定**：普通待办（标题、备注、重要性、截止日期、负责顾问）；关联学生直接写在任务内容里；顾问完成后同步回助理系统，助理只需知道（写入其记忆）。

**助理系统现状（读其仓库）**：Worker `fengqin-assistant`，有 `*/10 * * * *` 定时任务；与 Mac mini 桥接用「拉取」模式。M3 同样**由助理推送、由助理拉取**，申请系统不主动调用助理、不存助理密钥。对接契约单独写在 [`docs/integrations/assistant.md`](../integrations/assistant.md)，两边以它为准。

### 数据（只加类型名，不改表结构）
`records` 新增业务表名 **`boardTasks`**（加入 `20-permissions.js` 的 `we`），`student_id` 为 `NULL`。JSON：
`{ id, title, note, importance: "high"|"normal"|"low", due: "YYYY-MM-DD"|null, assigneeId, status: "open"|"done", doneAt, doneBy, source: "assistant"|"manual", externalId, createdBy, createdAt, updatedAt }`

### 权限（三处都要改，缺一处就会漏或泄露）
1. **可见性 `Be`**：`boardTasks` 不走学生可见性；主管看全部，`advisor` 只看 `assigneeId === 自己`；其他角色（文书、学生、DIY）一律不可见。
2. **bootstrap（`75-bootstrap.js`）**：非主管的 SQL 下推按 `student_id IN (...)` 过滤，`boardTasks` 的 `student_id` 为空会被整体漏掉。须在条件中加 `OR tbl='boardTasks'`（仅员工角色），再由 `Be` 按负责人过滤。
3. **写入 `Qe`**：主管可新建、改派、删除；负责顾问只能改 `status` 与 `note`（其他字段以库中原值覆盖）；完成时服务端写 `doneAt`、`doneBy`；`source`/`externalId` 只能由对接接口写，普通接口提交时忽略。

### 对接接口（服务端对服务端）
- 路由前缀 `/api/integrations/assistant/`，在 `60-router.js` 中**位于 `X-FQ` 与同源校验之前**分派，**只认 HMAC 签名**，不读 Cookie；其他任何 `/api/*` 路由行为不变。
- 签名、时间窗、三个接口（推送任务、拉取更新、列出顾问）的请求与响应格式见对接契约文档。
- 未配置 `ASSISTANT_BRIDGE_SECRET` 时这些路由一律 503；签名错误 401；不返回任何学生档案数据。

### 前端（Claude）
- 新导航「任务板」（主管、顾问可见）：按「逾期 / 今天 / 本周 / 之后 / 已完成」分组，重要性标色，一键完成，可写备注；来源为助理的显示「来自助理」。
- 主管：查看全部、按负责人筛选、手动新建与改派。
- 工作台增加「待办任务」计数。

### 助理系统侧（在其仓库实施，由其协作者完成）
按对接契约：新增「推给顾问」对话工具；在 10 分钟定时任务中拉取更新并写入记忆；保存 `ASSISTANT_BRIDGE_SECRET` 与申请系统地址。

---
## 顺序与分工建议
M0 部署 → M1（1a–1d，约 6–8 个小 PR）→ M2（后端 → 前端 → 孤儿清理）→ M3（申请侧接口 → 前端 → 助理侧）→ 淘汰外部链接。M2 与 M3 的高风险点（文件权限、签名鉴权）走 Grok 红队。
