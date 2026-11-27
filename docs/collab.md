# 协作规范（四方）

红线见 [AGENTS.md](../AGENTS.md)。本页只管分工、交接和分支。

## 分工矩阵（2026-11-27 起：GPT 用量不足暂停，后端由 Antigravity 承担）

| 角色 | 主责 | 可写区域 | 不做 |
|---|---|---|---|
| **Claude** | 方案/设计稿/效果图、**代码审阅与合并**、协作文档与自动化、必要时的前端；高风险项的设计 | `docs/`、`src/client/`（必要时）、`.github/`（经主人合并） | 大批量实现（省额度） |
| **Antigravity（Gemini）** | **后端实现**（`src/server/`，含 `ai.js`）与后端测试；全量回归/E2E/性能、Preview 部署；必要时前端 | `src/server/`、`tests/`、`scripts/`、`docs/testing/` | **验收自己写的代码**（见下） |
| **Grok-Ops（Cursor）** | 只读红队/巡检/对抗性第二意见，可被 PR/issue 里 `@cursor` 唤醒 | 无（只发评论、加 `gate:redteam-passed`） | 写仓库、写 D1/R2、攻击生产 |
| **GPT/Codex** | **暂停**（用量不足）；恢复后重新承担后端实现 | — | — |

**独立性规则（因 Antigravity 同时写后端）**：Antigravity 自己写的 PR，不能由它自己打 `gate:accepted`；该标签改由 **Claude 审阅 + CI 全量回归/性能基准全绿** 后由 Claude 打。高风险 PR 仍需 Grok 红队 `gate:redteam-passed` 与主人 `approved`。

## 防重复（原有，保留）

1. 文件认领见 `status.md`；动别人名下的文件先登记并获同意。
2. GPT 只跑 `npm test` + 自己新增的测试；全量回归/E2E/性能只由 Antigravity 跑并写入 status。
3. 低风险 Bug：GPT → Antigravity。高风险项走：
   `Claude 设计稿 → Grok 红队审设计 → GPT 实现 → Antigravity 回归/性能 → Grok preview 实测+对齐 → 主人确认`
4. 多视角交叉审阅**仅**用于：架构/ADR、D1 或权限变更、上线前门禁。

## 合并授权（主人 2026-11-26 授权，常设）

- **低风险 PR，CI 通过后 Claude 直接合并**，无需再问：文档、状态、`CHANGES.md`、测试与测试脚本、不涉及权限/数据/部署的小修复，以及已经 Antigravity 验收的低风险修复。
- **不在此授权内（必须等主人明确要求）**：BUG-02/03/05 等高风险后端项（需 Antigravity 验收 + Grok 红队）；任何改 `.github/workflows/` 中生产工作流、Secrets、D1 数据或表结构、域名/DNS 的变更；触发生产部署或审批。
- 合并前核对：CI 绿、无冲突、改动范围与 PR 描述一致；合并后在 main 上复跑 `npm test`。

## 自动化（减少人工传话与合并）

由 `.github/workflows/pr-*.yml` 与 `preview-on-pr.yml` 驱动，规则代码在 `scripts/pr-policy.cjs`（有测试）：
- **状态评论**：每个 PR 一条置顶评论，写明风险、CI、红队/验收/批准是否齐全、**下一步该谁做什么**。看这条即可，不必追问进度。
- **标签**：`risk:low`（低风险，可自动合并）、`risk:high`（强制高风险）、`approved`（主人/Claude 批准）、`gate:redteam-passed`（Grok 红队通过）、`gate:accepted`（Antigravity 验收通过）、`deploy:preview`（自动部署 preview）。
- **自动合并**：CI 通过后，**仅文档/测试/模板**且打了 `risk:low` 才自动合并；**代码类**需 `approved`；**工作流、`docs/recovery/`、`tests/standalone.test.mjs`、高风险**一律不自动合并（需主人）；草稿不合并；任何不确定都不合并。
- **自动预览**：给 PR 打 `deploy:preview` 标签，自动部署 preview 并跑只读探针，结果评论到 PR；后续每次推送自动更新。
- 各角色完成红队/验收后，给 PR 加对应 `gate:*` 标签（并照常评论证据）。生产部署仍需主人审批。

