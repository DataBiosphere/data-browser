import { expect, Locator, Page, test } from "@playwright/test";
import { ANVIL_TABS } from "./anvil-tabs";
import { KEYBOARD_KEY, MUI_CLASS, TEST_ID } from "../features/common/constants";
import { Response } from "playwright-core";

test.describe("AnVIL Data Explorer pagination", () => {
  let pagination: Locator;
  let buttons: Locator;

  const displayedRows = (page: Page): Locator =>
    page.getByTestId(TEST_ID.PAGINATION_RESULTS);
  const tableFirstCell = (page: Page): Locator =>
    page.getByTestId(TEST_ID.TABLE_FIRST_CELL);

  test.beforeEach(async ({ page }) => {
    await page.goto(ANVIL_TABS.FILES.url);
    await page.waitForResponse(urlOrPredicate);
    await displayedRows(page).waitFor();
    pagination = page.getByTestId(TEST_ID.PAGINATION);
    buttons = pagination.locator(MUI_CLASS.ICON_BUTTON);
  });

  test("shows page‑counter on first load", async () => {
    await expect(pagination.getByText(getPaginationRegex(1))).toBeVisible();
  });

  test("renders pagination buttons", async () => {
    await expect(buttons).toHaveCount(2);
  });

  test("back disabled / next enabled on first page", async () => {
    await expect(buttons.first()).toBeDisabled();
    await expect(buttons.last()).toBeEnabled();
  });

  test("back becomes enabled after going to page 2", async ({ page }) => {
    await navigateAndSettlePage(page, buttons.last(), displayedRows(page));
    await expect(buttons.first()).toBeEnabled();
  });

  test("page increments on each navigation", async ({ page }) => {
    const results = displayedRows(page);

    for (let pageNo = 1; pageNo <= 4; pageNo++) {
      await expect(pagination).toHaveText(getPaginationRegex(pageNo));

      if (pageNo < 4) {
        await navigateAndSettlePage(page, buttons.last(), results);
      }
    }
  });

  test("table content differs on every page", async ({ page }) => {
    const firstCell = tableFirstCell(page);

    const values: (string | null)[] = [];
    values.push(await firstCell.textContent());

    for (let i = 0; i < 3; i++) {
      await navigateAndSettlePage(page, buttons.last(), firstCell);
      values.push(await firstCell.textContent());
    }

    expect(new Set(values).size).toEqual(values.length);
  });

  test("total‑pages value stays constant while navigating", async ({
    page,
  }) => {
    const results = displayedRows(page);

    const values = [];
    values.push(getTotalPages(await pagination.textContent())!);

    for (let i = 0; i < 3; i++) {
      await navigateAndSettlePage(page, buttons.last(), results);
      values.push(getTotalPages(await pagination.textContent())!);
    }

    expect(new Set(values).size).toEqual(1);
  });

  test("something", async ({ page }) => {
    const results = displayedRows(page);
    await openSearchAllFilters(page);
    const listItemButtons = page
      .getByTestId(TEST_ID.FILTER_ITEM)
      .filter({ hasNotText: "Required" });
    let button, count;
    for (let i = 0; i < (await listItemButtons.count()); i++) {
      button = listItemButtons.nth(i);
      count = await button.getByTestId(TEST_ID.FILTER_COUNT).textContent();
      const value = Number(count);
      if (value > 25 && value < 120) break;
    }
    expect(button).toBeDefined();
    await navigateAndSettlePage(page, button!, results);
    await page.keyboard.press(KEYBOARD_KEY.ESCAPE);
    const text = await pagination.textContent();
    expect(getTotalPages(text)).toEqual(Math.ceil(Number(count) / 25));
  });
});

/**
 * Returns a RegExp that matches:  "Page <current> of <any‑positive‑integer>"
 * Example:  getPageRegex(3)  →  /^Page\s+3\s+of\s+\d+$/
 * @param n - The current page number.
 * @returns A RegExp that matches the page number format.
 */
function getPaginationRegex(n: number): RegExp {
  return new RegExp(`^Page\\s+${n}\\s+of\\s+\\d+$`);
}

/**
 * Reads "Page X of Y" and returns Y (total pages).
 * If the text is null or does not match the pattern, returns undefined.
 * @param text - Page text to parse.
 * @returns Total pages.
 */
function getTotalPages(text: string | null): number | undefined {
  const match = text?.match(/Page\s+\d+\s+of\s+(\d+)/);
  if (!match?.[1]) return;
  return Number(match[1]);
}

/**
 * Opens the filter menu for a given filter name.
 * @param page - Page.
 */
export async function openSearchAllFilters(page: Page): Promise<void> {
  const filter = page.getByTestId("search-all-filters");
  await expect(filter).toBeVisible();
  await filter.click();
}

/**
 * Checks if the response URL contains "/index/files" and if the response is OK.
 * @param r - Response.
 * @returns True if the URL contains "/index/files" and the response is OK.
 */
const urlOrPredicate = (r: Response): boolean =>
  r.url().includes("/index/files") && r.ok();

/**
 *  Clicks a control and waits until the matching XHR/Fetch request resolves and the targetLocator's text content changes.
 * @param page - Page.
 * @param control - Control.
 * @param targetLocator - Locator for the element whose text content is expected to change.
 */
async function navigateAndSettlePage(
  page: Page,
  control: Locator,
  targetLocator: Locator
): Promise<void> {
  const results = await targetLocator.textContent();

  await Promise.all([page.waitForResponse(urlOrPredicate), control.click()]);

  await expect
    .poll(async () => await targetLocator.textContent())
    .not.toEqual(results);
}
