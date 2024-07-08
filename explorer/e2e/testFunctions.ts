import { expect, Locator, Page } from "@playwright/test";
import { anvilFilters, anvilTabs, anvilTabTestOrder } from "./anvil/anvil-tabs";
import { TabDescription } from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
// Run the "Expect each tab to appear as selected when the corresponding url is accessed" test

const getFirstElementTextLocator = (
  page: Page,
  workColumnPosition: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(0)
    .getByRole("cell")
    .nth(workColumnPosition);
};

export async function testUrl(
  page: Page,
  tab: TabDescription,
  otherTabs: TabDescription[]
): Promise<void> {
  await page.goto(tab.url);
  await expect(
    page.getByRole("tab").getByText(tab.tabName, { exact: true })
  ).toHaveAttribute("aria-selected", "true", { timeout: 25000 });
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
  await expect(
    page
      .getByRole("rowgroup")
      .nth(1)
      .getByRole("row")
      .nth(1)
      .getByRole("cell")
      .nth(1)
  ).toBeVisible();
  await page.getByRole("tab").getByText(tab.tabName, { exact: true }).click();
  await expect(page).toHaveURL(tab.url, { timeout: 25000 }); // Long timeout because some tabs take a long time to load
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

export async function testSortAzul(
  page: Page,
  tab: TabDescription
): Promise<void> {
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
      // Locator for the sort buttonf
      const columnSortLocator = page
        .getByRole("columnheader", {
          exact: true,
          name: tab.preselectedColumns[columnPosition].name,
        })
        .getByRole("button");

      // Expect the first and last cells to be visible and have text
      await expect(firstElementTextLocator).toBeVisible();
      await expect(lastElementTextLocator).toBeVisible();
      await expect(firstElementTextLocator).not.toHaveText("");
      await expect(lastElementTextLocator).not.toHaveText("");
      // Click to sort
      await columnSortLocator.click();
      // Expect the first and last cell to still have text after clicking sort
      await expect(firstElementTextLocator).not.toHaveText("");
      await expect(lastElementTextLocator).not.toHaveText("");
      // Click again
      await columnSortLocator.click();
      // Expect the first and last cell to still have text after clicking sort
      await expect(firstElementTextLocator).not.toHaveText("");
      await expect(lastElementTextLocator).not.toHaveText("");
    }
  }
}

export async function testSortCatalog(
  page: Page,
  tab: TabDescription
): Promise<void> {
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
      // Locator for the sort button
      const columnSortLocator = page
        .getByRole("columnheader", {
          exact: true,
          name: tab.preselectedColumns[columnPosition].name,
        })
        .getByRole("button");

      await expect(firstElementTextLocator).toBeVisible();

      // Click to sort
      await columnSortLocator.click();
      // Expect the first and cells to still be visible
      await expect(firstElementTextLocator).toBeVisible();
      // Click again
      await columnSortLocator.click();
      // Expect the first cell to have changed after clicking sort
      await expect(firstElementTextLocator).toBeVisible();
      await expect(firstElementTextLocator).not.toHaveText("");
    }
  }
}

export async function testSelectableColumns(
  page: Page,
  tab: TabDescription
): Promise<void> {
  await page.goto(tab.url);
  await page.getByRole("button").getByText("Edit Columns").click();
  await expect(page.getByRole("menu")).toBeVisible();
  for (const column of tab.selectableColumns) {
    const checkboxLocator = page
      .getByRole("menu")
      .locator("*")
      .filter({
        has: page
          .locator("*")
          .filter({ has: page.getByText(column.name, { exact: true }) }),
      })
      .getByRole("checkbox");
    await expect(checkboxLocator).toBeEnabled();
    await expect(checkboxLocator).not.toBeChecked();
    await checkboxLocator.click();
    await expect(checkboxLocator).toBeChecked();
  }
  await page.getByRole("document").click();
  await expect(page.getByRole("menu")).not.toBeVisible();
  await expect(page.getByRole("columnheader")).toContainText(
    tab.selectableColumns.map((x) => x.name)
  );
}

export async function testPreSelectedColumns(
  page: Page,
  tab: TabDescription
): Promise<void> {
  await page.goto(tab.url);
  await page.getByRole("button").getByText("Edit Columns").click();
  await expect(page.getByRole("menu")).toBeVisible();
  for (const column of tab.preselectedColumns) {
    const checkboxLocator = page
      .getByRole("menu")
      .locator("*")
      .filter({
        has: page
          .locator("*")
          .filter({ has: page.getByText(column.name, { exact: true }) }),
      })
      .getByRole("checkbox");
    await expect(checkboxLocator).toBeDisabled();
    await expect(checkboxLocator).toBeChecked();
  }
}

const filter_regex = (filter: string): RegExp =>
  new RegExp(filter + "\\s+\\([0-9]+\\)\\s*");

export async function testFilterPresence(
  page: Page,
  tab: TabDescription
): Promise<void> {
  await page.goto(tab.url);
  await expect(page.getByRole("tab").getByText(tab.tabName)).toBeVisible();
  await page.getByText(filter_regex(anvilFilters[3])).click(); // maybe should select a random one instead;
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  await page.getByRole("checkbox").first().click();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await page.locator("body").click();
  for (const blah of anvilTabTestOrder) {
    console.log(blah);
    await page.getByRole("tab").getByText(anvilTabs[blah].tabName).click();
    await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
    await expect(page.getByText(filter_regex(anvilFilters[3]))).toBeVisible();
    await page.getByText(filter_regex(anvilFilters[3])).click();
    await expect(page.getByRole("checkbox").first()).toBeChecked();
    await page.locator("body").click();
  }
}

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