## 额度保护（Claude 额度最少，只做稀缺判断）

- Claude 不做低风险修复，不实现高风险后端项（只出设计稿：契约、改法、回滚点）。
- 前端一次一个 BUG、一个 PR；不整文件通读 `app.js`/`application.js`，用 CODE_MAP 符号和 grep 定位。
- 每个任务开新会话，只读本页"开工必读"。
- 额度吃紧时，BUG-10 等纯 CSS 项转 GPT，Claude 只保留设计与审阅。
- 独立审阅（Grok 红队、Antigravity 验收）不转给 Claude，避免自审盲点。

## 评论与防环

- 前缀：`[Claude]` `[GPT]` `[Antigravity]` `[Grok-Ops]`。
- 只响应人工评论或明确 `@角色`；不响应带其他前缀的评论；任何工具都不得在评论中写以 `/deploy` 开头的行（该指令仅 OWNER 本人使用）。

## 开工必读

| 角色 | 只读这些 |
|---|---|
| Claude | AGENTS.md、collab.md、status.md |
| GPT | AGENTS.md、collab.md、status.md（Bug 归属表）、CODE_MAP.md |
| Antigravity | AGENTS.md、collab.md、acceptance.md、deploy.md |
| Grok-Ops | AGENTS.md、deploy.md、status.md、acceptance.md |

## 任务入口（少切换）

- **唯一任务入口是 GitHub Issues**：一个任务一个 issue，用标签 `role:claude` / `role:gpt` / `role:antigravity` / `role:grok` 指派（模板见 `.github/ISSUE_TEMPLATE/task.md`）。交接、阻塞、结论都写在 issue/PR 里，主人只看这一处。
- **各工具自动读入口文件**（`CLAUDE.md`、`AGENTS.md` 的 GPT 段、`GEMINI.md`、`.cursor/rules/grok-ops.mdc`），主人只需说「开工」或「做 issue #N」，不再复制 prompt。
- 生产审批可用 GitHub 手机端的 Review deployments。
- 不自动化：域名解绑、DNS 切换、生产部署审批（低频高风险，保留主人手动）。

## 开工 Prompt（≤150 字，入口文件缺失时备用）

- **Claude**：你是 Claude（架构/前端/文档）。只读 AGENTS.md、docs/collab.md、docs/status.md。只改 docs/ 与已认领的 public/ 文件。D1/权限/上线类变更先出方案待确认。评论加 [Claude] 前缀。
- **GPT**：你是 GPT（后端修复）。只读 AGENTS.md、docs/collab.md、docs/status.md 的 Bug 归属表。只改已认领的 src/server/ 文件，走 gpt/ 分支，仅跑 npm test 与本次新增测试。评论加 [GPT] 前缀。
- **Antigravity**：你是 Antigravity（验收）。只读 AGENTS.md、docs/collab.md、docs/acceptance.md、docs/deploy.md。只改 tests/ 与 docs/testing/，跑全量回归/E2E/性能，部署仅限 preview。评论加 [Antigravity] 前缀。
- **Grok-Ops**：你是 Grok-Ops（只读巡检/红队）。只读 AGENTS.md、docs/deploy.md、docs/status.md、docs/acceptance.md。先做生产对齐核查，再做 preview 红队与平台限制实测。绝不写仓库、D1 或生产，不输出学生数据。评论加 [Grok-Ops] 前缀并附证据。

## 分支命名

`claude/*`、`gpt/*`、`test/*`、`ops/*`。同一分支同一时间只有一个工具写入。

## 交接模板

```
目标：
涉及文件：
行为变化：
已跑验证（命令+结果）：
未验证/风险：
待办与下一角色：
```
