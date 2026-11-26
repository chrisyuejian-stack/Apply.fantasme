# 发布与 D1 守则

红线见 [AGENTS.md](../AGENTS.md)。本页是发布、迁移、回滚的唯一流程来源。

## 拓扑（2026-11-26 只读核实，只记名称）

| 角色 | Pages 项目 | 域名 | D1（`APPLY_DB`） |
|---|---|---|---|
| 旧综合项目（**永久不动**） | `fantasme-academic` | `www.` 官网、`selftest.`、（迁移前）`apply.fantasmearts.com` | `fq-apply`（另有 `EDU_DB`=`fq-edu`、`SITE_DB`=`fantasme-site-db`） |
| **新生产项目**（待建） | `fantasme-apply` | `apply.fantasmearts.com`（切换后） | `fantasme-apply-prod`（待建） |
| Preview | `fantasme-apply-test` | `preview.fantasme-apply-test.pages.dev` | `fantasme-apply-test-db` |

- 基线只含申请系统；`fantasme-academic` 是官网+自测+申请三合一，**任何工作流都不得指向它**，也不得写 `fq-apply`（仅允许只读导出）。
- 账号内其他项目（`fengqin-*`、`jw-channel-*`、`yijiexingtu-*`、`fq-tools`、各 backup Worker）与本系统无关，**一律不碰**。
- 已核对（只读）：`fq-apply` 14 张表的列定义与基线完全一致；11 月 1 日线上代码行为已由主人核对无问题。

## Preview（已开放）
- 触发：`gh workflow run deploy.yml -f environment=preview`，或 OWNER 本人在 PR 评论 `/deploy preview`（评论触发的收紧由 Antigravity 另提 PR）。
- 部署 `dist/` 到 `fantasme-apply-test` 的 `--branch=preview`，**不执行 D1 迁移**。发布者 Antigravity，部署后 Grok-Ops 冒烟。

## Production 发布闸门（`fantasme-apply`）

写权限只经由 GitHub Actions 的 `production` Environment：**必须由主人（OWNER）审批**才能运行，其 Secrets 与 preview 分开存放。各 AI 即使持有 Cloudflare/Actions 权限，也不直接对生产手工写，一律走工作流。Grok-Ops 始终只读。

- Secrets：`production` Environment 的 `CLOUDFLARE_API_TOKEN`（最小范围：Pages Edit、D1 Edit、Account 读；设有效期，迁移完成后收缩为仅 Pages Edit）、`CLOUDFLARE_ACCOUNT_ID`。值由主人在 GitHub 设置，不入库。
- 工作流（Antigravity 另提 PR 实现，本页为需求）：
  1. `provision-production.yml`：`workflow_dispatch` + 审批；创建 Pages 项目 `fantasme-apply`、D1 `fantasme-apply-prod`，建立 `APPLY_DB` 绑定；**幂等**，已存在则跳过。
  2. `migrate-d1.yml`：`workflow_dispatch` + 审批；在 runner 内 `wrangler d1 export fq-apply --remote` → 导入 `fantasme-apply-prod`，**不上传 artifact、不打印数据、不写入仓库**；结束时输出各表行数及 `records` 最大 `updated_at`、`audit` 最大 `id` 用于漂移校验。
  3. `deploy-production.yml`：`workflow_dispatch` + 审批；构建并 `pages deploy dist --project-name=fantasme-apply --branch=main`，**不执行任何 D1 DDL**。
- 变量/密钥：`APPLY_SETUP_KEY`、`DEEPSEEK_API_KEY` 由主人在新项目后台直接填写（我们读不到旧值，也不转存）；`SITE_URL=https://www.fantasmearts.com`（保证 `/embed-login` CSP 与 `/__portal` 跳转）。

## 一次性迁移：`apply.fantasmearts.com` 剥离

**迁移窗口内 `main` 冻结**：步骤 0 开始到步骤 8 完成并由主人宣布恢复前，不合并任何改动 `src/`、`public/` 的 PR（文档类 PR 可合）。目的：部署的必须是已核对的基线。各修复 PR 可先提交、先 review，窗口结束后再合。

