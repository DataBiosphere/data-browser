import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  testDir: "e2e",
  use: {
    baseURL: "http://localhost:3000/explore/",
  },
};
export default config;
