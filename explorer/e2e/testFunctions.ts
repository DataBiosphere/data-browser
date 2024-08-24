import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { ANVIL_TABS } from "./anvil/anvil-tabs";
import {
  BackpageHeader,
  ColumnDescription,
  TabDescription,
} from "./testInterfaces";
import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import {
  BackpageHeader,
  ColumnDescription,
  TabDescription,
} from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

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
  if (endTab.emptyFirstColumn) {
    await expect(page.getByRole("columnheader")).toHaveText(
      [" "].concat(endTab.preselectedColumns.map((x) => x.name))
    );
  } else {
    await expect(page.getByRole("columnheader")).toHaveText(
      endTab.preselectedColumns.map((x) => x.name)
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
      const lastElementTextLocator = getLastRowNthColumnTextLocator(
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
  // Navigate to the tab
  await page.goto(tab.url);
  // Select the "Edit Columns" menu
  await page.getByRole("button").getByText("Edit Columns").click();
  await expect(page.getByRole("menu")).toBeVisible();
  // Enable each selectable tab
  for (const column of tab.selectableColumns) {
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
    const previouslySelected = getNamedFilterButtonLocator(page, filterName);
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
      console.log(
        "FILTER COUNTS: The number associated with the filter is negative"
      );
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
  await page.goto(tab.url);
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
  // Select each filter and get the names of the actual filter text
  for (const filterName of filterNames) {
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
  // Ensure that the filters still show as unchecked
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

/**
 * Get the first link to a backpage with specified backpage access
 * @param page - a Playright page locator
 * @param access - the string denoting the level of access desired
 * @returns a Pla
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
 * @param tab - the Tab to test on
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
 */
export async function testBackpageDetails(
  page: Page,
  tab: TabDescription
): Promise<void> {
  if (
    tab.backpageHeaders === undefined ||
    tab.backpageExportButtons === undefined
  ) {
    // If the tab is not set up with backpage info, fail the test
    await expect(false);
    return;
  }
  await page.goto(tab.url);
  // Enable test columns
  await testSelectableColumns(page, tab);
  const headers: { header: string; value: string }[] = [];
  const combinedColumns = tab.preselectedColumns.concat(tab.selectableColumns);
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
        await expect(false);
        return;
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
}

const PAGE_COUNT_REGEX = /Page [0-9]+ of [0-9]+/;
const BACK_BUTTON_TEST_ID = "WestRoundedIcon";
const FORWARD_BUTTON_TEST_ID = "EastRoundedIcon";
const ERROR = "ERROR";

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

const MAX_PAGINATIONS = 200;
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
        n > (ANVIL_TABS.FILES.maxPages ?? 0) * 3 &&
        n < (ANVIL_TABS.FILES.maxPages ?? 0) * MAX_PAGINATIONS
    );
  if (filterCounts.length == 0) {
    console.log(
      "PAGINATION TEST: Test would involve too many paginations, so halting"
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
  const SplitStartingPageText = (
    await page.getByText(PAGE_COUNT_REGEX, { exact: true }).innerText()
  ).split(" ");
  const max_pages = parseInt(
    SplitStartingPageText[SplitStartingPageText.length - 1]
  );
  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(FORWARD_BUTTON_TEST_ID) })
      .dispatchEvent("click");
    await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
    // Expect the page count to have incremented
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      `Page ${i} of ${max_pages}`
    );
  }
  // Expect to be on the last page
  await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toContainText(
    `Page ${max_pages} of ${max_pages}`
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
  const max_pages = 5;
  const FirstTableEntries = [];

  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
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
    if (i != max_pages) {
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
  for (let i = 0; i < max_pages - 1; i++) {
    const OldFirstTableEntry = FirstTableEntries[max_pages - i - 2];
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(BACK_BUTTON_TEST_ID) })
      .click();
    // Expect page number to be correct
    await expect(page.getByText(PAGE_COUNT_REGEX, { exact: true })).toHaveText(
      RegExp(`Page ${max_pages - i - 1} of [0-9]+`)
    );
    // Expect page entry to be consistent with forward pagination
    await expect(firstElementTextLocator).toHaveText(OldFirstTableEntry);
  }
}

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
