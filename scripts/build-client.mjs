// 前端主应用源码在 src/client/app/parts/（按文件名数字前缀排序、原样首尾相接，单个 IIFE 共享作用域）。
// 生成 public/apply/app/app.js 并提交；tests/client-parts.test.mjs 保证二者一致。
// 用法：改完片段后运行 npm run build:client，再提交两边。不要直接改 public/apply/app/app.js。
import { readdir, readFile, writeFile } from "node:fs/promises";
const dir = "src/client/app/parts/";
let out = "";
for (const name of (await readdir(dir)).filter(name => name.endsWith(".js")).sort()) out += await readFile(dir + name, "utf8");
await writeFile("public/apply/app/app.js", out);
console.log("已由 src/client/app/parts/ 生成 public/apply/app/app.js");
