import { expect, Locator, Page } from "@playwright/test";
import { TabDescription } from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

/**
 * Get a locator to the cell in the first row's nth column
 * @param page - a Playwright page object
 * @param columnIndex - the zero-indexed column to return
 * @returns a Playwright locator object to the selected cell
 **/
export const getFirstRowNthColumnCellLocator = (
  page: Page,
  columnIndex: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(0)
    .getByRole("cell")
    .nth(columnIndex);
};

/**
 * Tests that the tab url goes to a valid page and that the correct tab (and only
 * the correct tab) appears selected
 * @param page - a Playwright page object
 * @param tab - the Tab object to check
 * @param otherTabs - an array of the other Tab objects for this configuration
 */
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
/**
 * Checks that all preselected columns listed in the tab object are visible in the correct order
 * @param page - a Playwright page object
 * @param tab - the tab object to test
 */
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

/**
 * Checks that sorting the tab does not cause the first and last row to break.
 * This test does not check whether the sort order is correct.
 * This test assumes that this is an Azul explorer with pagination rather than
 * a catalog, so that the last element is visible without excessive scrolling.
 * @param page - a Playwright page object
 * @param tab - the tab to check
 */
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
      const columnIndex: number = tab.emptyFirstColumn
        ? columnPosition + 1
        : columnPosition;
      // Locators for the first and last cells in a particular column position on the page
      const firstElementTextLocator = getFirstRowNthColumnCellLocator(
        page,
        columnIndex
      );
      const lastElementTextLocator = page
        .getByRole("rowgroup")
        .nth(1)
        .getByRole("row")
        .last()
        .getByRole("cell")
        .nth(columnIndex);
      // Locator for the sort button for the tab
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

/**
 * Checks that sorting the tab does not cause the first row of the table to break.
 * This test does not check whether the sort order is correct.
 * This test assumes that this is a catalog explorer without pagination,
 * so it only checks the first element of the table.
 * @param page - a Playwright page object
 * @param tab - the tab to check
 */
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
      const columnIndex: number = tab.emptyFirstColumn
        ? columnPosition + 1
        : columnPosition;
      // Locators for the first and last cells in a particular column position on the page
      const firstElementTextLocator = getFirstRowNthColumnCellLocator(
        page,
        columnIndex
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
      // Expect the first cell to still be visible
      await expect(firstElementTextLocator).toBeVisible();
      // Click again
      await columnSortLocator.click();
      // Expect the first cell to have changed after clicking sort
      await expect(firstElementTextLocator).toBeVisible();
      await expect(firstElementTextLocator).not.toHaveText("");
    }
  }
}

/**
 * Check that all of the selectable columns specified in the tab object
 * are initially not selected in the "Edit Columns" menu, and that selecting
 * them causes them to appear in the correct order
 * @param page - a Playwright page object
 * @param tab - the tab object to check
 */
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

/**
 * Checks that the preselected columns specified in the tab object appear
 * in the "Edit Columns" menu and that their checkbox is checked and disabled
 * @param page - the Playwright page object
 * @param tab - the tab object to test
 */
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

/**
 * Returns a regex that matches the sidebar filter buttons
 * This is useful for selecting a filter from the sidebar
 * @param filterName - the name of the filter to match
 * @returns a regular expression matching "[filterName] ([n])"
 */
export const filterRegex = (filterName: string): RegExp =>
  new RegExp(filterName + "\\s+\\([0-9]+\\)\\s*");

/**
 * Checks that each filter specified in filterNames is visible and can be
 * selected on the specified tab
 * @param page - a Playwright page object
 * @param tab - the tab to check
 * @param filterNames - the names of the filters who whose existence should be tested for
 */
