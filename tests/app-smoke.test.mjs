// 실제로 vite build를 한 결과물을 Chromium으로 열어, 네 화면이 콘솔 오류 없이 그려지는지 본다.
// 빌드 결과는 임시 폴더에 쓰고 끝나면 지운다(저장소의 dist/는 건드리지 않음).
// Playwright가 없는 PC에서는 건너뛴다(skip으로 표시됨).
// 실행: npm install 후 node --test
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "/modernui/"; // vite.config.ts의 base

let playwright = null;
try { playwright = createRequire(import.meta.url)("playwright"); } catch (e) { /* skip */ }

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml" };

function serve(dir) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    if (!url.startsWith(BASE)) { res.writeHead(404).end(); return; }
    let file = path.join(dir, url.slice(BASE.length));
    if (!file.startsWith(dir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dir, "index.html");
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

test("빌드 결과물 화면 확인", { skip: playwright ? false : "playwright를 찾지 못해 건너뜀" }, async (t) => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "modernui-dist-"));
  const envDir = fs.mkdtempSync(path.join(os.tmpdir(), "modernui-env-"));
  await build({ root: ROOT, configFile: path.join(ROOT, "vite.config.ts"), envDir, logLevel: "silent", build: { outDir, emptyOutDir: true } });
  const server = await serve(outDir);
  const browser = await playwright.chromium.launch();
  t.after(async () => {
    await browser.close();
    server.close();
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.rmSync(envDir, { recursive: true, force: true });
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url()); });
  await page.goto(`http://127.0.0.1:${server.address().port}${BASE}`);

  await t.test("첫 화면이 그려진다", async () => {
    await page.getByRole("button", { name: /AI Text Generation/ }).first().waitFor();
    assert.ok((await page.locator("#root").innerText()).length > 0);
  });

  for (const label of ["Content Management", "Text Validation", "Template Gallery", "AI Text Generation"]) {
    await t.test(`사이드바 "${label}"로 이동해도 오류가 없다`, async () => {
      await page.getByRole("button", { name: new RegExp(label) }).first().click();
      await page.waitForTimeout(200);
      assert.deepEqual(errors, []);
    });
  }

  await t.test("실패한 자원 요청이 없다", () => {
    assert.deepEqual(failed, []);
  });
});
