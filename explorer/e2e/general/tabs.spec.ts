import { expect, test } from "@playwright/test";

test.setTimeout(60000);
test("Navigate through each tab, expecting them to render a table and change the url", async ({
  page,
}) => {
  // Go to the front page
  await page.goto("http://localhost:3000/explore");
  // Wait for the page to load
  await expect(page.locator("_react=TableComponent")).toBeVisible({
    timeout: 20000,
  });
  const NumTabs = (await page.$$("_react=Tabs >> button")).length;
  // Go through the tabs, from back to front
  for (let i = 0; i < NumTabs; i++) {
    const CurrentTabNumber = NumTabs - i - 1;
    const CurrentTabLocator = page.locator(
      `_react=Tabs >> button >> nth=${CurrentTabNumber}`
    );
    const currentUrl = page.url();
    // Check that the next tab is not selected
    await expect(CurrentTabLocator).toHaveAttribute("aria-selected", "false");
    await expect(CurrentTabLocator).not.toHaveClass(/Mui-selected/);
    // Click the next tab
    await CurrentTabLocator.click();
    // Check that the next tab is selected
    await expect(CurrentTabLocator).toHaveAttribute("aria-selected", "true", {
      timeout: 10000,
    });
    await expect(CurrentTabLocator).toHaveClass(/Mui-selected/);
    // Check that the next page has changes
    await expect(page).not.toHaveURL(currentUrl, { timeout: 20000 });
  }
});
