import { expect, test } from "@playwright/test";

const PaginationSelector = "_react=Pagination";
const BackButtonSelector = "data-testid=WestRoundedIcon";
const ForwardButtonSelector = "data-testid=EastRoundedIcon";

test.beforeEach(async ({ page }) => {
  // Navigate to the BioSamples page
  await page.goto("/explore/");
  await page.locator("text=BioSamples").click();
  await expect(page).toHaveURL("/explore/biosamples", { timeout: 10000 });
  await expect(page.locator("text=Biosample Id")).toBeVisible();
});

test("Check first page has correct buttons", async ({ page }) => {
  // Should start on first page
  await expect(page.locator(PaginationSelector)).toContainText("Page 1 of ");
  // Back Button should start disabled
  await expect(page.locator(BackButtonSelector).locator("..")).toBeDisabled();
  // Forward button should start enabled
  await expect(page.locator(ForwardButtonSelector).locator("..")).toBeEnabled();
});

test("Check last page has correct buttons and that forward pagination increases the page count", async ({
  page,
}) => {
  // Should start on first page, and there should be multiple pages available
  await expect(page.locator(PaginationSelector)).toContainText("Page 1 of ");
  await expect(page.locator(PaginationSelector)).not.toHaveText("Page 1 of 1");

  // Detect number of pages
  const SplitStartingPageText = (
    await page.locator(PaginationSelector).innerText()
  ).split(" ");
  const max_pages = parseInt(
    SplitStartingPageText[SplitStartingPageText.length - 1]
  );
  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
    await page.locator(ForwardButtonSelector).click();
    // Expect the page count to have incremented
    await expect(page.locator(PaginationSelector)).toContainText(
      `Page ${i} of ${max_pages}`
    );
  }
  // Expect to be on the last page
  await expect(page.locator(PaginationSelector)).toContainText(
    `Page ${max_pages} of ${max_pages}`
  );
  // Expect the back button to be enabled on the last page
  await expect
    .soft(page.locator(BackButtonSelector).locator(".."))
    .toBeEnabled();
  // Expect the forward button to be disabled
  await expect
    .soft(page.locator(ForwardButtonSelector).locator(".."))
    .toBeDisabled();
});
