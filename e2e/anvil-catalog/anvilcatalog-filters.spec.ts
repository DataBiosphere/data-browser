import { expect, Locator, Page, test } from "@playwright/test";
import {
  KEYBOARD_KEYS,
  MUI_CLASSES,
  TEST_IDS,
} from "../features/common/constants";
import { ANVIL_CATALOG_CATEGORY_NAMES } from "./constants";

const ENTITIES = [
  { name: "Consortia", url: "/data/consortia" },
  { name: "Studies", url: "/data/studies" },
  { name: "Workspaces", url: "/data/workspaces" },
];

const FACET_NAMES = [
  ANVIL_CATALOG_CATEGORY_NAMES.CONSENT_CODE,
  ANVIL_CATALOG_CATEGORY_NAMES.DBGAP_ID,
  ANVIL_CATALOG_CATEGORY_NAMES.TERRA_WORKSPACE_NAME,
];

test.describe("AnVIL Catalog filter search", () => {
  for (const entity of ENTITIES) {
    test.describe(`${entity.name} tab`, () => {
      let filters: Locator;
      let searchAllFilters: Locator;

      test.beforeEach(async ({ page }) => {
        await page.goto(entity.url);
        filters = page.getByTestId(TEST_IDS.FILTERS);
        searchAllFilters = page.getByTestId(TEST_IDS.SEARCH_ALL_FILTERS);
        await filters.waitFor();
      });

      test("selects filters through search bar", async ({ page }) => {
        for (const filterName of FACET_NAMES) {
          // Open filter dropdown, note first option name, close
          await openFilterDropdown(filters, filterName);
          const optionName = await getFirstOptionName(page);
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
          await expectFilterPopoverClosed(page);

          // Search for the option and select it
          await fillSearchAllFilters(searchAllFilters, optionName);
          const filterItem = namedFilterItem(page, optionName);
          await expectFilterItemNotSelected(filterItem);
          await filterItem.click();
          await expectFilterItemSelected(filterItem);
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
          await expectAutocompletePopperClosed(page);

          // Verify filter tag appeared
          await expect(filterTag(filters, optionName)).toBeVisible();

          // Clean up: remove filter tag
          await filterTag(filters, optionName).dispatchEvent("click");
          await expect(filterTag(filters, optionName)).not.toBeVisible();
        }
      });

      test("deselects filters through search bar", async ({ page }) => {
        for (const filterName of FACET_NAMES) {
          // Select the first option through the dropdown
          const optionName = await selectFirstOption(filters, page, filterName);
          await expect(filterTag(filters, optionName)).toBeVisible();

          // Search for the option and deselect it
          await fillSearchAllFilters(searchAllFilters, optionName);
          const filterItem = namedFilterItem(page, optionName);
          await expectFilterItemSelected(filterItem);
          await filterItem.click();
          await expectFilterItemNotSelected(filterItem);
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
          await expectAutocompletePopperClosed(page);

          // Verify filter tag disappeared
          await expect(filterTag(filters, optionName)).not.toBeVisible();
        }
      });
    });
  }
});

/* ——————————————————————————— helpers ——————————————————————————— */

/**
 * Escapes regex special characters in a string.
 * @param s - The string to escape.
 * @returns A string with all RegExp special characters escaped.
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Waits for the autocomplete popper to be fully unmounted from the DOM.
 * @param page - Page.
 */
async function expectAutocompletePopperClosed(page: Page): Promise<void> {
  await expect(page.locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)).toHaveCount(0);
}

/**
 * Waits for the autocomplete popper to be visible.
 * @param page - Page.
 */
async function expectAutocompletePopperOpen(page: Page): Promise<void> {
  await expect(page.locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)).toBeVisible();
}

/**
 * Asserts that a filter item is not selected.
 * @param filterItem - A filter-item locator.
 */
async function expectFilterItemNotSelected(filterItem: Locator): Promise<void> {
  await expect(filterItem).not.toHaveClass(/Mui-selected/);
}

/**
 * Asserts that a filter item is selected.
 * @param filterItem - A filter-item locator.
 */
async function expectFilterItemSelected(filterItem: Locator): Promise<void> {
  await expect(filterItem).toHaveClass(/Mui-selected/);
}

/**
 * Waits for all filter popovers to be fully unmounted from the DOM.
 * @param page - Page.
 */
