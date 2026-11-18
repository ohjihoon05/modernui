
  # Modern Web Dashboard UI

  This is a code bundle for Modern Web Dashboard UI. The original project is available at https://www.figma.com/design/TwsbbnAsUxuvXJ1wamh3cX/Modern-Web-Dashboard-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## 테스트

  `npm i` 다음에 `node --test`로 돌려요. `src/utils/ipsGuidelines.ts`의 추론·검증 함수와 OpenWebUI 요청 형식(가짜 fetch)을 확인하고, Playwright가 깔린 PC에서는 빌드 결과물을 Chromium으로 열어 네 화면이 오류 없이 그려지는지도 봐요. Playwright가 없으면 그 부분만 건너뛰어요.
