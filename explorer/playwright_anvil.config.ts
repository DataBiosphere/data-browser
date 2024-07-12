import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
const config: PlaywrightTestConfig = {
  expect: {
    timeout: 15 * 1000,
  },
  fullyParallel: true,
  outputDir: "playwright-report/",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  testDir: "e2e",
  testMatch: /.*\/(anvil)\/.*\.spec\.ts/,
  timeout: 60 * 1000,
  use: {
    baseURL: "http://localhost:3000/",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run build-cc-dev:anvil-cmg && npm start",
    reuseExistingServer: !process.env.CI,
    timeout: 240 * 1000,
    url: "http://localhost:3000/",
  },
  workers: 1,
};
export default config;
