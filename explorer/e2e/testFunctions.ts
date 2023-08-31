import { expect, Page } from "@playwright/test";
import { TabDescription } from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
// Run the "Expect each tab to appear as selected when the corresponding url is accessed" test
export async function testUrl(
  page: Page,
  tab: TabDescription,
  otherTabs: TabDescription[]
): Promise<void> {
  await page.goto(tab.url);
  await expect(page.getByRole("tab").getByText(tab.tabName)).toHaveAttribute(
    "aria-selected",
    "true",
    { timeout: 15000 }
  );
  for (const otherTab of otherTabs) {
    if (otherTab.tabName !== tab.tabName) {
      await expect(
        page.getByRole("tab").getByText(otherTab.tabName)
      ).toHaveAttribute("aria-selected", "false");
    }
  }
}

// Run the "Expect each tab to become selected, to go to the correct url, and to show all of its columns when selected" test
export async function testTab(page: Page, tab: TabDescription): Promise<void> {
  await page.getByRole("tab").getByText(tab.tabName).click();
  await expect(page).toHaveURL(tab.url, { timeout: 10000 });
  await expect(page.getByRole("tab").getByText(tab.tabName)).toHaveAttribute(
    "aria-selected",
    "true"
  );
  if (tab.emptyFirstColumn) {
    await expect(page.getByRole("columnheader")).toHaveText(
      [" "].concat(tab.preselectedColumns.map((x) => x.name))
    );
  } else {
    await expect(page.getByRole("columnheader")).toHaveText(
      tab.preselectedColumns.map((x) => x.name)
    );
  }
}

export async function testSort(page: Page, tab: TabDescription): Promise<void> {
  // Get the current tab, and go to it's URL
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
          exact: true,
          name: tab.preselectedColumns[columnPosition].name,
        })
        .getByRole("button");
      const getFirstElementText: () => Promise<string> = async () => {
        await firstElementTextLocator.hover();
        await page.waitForTimeout(500); //TODO: figure out alternative to this
        let firstElementTextNoClick: string;
        const firstElementHasTooltip =
          (await page.getByRole("tooltip").count()) > 0;
        if (firstElementHasTooltip) {
          firstElementTextNoClick =
            (await page.getByRole("tooltip").textContent()) ?? "";
        } else {
          firstElementTextNoClick = await firstElementTextLocator.innerText();
        }
        return firstElementTextNoClick;
      };

      // Expect the first and last cells to be visible
      await expect(firstElementTextLocator).toBeVisible();
      await expect(lastElementTextLocator).toBeVisible();
      // Get the first cell text
      const firstElementTextNoClick = await getFirstElementText();
      //console.log(
      //  await firstElementTextLocator.getAttribute("aria-labelledby")
      //);
      // Sort may do nothing if the first and last element are equal, so skip testing here TODO: ideally this should happen after first click on catalogs
      if (
        (await lastElementTextLocator.innerText()) == firstElementTextNoClick
      ) {
        continue;
      }
      // Click to sort
      await columnSortLocator.click();
      await expect(firstElementTextLocator).toBeVisible();
      const firstElementTextFirstClick = await getFirstElementText();
      // Click again
      await columnSortLocator.click();
      // Expect the first cell to have changed after clicking sort
      //TODO: determine whether a tooltip appears or not
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

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
