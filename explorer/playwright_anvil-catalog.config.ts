import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  expect: {
    timeout: 10 * 1000,
  },
  testDir: "e2e",
  testMatch: /.*\/(general|anvil-catalog)\/.*\.spec\.ts/,
  use: {
    baseURL: "http://localhost:3000/explore/",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev:anvil-catalog",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    url: "http://localhost:3000/explore/",
  },
};
export default config;
