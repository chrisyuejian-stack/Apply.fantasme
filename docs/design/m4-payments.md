# M4 设计稿：学生付款（费用单 + 收款码 + 人工确认）

作者 Claude，2026-11-27。主人已确认效果图：`mockups/m4-student-mobile.png`、`mockups/m4-staff-list.png`、`mockups/m4-create-dialog.png`；生成脚本 `mockups/m4-mockup-generator.cjs`（含全部样式与结构）。**涉及资金，属高风险**：Grok 红队 + Antigravity 验收后由主人合并。

## 目标与已定规则
- 申请过程中需垫付的费用（申请费、成绩单认证、翻译、平台费等）**先推给学生付款，确认到账后再代缴**。
- **不接支付接口**：学生扫**主人上传的经营收款码**（微信/支付宝）付款，**顾问或主人人工确认到账**。以后若开公司商户号，可在本设计之上加在线支付，费用单与界面不变。
- 金额：**人民币，顾问手填**；**不需要审批**，顾问直接发送；**不开发票、不做退款**。
- **费用单独立存在，不关联学校/申请**（一单常含多所学校和平台费用）。
- 收款人：**统一为主人**。
- 学生付款后点「我已付款」（截图选填）→ 负责顾问或主人「确认收到」或「未收到」（须填原因，退回待付款）。
- 代缴凭证：**选填**。

## 状态
```
draft 草稿 → sent 待付款 → claimed 学生已点「我已付款」→ confirmed 已收款（待代缴）→ disbursed 已代缴（完成）
                 ↑                    │
                 └── 未收到（reject，原因必填）┘
draft | sent → cancelled 已取消（学生点已付款之后不能取消）
```
- 金额与明细只能在 `draft`、`sent` 修改；`claimed` 起锁定（被「未收到」退回 `sent` 后可再改）。每次修改与状态变化写入 `history`。

## 数据（无 DDL：`records` 新增业务表名 `feeBills`，`student_id` = 学生 id）
```
{ id, studentId, title(≤80), items:[{label(≤80), amountFen(正整数)}](1–50 行), totalFen(服务端计算),
  refCode("FQ-"+4 位，字符集 23456789ABCDEFGHJKMNPQRSTUVWXYZ，在未终结的单中唯一，服务端生成),
  dueDate(YYYY-MM-DD|null), studentNote(≤500), status,
  attachments:[{key,name,size,type,note(≤100)}](≤30，学校缴费截图),
  paymentProof:{key,...}|null(学生付款截图，选填), disburseProof:{key,...}|null(代缴凭证，选填),
  sentAt, claimedAt, confirmedAt, confirmedBy, disbursedAt, disbursedBy, cancelledAt,
  lastReject:{at, by, reason}|null, history:[{at, by, action, note}](只追加，≤200),
  createdBy, createdAt, updatedAt }
```
- 金额**以「分」存整数**；客户端提交的 `totalFen` 一律忽略，以明细求和为准；单笔明细 ≤ 1,000,000 元。

## 权限
| 角色 | 可见 | 可做 |
|---|---|---|
| 主人（主管） | 全部 | 一切操作；上传收款码 |
| 顾问 | 自己负责（可管理）的学生的费用单 | 建/改/发送/取消；确认收到/未收到；代缴 |
| 学生 | **本人**的、`sent` 及之后的单（看不到草稿） | 点「我已付款」、上传付款截图 |
| 文书老师 / DIY | 不可见 | — |
- 可见性须同时落在 `Be`（脱敏/过滤）与 bootstrap 的 SQL 下推，写入只经专用接口。

## 接口（全部经现有会话 + `X-FQ` + 同源校验）
- `POST /api/fees`（新建草稿）、`PATCH /api/fees/:id`（改草稿/待付款）、`POST /api/fees/:id/{send|cancel|claim|confirm|reject|disburse}`。
- **状态迁移用条件更新（CAS）**，并发确认/未收到只有一个成功，失败 409。
- 通用 `PUT/DELETE /api/t/feeBills/*` **一律拒绝**。
- 每次动作写 audit（`fee-*`，含单号与动作，不含图片内容）。

## 文件（复用 M2 的 R2 与 `/api/files`）
- 新前缀：`fees/<studentId>/<billId>/<uuid>`（缴费截图、付款截图、代缴凭证）；`settings/collect/<uuid>`（收款码）。
- 类型：jpg/png/webp/pdf；单个 ≤10 MB；缴费截图每单 ≤30 张，每张可写一行备注（≤100 字）。
- 上传权限：缴费截图——可管理该学生者，单为 `draft|sent`；付款截图——本人学生，单为 `sent|claimed`；代缴凭证——可管理者，单为 `confirmed|disbursed`。
- 下载权限：按费用单可见性；收款码——主人与员工随时可看，学生仅在有 `sent` 单时可看。
- 收款码配置存 `meta` 键 `fee:collect`：`{ payeeName, wechat:{key}|null, alipay:{key}|null }`，仅主人可改。

## 前端（只改 `src/client/app/parts/`，`npm run build:client`）
- **学生**：导航「付款」（角标 = 待付款数）。见 `m4-student-mobile.png`：总额、明细、顾问备注、缴费截图网格（点开看大图+备注）、微信/支付宝切换的收款码、「保存收款码」（手机提示「扫一扫→相册」识别）、备注码一键复制、「我已付款」（弹窗可选上传截图）；被退回时显示「顾问未确认收到：原因」。
- **员工**：导航「收款」（角标 = 待确认收款数）。见 `m4-staff-list.png`：选项卡 待确认收款 / 待付款 / 待代缴 / 已完成 / 已取消；「未收到」弹窗原因必填；「已代缴」弹窗可选上传凭证。
- **新建/编辑**：见 `m4-create-dialog.png`。缴费截图**多选上传**：并发 3 个、逐张进度、失败可重试；图片长边 >2400px 时浏览器端压缩为 JPEG（质量约 0.85）再上传；每张卡片可写备注、可删除；显示「已上传 N / 30」。
- **主管设置**：「设置 → 收款码」上传/替换微信、支付宝经营收款码与收款人名称。
- 375px 不得横向溢出。

## 不做的事（本期）
在线支付接口、退款、发票、多币种、关联申请/学校、主管审批。

## 测试要点
权限矩阵（学生看不到草稿与他人单、不能确认；文书/DIY 不可见；非负责顾问不可操作）；状态机全部合法/非法迁移；未收到→退回→再付款；篡改 `totalFen`/`refCode`/`status` 无效；30 张上限与备注长度；备注码唯一；并发确认/未收到；上传与下载的路径前缀与权限；收款码仅主人可改。
