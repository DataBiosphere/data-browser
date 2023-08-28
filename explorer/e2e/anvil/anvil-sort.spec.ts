import { expect, test } from "@playwright/test";
import { anvilTabs, anvilTabTestOrder } from "./anvil-tabs";

test.setTimeout(90000);
test("Expect clicking the column header to change the first displayed entry in each column on each tab, except where all tabs have the same values", async ({
  page,
}) => {
  // For each tab
  for (const tabId of anvilTabTestOrder) {
    // Get the current tab, and go to it's URL
    const tab = anvilTabs[tabId];
    await page.goto(tab.url);
    // For each column
    for (
      let columnPosition = 0;
      columnPosition < tab.preselectedColumns.length;
      columnPosition++
    ) {
      // Get the column position, taking into account that some tabs start with a non-text first column
      if (tab.preselectedColumns[columnPosition].sortable) {
        const workColumnPosition: number = tab.emptyFirstColumn
          ? columnPosition + 1
          : columnPosition;
        // Locators for the first and last cells in a particular column position on the page
        const firstElementTextLocator = page
          .getByRole("rowgroup")
          .nth(1)
          .getByRole("row")
          .nth(0)
          .getByRole("cell")
          .nth(workColumnPosition);
        const lastElementTextLocator = page
          .getByRole("rowgroup")
          .nth(1)
          .getByRole("row")
          .last()
          .getByRole("cell")
          .nth(workColumnPosition);
        // Locator for the sort button
        const columnSortLocator = page
          .getByRole("columnheader", {
            name: tab.preselectedColumns[columnPosition].name,
          })
          .getByRole("button");
        // Expect the first and last cells to be visible
        await expect(firstElementTextLocator).toBeVisible();
        await expect(lastElementTextLocator).toBeVisible();
        // Get the first cell text
        const firstElementTextNoClick =
          await firstElementTextLocator.innerText();
        // Sort may do nothing if the first and last element are equal, so skip testing here
        if (
          (await lastElementTextLocator.innerText()) == firstElementTextNoClick
        ) {
          continue;
        }
        // Click to sort
        await columnSortLocator.click();
        await expect(firstElementTextLocator).toBeVisible();
        const firstElementTextFirstClick =
          await firstElementTextLocator.innerText();
        // Click again
        await columnSortLocator.click();
        // Expect the first cell to have changed after clicking sort
        await expect(firstElementTextLocator).toBeVisible();
        await expect(firstElementTextLocator).not.toHaveText(
          firstElementTextFirstClick
        );
        //await expect(firstElementTextLocator).toBeLessThanOrEqual( TODO: make this work, even though this function only works on numbers
        //  firstElementTextFirstClick
        //);

        //const newFirstElementText = await getFirstElementText(workColumnPosition);
      }
    }
  }
});
