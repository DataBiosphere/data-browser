import { expect, Locator, Page } from "@playwright/test";
import { TabDescription } from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
// Run the "Expect each tab to appear as selected when the corresponding url is accessed" test

export const getFirstElementTextLocator = (
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
      const firstElementTextLocator = getFirstElementTextLocator(
        page,
        workColumnPosition
      );
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
      const firstElementTextLocator = getFirstElementTextLocator(
        page,
        workColumnPosition
      );
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

export const filterRegex = (filter: string): RegExp =>
  new RegExp(filter + "\\s+\\([0-9]+\\)\\s*");

export async function testFilterPresence(
  page: Page,
  tab: TabDescription,
  filters: string[]
): Promise<void> {
  // Goto the selected tab
  await page.goto(tab.url);
  await expect(page.getByRole("tab").getByText(tab.tabName)).toBeVisible();
  for (const filter of filters) {
    // Check that each filter is visible and clickable
    await expect(page.getByText(filterRegex(filter))).toBeVisible();
    await page.getByText(filterRegex(filter)).click();
    await expect(page.getByRole("checkbox").first()).toBeVisible();
    await expect(page.getByRole("checkbox").first()).not.toBeChecked();
    // Check that clicking out of the filter menu causes it to disappear
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  }
}

export const getNamedFilterButton = (
  page: Page,
  filterName: string
): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox"), hasText: filterName });
};
export const getFirstFilterButton = (page: Page): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .first();
};

export async function testFilterPersistence(
  page: Page,
  testFilter: string,
  tabOrder: TabDescription[]
): Promise<void> {
  // Start on the first tab in the test order (should be files)
  await page.goto(tabOrder[0].url);
  // Select the first checkbox on the test filter
  await page.getByText(filterRegex(testFilter)).click();
  const to_select = await getFirstFilterButton(page);
  await expect(to_select.getByRole("checkbox")).not.toBeChecked();
  await to_select.getByRole("checkbox").setChecked(true);
  const filterName = (await to_select.innerText()).split("\n")[0]; //MAY NEED TO ADD SOME CHECKING MECHANISM HERE
  await expect(to_select.getByRole("checkbox")).toBeChecked();
  await page.locator("body").click();
  // Expect at least some text to still be visible
  await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
  // For each tab, check that the selected filter is still checked
  for (const tab of tabOrder.slice(1)) {
    await page.getByRole("tab").getByText(tab.tabName).click();
    await expect(page.getByText(filterRegex(testFilter))).toBeVisible();
    await page.getByText(filterRegex(testFilter)).click();
    const previously_selected = getNamedFilterButton(page, filterName);
    await expect(previously_selected.getByRole("checkbox")).toBeChecked();
    await page.locator("body").click();
  }
  // Return to the start tab and confirm that the filter stays checked and that some content is visible
  await page.getByRole("tab").getByText(tabOrder[0].tabName).click();
  await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
  await page.getByText(filterRegex(testFilter)).click();
  const previously_selected = getFirstFilterButton(page);
  await expect(previously_selected).toContainText(filterName, {
    useInnerText: true,
  });
  await expect(previously_selected.getByRole("checkbox").first()).toBeChecked();
}

export async function testFilterCounts(
  page: Page,
  tab: TabDescription,
  filters: string[],
  elements_per_page: number
): Promise<void> {
  await page.goto(tab.url);
  // For each arbitrarily selected filter
  for (const filter of filters) {
    // Select the filter
    await page.getByText(filterRegex(filter)).click();
    // Get the number associated with the first filter button, and select it
    const filter_button = getFirstFilterButton(page);
    const filterNumber = Number(
      (await filter_button.innerText()).split("\n")[1]
    );
    await filter_button.getByRole("checkbox").setChecked(true);
    //
    await page.locator("body").click();
    const firstNumber =
      filterNumber <= elements_per_page ? filterNumber : elements_per_page;
    await expect(
      page.getByText("Results 1 - " + firstNumber + " of " + filterNumber)
    ).toBeVisible();
  }
}

export async function testFilterBubbles(
  page: Page,
  tab: TabDescription,
  filters: string[]
): Promise<void> {
  page.goto(tab.url);
  for (const filter of filters) {
    await page.getByText(filterRegex(filter)).click();
    const firstFilterButton = getFirstFilterButton(page);
    const firstFilterName = (await firstFilterButton.innerText()).split(
      "\n"
    )[0];
    await firstFilterButton.getByRole("checkbox").setChecked(true);
    await page.locator("body").click();
    const filterBlueButton = page
      .getByRole("button")
      .getByText(firstFilterName);
    await expect(filterBlueButton).toBeVisible();
    await filterBlueButton.click();
    await expect(filterBlueButton).toHaveCount(0);
  }
}
/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
