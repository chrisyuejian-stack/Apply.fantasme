# 设计稿：BUG-02 / BUG-03 / BUG-05 与 bootstrap 性能

作者 Claude；实现 GPT；红队 Grok-Ops；验收 Antigravity。**本页不改代码。** 函数名为产物符号，按名搜索，不依赖行号。
通用约束：不改表结构、不改 JSON 业务字段与 Cookie/PBKDF2 契约；每项一个 PR；对应回归探针由红转绿，原 12 项 `npm test` 不退化。

## 实测依据（2026-11-26，生产库 `fq-apply`，只读，仅计数）
- `records` 1732 行约 750 KB；除 `templates`（11 行）外，所有行 `student_id` 非空，且与 JSON 中 `studentId`（`students` 表为 `id`）**逐行一致（0 不一致）**。
- 说明：当前数据量下性能不是线上问题，性能项按「规模化」处理，优先级低于三个缺陷。

---
## BUG-02 `POST /api/admin/import`（`ni` → `rt` / `at`）先清空再校验

**现状**：`rt(...,{wipe:true})` 先 `DELETE FROM records`，再按 80 条分批写入；随后 `at(reqdb)` 才校验（失败时已清空）；`users` 循环中同名不同 id 触发 UNIQUE 抛 500；仅含 `format` 的空备份会清空内置 `templates`。

**必须保留**：备份格式 `format:"fq-admissions"`、各表数组键、`users` 导入时随机新密码并回传 `created`、导入不删除已有用户/会话、审计 `import`。

**方案（先校验，后原子替换）**
1. **纯校验阶段（不碰 DB）**：`format`；至少含一个业务表数组，否则 400「空备份」；每条记录是对象且有字符串 `id`；`reqdb` 复用 `at` 的形状检查（`taxonomy/schools/records`）抽成纯函数；`users` 每项需 `id`、`username`，且**载荷内用户名不重复**。
2. **DB 预检**：载荷用户名与库内**不同 id** 的用户重名 → 400（列出冲突用户名即可，不含其他数据），不写任何东西。
3. **暂存**：把新记录以 `tbl='__imp:'||tbl` 分批（≤80）写入同一张 `records`；用户行与口令哈希在内存中先算好。
4. **一次原子切换**：单个 `DB.batch([...])`：删除载荷里出现的业务表旧行（**`templates` 仅当载荷含 `templates` 才替换**）→ `UPDATE records SET tbl=substr(tbl,7) WHERE tbl LIKE '__imp:%'` → `reqdb` 的 meta 替换 → 用户插入。语句数固定很小，不依赖 `batch` 上限。
5. 任一步失败：删除 `__imp:%` 暂存行并返回错误；开始导入前先清理历史残留暂存行。

**测试**：转绿 `functional` 6b/6c/8a；新增：失败注入（第 N 批抛错）后各表内容哈希与导入前一致；载荷内重名；`__imp:` 残留清理；空 `reqdb` 不影响；`templates` 保留。
**回滚**：纯代码回退；`__imp:%` 残留行无害，可手动清理。
**红队重点**：并发两次导入；超大载荷；暂存行被业务读取（`bootstrap` 只读 `we` 列表内表名，应不可见——需验证）；学生/顾问角色调用被拒。

---
## BUG-03 `/api/*` 写接口缺同源校验（`Yn`）

**现状**：`/api/ai/*` 经 `fqaiSameOrigin` 校验 `Origin`；其余写接口只要 `X-FQ: 1`。Cookie 为 `SameSite=Strict`，属纵深防御缺口。

**方案**：在 `Yn` 现有 `X-FQ` 检查**之后、任何路由分派之前**加同源检查（覆盖 `/setup`、`/login`、`/diy/*`、`/diy-admin/*`）。对 `GET/HEAD` 不检查。
- 规则：`Origin` 存在且 ≠ `new URL(req.url).origin` → 403；`Sec-Fetch-Site: cross-site` → 403（浏览器设置，页面脚本无法伪造）；**无 `Origin` 放行**（与 AI 路由一致，保证脚本/测试不受影响）。
- 在 `application.js` 内定义独立小函数，不依赖 `ai.js`（两文件当前共享词法作用域，但不应在业务侧耦合 AI 符号）。

