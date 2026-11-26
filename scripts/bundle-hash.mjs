// 打印构建产物的 sha256。只搬代码的 PR 必须在描述中给出搬迁前后的值且二者相同。
// 用法：npm run bundle:hash [-- --expect=<worker 的 sha256>]
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
const hash = async path => createHash("sha256").update(await readFile(path)).digest("hex");
const files = ["dist/_worker.js", ...(await readdir("dist/apply/app")).filter(n => n.endsWith(".js") || n.endsWith(".css")).sort().map(n => "dist/apply/app/" + n)];
const results = {};
for (const file of files) results[file] = await hash(file);
for (const [file, value] of Object.entries(results)) console.log(value + "  " + file);
const expect = process.argv.find(arg => arg.startsWith("--expect="))?.slice(9);
if (expect && expect !== results["dist/_worker.js"]) {
  console.error(`dist/_worker.js 哈希不一致：期望 ${expect}，实际 ${results["dist/_worker.js"]}`);
  process.exit(1);
}
