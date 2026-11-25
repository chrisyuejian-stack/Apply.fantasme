import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
const parts = [];
for (const name of ["application", "ai", "entry"]) {
  parts.push(await readFile("src/server/" + name + ".js", "utf8"));
}
await writeFile("dist/_worker.js", parts.join("\n"));
console.log("已生成独立申请系统 Pages 包目录 dist/");
