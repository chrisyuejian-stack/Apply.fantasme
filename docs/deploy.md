# 发布与 D1 守则

红线见 [AGENTS.md](../AGENTS.md)。

## Preview（已开放）
- 项目 `fantasme-apply-test`，站点 `https://preview.fantasme-apply-test.pages.dev`。
- 触发：`gh workflow run deploy.yml -f environment=preview`，或 OWNER 本人在 PR 评论 `/deploy preview`。
- 部署内容为 `dist/`（`npm run build` 生成）。**不执行任何 D1 迁移。**
- 发布者：Antigravity。部署后由 Grok-Ops 做冒烟与只读巡检。

## Production（**锁定**）
解锁条件，缺一不可：
1. 生产对齐核查清单全部完成（下表），差异已评估。
2. 获得 `chrisyuejian-stack` 对"指向生产"的明确二次确认。
3. 已有线上 D1 备份导出，且恢复演练在 preview 通过。
4. 上线前门禁：Claude、GPT 与 Grok-Ops 交叉审阅通过。

在此之前不得创建指向 `fantasme-academic` 的工作流或命令。

## 生产对齐核查清单（Grok-Ops 填写，只读；只记名称与数量，不含学生数据）
| 项 | 结果 | 与恢复基线一致？ |
|---|---|---|
| Pages 当前部署的 commit/产物哈希 | | |
| Bindings 名称（`APPLY_DB` 等，不含值） | | |
| 环境变量/Secrets 名称（不含值） | | |
| D1 表清单与列定义（含 `fq_ai_*`） | | |
| 各表行数量级 | | |
| 自 11 月 1 日部署后的代码差异 | | |

## Secrets / Bindings 清单（只列名，值不入库）
- GitHub `preview` environment：Cloudflare 部署凭据（名称以 `deploy.yml` 为准）。
- Pages Bindings：`APPLY_DB`（D1）。AI 相关变量如 `DEEPSEEK_API_KEY` 仅在对应环境配置，本地默认关闭。
- 具体名称以 Grok-Ops 核查结果为准，补全后更新此处。

## D1 零停机变更守则
1. **只做加法**：先加表/列（含默认值），再发布读写新字段的代码，最后才考虑清理；代码必须兼容缺省字段的历史 JSON。
2. 不改 PBKDF2（100,000）哈希格式与会话 Cookie 契约。
3. DDL 先在 preview 的 D1 演练；不得写入自动工作流。
4. 生产变更：先导出备份 → 主人逐条确认 → 单步执行 → 立即核对。
5. 分批写入（`batch()` 语句/参数上限需 Grok 实测）。

## 回滚
- 代码：Cloudflare Pages 回退到上一个成功部署。
- 数据：回滚靠备份恢复，不靠回退结构；因此守则 1（只做加法）是前提。
- 每次发布前记录上一部署 ID 于 status.md。
