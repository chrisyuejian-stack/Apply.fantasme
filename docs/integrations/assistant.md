# 对接契约：枫琴助理（fengqin-assistant） ⇄ 申请系统（apply）

版本 **v1.2（草案，待助理侧确认）**，2026-11-27。两个仓库的实现都以本文为准；改动须两边同时确认。

> **生效规则**：v1.2 在助理侧确认前**不得开始实现**，现行生效的仍是 v1.1。v1.2 对 v1.1 **向后兼容**：旧字段含义不变，只新增字段、一个状态值 `cancelled` 和一个接口（`POST /tasks/{externalId}/cancel`）；助理按 v1.1 实现的解析器必须容忍未知字段与新的 `status` 值。
> 变更记录：v1.1 增加「遇阻」状态与原因；**v1.2 增加公开任务板与认领、助理撤回（cancel）、主管删除以 `cancelled` 报告**。

## 谁负责什么（边界）
- **申请系统（本仓库）**：保存任务、顾问的「完成 / 遇阻」操作、权限与界面；对外**如实报告状态**。
- **助理系统（`fengqin-assistant`，另一个 Claude 项目维护）**：什么时候、给谁推什么任务；收到状态后怎么记入记忆、**要不要在主人的待办里生成条目**、如何提醒主人。这些是助理自己的产品决定，本契约不规定。
- 任何一边需要改接口，先改本文件并让对方确认，再各自实现。

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
  "importance": "high|normal|low", "due": "YYYY-MM-DD 或 null", "assignee": "顾问登录名；null 或不传 = 公开任务板" }
```
- 按 `externalId` **幂等**，且是**完整状态的 upsert**：首次创建；再次推送同一 `externalId` 时更新 `title/note/importance/due/assignee`，**不改变**状态（`blocked`/`done`/`cancelled` 不会被重推回退或复活）。助理每次推送都应带上想要的 `assignee`——**不传等于公开**，所以只想改标题时也要把原来的 `assignee` 一起带上。
- `assignee` 有值时必须是有效的顾问或主管登录名，否则 `400 {"error":"负责人不存在"}`；`null`/不传表示**公开任务板**（见下文）。
- 响应：`200 {"id":"bt-…","status":"open|blocked|done|cancelled","created":true|false}`；对已 `cancelled` 的任务重推返回 `200` 且 `status:"cancelled"`、`created:false`，不做任何修改。

### 2. 拉取更新 `GET /updates?since=<ISO 时间>`
- 返回 `since` 之后有状态或备注变化、且来源为助理的任务，按 `updatedAt` 升序，最多 200 条：
```json
{ "items": [ { "externalId": "…", "status": "open|blocked|done|cancelled",
               "blockedReason": "遇阻原因|null", "blockedAt": "ISO|null",
               "doneAt": "ISO|null", "doneBy": "顾问姓名|null", "assigneeName": "顾问姓名|null",
               "visibility": "assigned|board", "claimedBy": "顾问登录名|null",
               "claimedByName": "顾问姓名|null", "claimedAt": "ISO|null",
               "cancelledAt": "ISO|null", "cancelledBy": "assistant|supervisor|null",
               "note": "…", "updatedAt": "ISO" } ],
  "next": "本页最大 updatedAt，下次作为 since；无数据时等于请求的 since" }
