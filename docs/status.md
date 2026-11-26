# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-26

## 里程碑
- [x] v2.2.1 恢复基线合入 main（PR #1）
- [x] Preview 部署工作流（PR #2，仅 preview）
- [x] 全面审计报告（分支 `test/apply-v2.2.1-audit`，**尚未合入 main**）
- [ ] 本协作文档体系（本 PR）
- [ ] 生产对齐核查（Grok-Ops，**阻塞上线与 D1 变更**）
- [ ] 缺陷修复首轮（GPT，截至本页更新时远端无其分支/PR）

## 环境状态
| 环境 | 状态 |
|---|---|
| Preview `fantasme-apply-test` | 工作流就绪，最近一次部署：未记录 |
| Production `fantasme-academic` | **锁定**。线上与恢复基线未对齐，11 月 1 日部署待核对 |

## 阻塞项 / 待主人决策
1. 是否将 `test/apply-v2.2.1-audit` 合入 main（建议合入；回归探针在 `tests/regression/`，不影响 `npm test`）。
2. `deploy.yml` 评论触发是否收紧（建议由 Antigravity 另提 PR）。
3. Grok 的 Cloudflare 只读权限能否看到 D1 表结构与 Pages 配置；不能则由主人导出 schema（不含数据）。
4. 本地验证用 Node 22.23.5，`.node-version` 要求 24，Node 24 下需 Antigravity 复验。

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
