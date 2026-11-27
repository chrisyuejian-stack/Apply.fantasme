# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-27（M2 文书上传已上线；M3 开始）

## 里程碑
- [x] v2.2.1 恢复基线、审计报告、协作文档、Preview 工作流
- [x] apply 剥离到独立生产项目 `fantasme-apply`（D1 迁移 14 表内容比对一致，域名切换完成）
- [x] **BUG-01～12 全部修复并上线**，性能阶段 A 上线（500 学生 `aiAuditAll` p50 331→168 ms）。终验：`npm test` 19/19、`src/server` + 回归 55/55、E2E 无问题（Antigravity，#26）
- [x] **M1 可维护性（搬迁部分）**：后端 14 个片段（#43/#46/#54）、前端 5 个片段（#47），产物逐字节不变；1e 命名待做
- [x] **M2 文书文件（R2）已上线**：上传/下载经主人在生产实测通过；后续清理、审计、限额见 #59
- [~] **M3 任务板与助理对接**：设计见 `docs/design/next-milestones.md`，契约见 `docs/integrations/assistant.md`

## 环境
| 环境 | 状态 |
|---|---|
| 生产 `fantasme-apply` | `apply.fantasmearts.com`，D1 `fantasme-apply-prod`，R2 `fantasme-apply-files`。当前部署 `b628608f`（commit `6aec918`）。**回滚点**：`0f01260b`（`04018ee`） |
| Preview `fantasme-apply-test` | 最近部署 `ef97ec4`（run `45841104068`） |
| 旧 `fantasme-academic` | 永久不动（仅官网 `www`、自测 `selftest`）；旧库 `fq-apply` 保留 ≥30 天作回滚点 |

`migrate-d1` 已加锁（仓库变量 `PRODUCTION_CUTOVER_DONE=true`），**严禁再运行**。

## 进行中 / 待办
| issue | 角色 | 内容 |
|---|---|---|
| #27 | Grok-Ops | 上线后只读巡检；500 学生合成数据实测（需主人授权写测试库） |
| #59 | GPT | M2 后续：孤儿清理、学生清除删对象、审计、限额 |

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