async function expectFilterPopoverClosed(page: Page): Promise<void> {
  await expect(filterPopover(page)).toHaveCount(0);
}

/**
 * Waits for the filter popover to be visible.
 * @param page - Page.
 */
async function expectFilterPopoverOpen(page: Page): Promise<void> {
  await expect(filterPopover(page)).toBeVisible();
}

/**
 * Extracts the display name from a filter item element.
 * @param filterItem - A locator for the filter-item element.
 * @returns The display name of the filter option.
 */
async function extractOptionName(filterItem: Locator): Promise<string> {
  return (
    await filterItem.getByTestId(TEST_IDS.FILTER_TERM).innerText()
  ).trim();
}

/**
 * Fills the "Search all filters" input and waits for the results to appear.
 * @param searchAllFilters - The search-all-filters container locator.
 * @param text - The text to type into the search input.
 */
async function fillSearchAllFilters(
  searchAllFilters: Locator,
  text: string
): Promise<void> {
  await expectAutocompletePopperClosed(searchAllFilters.page());
  const input = searchAllFilters.getByRole("combobox");
  await input.fill(text);
  await expectAutocompletePopperOpen(searchAllFilters.page());
}

/**
 * Returns a locator for the filter popover.
 * @param page - Page.
 * @returns A locator for the filter popover.
 */
function filterPopover(page: Page): Locator {
  return page.getByTestId(TEST_IDS.FILTER_POPOVER);
}

/**
 * Returns a regex matching a sidebar filter button, e.g. "Consent Code (5)".
 * @param filterName - The name of the filter.
 * @returns A RegExp matching the sidebar button text.
 */
function filterRegex(filterName: string): RegExp {
  return new RegExp(escapeRegExp(filterName) + "\\s+\\(\\d+\\)\\s*");
}

/**
 * Returns a locator for a filter tag (MuiChip) within the filters container.
 * @param filters - The filters container locator.
 * @param name - The filter option name to match.
 * @returns A locator for the filter tag chip.
 */
function filterTag(filters: Locator, name: string): Locator {
  return filters.locator(MUI_CLASSES.CHIP, { hasText: name });
}

/**
 * Returns a locator for the first filter item in the open popover.
 * @param page - Page.
 * @returns A locator for the first filter item.
 */
function firstFilterItem(page: Page): Locator {
  return filterPopover(page).getByTestId(TEST_IDS.FILTER_ITEM).first();
}

/**
 * Returns the name of the first filter item in the open popover.
 * @param page - Page.
 * @returns The display name of the first option.
 */
async function getFirstOptionName(page: Page): Promise<string> {
  return extractOptionName(firstFilterItem(page));
}

/**
 * Returns a locator for a named filter item in the autocomplete popper.
 * @param page - Page.
 * @param optionName - The display name of the filter option.
 * @returns A locator for the matching filter item.
 */
function namedFilterItem(page: Page, optionName: string): Locator {
  return page
    .locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)
    .getByTestId(TEST_IDS.FILTER_ITEM)
    .filter({ hasText: RegExp(`^${escapeRegExp(optionName)}\\s*\\d+\\s*`) })
    .first();
}

/**
 * Opens a filter dropdown by clicking its sidebar button.
 * Uses dispatchEvent because the filter menu sometimes intercepts regular clicks.
 * @param filters - The filters container locator.
 * @param filterName - The name of the sidebar filter to open.
 */
async function openFilterDropdown(
  filters: Locator,
  filterName: string
): Promise<void> {
  await expectFilterPopoverClosed(filters.page());
  const button = filters.getByText(filterRegex(filterName));
  await expect(button).toBeVisible();
  await button.dispatchEvent("click");
  await expectFilterPopoverOpen(filters.page());
}

/**
 * Opens a sidebar filter dropdown, selects its first option, and returns the
 * option name. Waits for the item to be selected before returning.
 * @param filters - The filters container locator.
 * @param page - Page (needed for popover content).
 * @param filterName - The name of the sidebar filter to open.
 * @returns The display name of the selected option.
 */
async function selectFirstOption(
  filters: Locator,
  page: Page,
  filterName: string
): Promise<string> {
  await openFilterDropdown(filters, filterName);
  const option = firstFilterItem(page);
  const name = await extractOptionName(option);
  await expectFilterItemNotSelected(option);
  await option.click();
  await expectFilterItemSelected(option);
  await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
  await expectFilterPopoverClosed(page);
  return name;
}
