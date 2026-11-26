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

**数据（只加字段）**：文书版本 `versions` 现有 `kind: "text" | 链接`。新增 `kind: "file"`，版本 JSON 追加 `file: { key, name, size, type, sha256 }`。旧数据不变，`Ue()`/`He()` 增加 file 分支。

**接口**
- `POST /api/files?documentId=…`：请求体为文件原始字节，头 `X-File-Name`（URL 编码）。校验：登录、对该文书有写权限（复用 `Qe` 的 versions 规则）、大小 ≤ **20 MB**、类型白名单（pdf、doc/docx、pages、txt、md、rtf、jpg/png）。键为 `docs/<studentId>/<documentId>/<uuid>`；服务端算 sha256；返回 `file` 对象。随后前端照常 `PUT /api/t/versions/:id` 写入带 `file` 的版本。
- `GET /api/files/<key>`：按键解析出 `studentId`，用 `de()` 可见性校验；响应 `Content-Disposition: attachment`、`X-Content-Type-Options: nosniff`、`Cache-Control: private`，**不内联展示**（防 XSS）。
- 孤儿文件：上传后未写入版本的对象，由后续清理任务按「键不被任何版本引用且超过 24 小时」删除（M2 第二个 PR）。

**前端**：新建版本表单加「上传文件」选项（与在线正文、外部链接并列）；版本列表与卡片对 file 显示文件名 + 下载。

**备份**：R2 不在 `/api/admin/export` 的 JSON 内。在 `deploy.md` 增加「R2 备份」：定期复制到 `fengqin-backups-prod` 同类桶或开启对象版本，方案由 Antigravity 实施。

**淘汰外部链接（M2 之后，主人定时间）**：先隐藏「新建外部链接」，旧链接继续可打开；不删历史数据。

---
## M3 任务板与助理系统对接

**助理系统现状（读其仓库）**：Worker `fengqin-assistant`，待办存在主人的 Outlook；已有 `*/10 * * * *` 定时任务；与 Mac mini 桥接采用「命令下发 + 回执」的拉取模式。M3 沿用**拉取模式**：申请系统不主动调用助理，避免在申请系统里存助理的密钥和重试逻辑。

**申请系统数据（只加类型名）**：`records` 新增业务表名 `boardTasks`（加入 `we`），`student_id` 为空。JSON：
`{ id, title, note, importance: "high"|"normal"|"low", due, assigneeId, status: "open"|"done", doneAt, doneBy, source: "assistant"|"manual", externalId, studentHint, createdAt, updatedAt }`
- 可见性：`assigneeId` 本人 + 主管；顾问可改状态与备注，主管可增删改派。
- 关联学生不做外键，直接写在 `title/note`（主人要求）；`studentHint` 仅作文本。

**接口（申请系统侧，均为服务端对服务端）**
- 鉴权：共享密钥 `ASSISTANT_BRIDGE_SECRET`（两边各存一份）。请求头 `X-FQ-Timestamp` + `X-FQ-Signature = HMAC-SHA256(secret, timestamp + "\n" + method + "\n" + path + "\n" + body)`；时间差 > 5 分钟拒绝。这些路由**豁免同源校验与 Cookie**，只认签名。
- `POST /api/integrations/assistant/tasks`：`{ externalId, title, note?, importance, due?, assignee }`，`assignee` 为顾问的登录名；按 `externalId` 幂等（重复推送只更新）。返回 `{ id, status }`。
- `GET /api/integrations/assistant/updates?since=<ISO>`：返回 `since` 之后状态变化的、`source=assistant` 的任务 `[{ externalId, status, doneAt, doneBy(姓名), note }]`，最多 200 条。助理在 10 分钟定时任务里拉取，写入自己的记忆。
- `GET /api/integrations/assistant/advisors`：返回可指派的顾问 `[{ username, name }]`，供助理选择。

**前端**：顾问「我的任务」页（按截止日期与重要性排序、逾期标红、一键完成）；主管看全部并可手动新建。首页加计数。

**助理系统侧（需在其仓库另做，由其协作者实现）**：新增「推给顾问」工具（对话中说"让某某顾问做…"即调用 `POST …/tasks`）；定时任务拉取 `/updates` 写入记忆；在其 Secrets 中加 `ASSISTANT_BRIDGE_SECRET` 与申请系统地址。接口以本节为准。

**安全**：只开放上述三个路由；签名失败统一 401；限流；不返回任何学生档案数据。

---
## 顺序与分工建议
M0 部署 → M1（1a–1d，约 6–8 个小 PR）→ M2（后端 → 前端 → 孤儿清理）→ M3（申请侧接口 → 前端 → 助理侧）→ 淘汰外部链接。M2 与 M3 的高风险点（文件权限、签名鉴权）走 Grok 红队。
