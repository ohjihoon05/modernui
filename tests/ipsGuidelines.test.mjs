// src/utils/ipsGuidelines.ts · openwebuiClient.ts 의 순수 함수와 API 호출 형식을 확인한다.
// TS 파일은 저장소에 이미 있는 Vite의 ssrLoadModule로 읽는다(새 의존성 없음).
// 실행: npm install 후 node --test
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// 실제 .env를 읽지 않도록 빈 폴더를 envDir로 준다. 키가 필요할 때만 process.env로 넣는다.
async function loadModules({ apiKey } = {}) {
  const envDir = fs.mkdtempSync(path.join(os.tmpdir(), "modernui-env-"));
  const saved = process.env.VITE_OPENWEBUI_API_KEY;
  if (apiKey) process.env.VITE_OPENWEBUI_API_KEY = apiKey;
  else delete process.env.VITE_OPENWEBUI_API_KEY;
  const server = await createServer({
    root: ROOT,
    configFile: path.join(ROOT, "vite.config.ts"),
    envDir,
    logLevel: "silent",
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: "custom",
  });
  if (saved === undefined) delete process.env.VITE_OPENWEBUI_API_KEY;
  else process.env.VITE_OPENWEBUI_API_KEY = saved;
  const ips = await server.ssrLoadModule("/src/utils/ipsGuidelines.ts");
  return {
    ips,
    close: async () => { await server.close(); fs.rmSync(envDir, { recursive: true, force: true }); },
  };
}

function quiet(t) {
  // 대상 코드가 console.log/error로 진행을 찍는다. 테스트 출력이 지저분해지지 않게 막는다.
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "error", () => {});
}

test("ipsGuidelines (API 키 없음)", async (t) => {
  const { ips, close } = await loadModules();
  t.after(close);

  await t.test("inferComponentType: 키워드별 분류", () => {
    const cases = [
      ["Chamber pressure alarm", "alert"],
      ["온도 초과 경고", "alert"],
      ["Process status indicator", "status"],
      ["레시피 이름 입력", "input"],
      ["Chamber temperature reading", "measurement"],
      ["챔버 압력", "parameter"],
      ["Start button", "button"],
      ["Execute recipe", "action"],
      ["아무 키워드도 없는 문장", "button"],
    ];
    for (const [ctx, want] of cases) assert.equal(ips.inferComponentType(ctx), want, ctx);
  });

  await t.test("inferComponentType: 대소문자를 가리지 않는다", () => {
    assert.equal(ips.inferComponentType("ALARM"), "alert");
  });

  // 알려진 문제(2026-11-18 발견, 고치지 않고 남김): alert 판정이 includes('low')·includes('high')라서
  // "flow"가 들어간 문맥은 모두 alert가 된다. 그래서 유량(flow) parameter 분기에는 도달할 수 없다.
  await t.test("inferComponentType: 유량 설정은 parameter", { todo: "'flow'가 'low'에 걸려 alert로 분류됨" }, () => {
    assert.equal(ips.inferComponentType("Gas flow setpoint"), "parameter");
  });

  await t.test("inferSafetyLevel", () => {
    assert.equal(ips.inferSafetyLevel("Emergency stop"), "critical");
    assert.equal(ips.inferSafetyLevel("즉시 배기"), "critical");
    assert.equal(ips.inferSafetyLevel("High pressure detected"), "danger");
    assert.equal(ips.inferSafetyLevel("온도 초과"), "danger");
    assert.equal(ips.inferSafetyLevel("Caution: hot surface"), "warning");
    assert.equal(ips.inferSafetyLevel("Door interlock"), "blocked");
    assert.equal(ips.inferSafetyLevel("Start process"), undefined);
  });

  await t.test("inferUnitType", () => {
    assert.equal(ips.inferUnitType("Chamber temp"), "temperature");
    assert.equal(ips.inferUnitType("압력 설정"), "pressure");
    assert.equal(ips.inferUnitType("Gas flow"), "flow");
    assert.equal(ips.inferUnitType("RF 파워"), "power");
    assert.equal(ips.inferUnitType("전압"), "voltage");
    assert.equal(ips.inferUnitType("Heater current"), "current");
    assert.equal(ips.inferUnitType("Purge time"), "time");
    assert.equal(ips.inferUnitType("Spin rpm"), "rpm");
    assert.equal(ips.inferUnitType("레시피 이름"), undefined);
  });

  await t.test("validateIPSText: 네 범주를 순서대로 돌려준다", () => {
    const r = ips.validateIPSText("Start");
    assert.deepEqual(r.map((x) => x.category), ["accuracy", "clarity", "safety", "usability"]);
    for (const x of r) {
      assert.equal(x.score, 100);
      assert.equal(x.passed, true);
      assert.deepEqual(x.issues, []);
    }
  });

  await t.test("validateIPSText: 단위 없는 숫자는 정확성 감점", () => {
    const acc = ips.validateIPSText("Set to 450")[0];
    assert.equal(acc.score, 85);
    assert.equal(acc.issues.length, 1);
    assert.match(acc.issues[0].message, /"450"/);
    assert.equal(ips.validateIPSText("Set to 450 Torr")[0].score, 100);
    assert.equal(ips.validateIPSText("Set to 450°C")[0].score, 100);
  });

  await t.test("validateIPSText: 금지 표현은 하나당 20점 감점", () => {
    const clarity = ips.validateIPSText("잠시 후 약간 조절")[1];
    assert.equal(clarity.score, 60);
    assert.equal(clarity.passed, false);
    assert.equal(clarity.issues.filter((i) => i.type === "error").length, 2);
  });

  await t.test("validateIPSText: 안전 문구는 아이콘과 행동 동사가 있어야 한다", () => {
    const bad = ips.validateIPSText("Pressure exceeds limit")[2];
    // 아이콘 없음 30 + 행동 동사 없음 25 + 한계 초과인데 숫자 없음 15
    assert.equal(bad.score, 30);
    assert.equal(bad.issues.length, 3);
    const good = ips.validateIPSText("⚠️ Pressure 5 Torr exceeds limit 3 Torr. Stop and vent.")[2];
    assert.equal(good.score, 100);
    assert.deepEqual(good.issues, []);
  });

  await t.test("validateIPSText: 사용성(길이·혼용·비표준 용어)", () => {
    const u = ips.validateIPSText("공정 중단 Stop " + "x".repeat(100))[3];
    const msgs = u.issues.map((i) => i.message);
    assert.ok(msgs.some((m) => /too long/.test(m)));
    assert.ok(msgs.some((m) => /both Korean and English/.test(m)));
    assert.ok(msgs.some((m) => /"중단"/.test(m)));
    assert.equal(u.score, 85); // 길이 5 + 비표준 용어 10, 혼용은 감점 없음
  });

  await t.test("COMPONENT_TEMPLATES: id가 겹치지 않고 네 언어가 다 채워져 있다", () => {
    const T = ips.COMPONENT_TEMPLATES;
    assert.ok(T.length > 0);
    assert.equal(new Set(T.map((x) => x.id)).size, T.length);
    for (const tpl of T) {
      for (const k of ["name", "nameKo", "nameZh", "nameJa", "description", "descriptionKo", "descriptionZh", "descriptionJa"]) {
        assert.ok(tpl[k] && tpl[k].trim(), `${tpl.id}.${k}`);
      }
      const n = tpl.guidelines.length;
      for (const k of ["guidelinesKo", "guidelinesZh", "guidelinesJa"]) assert.equal(tpl[k].length, n, `${tpl.id}.${k}`);
      for (const ex of tpl.examples) {
        for (const k of ["text", "textKo", "textZh", "textJa", "context", "contextKo", "contextZh", "contextJa"]) {
          assert.ok(ex[k] && ex[k].trim(), `${tpl.id} 예시 ${k}`);
        }
      }
    }
  });

  await t.test("generateIPSText: 키가 없으면 fetch 없이 기본값을 돌려준다", async (t) => {
    quiet(t);
    const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("호출되면 안 됨"); });
    const r = await ips.generateIPSText({ context: "Start button" });
    assert.equal(fetchMock.mock.callCount(), 0);
    // getAPIConfig의 throw는 generateIPSTextWithAI 안에서 잡혀 fallback이 나온다.
    // generateIPSText 자신의 "API 키 확인" 안내 문구는 이 경로에서 나오지 않는다.
    assert.equal(r.text, "System");
    assert.deepEqual(r.appliedRules, ["Fallback: AI Error"]);
  });
});