export async function testFilterPresence(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  // Goto the selected tab
  await page.goto(tab.url);
  await expect(page.getByRole("tab").getByText(tab.tabName)).toBeVisible();
  for (const filterName of filterNames) {
    // Check that each filter is visible and clickable
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    await page.getByText(filterRegex(filterName)).click();
    await expect(page.getByRole("checkbox").first()).toBeVisible();
    await expect(page.getByRole("checkbox").first()).not.toBeChecked();
    // Check that clicking out of the filter menu causes it to disappear
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  }
}

/**
 * Get a locator for the specified filter option. Requires a filter menu to be open
 * @param page - a Playwright page object
 * @param filterOptionName - the name of the filter option
 * @returns a Playwright locator to the filter button
 */
export const getNamedFilterButtonLocator = (
  page: Page,
  filterOptionName: string
): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox"), hasText: filterOptionName });
};

/**
 * Get a locator for the first filter option. Requires a filter menu to be open
 * @param page - a Playwright page object
 * @returns a Playwright locator to the filter button
 */
export const getFirstFilterButtonLocator = (page: Page): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .first();
};

/**
 * Cheks that selecting a specified filter is persistent across the tabs in tabOrder
 * @param page - a Playwright page object
 * @param testFilterName - the name of the filter to check
 * @param tabOrder - the tabs to check, in order. The filter will be selected on the first tab.
 * @returns false if the test should fail, and true if the test passes
 */
export async function testFilterPersistence(
  page: Page,
  testFilterName: string,
  tabOrder: TabDescription[]
): Promise<boolean> {
  // Start on the first tab in the test order (should be files)
  await page.goto(tabOrder[0].url);
  // Select the first checkbox on the test filter
  await page.getByText(filterRegex(testFilterName)).click();
  const filterToSelectLocator = await getFirstFilterButtonLocator(page);
  await expect(filterToSelectLocator.getByRole("checkbox")).not.toBeChecked();
  await filterToSelectLocator.getByRole("checkbox").click();
  const filterNameMatch = (await filterToSelectLocator.innerText())
    .trim()
    .match(/^\S*/);
  if (filterNameMatch == null) {
    // This means that the selected filter did not have any non-whitespace text
    // associated with it, making the test impossible to complete.
    console.log("ERROR: Filter name is blank, so the test cannot continue");
    return false;
  }
  const filterName = (filterNameMatch ?? [""])[0];
  await expect(filterToSelectLocator.getByRole("checkbox")).toBeChecked();
  await page.locator("body").click();
  // Expect at least some text to still be visible
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  // For each tab, check that the selected filter is still checked
  for (const tab of tabOrder.slice(1)) {
    await page
      .getByRole("tab")
      .getByText(tab.tabName, { exact: true })
      .dispatchEvent("click");
    await expect(page.getByText(filterRegex(testFilterName))).toBeVisible();
    await page.getByText(filterRegex(testFilterName)).dispatchEvent("click");
    await page.waitForLoadState("load");
    const previouslySelected = getNamedFilterButtonLocator(page, filterName);
    await expect(previouslySelected.getByRole("checkbox")).toBeChecked();
    await page.waitForLoadState("load");
    await page.locator("body").click();
  }
  // Return to the start tab and confirm that the filter stays checked and that some content is visible
  await page
    .getByRole("tab")
    .getByText(tabOrder[0].tabName, { exact: true })
    .click();
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  await page.getByText(filterRegex(testFilterName)).click();
  const previouslySelected = getFirstFilterButtonLocator(page);
  await expect(previouslySelected).toContainText(filterName, {
    useInnerText: true,
  });
  await expect(previouslySelected.getByRole("checkbox").first()).toBeChecked();
  return true;
}

/**
 * Test that the counts associated with an array of filter names are reflected
 * in the table
 * @param page - a Playwright page object
 * @param tab - the tab object to test
 * @param filterNames - the names of the filters to select, in order
 * @param elementsPerPage - the maximum number of elements per page
 * @returns false if the test should fail and true if the test should pass
 */
