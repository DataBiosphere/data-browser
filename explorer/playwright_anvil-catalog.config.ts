import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  expect: {
    timeout: 15 * 1000,
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
    command:
      "npm run build-dev:anvil-catalog && mv ./out/ ./out_temp && mkdir ./out && mv ./out_temp ./out/data && npm start",
    reuseExistingServer: !process.env.CI,
    timeout: 240 * 1000,
    url: "http://localhost:3000/data",
  },
};
export default config;
