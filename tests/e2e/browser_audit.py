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
SETUP_KEY = "BrowserAuditSetup2026!"

def start_server(data_dir):
    env = os.environ.copy()
    env["PORT"] = "0"
    env["LOCAL_DATA_DIR"] = str(data_dir)
    env["APPLY_SETUP_KEY"] = SETUP_KEY
    env["PBKDF2_ITERATIONS"] = "10000"
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

def run_audit():
    data_dir = Path(tempfile.mkdtemp(prefix="apply-browser-"))
    proc, port = start_server(data_dir)
    base_url = f"https://127.0.0.1:{port}"
    report = {
        "base_url": base_url,
        "checks": [],
        "console_errors": [],
        "page_errors": [],
        "http_failures": [],
        "responsive": [],
        "overflow_culprits": [],
        "long_list_perf": {},
        "bugs": [],
    }
    expected_4xx_urls = set()

    def record(name, ok, detail=""):
        report["checks"].append({"name": name, "ok": ok, "detail": detail})

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path="/usr/bin/google-chrome",
                headless=True,
                args=["--no-sandbox", "--enable-precise-memory-info"],
            )
            context = browser.new_context(ignore_https_errors=True, viewport={"width": 1280, "height": 800})
            page = context.new_page()

            def on_console(msg):
                if msg.type == "error":
                    report["console_errors"].append({"url": page.url, "text": msg.text})

            def on_pageerror(err):
                report["page_errors"].append({"url": page.url, "error": str(err)})

            def on_response(res):
                if res.status >= 400 and res.url not in expected_4xx_urls:
                    report["http_failures"].append({"url": res.url, "status": res.status, "page": page.url})

            page.on("console", on_console)
            page.on("pageerror", on_pageerror)
            page.on("response", on_response)

            # 1. Setup on /login with demo=true
            page.goto(f"{base_url}/login", wait_until="networkidle")
            page.wait_for_selector("#setup:not([hidden])")
            page.fill("#sk", SETUP_KEY)
            page.fill("#sn", "浏览器主管")
            page.fill("#su", "sup.browser")
            page.fill("#sp", "SupBrowser2026")
            page.fill("#sp2", "SupBrowser2026")
            page.check("#sd")
            page.click("#setup button[type='submit']")
            page.wait_for_selector("#done:not([hidden])")

            demo_accounts = []
            for tr in page.locator("#acc tbody tr").all():
                tds = [td.inner_text().strip() for td in tr.locator("td").all()]
                if len(tds) == 3:
                    demo_accounts.append({"name": tds[0], "username": tds[1], "password": tds[2]})
            record("setup_demo_accounts", len(demo_accounts) >= 3, f"count={len(demo_accounts)}")

            page.click("#enter")
            page.wait_for_selector(".shell")
            record("supervisor_home_loaded", len(page.locator("#app").inner_text().strip()) > 20)

            # 2. Supervisor route traversal + AI panel check
            routes = [
                "#/home", "#/students", "#/student/stu-1", "#/app/app-1",
                "#/tasks", "#/docs", "#/files", "#/settings",
                "#/diy-students", "#/diy-settings"
            ]
            for r in routes:
                page.goto(f"{base_url}/{r}", wait_until="networkidle")
                page.wait_for_timeout(150)
                txt = page.locator("#app").inner_text().strip()
                has_err = "页面出错" in txt or "无法加载数据" in txt
                record(f"supervisor_route_{r}", len(txt) > 10 and not has_err, f"len={len(txt)}")

            # Check AI panel opens cleanly and displays unconfigured state
            page.wait_for_selector(".fqai-fab")
            page.click(".fqai-fab")
            page.wait_for_selector(".fqai-panel:not([hidden])")
            ai_txt = page.locator(".fqai-panel").inner_text()
            record("ai_panel_opens_cleanly", "AI 助手尚未启用" in ai_txt)
            page.click(".fqai-panel [data-fq='close']")

            # 3. Create Student with XSS payload + Search Filter
            page.goto(f"{base_url}/#/students", wait_until="networkidle")
            page.click("[data-act='student-new']")
            page.wait_for_selector("#modalForm")
            xss_name = '合成XSS学生<img src=x onerror="window.__xss=1">'
            page.fill("#modalForm [name='name']", xss_name)
            # Select first non-empty advisor option and uncheck createAccount
            adv_val = page.eval_on_selector("#modalForm select[name='advisorId']", "el => [...el.options].find(o => o.value)?.value || ''")
            page.select_option("#modalForm select[name='advisorId']", adv_val)
            if page.locator("#modalForm input[name='createAccount']").is_checked():
                page.uncheck("#modalForm input[name='createAccount']")
            page.click("#modalForm button[type='submit']")
            page.wait_for_timeout(400)

            xss_triggered = page.evaluate("() => window.__xss || null")
            record("xss_student_name_blocked", xss_triggered is None and xss_name in page.locator("#app").inner_text(), f"xss={xss_triggered}, url={page.url}")

            page.goto(f"{base_url}/#/students", wait_until="networkidle")
            search_input = page.locator("input[data-act='filter'][data-key='q']")
            search_input.fill("合成XSS")
            search_input.dispatch_event("input")
            page.wait_for_timeout(150)
            record("students_filter_works", "合成XSS学生" in page.locator("#app").inner_text())

            # 4. Document workflow UI: view doc, upload version, submit, reopen
            page.goto(f"{base_url}/#/docs", wait_until="networkidle")
            first_doc = page.locator("[data-href^='#/doc/']").first
            if first_doc.count() > 0:
                first_doc.click()
                page.wait_for_timeout(200)
                record("doc_detail_loaded", "版本" in page.locator("#app").inner_text())
                if page.locator("[data-act='ver-new']").count() > 0:
                    page.click("[data-act='ver-new']")
                    page.wait_for_selector("#modalForm")
                    page.fill("#modalForm textarea[name='text']", "I study music performance and look forward to conservatory training.")
                    page.click("#modalForm button[type='submit']")
                    page.wait_for_timeout(300)
                    record("doc_upload_version_ui", "conservatory training" in page.locator("#app").inner_text())

            # 5. Narrow mobile viewport (375x812) horizontal overflow check + culprit detection
            page.set_viewport_size({"width": 375, "height": 812})
            for r in ["#/home", "#/students", "#/tasks", "#/docs", "#/settings"]:
                page.goto(f"{base_url}/{r}", wait_until="networkidle")
                page.wait_for_timeout(120)
                info = page.evaluate("""() => {
                    const iw = window.innerWidth;
                    const sw = document.documentElement.scrollWidth;
                    const culprits = [];
                    if (sw > iw + 2) {
                        for (const el of document.querySelectorAll('*')) {
                            const rect = el.getBoundingClientRect();
                            if (rect.right > iw + 2) {
                                culprits.push({ tag: el.tagName, cls: el.className, right: Math.round(rect.right), width: Math.round(rect.width) });
                                if (culprits.length >= 6) break;
                            }
                        }
                    }
                    return { sw, iw, culprits };
                }""")
                overflow = info["sw"] > info["iw"] + 2
                report["responsive"].append({"role": "supervisor", "route": r, "sw": info["sw"], "iw": info["iw"], "overflow": overflow})
                if overflow:
                    report["overflow_culprits"].append({"route": r, "culprits": info["culprits"]})
            page.set_viewport_size({"width": 1280, "height": 800})

            # 6. Test Role Logins (Advisor, Writer, Student from demo accounts)
            for acc in demo_accounts:
                page.click("[data-act='logout']")
                page.wait_for_selector("#login:not([hidden])")
                page.fill("#u", acc["username"])
                page.fill("#p", acc["password"])
                page.click("#login button[type='submit']")
                page.wait_for_selector("#pwForm")
                new_pw = "RoleAudit2026!"
                page.fill("#pwForm [name='old']", acc["password"])
                page.fill("#pwForm [name='new']", new_pw)
                page.fill("#pwForm [name='new2']", new_pw)
                page.click("#pwForm button[type='submit']")
                page.wait_for_selector(".shell")
                body_txt = page.locator("#app").inner_text()
                record(f"role_login_and_pwchange_{acc['username']}", len(body_txt.strip()) > 20)
                if page.locator("nav a[data-href='#/intake'], nav button[data-href='#/intake']").count() > 0:
                    page.goto(f"{base_url}/#/intake", wait_until="networkidle")
                    page.wait_for_timeout(150)
                    record(f"student_intake_page_{acc['username']}", "基础信息" in page.locator("#app").inner_text())

            # 7. DIY Registration + Login + Empty Link Bug Probe + Responsive
            page.click("[data-act='logout']")
            page.wait_for_selector("#login:not([hidden])")
            page.click("#seg button[data-tab='reg']")
            page.fill("#rp", "13800138888")
            page.fill("#rn", "浏览器DIY测试")
            page.fill("#rw", "DiyBrowser2026")
            page.fill("#rw2", "DiyBrowser2026")
            page.check("#ra")
            page.click("#reg button[type='submit']")
            page.wait_for_selector("#login:not([hidden])")
            page.fill("#u", "13800138888")
            page.fill("#p", "DiyBrowser2026")
            page.click("#login button[type='submit']")
            page.wait_for_selector(".shell")
            record("diy_workspace_loaded", "DIY 免费版" in page.locator("#app").inner_text())

            for r in ["#/home", "#/apps", "#/tasks", "#/docs", "#/files", "#/timeline"]:
                page.goto(f"{base_url}/{r}", wait_until="networkidle")
                page.wait_for_timeout(120)
                txt = page.locator("#app").inner_text().strip()
                record(f"diy_route_{r}", len(txt) > 10 and "页面出错" not in txt)

            # Check DIY empty link rendering bug in #/files
            page.goto(f"{base_url}/#/files", wait_until="networkidle")
            page.click("[data-act='diy-mat-new']")
            page.wait_for_selector("#modalForm")
            page.fill("#modalForm [name='title']", "无链接材料测试")
            page.click("#modalForm button[type='submit']")
            page.wait_for_timeout(250)
            bad_hash_link = page.locator("a[href='#']:has-text('打开')").count()
            if bad_hash_link > 0:
                report["bugs"].append("DIY 文件库空链接渲染为 <a href='#'>打开</a> 而非 '—'（app.js S('') 返回 '#' 为 truthy）")
            record("diy_empty_link_renders_dash", bad_hash_link == 0, f"bad_hash_link={bad_hash_link}")

            # DIY narrow mobile viewport check
            page.set_viewport_size({"width": 375, "height": 812})
            for r in ["#/home", "#/apps", "#/tasks", "#/files"]:
                page.goto(f"{base_url}/{r}", wait_until="networkidle")
                page.wait_for_timeout(100)
                metrics = page.evaluate("() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth })")
                overflow = metrics["sw"] > metrics["iw"] + 2
                report["responsive"].append({"role": "diy", "route": r, **metrics, "overflow": overflow})
            page.set_viewport_size({"width": 1280, "height": 800})

            # 8. Long list (200 synthetic students) & Repeated route switching memory/DOM growth
            page.click("[data-act='diy-logout']")
            page.wait_for_selector("#login:not([hidden])")
            page.fill("#u", "sup.browser")
            page.fill("#p", "SupBrowser2026")
            page.click("#login button[type='submit']")
            page.wait_for_selector(".shell")

            seed_ms = page.evaluate("""async () => {
                const t0 = performance.now();
                for (let i = 0; i < 200; i++) {
                    const id = 'stu-syn-' + i;
                    await fetch('/api/t/students/' + id, {
                        method: 'PUT',
                        credentials: 'same-origin',
                        headers: { 'Content-Type': 'application/json', 'X-FQ': '1' },
                        body: JSON.stringify({ id, name: '合成压力学生' + i, level: i % 2 ? 'PG' : 'UG', majorId: 'piano', season: '2027 Fall', status: 'active' })
                    });
                }
                return Math.round(performance.now() - t0);
            }""")
            page.reload(wait_until="networkidle")
            t_list0 = time.time()
            page.goto(f"{base_url}/#/students", wait_until="networkidle")
            page.wait_for_timeout(150)
            list_render_ms = round((time.time() - t_list0) * 1000, 1)
            dom_before = page.evaluate("() => document.querySelectorAll('*').length")
            heap_before = page.evaluate("() => performance.memory ? performance.memory.usedJSHeapSize : null")

            switch_routes = ["#/home", "#/students", "#/tasks", "#/docs", "#/files", "#/settings"]
            for idx in range(30):
                r = switch_routes[idx % len(switch_routes)]
                page.evaluate(f"location.hash = '{r}'")
                page.wait_for_timeout(40)
            page.goto(f"{base_url}/#/students", wait_until="networkidle")
            page.wait_for_timeout(150)
            dom_after = page.evaluate("() => document.querySelectorAll('*').length")
            heap_after = page.evaluate("() => performance.memory ? performance.memory.usedJSHeapSize : null")

            page.click("[data-act='student-new']")
            page.wait_for_selector("#modalForm")
            modal_count = page.locator("#modalForm").count()
            page.keyboard.press("Escape")

            report["long_list_perf"] = {
                "seed_200_students_ms": seed_ms,
                "list_render_ms": list_render_ms,
                "dom_nodes_before": dom_before,
                "dom_nodes_after_30_switches": dom_after,
                "heap_before_bytes": heap_before,
                "heap_after_bytes": heap_after,
                "modal_count_after_switches": modal_count,
            }
            record("no_duplicate_modal_after_30_switches", modal_count == 1)

            # 9. Invalid login error & rate limit check
            page.click("[data-act='logout']")
            page.wait_for_selector("#login:not([hidden])")
            expected_4xx_urls.add(f"{base_url}/api/login")
            for _ in range(6):
                page.fill("#u", "sup.browser")
                page.fill("#p", "WrongPass2026")
                page.click("#login button[type='submit']")
                page.wait_for_timeout(150)
            msg_text = page.locator("#loginMsg").inner_text()
            record("login_rate_limit_ui_msg", "锁定" in msg_text or "过多" in msg_text, msg_text)

            browser.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(data_dir, ignore_errors=True)

    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    run_audit()
