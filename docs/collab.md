# 协作规范（四方）

红线见 [AGENTS.md](../AGENTS.md)。本页只管分工、交接和分支。

## 分工矩阵

| 角色 | 主责 | 可写区域 | 不做 |
|---|---|---|---|
| **Claude** | 方案/ADR、前端模块化（含 BUG-10~12）、符号命名映射、协作文档；高风险项设计稿 | `docs/`、已认领的 `public/` 文件 | 全量性能测试、线上操作 |
| **GPT/Codex** | `src/server/` 缺陷修复（BUG-01~09）、按设计稿实现性能优化、补回归断言 | 已认领的 `src/server/` 文件 | 前端重构、部署 |
| **Antigravity** | 回归/E2E/性能验收、Preview 部署、按 BUG 编号回归并更新 status | `tests/`、`scripts/perf-bench.mjs`、`docs/testing/`、`.github/workflows/` | 改业务代码 |
| **Grok-Ops** | 只读：生产对齐核查、平台限制实测、preview 红队、外部链路验证、上线后巡检、对抗性第二意见 | 无（只发带前缀的评论/issue） | 写仓库、写 D1、攻击生产、输出学生数据 |

## 防重复

1. 文件认领见 `status.md`；动别人名下的文件先登记并获同意。
2. GPT 只跑 `npm test` + 自己新增的测试；全量回归/E2E/性能只由 Antigravity 跑并写入 status。
3. 低风险 Bug：GPT → Antigravity。高风险项走：
   `Claude 设计稿 → Grok 红队审设计 → GPT 实现 → Antigravity 回归/性能 → Grok preview 实测+对齐 → 主人确认`
4. 多视角交叉审阅**仅**用于：架构/ADR、D1 或权限变更、上线前门禁。

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

## 开工 Prompt（≤150 字）

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
