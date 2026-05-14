import { expect, Locator, Page } from "@playwright/test";
import { ANVIL_TABS } from "./anvil/anvil-tabs";
import { TITLE_TEXT_REQUEST_FILE_MANIFEST } from "./anvil/common/constants";
import { MUI_CLASSES, TEST_IDS } from "./features/common/constants";
import { ColumnDescription, TabDescription } from "./testInterfaces";

/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

// Timeout constants
const TIMEOUT_EXPORT_REQUEST = 60000;
const TIMEOUT_DOWNLOAD = 10000;

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
const getMthRowNthColumnCellLocator = (
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
const getFirstRowNthColumnCellLocator = (
  page: Page,
  columnIndex: number
): Locator => {
  return getMthRowNthColumnCellLocator(page, 0, columnIndex);
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
 * Escape a string so it can safely be used in a regexp
 * @param string - the string to escape
 * @returns - A string that has all Regexp special characters escaped
 */
function escapeRegExp(string: string): string {
  // Searches for regex special characters and adds backslashes in front of them to escape
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 *  Tests bulk download of a file manifest from the files tab.
 * @param page - a Playwright page object
 * @returns - True if the test passes, false if the test fails.
 */
export async function testBulkDownloadFileManifestWorkflow(
  page: Page
): Promise<boolean> {
  await page.goto(ANVIL_TABS.FILES.url);

  const buttonLocator = page.getByRole("link", { name: "Export" });
  await expect(buttonLocator).toBeVisible();
  await buttonLocator.click();

  // Select the file manifest export method.
  const cardLocator = getCard(page, TITLE_TEXT_REQUEST_FILE_MANIFEST);

  // Check that the card link is not disabled.
  await expect(cardLocator).not.toHaveClass(/Mui-disabled/);

  // Click the card to go to the export request form.
  await cardLocator.click();

  await page.waitForURL("**/export/download-manifest");

  const exportRequestButtonLocator = page.getByRole("button", {
    name: "Prepare Manifest",
  });

  await expect(exportRequestButtonLocator).toBeVisible();

  // Complete the export request form
  await makeMinimalExportRequest(page, exportRequestButtonLocator);

  // Click the Export Action button and check that a download occurs
  const exportActionButtonLocator = page.getByRole("link", {
    name: "Download Manifest",
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

/**
 * Return the card with the given heading text.
 * @param page - Playwright page object.
 * @param headingText - Heading text.
 * @returns - Playwright locator object for the card with the given heading text.
 */
function getCard(page: Page, headingText: string): Locator {
  return getHeadingWithText(page, headingText)
    .locator("xpath=ancestor::*[contains(@class,'MuiPaper-root')]")
    .locator(".MuiCardActionArea-root");
}

/**
 * Return the heading with the given text.
 * @param page - Playwright page object.
 * @param headingText - Heading text.
 * @returns - Playwright locator object for the dataset export method.
 */
function getHeadingWithText(page: Page, headingText: string): Locator {
  return page.locator(`h3:has-text("${headingText}")`);
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