export async function testFilterCounts(
  page: Page,
  tab: TabDescription,
  filterNames: string[],
  elementsPerPage: number
): Promise<boolean> {
  await page.goto(tab.url);
  // For each arbitrarily selected filter
  for (const filterName of filterNames) {
    // Select the filter
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    // Get the number associated with the first filter button, and select it
    await page.waitForLoadState("load");
    const filterButton = getFirstFilterButtonLocator(page);
    const filterNumbers = (await filterButton.innerText()).split("\n");
    const filterNumber =
      filterNumbers.map((x) => Number(x)).find((x) => !isNaN(x) && x !== 0) ??
      -1;
    if (filterNumber < 0) {
      console.log("ERROR: The number associated with the filter is negative");
      return false;
    }
    // Check the filter
    await filterButton.getByRole("checkbox").dispatchEvent("click");
    await page.waitForLoadState("load");
    // Exit the filter menu
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
    // Expect the displayed count of elements to be 0
    const firstNumber =
      filterNumber <= elementsPerPage ? filterNumber : elementsPerPage;
    await expect(
      page.getByText("Results 1 - " + firstNumber + " of " + filterNumber)
    ).toBeVisible();
  }
  return true;
}

/**
 * Check that the filter tabs appear when a filter is selected and that clicking
 * them causes the filter to be deselected
 * @param page - a Playwright page objet
 * @param tab - the tab to check
 * @param filterNames - the names of the filters to check
 */
export async function testFilterTags(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  page.goto(tab.url);
  for (const filterName of filterNames) {
    // Select a filter
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await page.waitForLoadState("load");
    const firstFilterButtonLocator = getFirstFilterButtonLocator(page);
    // Get the name of the selected filter
    const firstFilterName =
      (await firstFilterButtonLocator.innerText())
        .split("\n")
        .find((x) => x.length > 0) ?? "";
    // Click the selected filter and exit the filter menu
    await firstFilterButtonLocator.getByRole("checkbox").click();
    await page.waitForLoadState("load");
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
    // Click the filter tag
    const filterTagLocator = page
      .locator("#sidebar-positioner")
      .getByText(firstFilterName);
    await expect(filterTagLocator).toBeVisible();
    await filterTagLocator.scrollIntoViewIfNeeded();
    await filterTagLocator.dispatchEvent("click");
    // Expect the tag to disappear when clicked
    await expect(filterTagLocator).toHaveCount(0);
    // Expect the filter to be deselected in the filter menu
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await expect(
      firstFilterButtonLocator.getByRole("checkbox")
    ).not.toBeChecked();
    await page.locator("body").click();
  }
}

/**
 * Check that selecting some filters then selecting the clear all button causes
 * those filters to become deselected
 * @param page - a Playwright page object
 * @param tab - the tab object to test on
 * @param filterNames - the names of the fitlers to check
 */
export async function testClearAll(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  await page.goto(tab.url);
  const selectedFilterNamesList = [];
  for (const filterName of filterNames) {
    // Select the passed filter names
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await getFirstFilterButtonLocator(page).getByRole("checkbox").click();
    await expect(
      getFirstFilterButtonLocator(page).getByRole("checkbox")
    ).toBeChecked();
    selectedFilterNamesList.push(
      (await getFirstFilterButtonLocator(page).innerText())
        .split("\n")
        .find((x) => x.length > 0) ?? ""
    );
    await page.locator("body").click();
  }
  // Click the "Clear All" button
  await page.getByText("Clear All").dispatchEvent("click");
  for (const filterName of selectedFilterNamesList) {
    await expect(
      page.locator("#sidebar-positioner").getByText(filterName)
    ).toHaveCount(0);
  }
  for (let i = 0; i < filterNames.length; i++) {
    await page.getByText(filterRegex(filterNames[i])).dispatchEvent("click");
    await expect(
      getNamedFilterButtonLocator(page, selectedFilterNamesList[i]).getByRole(
        "checkbox"
      )
    ).not.toBeChecked();
    await page.locator("body").click();
  }
}
/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
