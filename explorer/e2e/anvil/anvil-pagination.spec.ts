import { expect, test } from "@playwright/test";
import { anvilTabs } from "./anvil-tabs";

const pageCountRegex = /Page [0-9]+ of [0-9]+/;
const BackButtonTestID = "WestRoundedIcon";
const ForwardButtonTestID = "EastRoundedIcon";

test.beforeEach(async ({ page }) => {
  // Navigate to the Donors page
  await page.goto(anvilTabs.donors.url);
  await expect(
    page.getByRole("tab").getByText(anvilTabs.donors.tabName)
  ).toBeVisible();
});

test("Check first page has disabled back and enabled forward pagination buttons on Donors Page", async ({
  page,
}) => {
  // Should start on first page
  await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  // Forward button should start enabled
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(ForwardButtonTestID) })
  ).toBeEnabled();
  // Back Button should start disabled
  await expect(
    page.getByRole("button").filter({ has: page.getByTestId(BackButtonTestID) })
  ).toBeDisabled();
});

test("Check that forward pagination increments the current page and that page count stays static for the first five pages on the donors tab", async ({
  page,
}) => {
  test.setTimeout(500000);
  // Should start on first page, and there should be multiple pages available
  await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  await expect(page.getByText(pageCountRegex, { exact: true })).not.toHaveText(
    "Page 1 of 1"
  );

  // Detect number of pages
  const SplitStartingPageText = (
    await page.getByText(pageCountRegex, { exact: true }).innerText()
  ).split(" ");
  const max_pages = parseInt(
    SplitStartingPageText[SplitStartingPageText.length - 1]
  );
  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(ForwardButtonTestID) })
      .click();
    // Expect the page count to have incremented
    await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
      `Page ${i} of ${max_pages}`
    );
  }
  // Expect to be on the last page
  await expect(page.getByText(pageCountRegex, { exact: true })).toContainText(
    `Page ${max_pages} of ${max_pages}`
  );
  // Expect the back button to be enabled on the last page
  await expect(
    page.getByRole("button").filter({ has: page.getByTestId(BackButtonTestID) })
  ).toBeEnabled();
  // Expect the forward button to be disabled
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(ForwardButtonTestID) })
  ).toBeDisabled();
});