```
- 助理应保存 `next`，下一轮从它继续。
- 每次状态变化（`open→blocked`、`blocked→done`、`open→done`、`→cancelled`）以及**认领、释放认领、改派**，任务都会以新的 `updatedAt` 再出现一次；助理自行比较上次记录判断「新发生了什么」。
- v1.1 的旧字段含义不变。旧任务（v1.2 之前创建的）`visibility` 为 `assigned`，`claimed*`、`cancelled*` 为 `null`。
- `assigneeName`：指定顾问的任务是该顾问；公开任务**被认领后是认领者**（认领后任务算认领者的），**公开且没人认领时为 `null`**。

## 状态规则
- `open` → `blocked`：顾问提交遇阻，**原因必填**（≤500 字）。
- `open`/`blocked` → `done`：顾问点完成；**遇阻后仍可完成**。
- `done` 是终态；**不能撤回、不能改回 `open`，遇阻原因提交后不能修改**。
- 助理重推同一 `externalId` 不改变状态。
- `open`/`blocked` → `cancelled`：助理撤回（见接口 4）或主管在申请系统里删除。`cancelled` 是终态，**不能改回任何状态，重推也不会让它复活**。`done` 的任务不能被撤回，主管也不能删除（只会随界面保留期不再显示）。
- 状态取值：`open | blocked | done | cancelled`。
- 界面保留期只影响显示（顾问端已完成保留 30 天，主管端 7 天；`cancelled` 立即从两端列表消失），数据与 `/updates` 不受影响。

## 公开任务板与认领（v1.2）
- **公开任务**：`POST /tasks` 的 `assignee` 为 `null`/不传。所有**启用的顾问与主管**都能在申请系统里看到并认领；文书老师、学生、DIY 账号看不到。
- **认领**：只有顾问和主管能认领（`advisor|supervisor`）；**一人认领，先到先得**（并发时只有一人成功，其余收到「已被某某认领」）。认领后任务**算认领者的**：`visibility` 仍为 `board`，`claimedBy` 为认领者，`assigneeName` 为认领者姓名。
- **认领后对其他人**：公开且已被认领的任务**从其他顾问的列表中消失**（顾问只看自己的活，避免互相打扰）；认领者本人和主管仍可见。主管列表里显示「已被某某认领」。
- **只有认领者能操作**：认领后只有认领者能「完成 / 遇阻」；未认领的公开任务不能直接完成或遇阻，必须先认领。因此公开任务的 `blocked`/`done` 总伴随 `claimedBy`。
- **释放**：认领者可以把任务**释放回公开**，但仅限 `open`（已 `blocked` 的不能自行释放——遇阻原因是认领者的陈述，需要主管决定；已 `done` 的不能释放）。主管可以释放或改派任何 `open`/`blocked` 的认领。**释放、改派一个 `blocked` 任务时，状态重置为 `open`，`blockedReason`/`blockedAt` 清空**（遇阻事件助理已在先前的 `/updates` 里收到，应已记入记忆）。
- **助理侧切换**（通过重推）：仅限 `open`/`blocked` 的任务。
  - 指定顾问 → 公开：`visibility` 变 `board`，无认领人。
  - 公开（已认领或未认领）→ 指定顾问 X：`visibility` 变 `assigned`，认领自动清除。
  - 公开 → 公开（`assignee` 仍为 `null`）：**不清除已有认领**（避免助理只改标题就清掉认领）。
  - 凡导致负责人变化的切换，若原状态为 `blocked`，状态同样重置为 `open` 并清空遇阻信息。
  - 已 `done`、已 `cancelled` 的重推不改变任何状态与归属（v1.1 已有）。

### 3. 可指派的顾问 `GET /advisors`
```json
{ "items": [ { "username": "li", "name": "李顾问", "role": "advisor|supervisor" } ] }
```
只返回启用中的顾问与主管，不返回学生、文书老师、DIY 账号。

### 4. 助理撤回 `POST /tasks/{externalId}/cancel`（v1.2）
- 只有助理能调用，同样的 HMAC 签名；**请求体为空**（签名里 `body` 为空字符串）。`externalId` 作为路径段做 URL 编码，签名使用**实际发出的路径**。
- 任务为 `open` 或 `blocked`：状态变 `cancelled`（终态），**从顾问和主管的列表里消失，数据保留**；在 `/updates` 里以 `status:"cancelled"`、`cancelledAt`、`cancelledBy:"assistant"` 再出现一次。响应 `200 {"id":"bt-…","status":"cancelled"}`。
- 任务已 `done`：`409 {"error":"任务已完成，不能撤回"}`，状态不变。
- 任务已 `cancelled`：`200 {"id":"bt-…","status":"cancelled"}`，**幂等**，不改变 `cancelledAt`/`cancelledBy`。
- `externalId` 不存在：`404 {"error":"任务不存在"}`。

## 不做的事
- 不传输学生档案、文书或任何文件。
- 助理不能物理删除任务，只能撤回（`cancel`）。
- **主管在申请系统里删除任务 = 软删除，等同撤回**：仅限 `open`/`blocked`，状态变 `cancelled`、`cancelledBy:"supervisor"`，数据保留，并在 `/updates` 里以 `cancelled` 出现一次（**修订 v1.1**：v1.1 写的「被删任务不再出现在 `/updates`」会让助理一直以为公开任务没人认领，改为以 `cancelled` 通知）。`done` 的任务主管不能删除。
- 申请系统内任何角色都不能新建任务，任务只能由助理推送创建。
