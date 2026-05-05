import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { KEYBOARD_KEYS, MUI_CLASSES, TEST_IDS } from "./constants";
import { escapeRegExp } from "./utils";

/**
 * Closes any open autocomplete popper via the Escape key and waits for unmount.
 * @param page - Page.
 */
export async function closeAutocompletePopper(page: Page): Promise<void> {
  await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
  await expectAutocompletePopperClosed(page);
}

/**
 * Closes any open filter popover via the Escape key and waits for unmount.
 * @param page - Page.
 */
export async function closeFilterPopover(page: Page): Promise<void> {
  await page.keyboard.press(KEYBOARD_KEYS.ESCAPE);
  await expectFilterPopoverClosed(page);
}

/**
 * Waits for the autocomplete popper to be fully unmounted from the DOM.
 * @param page - Page.
 */
export async function expectAutocompletePopperClosed(
  page: Page
): Promise<void> {
  await expect(page.locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)).toHaveCount(0);
}

/**
 * Waits for the autocomplete popper to be visible.
 * @param page - Page.
 */
export async function expectAutocompletePopperOpen(page: Page): Promise<void> {
  await expect(page.locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)).toBeVisible();
}

/**
 * Asserts that a filter item is not selected.
 * @param filterItem - A filter-item locator.
 */
export async function expectFilterItemNotSelected(
  filterItem: Locator
): Promise<void> {
  await expect(filterItem).not.toHaveClass(/Mui-selected/);
}

/**
 * Asserts that a filter item is selected.
 * @param filterItem - A filter-item locator.
 */
export async function expectFilterItemSelected(
  filterItem: Locator
): Promise<void> {
  await expect(filterItem).toHaveClass(/Mui-selected/);
}

/**
 * Waits for all filter popovers to be fully unmounted from the DOM.
 * @param page - Page.
 */
export async function expectFilterPopoverClosed(page: Page): Promise<void> {
  await expect(filterPopover(page)).toHaveCount(0);
}

/**
 * Waits for the filter popover to be visible.
 * @param page - Page.
 */
export async function expectFilterPopoverOpen(page: Page): Promise<void> {
  await expect(filterPopover(page)).toBeVisible();
}

/**
 * Extracts the display name from a filter item element.
 * @param filterItem - A locator for the filter-item element.
 * @returns The display name of the filter option.
 */
export async function extractOptionName(filterItem: Locator): Promise<string> {
  return (
    await filterItem.getByTestId(TEST_IDS.FILTER_TERM).innerText()
  ).trim();
}

/**
 * Fills the "Search all filters" input and waits for the results to appear.
 * @param searchAllFilters - The search-all-filters container locator.
 * @param text - The text to type into the search input.
 */
export async function fillSearchAllFilters(
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
export function filterPopover(page: Page): Locator {
  return page.getByTestId(TEST_IDS.FILTER_POPOVER);
}

/**
 * Returns a regex matching a sidebar filter button, e.g. "Consent Code (5)".
 * @param filterName - The name of the filter.
 * @returns A RegExp matching the sidebar button text.
 */
export function filterRegex(filterName: string): RegExp {
  return new RegExp(escapeRegExp(filterName) + "\\s+\\(\\d+\\)\\s*");
}

/**
 * Returns a locator for a filter tag (MuiChip) within the filters container.
 * @param filters - The filters container locator.
 * @param name - The filter option name to match.
 * @returns A locator for the filter tag chip.
 */
export function filterTag(filters: Locator, name: string): Locator {
  return filters.locator(MUI_CLASSES.CHIP, { hasText: name });
}

/**
 * Returns a locator for the first filter item in the open popover.
 * @param page - Page.
 * @returns A locator for the first filter item.
 */
export function firstFilterItem(page: Page): Locator {
  return filterPopover(page).getByTestId(TEST_IDS.FILTER_ITEM).first();
}

/**
 * Returns the name of the first filter item in the open popover.
 * @param page - Page.
 * @returns The display name of the first option.
 */
export async function getFirstOptionName(page: Page): Promise<string> {
  return extractOptionName(firstFilterItem(page));
}

/**
 * Returns a locator for a named filter item in the autocomplete popper.
 * @param page - Page.
 * @param optionName - The display name of the filter option.
 * @returns A locator for the matching filter item.
 */
export function namedFilterItem(page: Page, optionName: string): Locator {
  return page
    .locator(MUI_CLASSES.AUTOCOMPLETE_POPPER)
    .getByTestId(TEST_IDS.FILTER_ITEM)
    .filter({ hasText: RegExp(`^${escapeRegExp(optionName)}\\s*\\d+\\s*`) })
    .first();
}

/**
 * Returns a locator for a named filter item in the open filter popover.
 * @param page - Page.
 * @param optionName - The display name of the filter option.
 * @returns A locator for the matching filter item.
 */
export function namedPopoverFilterItem(
  page: Page,
  optionName: string
): Locator {
  return filterPopover(page)
    .getByTestId(TEST_IDS.FILTER_ITEM)
    .filter({ hasText: new RegExp(`^${escapeRegExp(optionName)}\\s*\\d+\\s*`) })
    .first();
}

/**
 * Opens a filter dropdown by clicking its sidebar button.
 * Uses dispatchEvent because the filter menu sometimes intercepts regular clicks.
 * @param filters - The filters container locator.
 * @param filterName - The name of the sidebar filter to open.
 */
export async function openFilterDropdown(
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
export async function selectFirstOption(
  filters: Locator,
  page: Page,
  filterName: string
): Promise<string> {
  await openFilterDropdown(filters, filterName);
  const option = firstFilterItem(page);
  const name = await extractOptionName(option);
  await expectFilterItemNotSelected(option);
  // dispatchEvent works around a webkit issue where regular click() can be
  // swallowed by the popover overlay before reaching the list item.
  await option.dispatchEvent("click");
  // Re-locate by name rather than position since the list may re-sort after
  // selection, causing the positional `.first()` locator to resolve to a
  // different (non-selected) element.
  await expectFilterItemSelected(namedPopoverFilterItem(page, name));
  await closeFilterPopover(page);
  return name;
}
