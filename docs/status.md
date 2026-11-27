# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-27（M3 后端/前端已通过红队与验收，待主人合并；开关未开）

## 里程碑
- [x] v2.2.1 恢复基线、审计报告、协作文档、Preview 工作流
- [x] apply 剥离到独立生产项目 `fantasme-apply`（D1 迁移 14 表内容比对一致，域名切换完成）
- [x] **BUG-01～12 全部修复并上线**，性能阶段 A 上线（500 学生 `aiAuditAll` p50 331→168 ms）。终验：`npm test` 19/19、`src/server` + 回归 55/55、E2E 无问题（Antigravity，#26）
- [x] **M1 可维护性（搬迁部分）**：后端 14 个片段（#43/#46/#54）、前端 5 个片段（#47），产物逐字节不变；1e 命名待做
- [x] **M2 文书文件（R2）已上线**：上传/下载经主人在生产实测通过；后续清理、审计、限额见 #59
- [~] **M3 任务板与助理对接（契约 v1.2）**：后端 #64 + 前端 #72 已通过 Grok 复审（有残留通过）与 Antigravity 验收（`npm test` 98/98、双开关浏览器、并发认领、perf 0 错误、preview 已部署 `dc6c3a0`）；**待主人决定合并（先 #64 再 #72）**；`BOARD_V12_ENABLED` 默认关闭，**线上行为不变**；助理侧在其仓库实现中。契约见 `docs/integrations/assistant.md`，界面规格见 `docs/design/m3-ui-spec.md`

## 环境
| 环境 | 状态 |
|---|---|
| 生产 `fantasme-apply` | `apply.fantasmearts.com`，D1 `fantasme-apply-prod`，R2 `fantasme-apply-files`。当前部署 `b628608f`（commit `6aec918`）。**回滚点**：`0f01260b`（`04018ee`） |
| Preview `fantasme-apply-test` | 最近部署 run `45933936058`（`dc6c3a0`，M3 后端+前端，开关未设置） |
| 旧 `fantasme-academic` | 永久不动（仅官网 `www`、自测 `selftest`）；旧库 `fq-apply` 保留 ≥30 天作回滚点 |

`migrate-d1` 已加锁（仓库变量 `PRODUCTION_CUTOVER_DONE=true`），**严禁再运行**。

## 进行中 / 待办
| 项 | 角色 | 内容 |
|---|---|---|
| #64 / #72 | GPT | 合并前三处：`externalId` 拒绝 `.`/`..`；脚本与截图移出 `src/client/app/parts/`（脚本头写明运行方式） |
| 契约 PR #74 | 助理侧确认 → Claude 合并 | `externalId` 不能为 `.`/`..`；开关须在前后端都部署后开启 |
| #59 | GPT | M2 后续：孤儿清理、学生清除删对象、审计、限额 |
| — | Antigravity | 冒烟脚本补 `.`/`..` 用例；R2 备份方案待主人确认后实施 |
| — | 助理侧 Claude | 在 `fengqin-assistant` 实现并部署 v1.2 识别（`cancelled`、新字段、`/cancel`、推送工具） |

## 主人待办（M3 上线顺序，见契约与 docs/deploy.md）
1. 决定合并 #64、#72（先后端后前端）。
2. 在两个环境分别生成 `ASSISTANT_BRIDGE_SECRET`（≥32 字符，**生产与预览不同**），填入 Pages 与助理 Worker；你已填过 bridge 密钥的话，核对两边一致。
3. **助理侧确认已部署 v1.2 之后**，先预览后生产设置 `BOARD_V12_ENABLED=1`（前后端都已部署的前提下）；联调用 `tests/smoke/assistant-bridge-smoke.mjs`。

## 主人待办（安全收尾）
1. `production` 环境的 Cloudflare Token：R2 桶已建好，可收回 R2 Edit，收缩为仅 Pages Edit。
2. 更改曾贴在对话中的助理系统临时密码。
3. 未经脚本验证的部分需人工确认：员工实际登录与日常操作、真实 DeepSeek AI、管理员人工交互。

## 文件认领（同一文件同一时间一个写入者）
| 文件 | 写入者 |
|---|---|
| `src/server/parts/*`（片段见 CODE_MAP）、`src/server/ai.js` | GPT（Claude 需先登记） |
| `src/client/app/parts/*`、`public/apply/app/*`（app.js 为生成文件） | Claude |
| `tests/`、`scripts/perf-bench.mjs`、`.github/workflows/` | Antigravity |
| `docs/*`（除 testing/、recovery/） | Claude |

Bug 证据与历史：`docs/testing/TEST_REPORT.md`；有意变更：[CHANGES.md](CHANGES.md)。
