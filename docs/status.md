# 当前状态（单页速览，谁改了状态谁更新）

更新：2026-11-26（生产已切换；GPT 首轮 6 项修复已合入 main）

## 里程碑
- [x] v2.2.1 恢复基线合入 main（PR #1）
- [x] Preview 部署工作流（PR #2，仅 preview）
- [x] 全面审计报告与回归/E2E/性能套件已合入 main（PR #4）
- [x] 协作文档体系已合入 main（PR #3）
- [x] 生产拓扑与 D1 结构只读核对（14 表与基线列定义一致，见 deploy.md）
- [x] apply 已剥离到新生产项目 `fantasme-apply`：D1 迁移（14 表逐列内容比对一致）、域名 `apply.fantasmearts.com` 切换、冒烟与登录/数据核对通过（主人确认）
- [x] GPT 首轮修复 BUG-01/04/06/07/08/09 已合入 main（PR #9/#11/#14/#15/#16/#17；合并后 `npm test` 12/12、新增 9 项测试通过）
- [ ] 上述修复尚未部署到生产：待 Antigravity 全量回归 + preview E2E 后，经 `deploy-production` 审批发布
- [ ] BUG-02/03/05 与性能：设计稿已合并（`docs/design/high-risk-fixes.md`），待 GPT 实现

## 环境状态
| 环境 | 状态 |
|---|---|
| Preview `fantasme-apply-test` | 工作流就绪；最近一次部署：Run `45806316335` 成功（`https://45bdd376.fantasme-apply-test.pages.dev` / 别名 `https://preview.fantasme-apply-test.pages.dev`） |
| 旧 `fantasme-academic` | **永久不动**：仅保留官网（`www`）与自测（`selftest`），不再含 apply；旧库 `fq-apply` 保留 ≥30 天作回滚点，之后由主人决定清理 |
| 新生产 `fantasme-apply` | **运行中**：`apply.fantasmearts.com` active，D1 `fantasme-apply-prod`；当前部署为迁移时的基线代码（未含 GPT 修复）。员工已可恢复使用 |

## 阻塞项 / 待办
1. **Antigravity**：全量回归 + preview E2E 验收已合入的 6 项修复；修复测试夹具（`tests/regression/` 中两处合法更新未带 `_base`：`functional` 用例 4、`security` 用例 2a，属 BUG-06 契约变化）；确认前端保存路径（`app.js` 统一带 `_base`）在 preview 无 409 误报。
2. **GPT**：按设计稿实现 BUG-02、BUG-03、BUG-05，再做 bootstrap 性能阶段 A。
3. **Grok-Ops**：对 BUG-02/03/05 实现做红队审；在 preview 实测 Workers 内存/CPU、D1 batch 上限；补全 deploy.md 的 Secrets/Bindings 名称清单。
4. **Claude**：前端 BUG-10~12（含 BUG-09 的 `doc-reopen` 改走原子接口）。
5. **安全收尾（主人）**：把 `production` 环境的 Cloudflare Token 收缩为仅 Pages Edit 或删除；`migrate-d1` 已完成使命，**严禁再运行**（会用旧库覆盖新库）；之后可由 Antigravity 另提 PR 加防重跑保护。
6. 变更说明见 [CHANGES.md](CHANGES.md)（`verify:baseline` 因有意修改而不再全部通过，属预期）。

## Bug 归属（证据见 `git show origin/test/apply-v2.2.1-audit:docs/testing/TEST_REPORT.md`）
| 编号 | 严重度 | 摘要 | 负责 | 状态 |
|---|---|---|---|---|
| BUG-01 | High | 删学生不级联 | GPT | 已合入 main（#9），待验收 |
| BUG-02 | High | admin/import 先清空再校验 | Claude 设计稿 → GPT 实现 → Grok 红队审 | 设计稿已合并，待 GPT 实现 |
| BUG-03 | High | `/api/*` 缺 Origin 校验 | Claude 设计稿 → GPT 实现 → Grok 红队审 | 设计稿已合并，待 GPT 实现 |
| BUG-04 | Med | 学生覆盖推荐人 | GPT | 已合入 main（#11），待验收 |
| BUG-05 | Med | DIY mustChange 未拦截 | Claude 设计稿 → GPT 实现 → Grok 红队审 | 设计稿已合并，待 GPT 实现 |
| BUG-06 | Med | 绕过乐观锁/空版本 | GPT | 已合入 main（#14），待验收（夹具待补 `_base`） |
| BUG-07 | Med | `Wt`/`fqaiMemo` 跨库缓存 | GPT | 已合入 main（#15），待验收 |
| BUG-08 | Low | 先扣额度后验权 | GPT | 已合入 main（#16），待验收 |
| BUG-09 | Low | final 文书退回规则 | GPT | 已合入 main（#17），待验收（前端 doc-reopen 待 Claude） |
| BUG-10 | Med/UI | 窄屏溢出 | Claude（额度紧时 BUG-10 可转 GPT） | 待修 |
| BUG-11 | Med/UI | `S()` 返回 `"#"` | Claude | 待修 |
| BUG-12 | Med/UI | `na()` 永久缓存 | Claude | 待修 |
| 性能 | P1 | bootstrap 全表扫描、fqaiAuditAll 平方级 | Claude 设计稿 → GPT 实现 → Antigravity 性能验收 | 待设计 |

## 文件认领表（同一文件同一时间一个写入者）
| 文件 | 写入者 | 分支 | 备注 |
|---|---|---|---|
| `src/server/*` | GPT（默认） | gpt/* | Claude 需要时先登记 |
| `public/apply/app/*` | Claude | claude/* | 认领后 GPT 勿动 |
| `tests/`、`scripts/perf-bench.mjs` | Antigravity | test/* | |
| `docs/*`（除 testing/、recovery/） | Claude | claude/* | |

## 待 Grok 认领
生产对齐核查清单（见 deploy.md）、平台限制实测、preview 红队、DeepSeek/iframe 链路验证。
