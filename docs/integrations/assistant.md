# 对接契约：枫琴助理（fengqin-assistant） ⇄ 申请系统（apply）

版本 v1，2026-11-27。两个仓库的实现都以本文为准；改动须两边同时确认。

## 方向与职责
- **助理 → 申请系统**：推送待办给顾问；拉取完成状态；查询可指派的顾问。
- 申请系统**不主动调用**助理，不保存助理的任何密钥。
- 助理在其已有的 `*/10 * * * *` 定时任务中拉取更新，把「某顾问完成了某任务」写入自己的记忆。

## 地址与密钥
- 生产：`https://apply.fantasmearts.com/api/integrations/assistant/`
- 预览：`https://preview.fantasme-apply-test.pages.dev/api/integrations/assistant/`
- 共享密钥 `ASSISTANT_BRIDGE_SECRET`：随机 32 字节以上，生产与预览各一份；两边各自保存在 Secrets 中，不入库、不写日志。

## 签名（每个请求都要）
请求头：
- `X-FQ-Timestamp`：Unix 秒。与服务器时间相差超过 300 秒拒绝。
- `X-FQ-Signature`：`hex(HMAC-SHA256(secret, timestamp + "\n" + METHOD + "\n" + pathWithQuery + "\n" + hex(SHA256(body))))`
  - `pathWithQuery` 例：`/api/integrations/assistant/updates?since=2026-11-27T00:00:00.000Z`
  - 无请求体时 `body` 为空字符串。
- `Content-Type: application/json`（有请求体时）。

服务端用常量时间比较签名。签名或时间戳不对：`401 {"error":"签名无效"}`；未配置密钥：`503`。

## 接口

### 1. 推送任务 `POST /tasks`
请求：
```json
{ "externalId": "助理侧唯一 ID", "title": "≤120 字", "note": "≤2000 字，可写学生姓名等",
  "importance": "high|normal|low", "due": "YYYY-MM-DD 或 null", "assignee": "顾问登录名" }
```
- 按 `externalId` **幂等**：首次创建；再次推送同一 `externalId` 时只更新 `title/note/importance/due/assignee`，**不改变**已完成状态。
- `assignee` 必须是有效的顾问或主管登录名，否则 `400 {"error":"负责人不存在"}`。
- 响应：`200 {"id":"bt-…","status":"open|done","created":true|false}`

### 2. 拉取更新 `GET /updates?since=<ISO 时间>`
- 返回 `since` 之后有状态或备注变化、且来源为助理的任务，按 `updatedAt` 升序，最多 200 条：
```json
{ "items": [ { "externalId": "…", "status": "open|done", "doneAt": "ISO|null", "doneBy": "顾问姓名|null",
               "note": "…", "updatedAt": "ISO" } ],
  "next": "本页最大 updatedAt，下次作为 since；无数据时等于请求的 since" }
```
- 助理应保存 `next`，下一轮从它继续。

### 3. 可指派的顾问 `GET /advisors`
```json
{ "items": [ { "username": "li", "name": "李顾问", "role": "advisor|supervisor" } ] }
```
只返回启用中的顾问与主管，不返回学生、文书老师、DIY 账号。

## 不做的事
- 不传输学生档案、文书或任何文件。
- 不删除任务（删除只能由主管在申请系统里操作；被删的任务不再出现在 `/updates` 中）。
