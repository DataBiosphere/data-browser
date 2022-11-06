import { expect, test } from "@playwright/test";
/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

test("Expect workspaces url to go to workspaces tab", async ({ page }) => {
  await page.goto("/explore/workspaces");
  await expect(
    page.locator("_react=Tabs >> button >> text='Workspaces'")
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.locator("text='Terra Workspace Name' >> nth=0")
  ).toBeVisible();
});

test("Expect studies url to go to studies tab", async ({ page }) => {
  await page.goto("/explore/studies");
  await expect(
    page.locator("_react=Tabs >> button >> text='Studies'")
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("text='Study Design' >> nth=0")).toBeVisible();
});

test("Expect consortia url to go to consortia tab", async ({ page }) => {
  await page.goto("/explore/consortia");
  await expect(
    page.locator("_react=Tabs >> button >> text='Consortia'")
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("text='Study Design' >> nth=0")).toBeVisible();
});

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
