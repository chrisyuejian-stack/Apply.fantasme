import json
import os
import re
import shutil
import subprocess
import tempfile
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SETUP_KEY = "UiDeepAudit2026!"

def start_server(data_dir):
    env = os.environ.copy()
    env["PORT"] = "0"
    env["LOCAL_DATA_DIR"] = str(data_dir)
    env["APPLY_SETUP_KEY"] = SETUP_KEY
    env["PBKDF2_ITERATIONS"] = "10000"
    env["DEEPSEEK_API_KEY"] = "sk-local-ui-audit-only"
    node24 = "/opt/nvm/versions/node/v24.22.3/bin/node"
    node_bin = node24 if os.path.exists(node24) else "node"
    proc = subprocess.Popen(
        [node_bin, "scripts/dev.mjs"],
        cwd=str(ROOT),
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    deadline = time.time() + 15
    port = None
    output = ""
    while time.time() < deadline:
        line = proc.stdout.readline()
        if not line:
            if proc.poll() is not None:
                raise RuntimeError(f"Server exited {proc.returncode}: {output} {proc.stderr.read()}")
            continue
        output += line
        m = re.search(r"Local application: https://localhost:(\d+)", line)
        if m:
            port = int(m.group(1))
            break
    if not port:
        proc.kill()
        raise RuntimeError("Server startup timeout: " + output)
    return proc, port

def check_overflow(page):
    return page.evaluate("""() => {
        const iw = window.innerWidth;
        const sw = document.documentElement.scrollWidth;
        const culprits = [];
        if (sw > iw + 2) {
            for (const el of document.querySelectorAll('*')) {
                const r = el.getBoundingClientRect();
                if (r.right > iw + 2) {
                    culprits.push({ tag: el.tagName, cls: String(el.className || ''), right: Math.round(r.right), w: Math.round(r.width) });
                    if (culprits.length >= 4) break;
                }
            }
        }
        return { sw, iw, overflow: sw > iw + 2, culprits };
    }""")

def run():
    data_dir = Path(tempfile.mkdtemp(prefix="apply-uideep-"))
    proc, port = start_server(data_dir)
    base_url = f"https://localhost:{port}"
    out = {
        "ui_bugs": [],
        "responsive_overflows": [],
        "routes_checked": [],
        "ai_ui_checks": [],
        "console_errors": [],
        "http_failures": [],
        "page_errors": [],
    }
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path="/usr/bin/google-chrome",
                headless=True,
                args=["--no-sandbox"],
            )
            ctx = browser.new_context(ignore_https_errors=True, viewport={"width": 1280, "height": 800})
            page = ctx.new_page()
            page.on("console", lambda m: out["console_errors"].append({"url": page.url, "text": m.text}) if m.type == "error" else None)
            page.on("response", lambda r: out["http_failures"].append({"page": page.url, "url": r.url, "status": r.status}) if r.status >= 400 else None)
            page.on("pageerror", lambda e: out["page_errors"].append({"url": page.url, "err": str(e)}))

            # Setup demo
            page.goto(f"{base_url}/login", wait_until="networkidle")
            page.fill("#sk", SETUP_KEY)
            page.fill("#sn", "UI深测主管")
            page.fill("#su", "sup.ui")
            page.fill("#sp", "SupUiAudit2026")
            page.fill("#sp2", "SupUiAudit2026")
            page.check("#sd")
            page.click("#setup button[type='submit']")
            page.wait_for_selector("#done:not([hidden])")
            demo_accounts = []
            for tr in page.locator("#acc tbody tr").all():
                tds = [td.inner_text().strip() for td in tr.locator("td").all()]
                if len(tds) == 3:
                    demo_accounts.append({"name": tds[0], "username": tds[1], "password": tds[2]})
            page.click("#enter")
            page.wait_for_selector(".shell")

            # Register a DIY account via API before #/diy-students loads ea store
            reg_res = page.evaluate("""async () => {
                const r = await fetch('/api/diy/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-FQ': '1' },
                    body: JSON.stringify({ phone: '13800137777', name: 'UI测试DIY', password: 'DiyUiPass2026', level: 'UG', season: '2026 Fall', majorId: 'piano', agree: true })
                });
                return { status: r.status, body: await r.text() };
            }""")
            out["diy_reg_res"] = reg_res
            if reg_res["status"] >= 400:
                raise RuntimeError(f"DIY register failed: {reg_res}")

            # 1. Check all supervisor routes + subtabs on desktop & mobile 375x812
            sup_routes = [
                "#/home", "#/students",
                "#/student/stu-1/apps", "#/student/stu-1/docs", "#/student/stu-1/files",
                "#/student/stu-1/tasks", "#/student/stu-1/refs", "#/student/stu-1/profile", "#/student/stu-1/activity",
                "#/app/app-1/overview", "#/app/app-1/req", "#/app/app-1/audition", "#/app/app-1/tasks",
                "#/tasks", "#/docs", "#/files",
                "#/settings/users", "#/settings/templates", "#/settings/reqdb", "#/settings/data", "#/settings/audit",
                "#/diy-students", "#/diy-settings"
            ]
            for r in sup_routes:
                page.set_viewport_size({"width": 1280, "height": 800})
                page.evaluate(f"location.hash = '{r}'")
                page.wait_for_timeout(160)
                txt = page.locator("#app").inner_text().strip()
                has_err = "页面出错" in txt or "找不到" in txt
                out["routes_checked"].append({"role": "supervisor", "route": r, "ok": len(txt) > 10 and not has_err})

                page.set_viewport_size({"width": 375, "height": 812})
                page.wait_for_timeout(80)
                ov = check_overflow(page)
                if ov["overflow"]:
                    out["responsive_overflows"].append({"role": "supervisor", "route": r, **ov})

            page.set_viewport_size({"width": 1280, "height": 800})

            # 2. Check diy-student/:id page
            page.evaluate("location.hash = '#/diy-students'")
            page.wait_for_selector("[data-act='diy-filter'][data-tab='all']", timeout=5000)
            page.click("[data-act='diy-filter'][data-tab='all']")
            page.wait_for_timeout(300)
            diy_row = page.locator("[data-href^='#/diy-student/']").first
            if diy_row.count() > 0:
                diy_row.click()
                page.wait_for_timeout(300)
                out["routes_checked"].append({"role": "supervisor", "route": "#/diy-student/:id", "ok": "UI测试DIY" in page.locator("#app").inner_text()})
                page.set_viewport_size({"width": 375, "height": 812})
                page.wait_for_timeout(80)
                ov = check_overflow(page)
                if ov["overflow"]:
                    out["responsive_overflows"].append({"role": "supervisor", "route": "#/diy-student/:id", **ov})
                page.set_viewport_size({"width": 1280, "height": 800})
            else:
                out["routes_checked"].append({"role": "supervisor", "route": "#/diy-student/:id", "ok": False, "detail": page.locator(".content").inner_text()[:300]})

            # 3. Check AI panel pure-compute actions (brief & auditAll) in real browser UI
            page.click(".fqai-fab")
            page.wait_for_selector(".fqai-panel:not([hidden])")
            page.click(".fqai-tools button[data-tool='brief']")
            page.wait_for_timeout(600)
            brief_ok = "今日简报" in page.locator(".fqai-body").inner_text()
            out["ai_ui_checks"].append({"action": "brief", "ok": brief_ok})
            page.click(".fqai-tools button[data-tool='auditAll']")
            page.wait_for_timeout(600)
            audit_ok = "体检总览" in page.locator(".fqai-body").inner_text()
            out["ai_ui_checks"].append({"action": "auditAll", "ok": audit_ok})
            # Check AI panel mobile overflow
            page.set_viewport_size({"width": 375, "height": 812})
            page.wait_for_timeout(80)
            ov_ai = check_overflow(page)
            if ov_ai["overflow"]:
                out["responsive_overflows"].append({"role": "supervisor", "route": "ai-panel-open", **ov_ai})
            page.set_viewport_size({"width": 1280, "height": 800})
            page.click(".fqai-panel [data-fq='close']")

            # 4. Check document detail + doc-reopen UI
            page.evaluate("location.hash = '#/docs'")
            page.wait_for_timeout(200)
            # Check mobile overflow on doc detail
            first_doc = page.locator("[data-href^='#/doc/']").first
            if first_doc.count() > 0:
                first_doc.click()
                page.wait_for_timeout(200)
                page.set_viewport_size({"width": 375, "height": 812})
                page.wait_for_timeout(80)
                ov_doc = check_overflow(page)
                if ov_doc["overflow"]:
                    out["responsive_overflows"].append({"role": "supervisor", "route": "#/doc/:id", **ov_doc})
                page.set_viewport_size({"width": 1280, "height": 800})

            # 5. Check embed-login page
            page.goto(f"{base_url}/embed-login", wait_until="domcontentloaded")
            page.wait_for_timeout(300)
            embed_txt = page.locator("body").inner_text()
            out["routes_checked"].append({"role": "supervisor", "route": "/embed-login", "ok": "已登录申请管理系统" in embed_txt})

            # 6. Check Writer & Student role pages on desktop and mobile
            for acc in demo_accounts:
                if acc["username"] in ("chen", "lin.yuxi"):
                    page.goto(f"{base_url}/", wait_until="domcontentloaded")
                    page.wait_for_selector("[data-act='logout']")
                    page.click("[data-act='logout']")
                    page.wait_for_selector("#login:not([hidden])")
                    page.fill("#u", acc["username"])
                    page.fill("#p", acc["password"])
                    page.click("#login button[type='submit']")
                    page.wait_for_selector("#pwForm")
                    page.fill("#pwForm [name='old']", acc["password"])
                    page.fill("#pwForm [name='new']", "UiRole2026!")
                    page.fill("#pwForm [name='new2']", "UiRole2026!")
                    page.click("#pwForm button[type='submit']")
                    page.wait_for_selector(".shell")
                    role_routes = ["#/home", "#/docs", "#/tasks", "#/students"] if acc["username"] == "chen" else ["#/home", "#/intake"]
                    for r in role_routes:
                        page.set_viewport_size({"width": 1280, "height": 800})
                        page.evaluate(f"location.hash = '{r}'")
                        page.wait_for_timeout(150)
                        page.set_viewport_size({"width": 375, "height": 812})
                        page.wait_for_timeout(80)
                        ov = check_overflow(page)
                        if ov["overflow"]:
                            out["responsive_overflows"].append({"role": acc["username"], "route": r, **ov})
                    page.set_viewport_size({"width": 1280, "height": 800})

            # 7. Check DIY mobile overflow + DIY invalid link validation bug (S('ftp://bad') is truthy '#')
            page.click("[data-act='logout']")
            page.wait_for_selector("#login:not([hidden])")
            page.fill("#u", "13800137777")
            page.fill("#p", "DiyUiPass2026")
            page.click("#login button[type='submit']")
            page.wait_for_selector(".shell")
            for dr in ["#/home", "#/apps", "#/tasks", "#/docs", "#/files", "#/timeline"]:
                page.set_viewport_size({"width": 1280, "height": 800})
                page.evaluate(f"location.hash = '{dr}'")
                page.wait_for_timeout(150)
                page.set_viewport_size({"width": 375, "height": 812})
                page.wait_for_timeout(80)
                ov = check_overflow(page)
                if ov["overflow"]:
                    out["responsive_overflows"].append({"role": "diy", "route": dr, **ov})
            page.set_viewport_size({"width": 1280, "height": 800})
            page.evaluate("location.hash = '#/files'")
            page.wait_for_timeout(150)
            page.click("[data-act='diy-mat-new']")
            page.wait_for_selector("#modalForm")
            page.fill("#modalForm [name='title']", "非法链接测试")
            page.fill("#modalForm [name='link']", "ftp://bad.example/file")
            page.click("#modalForm button[type='submit']")
            page.wait_for_timeout(300)
            modal_still_open = page.locator("#modalForm").count() > 0
            toast_txt = page.locator("#toast").inner_text()
            if not modal_still_open and "http(s)://" not in toast_txt:
                out["ui_bugs"].append("DIY 材料/文书链接校验失效：输入 ftp://bad.example/file 未被前端拦截（S() 返回 '#' 为 truthy），弹窗直接关闭且链接被静默清为空，随后渲染成 <a href='#'>打开</a>")

            browser.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(data_dir, ignore_errors=True)

    print(json.dumps(out, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    run()
