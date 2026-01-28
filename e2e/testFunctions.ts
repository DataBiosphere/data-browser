import { expect, Locator, Page } from "@playwright/test";
import { ColumnDescription, TabDescription } from "./testInterfaces";
import {
  KEYBOARD_KEYS,
  MUI_CLASSES,
  TEST_IDS,
} from "./features/common/constants";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

// Timeout constants
const TIMEOUT_EXPORT_REQUEST = 60000;
const TIMEOUT_DOWNLOAD = 10000;

// Filter length const for regexes
const MAX_FILTER_LENGTH = 256;

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
  await expect(getTabByText(page, tab.tabName)).toHaveAttribute(
    "aria-selected",
    "true"
  );
  for (const otherTab of otherTabs) {
    if (otherTab.tabName !== tab.tabName) {
      await expect(getTabByText(page, otherTab.tabName)).toHaveAttribute(
        "aria-selected",
        "false"
      );
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
  await page.getByTestId(TEST_IDS.TABLE_FIRST_CELL).waitFor();
  await expect(getFirstRowNthColumnCellLocator(page, 1)).toBeVisible();
  await getTabByText(page, endTab.tabName).click();
  await expect(page).toHaveURL(endTab.url);
  await expect(getTabByText(page, endTab.tabName)).toHaveAttribute(
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
 * Checks that sorting the tab causes the sort icon to appear
 * This test does not check whether the sort order is correct.
 * @param page - a Playwright page object
 * @param tab - the tab to check
 * @returns - true if the test passes and false if the test fails
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- Complex code just for diagnostic will be removed later
export async function testSortAzul(
  page: Page,
  tab: TabDescription
): Promise<boolean> {
  // Get the current tab, and go to it's URL
  await page.goto(tab.url);
  // Get the name of all visible columns
  const columnNameArray = (await getAllVisibleColumnNames(page)).slice(
    tab.emptyFirstColumn ? 1 : 0
  );
  // Get the predefined column metadata (in an arbitrary order) as an array
  const columnObjectArray = Array.from(Object.values(tab.preselectedColumns));
  // Defined a value to store the locator for the previously checked locator
  let lastElementSortIconLocator: Locator | undefined = undefined;
  // Iterate through each visible column on screen
  for (
    let columnPosition = 0;
    columnPosition < columnNameArray.length;
    columnPosition++
  ) {
    // Get the column position, taking into account that some tabs start with a non-text first column
    const columnObject = columnObjectArray.find(
      (x) => x.name === columnNameArray[columnPosition]
    );
    // If a column is visible but is not in the array of predefined columns, fail the test
    if (columnObject === undefined) {
      console.log(
        `SORT AZUL: Preselected column object ${columnNameArray[columnPosition]} not found in tab configuration`
      );
      return false;
    }
    if (columnObject?.sortable) {
      // Locator that can be clicked to sort the column
      const columnSortLocator = page
        .locator(MUI_CLASSES.TABLE_SORT_LABEL)
        .filter({ hasText: columnObject.name });
      // Locator for the column sort icon
      const sortIconLocator = columnSortLocator.locator(
        MUI_CLASSES.TABLE_SORT_LABEL_ICON
      );
      // If on the first cell, expect the sort icon to be visible. Otherwise, expect it not to be
      if (columnPosition === 0) {
        await expect(sortIconLocator).not.toHaveCSS("opacity", "0");
      } else {
        await expect(sortIconLocator).toHaveCSS("opacity", "0");
      }
      // Click to sort
      // dispatchEvent necessary because the table loading component sometimes interrupts a click event
      await columnSortLocator.dispatchEvent("click");
      // Expect the first element of the table to still be visible (may not have text)
      await expect(
        getFirstRowNthColumnCellLocator(page, columnPosition)
      ).toBeVisible();
      // Expect the previously selected sort icon to be invisible
      if (lastElementSortIconLocator !== undefined) {
        await expect(lastElementSortIconLocator).toHaveCSS("opacity", "0");
      }
      // Expect the newly selected sort icon to be visible
      await expect(sortIconLocator).not.toHaveCSS("opacity", "0");
      // Save the selected sort icon locator
      lastElementSortIconLocator = sortIconLocator;
    }
  }
  return true;
}

const SEARCH_BUTTON_NAME = "Search";

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
      const nonOverlappingElement = page.getByRole("button", {
        name: SEARCH_BUTTON_NAME,
      });
      const firstElementText = await hoverAndGetText(
        page,
        columnObject,
        0,
        columnPosition,
        nonOverlappingElement
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
  // dispatchEvent necessary because the table loading component sometimes interrupts a click event
  await page
    .getByRole("button")
    .getByText("Edit Columns")
    .dispatchEvent("click");
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
 * in the "Edit Columns" menu and that their checkbox is checked and enabled.
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
    await expect(checkboxLocator).toBeEnabled();
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
  new RegExp(escapeRegExp(filterName) + "\\s+\\(\\d+\\)\\s*");

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
  await expect(getTabByText(page, tab.tabName)).toBeVisible();
  for (const filterName of filterNames) {
    // Check that each filter is visible and clickable
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    // dispatchEvent necessary because the filter menu component sometimes interrupts a click event
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
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
  // The Regex matches a filter name with a number after it, with potential whitespace before and after the number.
  // This matches how the innerText in the filter options menu appears to Playwright.
  return page.getByRole("button").filter({
    has: page.getByRole("checkbox"),
    hasText: RegExp(`^${escapeRegExp(filterOptionName)}\\s*\\d+\\s*`),
  });
};

/**
 * Get a locator for the nth filter option on the page.
 * @param page - a Playwright page object
 * @param n - the index of the filter option to get
 * @returns - a Playwright locator object for the first filter option on the page
 */
const getNthFilterOptionLocator = (page: Page, n: number): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .nth(n);
};

/**
 * Get a locator for the first filter option on the page.
 * @param page - a Playwright page object
 * @returns - a Playwright locator object for the first filter option on the page
 */
export const getFirstFilterOptionLocator = (page: Page): Locator => {
  return getNthFilterOptionLocator(page, 0);
};

export const getFilterOptionName = async (
  firstFilterOptionLocator: Locator
): Promise<string> => {
  // Filter options display as "[text]\n[number]" , sometimes with extra whitespace, so we split on newlines and take the first non-empty string
  return (
    (await firstFilterOptionLocator.innerText())
      .split("\n")
      .map((x) => x.trim())
      .find((x) => x.length > 0) ?? ""
  );
};

const MAX_FILTER_OPTIONS_TO_CHECK = 10;

interface FilterOptionNameAndLocator {
  index: number;
  locator: Locator;
  name: string;
}

/**
 * Gets the name of the filter option associated with a locator
 * @param page - a Playwright Page object, on which a filter must be currently selected
 * @returns the innerText of the first nonempty filter option as a promise
 */
const getFirstNonEmptyFilterOptionInfo = async (
  page: Page
): Promise<FilterOptionNameAndLocator> => {
  let filterToSelect = "";
  let filterOptionLocator = undefined;
  let i = 0;
  while (filterToSelect === "" && i < MAX_FILTER_OPTIONS_TO_CHECK) {
    // Filter options display as "[text]\n[number]" , sometimes with extra whitespace, so we want the string before the newline
    const filterOptionRegex = /^(.*)\n+(\d+)\s*$/;
    filterOptionLocator = getNthFilterOptionLocator(page, i);
    const filterNameMatch = (await filterOptionLocator.innerText())
      .trim()
      .match(filterOptionRegex);
    if (filterNameMatch !== null) {
      filterToSelect = filterNameMatch[1];
    }
    i += 1;
  }
  if (filterOptionLocator === undefined) {
    throw new Error(
      "No locator found within the maximum number of filter options"
    );
  }
  return { index: i - 1, locator: filterOptionLocator, name: filterToSelect };
};

/**
 * Checks that selecting a specified filter is persistent across the tabs in tabOrder
 * @param page - a Playwright page object
 * @param testFilterName - the name of the filter to check
 * @param tabOrder - the tabs to check, in order. The filter will be selected on the first tab.
 */
export async function testFilterPersistence(
  page: Page,
  testFilterName: string,
  tabOrder: TabDescription[]
): Promise<void> {
  // Start on the first tab in the test order (should be files)
  await page.goto(tabOrder[0].url);
  // Select the first checkbox on the test filter
  await page.getByText(filterRegex(testFilterName)).click();
  const filterToSelectInfo = await getFirstNonEmptyFilterOptionInfo(page);
  const filterToSelectLocator = filterToSelectInfo.locator;
  const filterName = filterToSelectInfo.name;
  const filterIndex = filterToSelectInfo.index;
  await expect(filterToSelectLocator.getByRole("checkbox")).not.toBeChecked();
  await filterToSelectLocator.getByRole("checkbox").click();
  await expect(filterToSelectLocator.getByRole("checkbox")).toBeChecked();
  await page.locator("body").click();
  // Expect at least some text to still be visible
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  // For each tab, check that the selected filter is still checked
  for (const tab of tabOrder.slice(1)) {
    await getTabByText(page, tab.tabName).dispatchEvent("click");
    await expect(page.getByText(filterRegex(testFilterName))).toBeVisible();
    await page.getByText(filterRegex(testFilterName)).dispatchEvent("click");
    await page.waitForLoadState("load");
    const previouslySelected = getNamedFilterOptionLocator(page, filterName);
    await expect(previouslySelected.getByRole("checkbox")).toBeChecked();
    await page.waitForLoadState("load");
    await page.locator("body").click();
  }
  // Return to the start tab and confirm that the filter stays checked and that some content is visible
  // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
  await getTabByText(page, tabOrder[0].tabName).dispatchEvent("click");
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
  await page.getByText(filterRegex(testFilterName)).dispatchEvent("click");
  const previouslySelected = getNthFilterOptionLocator(page, filterIndex);
  await expect(previouslySelected).toContainText(filterName, {
    useInnerText: true,
  });
  await expect(previouslySelected.getByRole("checkbox").first()).toBeChecked();
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
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
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
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
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

const FILTER_CSS_SELECTOR = "#sidebar-positioner";

/**
 * Get a locator for a named filter tag
 * @param page - a Playwright page object
 * @param filterTagName - the name of the filter tag to search for
 * @returns - a locator for the named filter tag
 */
const getFilterTagLocator = (page: Page, filterTagName: string): Locator => {
  return page
    .locator(FILTER_CSS_SELECTOR)
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
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
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
 * @param filterNames - the names of the filters to check
 */
export async function testClearAll(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  await page.goto(tab.url);
  const selectedFilterNamesList = [];
  // Select each filter and get the names of the actual filter text
  // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
  for (const filterName of filterNames) {
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await getFirstFilterOptionLocator(page).getByRole("checkbox").click();
    await expect(
      getFirstFilterOptionLocator(page).getByRole("checkbox")
    ).toBeChecked();
    selectedFilterNamesList.push(
      await getFilterOptionName(getFirstFilterOptionLocator(page))
    );
    await page.locator("body").click();
  }
  // Click the "Clear All" button
  await page.getByText("Clear All").dispatchEvent("click");
  for (const filterName of selectedFilterNamesList) {
    await expect(page.getByText(filterRegex(filterName))).toHaveCount(0);
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
 * Escape a string so it can safely be used in a regexp
 * @param string - the string to escape
 * @returns - A string that has all Regexp special characters escaped
 */
function escapeRegExp(string: string): string {
  // Searches for regex special characters and adds backslashes in front of them to escape
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
    // Get the first filter option
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    const firstFilterOptionLocator = getFirstFilterOptionLocator(page);
    const filterOptionName = await getFilterOptionName(
      firstFilterOptionLocator
    );
    await page.locator("body").click();
    // Search for the filter option
    const searchFiltersInputLocator = page.getByPlaceholder(
      tab.searchFiltersPlaceholderText,
      { exact: true }
    );
    await expect(searchFiltersInputLocator).toBeVisible();
    await searchFiltersInputLocator.fill(filterOptionName);
    // Select a filter option with a matching name
    await getNamedFilterOptionLocator(page, filterOptionName).first().click();
    await page.locator("body").click();
    const filterTagLocator = getFilterTagLocator(page, filterOptionName);
    // Check the filter tag is selected and click it to reset the filter
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
  for (const filterName of filterNames) {
    // Select each filter option
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    const firstFilterOptionLocator = getFirstFilterOptionLocator(page);
    const filterOptionName = await getFilterOptionName(
      firstFilterOptionLocator
    );
    await firstFilterOptionLocator.click();
    await page.locator("body").click();
    // Search for and check the selected filter
    const searchFiltersInputLocator = page.getByPlaceholder(
      tab.searchFiltersPlaceholderText,
      { exact: true }
    );
    await expect(searchFiltersInputLocator).toBeVisible();
    await searchFiltersInputLocator.fill(filterOptionName);
    const filterOptionLocator = getNamedFilterOptionLocator(
      page,
      filterOptionName
    );
    await expect(filterOptionLocator).toBeVisible();
    await filterOptionLocator
      .locator("input[type='checkbox']:checked")
      .first()
      .click();
    await page.locator("body").click();
    const filterTagLocator = getFilterTagLocator(page, filterOptionName);
    await expect(filterTagLocator).not.toBeVisible();
  }
}

/**
 * Make an export request that leaves only the minimal number of checkboxes selected
 * @param page - a Playwright page object
 * @param exportRequestButtonLocator - a Playwright locator to the button to click after the export request is completed
 */
const makeMinimalExportRequest = async (
  page: Page,
  exportRequestButtonLocator: Locator
): Promise<void> => {
  await expect(exportRequestButtonLocator).toBeEnabled();
  // Expect there to be exactly one table on the export page
  await expect(page.getByRole("table")).toHaveCount(1);
  // Select all checkboxes that are not in a table
  const allNonTableCheckboxLocators = await page
    .locator("input[type='checkbox']:not(table input[type='checkbox'])")
    .all();
  for (const checkboxLocator of allNonTableCheckboxLocators) {
    await checkboxLocator.click();
    await expect(checkboxLocator).toBeChecked();
    await expect(checkboxLocator).toBeEnabled();
  }

  // Check the second checkbox in the table (this should be the checkbox after the "select all checkbox")
  const tableLocator = page.getByRole("table");
  const allInTableCheckboxLocators = await tableLocator
    .getByRole("checkbox")
    .all();
  const secondCheckboxInTableLocator = allInTableCheckboxLocators[1];
  await secondCheckboxInTableLocator.click();
  await expect(secondCheckboxInTableLocator).toBeChecked();
  await expect(secondCheckboxInTableLocator).toBeEnabled();
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
  await expect(exportRequestButtonLocator).toBeEnabled();
  await exportRequestButtonLocator.click();
};

/**
 * Get the text from a cell by reading the tooltip if it appears to be an N-tag
 * cell or by reading the text if it does not appear to be
 * @param page - a Playwright Page object
 * @param columnDescription - a columnDescription object for the column
 * @param rowPosition - the zero-indexed position of the row
 * @param columnPosition - the zero-indexed position of the column
 * @param nonOverlappingElement - a locator for an element that does not overlap with a possble tooltip
 * @returns - a Promise with the cell's text
 */
const hoverAndGetText = async (
  page: Page,
  columnDescription: ColumnDescription | undefined,
  rowPosition: number,
  columnPosition: number,
  nonOverlappingElement: Locator
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
    RegExp("\\s*\\d+ " + columnDescription.pluralizedLabel + "\\s*").test(
      cellText
    )
  ) {
    // Hover over the text of the NTag cell
    await cellLocator.locator("*").last().hover();
    // Read the tooltip
    await page.getByRole("tooltip").waitFor();
    const outputText = (await page.getByRole("tooltip").innerText()).trim();
    // Hover over a different part of the page to ensure that the tooltip disappears
    await nonOverlappingElement.hover();
    await expect(page.getByRole("tooltip")).toHaveCount(0);
    // Return the tooltip contents
    return outputText;
  }
  return cellText.trim();
};

/**
 * Test that the Bulk Download index export workflow can be initiated and results in a download on the specified tab
 * @param page - a Playwright page object
 * @param tab - the tab to run the test on
 * @returns - true if the test passes, false if the test fails but does not fail an assertion
 */
export async function testBulkDownloadIndexExportWorkflow(
  page: Page,
  tab: TabDescription
): Promise<boolean> {
  if (tab?.indexExportPage === undefined) {
    console.log(
      "testBulkIndexExportWorkflow Error: indexExportPage not specified for given tab, so test cannot run"
    );
    return false;
  }
  await page.goto(tab.url);
  const exportButtonLocator = page.getByRole("link", {
    name: tab.indexExportPage.indexExportButtonText,
  });
  await expect(exportButtonLocator).toBeVisible();
  await exportButtonLocator.click();
  await expect(
    page.getByText(tab.indexExportPage.requestLandingMessage)
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: tab.indexExportPage.exportOptionButtonText,
    })
  ).toBeEnabled();
  await page
    .getByRole("link", { name: tab.indexExportPage.exportOptionButtonText })
    .click();
  const exportRequestButtonLocator = page.getByRole("button", {
    name: tab.indexExportPage.exportRequestButtonText,
  });
  // Complete the export request form
  await makeMinimalExportRequest(page, exportRequestButtonLocator);
  // Click the Export Action button and check that a download occurs
  const exportActionButtonLocator = page.getByRole("link", {
    name: tab.indexExportPage?.exportActionButtonText,
  });
  await expect(exportActionButtonLocator).toBeEnabled({
    timeout: TIMEOUT_EXPORT_REQUEST,
  });
  const downloadPromise = page.waitForEvent("download", {
    timeout: TIMEOUT_DOWNLOAD,
  }); // This timeout is necessary, as otherwise the test will wait for the global test timeout
  await exportActionButtonLocator.click();
  const download = await downloadPromise;
  // Cancel the download when it occurs, since there's no need to let it fully download
  await download.cancel();
  return true;
}

const PAGE_COUNT_REGEX = /Page \d+ of \d+/;
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
    /Page 1 of \d+/
  );
  // Forward button should start enabled
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .last()
  ).toBeEnabled();
  // Back Button should start disabled
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .first()
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
  await page
    .getByTestId(TEST_IDS.FILTERS)
    .getByText(filterRegex(filterName))
    .click();
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const filterTexts = await page
    .getByRole("button")
    .filter({ hasText: RegExp("(\\d{1," + MAX_FILTER_LENGTH + "})[\\s]*$") })
    .allInnerTexts();
  // Get the filter with the lowest associated count
  const validFilterCounts = filterTexts
    .map(
      // Get filter counts
      (filterOption) =>
        filterOption
          .split("\n")
          .reverse()
          .map((x) => Number(x))
          .find((x) => !isNaN(x) && x !== 0) ?? -1
    )
    .filter(
      /// Filter for counts that will produce a useful number of paginations
      (n) =>
        !isNaN(n) &&
        n > (tab.maxPages ?? 0) * 3 &&
        n < (tab.maxPages ?? 0) * MAX_PAGINATIONS
    );
  if (validFilterCounts.length == 0) {
    console.log(
      "PAGINATION LAST PAGE: Test would involve too many or too few paginations, so halting"
    );
    return false;
  }
  const minFilterValue = Math.min(...validFilterCounts);

  const results = await page
    .getByTestId(TEST_IDS.TABLE_PAGINATION_RESULTS)
    .textContent();

  await page
    .getByRole("button")
    .filter({ hasText: RegExp(`${minFilterValue}[\\s]*$`) })
    .click();

  await expect
    .poll(
      async () =>
        await page.getByTestId(TEST_IDS.TABLE_PAGINATION_RESULTS).textContent()
    )
    .not.toEqual(results);

  await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);

  // Should start on first page, and there should be multiple pages available
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION_PAGE)
      .getByText(PAGE_COUNT_REGEX, { exact: true })
  ).toHaveText(/Page 1 of \d+/);
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION_PAGE)
      .getByText(PAGE_COUNT_REGEX, { exact: true })
  ).not.toHaveText("Page 1 of 1");

  // Detect number of pages
  const splitStartingPageText = (
    await page
      .getByTestId(TEST_IDS.TABLE_PAGINATION_PAGE)
      .getByText(PAGE_COUNT_REGEX, { exact: true })
      .innerText()
  ).split(" ");
  const maxPages = parseInt(
    splitStartingPageText[splitStartingPageText.length - 1]
  );
  // Paginate forwards
  for (let i = 2; i < maxPages + 1; i++) {
    // (dispatchevent necessary because the filter menu sometimes interrupts the click event)
    await page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .last()
      .dispatchEvent("click");
    await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
    // Expect the page count to have incremented
    await expect(
      page
        .getByTestId(TEST_IDS.TABLE_PAGINATION_PAGE)
        .getByText(PAGE_COUNT_REGEX, { exact: true })
    ).toHaveText(`Page ${i} of ${maxPages}`);
  }
  // Expect to be on the last page
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION_PAGE)
      .getByText(PAGE_COUNT_REGEX, { exact: true })
  ).toContainText(`Page ${maxPages} of ${maxPages}`);
  // Expect the back button to be enabled on the last page
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .first()
  ).toBeEnabled();
  // Expect the forward button to be disabled
  await expect(
    page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .last()
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
  await expect(getTabByText(page, tab.tabName)).toHaveAttribute(
    "aria-selected",
    "true"
  );

  await page.getByTestId(TEST_IDS.TABLE_FIRST_CELL).waitFor();

  const firstElementTextLocator = page.getByTestId(TEST_IDS.TABLE_FIRST_CELL);

  // Should start on first page
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
    /Page 1 of \d+/
  );
  const maxPages = 5;
  const FirstTableEntries = [];

  // Paginate forwards
  for (let i = 2; i < maxPages + 1; i++) {
    await expect(firstElementTextLocator).not.toHaveText("");
    const OriginalFirstTableEntry = await firstElementTextLocator.innerText();
    // Click the next button
    // dispatchEvent necessary because the table loading component sometimes interrupts a click event
    await page
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .last()
      .dispatchEvent("click");
    // Expect the page count to have incremented
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      RegExp(`Page ${i} of \\d+`)
    );
    // Expect the back button to be enabled
    await expect(
      page
        .getByTestId(TEST_IDS.TABLE_PAGINATION)
        .locator(MUI_CLASSES.ICON_BUTTON)
        .first()
    ).toBeEnabled();
    // Expect the forwards button to be enabled
    if (i != maxPages) {
      await expect(
        page
          .getByTestId(TEST_IDS.TABLE_PAGINATION)
          .locator(MUI_CLASSES.ICON_BUTTON)
          .last()
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
      .getByTestId(TEST_IDS.TABLE_PAGINATION)
      .locator(MUI_CLASSES.ICON_BUTTON)
      .first()
      .click();
    await page.getByTestId(TEST_IDS.TABLE_PAGINATION_RESULTS).waitFor();
    // Expect page number to be correct
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      RegExp(`Page ${maxPages - i - 1} of \\d+`)
    );
    // Expect page entry to be consistent with forward pagination
    await expect(firstElementTextLocator).toHaveText(OldFirstTableEntry);
  }
}

/**
 * Return the tab with the specified text.
 * @param page - a Playwright page object.
 * @param tabText  - the tab text to search for.
 * @returns - a Playwright locator object for the tab with the specified text.
 */
export const getTabByText = (page: Page, tabText: string): Locator => {
  return page.locator("[role='tab']").filter({ hasText: tabText });
};

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