**风险与保留**：官网 `www` 通过 iframe 加载 `/embed-login`，页面脚本请求的是 apply 自身源，属同源，不受影响；`Origin: null`（沙箱 iframe）按不一致拒绝。

**测试**：转绿 `security` 4b；新增：同源 200、无 Origin 200、`Origin: null` 403、端口/大小写/子域变体 403、`/login` 与 `/setup` 同样受保护、`/embed-login` 页面与其登录流程不退化（E2E）。
**回滚**：纯代码回退，无数据影响。
**红队重点**：在 preview 与未来生产域分别验证 `req.url` 源与浏览器 `Origin` 一致（自定义域/`pages.dev` 均需）；`Referer`、`X-Forwarded-*` 无法绕过。

---
## BUG-05 DIY 账号重置后（`must_change=1`）后端仍放行读写（`Vt`）

**现状**：正式账号在 `Yn` 对 `mustChange` 返回 403；DIY 路由只在前端弹窗。`diy-admin` 侧管理员已检查 `mustChange`。

**方案**：在 `Vt` 解析 DIY 会话得到账号 `y` 后，**`/logout`、`/password`、`/bootstrap`(GET) 三个分支之后**插入：`if (y.mustChange) throw new s(403, "请先修改初始密码", {mustChange:true})`（错误体形状与正式账号保持一致）。
- 实现者需先确认 `Ne` 返回的账号对象确有 `mustChange` 字段（产物中映射处为 `mustChange:!!t.must_change`）。
- `/bootstrap` 响应不变，使前端仍能读到 `mustChange` 并弹出改密。

**前端联动（Claude，随 BUG-12 处理）**：DIY 在收到 403+`mustChange` 时统一进入改密界面，不再产生冗余 401/403 请求。

**测试**：转绿 `functional` 7b；新增：改密前 `PUT/POST/DELETE` 全部 403，`/password` 成功后恢复 200；重置会话清理行为不变。
**回滚**：纯代码回退。
**红队重点**：路由大小写/尾斜杠、`/diy-admin/*` 与 `/diy/*` 混用、先 `GET` 后写入的竞态。

---
## 性能：`Jn`(bootstrap) 与 `fqaiAuditAll`

**阶段 A（无契约变化，GPT 实现）**
1. `fqaiAuditAll`：先按 `studentId` 建 `Map<studentId, rows[]>` 再逐生关联，消除 O(S·R) 过滤；输出必须与旧实现逐字段一致。
2. `Jn`：非 `supervisor` 角色把可见性下推到 SQL：`SELECT tbl,data FROM records WHERE student_id IN (SELECT value FROM json_each(?)) [OR tbl='templates' 仅限员工角色]`。**使用单个 JSON 数组参数，避免 D1 单语句 100 个绑定参数的上限。** `de` 的可见集合计算逻辑不变；`Be` 的脱敏逻辑不变。
   - 依据：生产数据 `student_id` 与 JSON `studentId` 逐行一致；若实现者发现任何分歧，回退为现状。
3. **差分测试（硬门槛）**：对每个角色在 Small/Medium/Large 夹具上，新旧 `bootstrap` 响应**深度相等**；再跑 `perf-bench`，记录响应体与耗时。

**阶段 B（需另立设计，待阶段 A 数据后再定）**：`supervisor` 仍会拉全量；若 500 学生规模在 Workers 内存/CPU 上不达标（Grok-Ops 在 preview 用合成数据实测），再设计「列表轻载 + 按学生详情接口」，涉及前端，由 Claude 另出方案。

**回滚**：纯代码回退，无数据影响。
