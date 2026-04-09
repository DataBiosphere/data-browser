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
  ANVIL_CATALOG_CATEGORY_NAMES.DB_GAP_ID,
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
          const optionName = await getFirstOptionName(
            filters,
            page,
            filterName
          );
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);

          // Search for the option and select it
          await fillSearchAllFilters(searchAllFilters, optionName);
          const filterItem = namedFilterItem(page, optionName);
          await expect(filterItemCheckbox(filterItem)).not.toBeChecked();
          await filterItem.click();

          // Verify filter tag appeared before closing the dropdown
          await expect(filterTag(filters, optionName)).toBeVisible();
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);

          // Clean up: remove filter tag
          await filterTag(filters, optionName).dispatchEvent("click");
          await expect(filterTag(filters, optionName)).not.toBeVisible();
        }
      });

      test("deselects filters through search bar", async ({ page }) => {
        for (const filterName of FACET_NAMES) {
          // Select the first option through the dropdown
          const optionName = await selectFirstOption(filters, page, filterName);
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
          await expect(filterTag(filters, optionName)).toBeVisible();

          // Search for the option and deselect it
          await fillSearchAllFilters(searchAllFilters, optionName);
          const filterItem = namedFilterItem(page, optionName);
          await expect(filterItemCheckbox(filterItem)).toBeChecked();
          await filterItem.click();

          // Verify filter tag disappeared before closing the dropdown
          await expect(filterTag(filters, optionName)).not.toBeVisible();
          await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
        }
      });
    });
  }
});

/**
 * Escapes regex special characters in a string.
 * @param s - The string to escape.
 * @returns A string with all RegExp special characters escaped.
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
 * Fills the "Search all filters" input with the given text.
 * @param searchAllFilters - The search-all-filters container locator.
 * @param text - The text to type into the search input.
 */
async function fillSearchAllFilters(
  searchAllFilters: Locator,
  text: string
): Promise<void> {
  const input = searchAllFilters.getByRole("combobox");
  await expect(input).toBeVisible();
  await input.fill(text);
}

/**
 * Returns the checkbox input within a filter item.
 * @param filterItem - A filter-item locator.
 * @returns A locator for the checkbox input.
 */
function filterItemCheckbox(filterItem: Locator): Locator {
  return filterItem.locator("input[type='checkbox']");
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
 * Returns a locator for the first filter item.
 * Searches at page level because dropdown popovers render in a portal.
 * @param page - Page.
 * @returns A locator for the first filter item.
 */
function firstFilterItem(page: Page): Locator {
  return page.getByTestId(TEST_IDS.FILTER_ITEM).first();
}

/**
 * Opens a sidebar filter dropdown and returns the name of its first option.
 * @param filters - The filters container locator.
 * @param page - Page (needed for popover content).
 * @param filterName - The name of the sidebar filter to open.
 * @returns The display name of the first option in the dropdown.
 */
async function getFirstOptionName(
  filters: Locator,
  page: Page,
  filterName: string
): Promise<string> {
  await openFilterDropdown(filters, filterName);
  return extractOptionName(firstFilterItem(page));
}

/**
 * Returns a locator for a named filter item.
 * Searches at page level because the search results dropdown renders in a
 * MUI Autocomplete portal outside the search-all-filters container.
 * @param page - Page.
 * @param optionName - The display name of the filter option.
 * @returns A locator for the matching filter item.
 */
function namedFilterItem(page: Page, optionName: string): Locator {
  return page
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
  const button = filters.getByText(filterRegex(filterName));
  await expect(button).toBeVisible();
  await button.dispatchEvent("click");
}

/**
 * Opens a sidebar filter dropdown, selects its first option, and returns the
 * option name. Waits for the checkbox to be checked before returning.
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
  await option.click();
  await expect(filterItemCheckbox(option)).toBeChecked();
  return name;
}
