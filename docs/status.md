# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-26

## 里程碑
- [x] v2.2.1 恢复基线合入 main（PR #1）
- [x] Preview 部署工作流（PR #2，仅 preview）
- [x] 全面审计报告与回归/E2E/性能套件已合入 main（PR #4）
- [x] 协作文档体系已合入 main（PR #3）
- [ ] 生产对齐核查（Grok-Ops，**阻塞上线与 D1 变更**）
- [ ] 缺陷修复首轮（GPT，截至本页更新时远端无其分支/PR）

## 环境状态
| 环境 | 状态 |
|---|---|
| Preview `fantasme-apply-test` | 工作流就绪，最近一次部署：未记录 |
| Production `fantasme-academic` | **锁定**。线上与恢复基线未对齐，11 月 1 日部署待核对 |

## 阻塞项 / 待办
1. ~~合入审计分支~~ 已完成（PR #4）。
2. **Antigravity**：另提 PR 收紧 `deploy.yml` 评论触发（仅限 OWNER 本人的 `/deploy preview`，拒绝带角色前缀的评论）。
3. **Grok-Ops**：已确认可读 D1 表结构与 Pages 配置，开始填写 deploy.md 的生产对齐核查表；若发现读不到，由主人给出补充 prompt。
4. 本地验证用 Node 22.23.5，`.node-version` 要求 24，Node 24 下需 Antigravity 复验。
5. GPT 开始修复前先读本页文件认领表；截至更新时远端无其分支/PR。

## Bug 归属（证据见 `git show origin/test/apply-v2.2.1-audit:docs/testing/TEST_REPORT.md`）
| 编号 | 严重度 | 摘要 | 负责 | 状态 |
|---|---|---|---|---|
| BUG-01 | High | 删学生不级联 | GPT | 待修 |
| BUG-02 | High | admin/import 先清空再校验 | GPT（高风险链） | 待修 |
| BUG-03 | High | `/api/*` 缺 Origin 校验 | GPT（高风险链） | 待修 |
| BUG-04 | Med | 学生覆盖推荐人 | GPT | 待修 |
| BUG-05 | Med | DIY mustChange 未拦截 | GPT（高风险链） | 待修 |
| BUG-06 | Med | 绕过乐观锁/空版本 | GPT | 待修 |
| BUG-07 | Med | `Wt`/`fqaiMemo` 跨库缓存 | GPT | 待修 |
| BUG-08 | Low | 先扣额度后验权 | GPT | 待修 |
| BUG-09 | Low | final 文书退回规则 | GPT | 待修 |
| BUG-10 | Med/UI | 窄屏溢出 | Claude | 待修 |
| BUG-11 | Med/UI | `S()` 返回 `"#"` | Claude | 待修 |
| BUG-12 | Med/UI | `na()` 永久缓存 | Claude | 待修 |
| 性能 | P1 | bootstrap 全表扫描、fqaiAuditAll 平方级 | 设计 Claude → 实现 GPT | 待设计 |

## 文件认领表（同一文件同一时间一个写入者）
| 文件 | 写入者 | 分支 | 备注 |
|---|---|---|---|
| `src/server/*` | GPT（默认） | gpt/* | Claude 需要时先登记 |
| `public/apply/app/*` | Claude | claude/* | 认领后 GPT 勿动 |
| `tests/`、`scripts/perf-bench.mjs` | Antigravity | test/* | |
| `docs/*`（除 testing/、recovery/） | Claude | claude/* | |

## 待 Grok 认领
生产对齐核查清单（见 deploy.md）、平台限制实测、preview 红队、DeepSeek/iframe 链路验证。
