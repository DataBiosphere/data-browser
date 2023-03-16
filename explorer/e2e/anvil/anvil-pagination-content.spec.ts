import { expect, test } from "@playwright/test";

const PaginationSelector = "_react=Pagination";
const BackButtonSelector = "data-testid=WestRoundedIcon";
const ForwardButtonSelector = "data-testid=EastRoundedIcon";

test.setTimeout(90000);
test("Check forward and backwards pagination causes values to change", async ({
  page,
}) => {
  // Navigate to the BioSamples page
  await page.goto("/explore/");
  await page.locator("text=BioSamples").click();
  await expect(page).toHaveURL("/explore/biosamples", { timeout: 10000 });
  await expect(page.locator("text=Biosample Id")).toBeVisible();

  const TestThreePageText = await page.locator(PaginationSelector).innerText();
  // Should start on first page
  await expect(page.locator(PaginationSelector)).toContainText("Page 1 of ");
  const SplitStartingPageText = TestThreePageText.split(" ");
  const max_pages = parseInt(
    SplitStartingPageText[SplitStartingPageText.length - 1]
  );

  const FirstTableEntries = [];

  // Paginate forwards
  const FirstTableEntrySelector = "_react=TableComponent >> td >> nth=0";
  for (let i = 2; i < max_pages + 1; i++) {
    const OriginalFirstTableEntry = await page
      .locator(FirstTableEntrySelector)
      .innerText();
    // Click the next button
    await page.locator(ForwardButtonSelector).click();
    // Expect the page count to have incremented
    await expect(page.locator(PaginationSelector)).toContainText(
      `Page ${i} of ${max_pages}`
    );
    // Expect the back button to be enabled
    await expect
      .soft(page.locator(BackButtonSelector).locator(".."))
      .toBeEnabled();
    // Expect the forwards button to be enabled
    if (i != max_pages) {
      await expect(
        page.locator(ForwardButtonSelector).locator("..")
      ).toBeEnabled();
    }
    // Expect the first entry to have changed on the new page
    await expect(page.locator(FirstTableEntrySelector)).not.toHaveText(
      OriginalFirstTableEntry
    );
    // Remember the first entry
    FirstTableEntries.push(OriginalFirstTableEntry);
  }

  // Paginate backwards
  for (let i = 0; i < max_pages - 1; i++) {
    const OldFirstTableEntry = FirstTableEntries[max_pages - i - 2];
    await page.locator(BackButtonSelector).click();
    // Expect page number to be correct
    await expect(page.locator(PaginationSelector)).toContainText(
      `Page ${max_pages - i - 1} of ${max_pages}`
    );
    // Expect page entry to be consistent with forward pagination
    await expect(page.locator(FirstTableEntrySelector)).toHaveText(
      OldFirstTableEntry
    );
  }
});
