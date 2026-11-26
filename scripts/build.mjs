import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });

// 业务后端按 src/server/parts/ 下的片段（文件名数字前缀排序）原样首尾相接，
// 再与 ai.js、entry.js 用换行拼接。三者共享同一词法作用域，不能改成独立 import。
// 片段之间不插入任何字符：只搬代码时，dist/_worker.js 必须与搬之前逐字节相同（npm run bundle:hash）。
const partsDir = "src/server/parts/";
const partNames = (await readdir(partsDir)).filter(name => name.endsWith(".js")).sort();
let application = "";
for (const name of partNames) application += await readFile(partsDir + name, "utf8");

const sections = [application];
for (const name of ["ai", "entry"]) sections.push(await readFile("src/server/" + name + ".js", "utf8"));
await writeFile("dist/_worker.js", sections.join("\n"));
console.log("已生成独立申请系统 Pages 包目录 dist/");
