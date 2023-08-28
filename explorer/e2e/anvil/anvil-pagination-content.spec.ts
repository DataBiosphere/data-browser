import { expect, test } from "@playwright/test";

const PaginationSelector = "_react=Pagination";
const BackButtonTestID = "WestRoundedIcon";
const ForwardButtonTestID = "EastRoundedIcon";

test.setTimeout(90000);
test("Check forward and backwards pagination causes the ", async ({ page }) => {
  // Navigate to the BioSamples page
  await page.goto("/explore/biosamples");
  await expect(page.locator("text=Biosample Id")).toBeVisible();

  const firstElementTextLocator = page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(0)
    .getByRole("cell")
    .nth(0);

  // Should start on first page
  await expect(page.locator(PaginationSelector)).toContainText("Page 1 of ");
  const max_pages = 5;
  const FirstTableEntries = [];

  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
    const OriginalFirstTableEntry = await firstElementTextLocator.innerText();
    // Click the next button
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(ForwardButtonTestID) })
      .click();
    // Expect the page count to have incremented
    await expect(page.locator(PaginationSelector)).toContainText(
      `Page ${i} of `
    );
    // Expect the back button to be enabled
    await expect(
      page
        .getByRole("button")
        .filter({ has: page.getByTestId(BackButtonTestID) })
    ).toBeEnabled();
    // Expect the forwards button to be enabled
    if (i != max_pages) {
      await expect(
        page
          .getByRole("button")
          .filter({ has: page.getByTestId(ForwardButtonTestID) })
      ).toBeEnabled();
    }
    // Expect the first entry to have changed on the new page
    await expect(firstElementTextLocator).not.toHaveText(
      OriginalFirstTableEntry
    );
    // Remember the first entry
    FirstTableEntries.push(OriginalFirstTableEntry);
  }

  // Paginate backwards
  for (let i = 0; i < max_pages - 1; i++) {
    const OldFirstTableEntry = FirstTableEntries[max_pages - i - 2];
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(BackButtonTestID) })
      .click();
    // Expect page number to be correct
    await expect(page.locator(PaginationSelector)).toContainText(
      `Page ${max_pages - i - 1} of `
    );
    // Expect page entry to be consistent with forward pagination
    await expect(firstElementTextLocator).toHaveText(OldFirstTableEntry);
  }
});