test("openwebuiClient (API 키 있음, fetch는 가짜)", async (t) => {
  const { ips, close } = await loadModules({ apiKey: "test-key-123" });
  t.after(close);

  await t.test("요청 형식과 응답 파싱", async (t) => {
    quiet(t);
    const answer = {
      text: "Stop", textKo: "정지", textZh: "停止", textJa: "停止",
      explanation: "e", explanationKo: "k", explanationZh: "z", explanationJa: "j",
      appliedRules: ["Safety"],
    };
    const fetchMock = t.mock.method(globalThis, "fetch", async () => ({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "  " + JSON.stringify(answer) + "\n" } }] }),
    }));
    const r = await ips.generateIPSText({ context: "Emergency stop button", value: 3 });
    assert.deepEqual(r, answer);

    assert.equal(fetchMock.mock.callCount(), 1);
    const [url, init] = fetchMock.mock.calls[0].arguments;
    assert.equal(url, "https://api.openwebui.com/v1/chat/completions"); // .env.example의 기본값과 같음
    assert.equal(init.method, "POST");
    assert.equal(init.headers.Authorization, "Bearer test-key-123");
    const body = JSON.parse(init.body);
    assert.equal(body.model, "gpt-3.5-turbo");
    assert.equal(body.temperature, 0.3);
    assert.equal(body.max_tokens, 1000);
    assert.deepEqual(body.messages.map((m) => m.role), ["system", "user"]);
    // 문맥에서 추론한 값이 프롬프트에 들어간다
    assert.match(body.messages[1].content, /Component Type: button/);
    assert.match(body.messages[1].content, /Safety Level: critical/);
    assert.match(body.messages[1].content, /Value: 3/);
  });

  await t.test("빠진 필드는 기본값으로 채운다", async (t) => {
    quiet(t);
    t.mock.method(globalThis, "fetch", async () => ({
      ok: true,
      json: async () => ({ choices: [{ message: { content: JSON.stringify({ text: "Vent" }) } }] }),
    }));
    const r = await ips.generateIPSText({ context: "vent" });
    assert.equal(r.text, "Vent");
    assert.equal(r.textKo, "시스템");
    assert.deepEqual(r.appliedRules, ["Principle: AI Generation"]);
  });

  await t.test("HTTP 오류·JSON 아닌 응답은 fallback", async (t) => {
    quiet(t);
    t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 500, statusText: "ERR", text: async () => "boom" }));
    assert.deepEqual((await ips.generateIPSText({ context: "x" })).appliedRules, ["Fallback: AI Error"]);
    t.mock.restoreAll();
    quiet(t);
    t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: "not json" } }] }) }));
    assert.deepEqual((await ips.generateIPSText({ context: "x" })).appliedRules, ["Fallback: AI Error"]);
  });
});
