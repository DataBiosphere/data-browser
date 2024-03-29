import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  expect: {
    timeout: 10 * 1000,
  },
  testDir: "e2e",
  testMatch: /.*\/(anvil)\/.*\.spec\.ts/,
  timeout: 60 * 1000,
  use: {
    baseURL: "http://localhost:3000/",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev:anvil-cmg",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    url: "http://localhost:3000/explore",
  },
};
export default config;
