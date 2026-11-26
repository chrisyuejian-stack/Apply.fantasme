# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-26（首轮缺陷全部修复并上线；M1 已开始）

## 里程碑
- [x] v2.2.1 恢复基线、审计报告、协作文档、Preview 工作流
- [x] apply 剥离到独立生产项目 `fantasme-apply`（D1 迁移 14 表内容比对一致，域名切换完成）
- [x] **BUG-01～12 全部修复并上线**，性能阶段 A 上线（500 学生 `aiAuditAll` p50 331→168 ms）。终验：`npm test` 19/19、`src/server` + 回归 55/55、E2E 无问题（Antigravity，#26）
- [~] **M1 可维护性**：1a 已合并（#43，后端按 `src/server/parts/` 拼接，`npm run bundle:hash`）；1b–1e 待做
- [ ] M2 文书文件（R2）、M3 任务板与助理对接（设计见 `docs/design/next-milestones.md`）

## 环境
| 环境 | 状态 |
|---|---|
| 生产 `fantasme-apply` | `apply.fantasmearts.com`，D1 `fantasme-apply-prod`。当前部署 `0f01260b`（commit `04018ee`，run `45842296501`）。**回滚点**：上一部署 `7e659dce`（迁移时基线） |
| Preview `fantasme-apply-test` | 最近部署 `ef97ec4`（run `45841104068`） |
| 旧 `fantasme-academic` | 永久不动（仅官网 `www`、自测 `selftest`）；旧库 `fq-apply` 保留 ≥30 天作回滚点 |

`migrate-d1` 已加锁（仓库变量 `PRODUCTION_CUTOVER_DONE=true`），**严禁再运行**。

## 进行中 / 待办
| issue | 角色 | 内容 |
|---|---|---|
| #44 | GPT | BUG-02 跟进：AI `studentRows` 排除 `__imp:*`；导入请求体 20 MB 上限（低风险） |
| #27 | Grok-Ops | 上线后只读巡检；500 学生合成数据实测（需主人授权写测试库） |
| — | GPT | M1-1b：内置数据 `Ye` 搬到 `parts/00-seed-data.js`（哈希必须不变） |
| — | Claude | M1-1d：前端片段化与构建 |

## 主人待办（安全收尾）
1. `production` 环境的 Cloudflare Token 收缩为仅 Pages Edit（M2 建 R2 桶时再临时加 R2 Edit）。
2. 更改曾贴在对话中的助理系统临时密码。
3. 未经脚本验证的部分需人工确认：员工实际登录与日常操作、真实 DeepSeek AI、管理员人工交互。

## 文件认领（同一文件同一时间一个写入者）
| 文件 | 写入者 |
|---|---|
| `src/server/parts/*`、`src/server/ai.js` | GPT（Claude 需先登记） |
| `public/apply/app/*`（及 M1 后的 `src/client/`） | Claude |
| `tests/`、`scripts/perf-bench.mjs`、`.github/workflows/` | Antigravity |
| `docs/*`（除 testing/、recovery/） | Claude |

Bug 证据与历史：`docs/testing/TEST_REPORT.md`；有意变更：[CHANGES.md](CHANGES.md)。