| 步 | 负责 | 动作 |
|---|---|---|
| 0 | 主人 | 通知员工与学生暂停使用；**自行用 `wrangler d1 export fq-apply --remote` 备份到本机**（备份不入库、不发给任何 AI）；腾讯云把 `apply` 记录 TTL 降到最低 |
| 1 | 主人设 Secrets → Antigravity | 跑 `provision-production.yml` |
| 2 | 主人 | 在新项目后台填 `APPLY_SETUP_KEY`、`DEEPSEEK_API_KEY`、`SITE_URL` |
| 3 | Antigravity | 跑 `migrate-d1.yml`（导入），再跑 `deploy-production.yml` |
| 4 | Grok-Ops + Antigravity | 在 `fantasme-apply.pages.dev` 上核对：行数与源库一致、管理员可登录、学生/DIY 可读、文书版本、Cookie 属性、`/__portal`、`/embed-login`。**全部通过再切域名** |
| 5 | 主人 | 再次确认停用中；`migrate-d1.yml` **重跑一次做最终同步**，漂移校验为 0 差异 |
| 6 | 主人 | Cloudflare 后台：`fantasme-academic` 移除 `apply.fantasmearts.com`；`fantasme-apply` 添加该域名 |
| 7 | 主人 | 腾讯云 DNS：`apply` 的 CNAME 指向 `fantasme-apply.pages.dev`，等待证书生效 |
| 8 | Grok-Ops + Antigravity | 线上冒烟（同步骤 4）+ 官网嵌入登录；通过后主人恢复使用 |
| 9 | Claude | 更新 status.md，保留旧库 `fq-apply` 至少 30 天作回滚点，之后由主人决定清理 |

**回滚**：Cloudflare 把域名从 `fantasme-apply` 移回 `fantasme-academic`，腾讯云 CNAME 改回原值。旧库 `fq-apply` 全程未被写入，数据不丢；切换后新库产生的写入需另行评估回灌。

## D1 变更守则
1. **只做加法**：先加表/列（含默认值），再发布读写新字段的代码，最后才考虑清理；代码兼容缺省字段的历史 JSON。
2. 不改 PBKDF2（100,000）哈希格式与会话 Cookie 契约。
3. DDL 先在 preview 库演练；**不得写入任何自动工作流**（迁移工作流只搬数据，不改结构）。
4. 生产 D1 的任何变更：先备份 → 主人逐条确认 → 单步执行 → 立即核对。
5. 批量写入遵守下方「平台限制」；`batch()` 整批只计 1 次查询，但批内每条语句仍受单句限制。

## 平台限制（Grok-Ops 查官方文档，2026-11-26）
来源：developers.cloudflare.com 的 D1 limits 与 Workers limits 页面；数字以官方页面为准，变更时更新此处。

| 项 | 限制 |
|---|---|
| D1 单语句绑定参数 | 100（可用 `json_each(?)` 传 JSON 数组规避） |
| D1 单语句长度 | 100 KB（所以大值必须用绑定参数，不能内联进 SQL 文本） |
| D1 单行/字符串/BLOB | 2 MB |
| D1 查询时长 | 30 秒 |
| `db.batch()` | 无单独的批内条数上限；整批计 1 次「每次 Worker 调用的查询数」（付费 1000、免费 50） |
| Workers/Pages Functions 内存 | 每 isolate 128 MB |
| CPU 时间 | 免费 10 ms/请求；付费默认 30 秒，可配到 5 分钟 |

**待实测**：500 学生合成数据下 bootstrap 的内存/CPU。需要一个专用的空 preview D1，或主人明确授权在指定库上写合成数据（生产库一律不写）。

## Secrets / Bindings 清单（只列名，不含值；Grok-Ops 现场只读核对）
- GitHub Environment：`preview` 与 `production` 各有 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`（两个环境使用独立 Token）。
- `fantasme-apply`（生产）：Binding `APPLY_DB` → D1 `fantasme-apply-prod`；变量 `APPLY_SETUP_KEY`、`DEEPSEEK_API_KEY`、`SITE_URL`；自定义域名 `apply.fantasmearts.com`；preview 配置为空；无 KV/R2/DO/service 绑定。
- `fantasme-apply-test`（Preview）：Binding `APPLY_DB` → D1 `fantasme-apply-test-db`；变量 `APPLY_SETUP_KEY`、`SITE_URL`（无 `DEEPSEEK_API_KEY`）；无自定义域名。
- `fantasme-academic`（旧，永久不动）：Bindings `APPLY_DB`→`fq-apply`、`EDU_DB`→`fq-edu`、`SITE_DB`→`fantasme-site-db`；变量 `ADMIN_PASSWORD`、`DEEPSEEK_API_KEY`；域名 `www`、`selftest`。
