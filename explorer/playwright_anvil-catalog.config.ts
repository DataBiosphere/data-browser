import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  expect: {
    timeout: 20 * 1000,
  },
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
  testMatch: /.*\/(anvil-catalog)\/.*\.spec\.ts/,
  use: {
    baseURL: "http://localhost:3000/",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev:anvil-catalog",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    url: "http://localhost:3000/data",
  },
};
export default config;
