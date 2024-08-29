import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import {
  BackpageHeader,
  ColumnDescription,
  TabDescription,
} from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

/**
 * Get an array of all visible column header names
 * @param page - a Playwright page object
 * @returns an array of the text of all visible column headers
 */
const getAllVisibleColumnNames = async (page: Page): Promise<string[]> => {
  return (await page.getByRole("columnheader").allInnerTexts()).map((entry) =>
    entry.trim()
  );
};

/**
 * Get a locator to the cell in the mth row's nth column
 * @param page - a Playwright page object
 * @param rowIndex - the zero-indexed row to return
 * @param columnIndex - the zero-indexed column to return
 * @returns a Playwright locator object to the selected cell
 **/
export const getMthRowNthColumnCellLocator = (
  page: Page,
  rowIndex: number,
  columnIndex: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(rowIndex)
    .getByRole("cell")
    .nth(columnIndex);
};

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
  return getMthRowNthColumnCellLocator(page, 0, columnIndex);
};

/**
 * Get a locator to the cell in the first row's nth column
 * @param page - a Playwright page object
 * @param columnIndex - the zero-indexed column to return
 * @returns a Playwright locator object to the selected cell
 **/
export const getLastRowNthColumnTextLocator = (
  page: Page,
  columnIndex: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .last()
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
  // Go to the selected tab
  await page.goto(tab.url);
  // Check that the selected tab appears selected and the other tabs appear deselected
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

/**
 * Checks that all preselected columns listed in the tab object are visible in the correct order
 * @param page - a Playwright page object
 * @param startTab - the tab object to start testing on
 * @param endTab - the tab to select during the test
 */
export async function testTab(
  page: Page,
  startTab: TabDescription,
  endTab: TabDescription
): Promise<void> {
  // Run the "Expect each tab to become selected, to go to the correct url, and to show all of its columns when selected" test
  await page.goto(startTab.url);
  await expect(getFirstRowNthColumnCellLocator(page, 1)).toBeVisible();
  await page
    .getByRole("tab")
    .getByText(endTab.tabName, { exact: true })
    .click();
  await expect(page).toHaveURL(endTab.url, { timeout: 25000 }); // Long timeout because some tabs take a long time to load
  await expect(page.getByRole("tab").getByText(endTab.tabName)).toHaveAttribute(
    "aria-selected",
    "true"
  );
  const columnArray = Array.from(Object.values(endTab.preselectedColumns));
  for (const column of columnArray) {
    await expect(
      page.getByRole("columnheader").getByText(column.name, { exact: true })
    ).toBeVisible();
  }
  if (endTab.emptyFirstColumn) {
    await expect(page.getByRole("columnheader")).toHaveCount(
      columnArray.length + 1
    );
  } else {
    await expect(page.getByRole("columnheader")).toHaveCount(
      columnArray.length
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
 * @returns - true if the test passes and false if the test fails
 */
export async function testSortAzul(
  page: Page,
  tab: TabDescription
): Promise<boolean> {
  // Get the current tab, and go to it's URL
  await page.goto(tab.url);
  // For each column
  const columnNameArray = (await getAllVisibleColumnNames(page)).slice(
    tab.emptyFirstColumn ? 1 : 0
  );
  const columnObjectArray = Array.from(Object.values(tab.preselectedColumns));
  for (
    let columnPosition = 0;
    columnPosition < columnNameArray.length;
    columnPosition++
  ) {
    // Get the column position, taking into account that some tabs start with a non-text first column
    const columnObject = columnObjectArray.find(
      (x) => x.name === columnNameArray[columnPosition]
    );
    if (columnObject === undefined) {
      console.log(
        `SORT AZUL: Preselected column object ${columnNameArray[columnPosition]} not found in tab configuration`
      );
      return false;
    }
    if (columnObject?.sortable) {
      const columnIndex: number = tab.emptyFirstColumn
        ? columnPosition + 1
        : columnPosition;
      // Locators for the first and last cells in a particular column position on the page
      const firstElementTextLocator = getFirstRowNthColumnCellLocator(
        page,
        columnIndex
      );
      const lastElementTextLocator = getLastRowNthColumnTextLocator(
        page,
        columnIndex
      );
      // Locator for the sort button
      const columnSortLocator = page
        .getByRole("columnheader", {
          exact: true,
          name: columnNameArray[columnPosition],
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
  return true;
}

/**
 * Checks that sorting the tab does not cause the first row of the table to break.
 * This test does not check whether the sort order is correct.
 * This test assumes that this is a catalog explorer without pagination,
 * so it only checks the first element of the table.
 * @param page - a Playwright page object
 * @param tab - the tab to check
 * @returns - true if the test passes, false if the test fails
 */
export async function testSortCatalog(
  page: Page,
  tab: TabDescription
): Promise<boolean> {
  // Get the current tab, and go to it's URL
  await page.goto(tab.url);
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  const columnNameArray = (
    await page.getByRole("columnheader").allInnerTexts()
  ).map((entry) => entry.trim());
  console.log(columnNameArray);
  const columnObjectArray = Array.from(Object.values(tab.preselectedColumns));
  for (
    let columnPosition = 0;
    columnPosition < columnNameArray.length;
    columnPosition++
  ) {
    const columnName = columnNameArray[columnPosition];
    // Get the column position, taking into account that some tabs start with a non-text first column
    const columnObject = columnObjectArray.find((x) => x.name === columnName);
    if (columnObject === undefined) {
      console.log(
        `SORT CATALOG: Preselected column object ${columnName} not found in tab configuration`
      );
      return false;
    }
    if (columnObject.sortable) {
      // Locators for the first cell in a particular column position on the page
      const firstElementTextLocator = getFirstRowNthColumnCellLocator(
        page,
        columnPosition
      );
      // Locator for the sort button
      const columnSortLocator = page
        .getByRole("columnheader", {
          exact: true,
          name: columnName,
        })
        .getByRole("button");
      await expect(firstElementTextLocator).toBeVisible();
      // Click to sort
      await columnSortLocator.click();
      // Expect the first cell to still be visible
      await expect(firstElementTextLocator).toBeVisible();
      const firstElementText = await hoverAndGetText(
        page,
        columnObject,
        0,
        columnPosition
      );
      // Click again
      await columnSortLocator.click();
      // Expect the first cell to have changed after clicking sort
      await expect(firstElementTextLocator).toBeVisible();
      await expect(firstElementTextLocator).not.toHaveText(firstElementText);
    }
  }
  return true;
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
  // Navigate to the tab
  await page.goto(tab.url);
  // Select the "Edit Columns" menu
  await page.getByRole("button").getByText("Edit Columns").click();
  await expect(page.getByRole("menu")).toBeVisible();
  // Enable each selectable tab
  const tabObjectArray = Array.from(Object.values(tab.selectableColumns));
  for (const column of tabObjectArray) {
    // Locate the checkbox for each column
    const checkboxLocator = page
      .getByRole("menu")
      .locator("*")
      .filter({
        has: page
          .locator("*")
          .filter({ has: page.getByText(column.name, { exact: true }) }),
      })
      .getByRole("checkbox");
    // Expect each column to be enabled and unchecked for selectable tabs
    await expect(checkboxLocator).toBeEnabled();
    await expect(checkboxLocator).not.toBeChecked();
    // Expect clicking the checkbox to function
    await checkboxLocator.click();
    await expect(checkboxLocator).toBeChecked();
  }
  await page.getByRole("document").click();
  await expect(page.getByRole("menu")).not.toBeVisible();
  // Expect all selectable tabs to be enabled
  await expect(page.getByRole("columnheader")).toContainText(
    tabObjectArray.map((x) => x.name)
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
  for (const column of Object.values(tab.preselectedColumns)) {
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
 * Returns a string with special characters escaped
 * @param string - the string to escape
 * @returns - a string with special characters escaped
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Returns a regex that matches the sidebar filter buttons
 * This is useful for selecting a filter from the sidebar
 * @param filterName - the name of the filter to match
 * @returns a regular expression matching "[filterName] ([n])"
 */
export const filterRegex = (filterName: string): RegExp =>
  new RegExp(escapeRegExp(filterName) + "\\s+\\([0-9]+\\)\\s*");

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
export const getNamedFilterOptionLocator = (
  page: Page,
  filterOptionName: string
): Locator => {
  return page.getByRole("button").filter({
    has: page.getByRole("checkbox"),
    hasText: RegExp(`^${escapeRegExp(filterOptionName)}\\s*\\d+\\s*`),
  });
};

/**
 * Get a locator for the first filter option. Requires a filter menu to be open
 * @param page - a Playwright page object
 * @returns a Playwright locator to the filter button
 */
export const getFirstFilterOptionLocator = (page: Page): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .first();
};

export const getFilterOptionName = async (
  page: Page,
  firstFilterOptionLocator: Locator
): Promise<string> => {
  return (
    (await firstFilterOptionLocator.innerText())
      .split("\n")
      .find((x) => x.length > 0) ?? ""
  );
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
  const filterToSelectLocator = await getFirstFilterOptionLocator(page);
  await expect(filterToSelectLocator.getByRole("checkbox")).not.toBeChecked();
  await filterToSelectLocator.getByRole("checkbox").click();
  const filterNameMatch = (await filterToSelectLocator.innerText())
    .trim()
    .match(/^\S*/);
  if (!filterNameMatch) {
    // This means that the selected filter did not have any non-whitespace text
    // associated with it, making the test impossible to complete.
    console.log(
      "FILTER PERSISTENCE: Filter name is blank, so the test cannot continue"
    );
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
    const previouslySelected = getNamedFilterOptionLocator(page, filterName);
    await expect(previouslySelected.getByRole("checkbox")).toBeChecked();
    await page.waitForLoadState("load");
    await page.locator("body").click();
  }
  // Return to the start tab and confirm that the filter stays checked and that some content is visible
  await page
    .getByRole("tab")
    .getByText(tabOrder[0].tabName, { exact: true })
    .dispatchEvent("click");
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  await page.getByText(filterRegex(testFilterName)).dispatchEvent("click");
  const previouslySelected = getFirstFilterOptionLocator(page);
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
    const firstFilterOption = getFirstFilterOptionLocator(page);
    const filterNumbers = (await firstFilterOption.innerText()).split("\n");
    const filterNumber =
      filterNumbers
        .reverse()
        .map((x) => Number(x))
        .find((x) => !isNaN(x) && x !== 0) ?? -1;
    if (filterNumber < 0) {
      console.log(
        "FILTER COUNTS: The number associated with the filter is negative"
      );
      return false;
    }
    // Check the filter
    await firstFilterOption.getByRole("checkbox").dispatchEvent("click");
    await page.waitForLoadState("load");
    // Exit the filter menu
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
    // Wait for the table to load
    await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
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
 * Get a locator for a named filter tag
 * @param page - a Playwright page object
 * @param filterTagName - the name of the filter tag to search for
 * @returns - a locator for the named filter tag
 */
const getFilterTagLocator = (page: Page, filterTagName: string): Locator => {
  return page
    .locator("#sidebar-positioner")
    .getByText(filterTagName, { exact: true });
};

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
  await page.goto(tab.url);
  for (const filterName of filterNames) {
    // Select a filter
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await page.waitForLoadState("load");
    const firstFilterOptionLocator = getFirstFilterOptionLocator(page);
    // Get the name of the selected filter
    const firstFilterOptionName =
      (await firstFilterOptionLocator.innerText())
        .split("\n")
        .find((x) => x.length > 0) ?? "";
    // Click the selected filter and exit the filter menu
    await firstFilterOptionLocator.getByRole("checkbox").click();
    await page.waitForLoadState("load");
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
    // Click the filter tag
    const filterTagLocator = getFilterTagLocator(page, firstFilterOptionName);
    await expect(filterTagLocator).toBeVisible();
    await filterTagLocator.scrollIntoViewIfNeeded();
    await filterTagLocator.dispatchEvent("click");
    // Expect the tag to disappear when clicked
    await expect(filterTagLocator).toHaveCount(0);
    // Expect the filter to be deselected in the filter menu
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await expect(
      firstFilterOptionLocator.getByRole("checkbox")
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
  // Select each filter and get the names of the actual filter text
  for (const filterName of filterNames) {
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await getFirstFilterOptionLocator(page).getByRole("checkbox").click();
    await expect(
      getFirstFilterOptionLocator(page).getByRole("checkbox")
    ).toBeChecked();
    selectedFilterNamesList.push(
      await getFilterOptionName(page, getFirstFilterOptionLocator(page))
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
  // Ensure that the filters still show as unchecked
  for (let i = 0; i < filterNames.length; i++) {
    await page.getByText(filterRegex(filterNames[i])).dispatchEvent("click");
    await expect(
      getNamedFilterOptionLocator(page, selectedFilterNamesList[i]).getByRole(
        "checkbox"
      )
    ).not.toBeChecked();
    await page.locator("body").click();
  }
}
/**
 * Run a test that gets the first filter option of each of the filters specified in
 * filterNames, then attempts to select each through the filter search bar.
 * @param page - a Playwright page object
 * @param tab - the Tab object to run the test on
 * @param filterNames - an array of potential filter names on the selected tab
 */
export async function testSelectFiltersThroughSearchBar(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  await page.goto(tab.url);
  for (const filterName of filterNames) {
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    const firstFilterOptionLocator = getFirstFilterOptionLocator(page);
    const filterOptionName = await getFilterOptionName(
      page,
      firstFilterOptionLocator
    );
    await page.locator("body").click();

    const searchFiltersInputLocator = page.getByPlaceholder(
      tab.searchFiltersPlaceholderText,
      { exact: true }
    );
    await expect(searchFiltersInputLocator).toBeVisible();
    await searchFiltersInputLocator.fill(filterOptionName);
    await getNamedFilterOptionLocator(page, filterOptionName).first().click();
    await page.locator("body").click();
    const filterTagLocator = getFilterTagLocator(page, filterOptionName);
    await expect(filterTagLocator).toBeVisible();
    await filterTagLocator.dispatchEvent("click");
  }
}

/**
 * Run a test that selects the first filter option of each of the filters specified in
 * filterNames, then attempts to deselect each through the filter search bar.
 * @param page - a Playwright page object
 * @param tab - the Tab object to run the test on
 * @param filterNames - an array of potential filter names on the selected tab
 */
export async function testDeselectFiltersThroughSearchBar(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  await page.goto(tab.url);
  const filterOptionNames: string[] = [];
  for (const filterName of filterNames) {
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    const firstFilterOptionLocator = getFirstFilterOptionLocator(page);
    const filterOptionName = await getFilterOptionName(
      page,
      firstFilterOptionLocator
    );
    filterOptionNames.push(filterOptionName);
    await firstFilterOptionLocator.click();
    await page.locator("body").click();
  }
  for (let i = 0; i < filterOptionNames.length; i++) {
    const searchFiltersInputLocator = page.getByPlaceholder(
      tab.searchFiltersPlaceholderText,
      { exact: true }
    );
    await expect(searchFiltersInputLocator).toBeVisible();
    await searchFiltersInputLocator.fill(filterOptionNames[i]);
    await getNamedFilterOptionLocator(page, filterOptionNames[i])
      .locator("input[type='checkbox']:checked")
      .first()
      .click();
    await page.locator("body").click();
    const filterTagLocator = getFilterTagLocator(page, filterOptionNames[i]);
    await expect(filterTagLocator).not.toBeVisible();
  }
}

/**
 * Get the first link to a backpage with specified backpage access
 * @param page - a Playright page locator
 * @param access - the string denoting the level of access desired
 * @returns a Playwright locator object to the first link to a backpage with the specified access
 */
const getBackpageLinkLocatorByAccess = (page: Page, access: string): Locator =>
  page
    .getByRole("row")
    .filter({ has: page.getByRole("cell", { name: access }) })
    .first()
    .getByRole("cell")
    .first()
    .getByRole("link");

/**
 * Test the export process for the specified tab
 * @param context - a Playwright browser context object
 * @param page - a Playwright page object
 * @param tab - the tab to test on
 */
export async function testExportBackpage(
  context: BrowserContext,
  page: Page,
  tab: TabDescription
): Promise<void> {
  if (
    tab.backpageExportButtons === undefined ||
    tab.backpageAccessTags === undefined
  ) {
    // Fail if this test is ran on a tab without defined backpages
    await expect(false);
    return;
  }
  // Goto the specified tab
  await page.goto(tab.url);
  // Expect to find row with a granted status indicator
  const grantedRowLocator = getBackpageLinkLocatorByAccess(
    page,
    tab.backpageAccessTags.grantedShortName
  );
  await expect(grantedRowLocator).toBeVisible();
  // Click into the selected row
  await grantedRowLocator.dispatchEvent("click");
  await expect(
    page.getByText(tab.backpageExportButtons.detailsName)
  ).toBeVisible();
  // Click the "Export" tab
  await page
    .getByText(tab.backpageExportButtons.exportTabName, {
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(tab.backpageExportButtons.exportUrlRegExp);
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const exportRequestButtonLocator = page.getByRole("button", {
    name: tab.backpageExportButtons.exportRequestButtonText,
  });
  await expect(exportRequestButtonLocator).toBeEnabled();
  // Select all checkboxes that are not in a table
  const allNonTableCheckboxLocators = await page
    .locator("input[type='checkbox']:not(table input[type='checkbox'])")
    .all();
  for (const checkboxLocator of allNonTableCheckboxLocators) {
    await checkboxLocator.click();
    await expect(checkboxLocator).toBeChecked();
    await expect(checkboxLocator).toBeEnabled({ timeout: 10000 });
  }
  // Expect there to be exactly one table on the backpage
  await expect(page.getByRole("table")).toHaveCount(1);
  // Check the second checkbox in the table (this should be the checkbox after the "select all checkbox")
  const tableLocator = page.getByRole("table");
  const allInTableCheckboxLocators = await tableLocator
    .getByRole("checkbox")
    .all();
  const secondCheckboxInTableLocator = allInTableCheckboxLocators[1];
  await secondCheckboxInTableLocator.click();
  await expect(secondCheckboxInTableLocator).toBeChecked();
  await expect(secondCheckboxInTableLocator).toBeEnabled({ timeout: 10000 });
  // Make sure that no other checkboxes are selected
  const otherInTableCheckboxLocators = [
    allInTableCheckboxLocators[0],
    ...allInTableCheckboxLocators.slice(2),
  ];
  for (const otherCheckboxLocator of otherInTableCheckboxLocators) {
    await expect(otherCheckboxLocator).not.toBeChecked();
    await expect(otherCheckboxLocator).toBeEnabled();
  }
  // Click the Export Request button
  await expect(exportRequestButtonLocator).toBeEnabled({ timeout: 10000 });
  await exportRequestButtonLocator.click();
  await expect(
    page.getByText(tab.backpageExportButtons.firstLoadingMessage, {
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByText(tab.backpageExportButtons.secondLandingMessage, {
      exact: true,
    })
  ).toBeVisible({ timeout: 60000 });
  const exportActionButtonLocator = page.getByRole("button", {
    name: tab.backpageExportButtons?.exportActionButtonText,
  });
  await expect(exportActionButtonLocator).toBeEnabled();
  // Click the Export Action Button and await a new browser tab
  const newPagePromise = context.waitForEvent("page");
  await exportActionButtonLocator.click();
  const newPage = await newPagePromise;
  // Expect the new browser tab to display the new tab content
  await expect(
    newPage.getByText(tab.backpageExportButtons?.newTabMessage)
  ).toBeVisible();
}

/**
 * Test that export access is available on entries where access shows as available
 * and is not on entries where access shows as unavailable
 * @param page - a Playwright page objext
 * @param tab - the tab object to test on
 */
export async function testBackpageAccess(
  page: Page,
  tab: TabDescription
): Promise<void> {
  if (
    tab.backpageExportButtons === undefined ||
    tab.backpageAccessTags === undefined
  ) {
    // Fail if this test is ran on a tab without defined backpages
    await expect(false);
    return;
  }
  // Goto the specified tab
  await page.goto(tab.url);
  // Check that the first "Granted" tab has access granted
  const grantedRowLocator = getBackpageLinkLocatorByAccess(
    page,
    tab.backpageAccessTags.grantedShortName
  );
  await expect(grantedRowLocator).toBeVisible();
  await grantedRowLocator.dispatchEvent("click");
  await expect(
    page.getByText(tab.backpageExportButtons.detailsName)
  ).toBeVisible();
  await expect(
    page.getByText(tab.backpageAccessTags.grantedLongName)
  ).toBeVisible();
  await page
    .getByText(tab.backpageExportButtons.exportTabName, {
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(tab.backpageExportButtons.exportUrlRegExp);
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const requestLinkButtonLocator = page.getByRole("button", {
    name: tab.backpageExportButtons.exportRequestButtonText,
  });
  await expect(requestLinkButtonLocator).toBeEnabled();
  // Go back to the table page
  await page.getByRole("link", { name: tab.tabName }).click();
  // Check that the first "Required" tab does not have access granted
  const deniedRowLocator = getBackpageLinkLocatorByAccess(
    page,
    tab.backpageAccessTags.deniedShortName
  );
  await expect(deniedRowLocator).toBeVisible();
  await deniedRowLocator.dispatchEvent("click");
  await expect(
    page.getByText(tab.backpageAccessTags.deniedLongName)
  ).toBeVisible();
  await page
    .getByText(tab.backpageExportButtons.exportTabName, {
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(tab.backpageExportButtons.exportUrlRegExp);
  await expect(
    page.getByText(tab.backpageExportButtons.accessNotGrantedMessage, {
      exact: true,
    })
  ).toBeVisible();
}

/**
 * Get the text from a cell by reading the tooltip if it appears to be an N-tag
 * cell or by reading the text if it does not appear to be
 * @param page - a Playwright Page object
 * @param columnDescription - a columnDescription object for the column
 * @param rowPosition - the zero-indexed position of the row
 * @param columnPosition - the zero-indexed position of the column
 * @returns - a Promise with the cell's text
 */
const hoverAndGetText = async (
  page: Page,
  columnDescription: ColumnDescription | undefined,
  rowPosition: number,
  columnPosition: number
): Promise<string> => {
  const cellLocator = getMthRowNthColumnCellLocator(
    page,
    rowPosition,
    columnPosition
  );
  const cellText = await cellLocator.innerText();
  // Check if the cell appears to be an Ntag cell
  if (
    !columnDescription !== undefined &&
    columnDescription?.pluralizedLabel !== undefined &&
    RegExp("\\s*[0-9]+ " + columnDescription.pluralizedLabel + "\\s*").test(
      cellText
    )
  ) {
    // Hover over the text of the NTag cell
    await cellLocator.locator("*").last().hover();
    // Read the tooltip
    await page.getByRole("tooltip").waitFor();
    const outputText = (await page.getByRole("tooltip").innerText()).trim();
    // Hover over a different part of the page to ensure that the tooltip disappears
    await page.getByRole("columnheader").first().hover();
    await expect(page.getByRole("tooltip")).toHaveCount(0);
    // Return the tooltip contents
    return outputText;
  }
  return cellText.trim();
};

/**
 * Check that the details in the backpage sidebar match information in the data table
 * @param page - a Playwright page object
 * @param tab - the tab to test on
 * @returns - true if the test passes, false if the test fails due to an issue with the tab configuration
 */
export async function testBackpageDetails(
  page: Page,
  tab: TabDescription
): Promise<boolean> {
  if (
    tab.backpageHeaders === undefined ||
    tab.backpageExportButtons === undefined
  ) {
    // If the tab is not set up with backpage info, fail the test
    console.log(
      "BACKPAGE DETAILS error: tab is not set up with backpage info, so test cannot continue"
    );
    return false;
  }
  await page.goto(tab.url);
  // Enable test columns
  await testSelectableColumns(page, tab);
  const headers: { header: string; value: string }[] = [];
  const preselectedColumnObjectArray = Array.from(
    Object.values(tab.preselectedColumns)
  );
  const selectableColumnObjectArray = Array.from(
    Object.values(tab.selectableColumns)
  );
  const combinedColumns = preselectedColumnObjectArray.concat(
    selectableColumnObjectArray
  );
  const filterString = (x: string | undefined): x is string => x !== undefined;
  // Get the columns that correspond with a header on the backpage details
  const backpageCorrespondingColumns: string[] = tab.backpageHeaders
    .map((header) => header?.correspondingColumn?.name)
    .filter(filterString)
    .map((x) => x.trim());
  for (let i = 0; i < combinedColumns.length; i++) {
    // Get the name of the current column
    const columnHeaderName = (
      await page.getByRole("columnheader").nth(i).innerText()
    ).trim();
    // If the selected column has an entry on the backpage
    if (backpageCorrespondingColumns.includes(columnHeaderName)) {
      // Get the object representing the current column
      const columnObject = combinedColumns.find(
        (x) => x.name == columnHeaderName
      );
      // Get the entry text
      const tableEntryText = await hoverAndGetText(page, columnObject, 0, i);
      // Get the name of the corresponding header on the backpage
      const correspondingHeaderName = tab.backpageHeaders.find(
        (header: BackpageHeader) =>
          header?.correspondingColumn?.name === columnHeaderName
      )?.name;
      if (correspondingHeaderName === undefined) {
        // Fail the test, because this means there is an incorrect configuration in the tab definition
        console.log(
          "BACKPAGE DETAILS error: backpageHeaders is configured incorrectly, so test cannot continue"
        );
        return false;
      }
      headers.push({ header: correspondingHeaderName, value: tableEntryText });
    }
  }
  // Go to the backpage
  await getMthRowNthColumnCellLocator(page, 0, 0).click();
  // Expect the details name to be visible
  await expect(
    page.getByText(tab.backpageExportButtons.detailsName)
  ).toBeVisible();
  for (const headerValue of headers) {
    // Expect the correct value to be below the correct header in the dataset values table
    await expect(
      page
        .locator(`:below(:text('${headerValue.header}'))`)
        .getByText(headerValue.value)
        .first()
    ).toBeVisible();
  }
  return true;
}

const PAGE_COUNT_REGEX = /Page [0-9]+ of [0-9]+/;
const BACK_BUTTON_TEST_ID = "WestRoundedIcon";
const FORWARD_BUTTON_TEST_ID = "EastRoundedIcon";
const ERROR = "ERROR";
const MAX_PAGINATIONS = 200;

/**
 * Test that the forward pagination button is enabled and the back button is disabled on the first page of the selected tab
 * @param page - a Playwright page object
 * @param tab - the tab object to test on
 */
export async function testFirstPagePagination(
  page: Page,
  tab: TabDescription
): Promise<void> {
  await page.goto(tab.url);
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  // Should start on first page
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  // Forward button should start enabled
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
  ).toBeEnabled();
  // Back Button should start disabled
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(BACK_BUTTON_TEST_ID) })
  ).toBeDisabled();
}

/**
 * Filter the current tab to reduce the number of pages to select, then go to the last page and test that the forward button is disabled and the back button is enabled
 * @param page - a Playwright page object
 * @param tab - the tab object to test on
 * @param filterName - the name of the filter top to use to reduce the number of pages
 * @returns - true if the test passes, false if it fails due to configuration issues
 */
export async function filterAndTestLastPagePagination(
  page: Page,
  tab: TabDescription,
  filterName: string
): Promise<boolean> {
  // Filter to reduce the number of pages that must be selected
  await page.goto(tab.url);
  await page.getByText(filterRegex(filterName)).click();
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const filterTexts = await page
    .getByRole("button")
    .filter({ hasText: /([0-9]+)[\n\s]*$/ })
    .allInnerTexts();
  // Get the filter with the lowest associated count
  const filterCounts = filterTexts
    .map((filterText) =>
      (
        (filterText.match(/[^a-zA-Z0-9]+([0-9]+)[\n\s]*$/) ?? [
          undefined,
          "",
        ])[1] ?? ERROR
      ).trim()
    )
    .map((numberText) => parseInt(numberText))
    .filter(
      (n) =>
        !isNaN(n) &&
        n > (tab.maxPages ?? 0) * 3 &&
        n < (tab.maxPages ?? 0) * MAX_PAGINATIONS
    );
  if (filterCounts.length == 0) {
    console.log(
      "PAGINATION LAST PAGE: Test would involve too many paginations, so halting"
    );
    return false;
  }
  const minFilterValue = Math.min(...filterCounts);
  await page
    .getByRole("button")
    .filter({ hasText: RegExp(`${minFilterValue}[\\n\\s]*$`) })
    .click();
  await page.locator("body").click();
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();

  // Should start on first page, and there should be multiple pages available
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  await expect(
    page.getByText(PAGE_COUNT_REGEX, { exact: true })
  ).not.toHaveText("Page 1 of 1");

  // Detect number of pages
  const splitStartingPageText = (
    await page.getByText(PAGE_COUNT_REGEX, { exact: true }).innerText()
  ).split(" ");
  const maxPages = parseInt(
    splitStartingPageText[splitStartingPageText.length - 1]
  );
  // Paginate forwards
  for (let i = 2; i < maxPages + 1; i++) {
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
      .dispatchEvent("click");
    await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
    // Expect the page count to have incremented
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      `Page ${i} of ${maxPages}`
    );
  }
  // Expect to be on the last page
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toContainText(
    `Page ${maxPages} of ${maxPages}`
  );
  // Expect the back button to be enabled on the last page
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(BACK_BUTTON_TEST_ID) })
  ).toBeEnabled();
  // Expect the forward button to be disabled
  await expect(
    page
      .getByRole("button")
      .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
  ).toBeDisabled();
  return true;
}

/**
 * Test that paginating changes the content on the page
 * @param page - a Playwright page object
 * @param tab  - the tab to test on
 */
export async function testPaginationContent(
  page: Page,
  tab: TabDescription
): Promise<void> {
  // Navigate to the correct tab
  await page.goto(tab.url);
  await expect(
    page.getByRole("tab").getByText(tab.tabName, { exact: true })
  ).toHaveAttribute("aria-selected", "true", { timeout: 25000 });

  const firstElementTextLocator = getFirstRowNthColumnCellLocator(page, 0);

  // Should start on first page
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  const maxPages = 5;
  const FirstTableEntries = [];

  // Paginate forwards
  for (let i = 2; i < maxPages + 1; i++) {
    await expect(firstElementTextLocator).not.toHaveText("");
    const OriginalFirstTableEntry = await firstElementTextLocator.innerText();
    // Click the next button
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
      .click();
    // Expect the page count to have incremented
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      RegExp(`Page ${i} of [0-9]+`)
    );
    // Expect the back button to be enabled
    await expect(
      page
        .getByRole("button")
        .filter({ has: page.getByTestId(BACK_BUTTON_TEST_ID) })
    ).toBeEnabled();
    // Expect the forwards button to be enabled
    if (i != maxPages) {
      await expect(
        page
          .getByRole("button")
          .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
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
  for (let i = 0; i < maxPages - 1; i++) {
    const OldFirstTableEntry = FirstTableEntries[maxPages - i - 2];
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(BACK_BUTTON_TEST_ID) })
      .click();
    // Expect page number to be correct
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      RegExp(`Page ${maxPages - i - 1} of [0-9]+`)
    );
    // Expect page entry to be consistent with forward pagination
    await expect(firstElementTextLocator).toHaveText(OldFirstTableEntry);
  }
}

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
