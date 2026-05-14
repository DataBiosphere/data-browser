import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { MUI_CLASSES, TEST_IDS } from "../features/common/constants";
import {
  closeAutocompletePopper,
  openSearchAllFilters,
} from "../features/common/filters";

const ENTITY_URL = "/files";
// Used for the row-content-diff test. On Files the first cell renders only an
// icon download button (no text), so `textContent()` returns "" and can't be
// used as a change anchor; this entity has a first cell with real text.
const ENTITY_URL_WITH_FIRST_CELL = "/biosamples";
const PAGE_SIZE = 25;
const PAGES_TO_NAVIGATE = 4;
const SAMPLE_NAVIGATIONS = 3;
// Filter-count bounds for the "applying a filter" tests. Lower bound must
// exceed PAGE_SIZE so the filtered result spans more than one page; upper
// bound keeps the navigation-to-last-page loop fast in CI.
const FILTER_COUNT_MIN = PAGE_SIZE;
const FILTER_COUNT_MAX = 120;

test.describe("AnVIL CMG pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENTITY_URL);
    await paginationResults(page).waitFor();
  });

  test("shows the page counter on first load", async ({ page }) => {
    await expect(pagination(page).getByText(paginationRegex(1))).toBeVisible();
  });

  test("renders both pagination buttons", async ({ page }) => {
    await expect(paginationButtons(page)).toHaveCount(2);
  });

  test("disables the back button and enables the next button on the first page", async ({
    page,
  }) => {
    const buttons = paginationButtons(page);
    await expect(buttons.first()).toBeDisabled();
    await expect(buttons.last()).toBeEnabled();
  });

  test("enables the back button after navigating to page 2", async ({
    page,
  }) => {
    const buttons = paginationButtons(page);
    await triggerActionAndWaitForUpdate(paginationResults(page), () =>
      buttons.last().click()
    );
    await expect(buttons.first()).toBeEnabled();
  });

  test("increments the page counter on each forward navigation", async ({
    page,
  }) => {
    const buttons = paginationButtons(page);
    const results = paginationResults(page);
    for (let pageNo = 1; pageNo <= PAGES_TO_NAVIGATE; pageNo++) {
      await expect(pagination(page)).toHaveText(paginationRegex(pageNo));
      if (pageNo < PAGES_TO_NAVIGATE) {
        await triggerActionAndWaitForUpdate(results, () =>
          buttons.last().click()
        );
      }
    }
  });

  test("shows different table content on every page", async ({ page }) => {
    // Override the Files navigation from beforeEach — on Files the first cell
    // is an icon-only download button with no text content (`textContent()`
    // returns ""), so it can't anchor a per-row content diff. See the
    // ENTITY_URL_WITH_FIRST_CELL note at the top of the file.
    await page.goto(ENTITY_URL_WITH_FIRST_CELL);
    await paginationResults(page).waitFor();

    const buttons = paginationButtons(page);
    const firstCell = tableFirstCell(page);
    const values: (string | null)[] = [await firstCell.textContent()];
    for (let i = 0; i < SAMPLE_NAVIGATIONS; i++) {
      await triggerActionAndWaitForUpdate(firstCell, () =>
        buttons.last().click()
      );
      values.push(await firstCell.textContent());
    }
    expect(new Set(values).size).toEqual(values.length);
  });

  test("keeps the total-pages value constant while navigating", async ({
    page,
  }) => {
    const buttons = paginationButtons(page);
    const results = paginationResults(page);
    const values: (number | undefined)[] = [
      parseTotalPages(await pagination(page).textContent()),
    ];
    for (let i = 0; i < SAMPLE_NAVIGATIONS; i++) {
      await triggerActionAndWaitForUpdate(results, () =>
        buttons.last().click()
      );
      values.push(parseTotalPages(await pagination(page).textContent()));
    }
    expect(new Set(values).size).toEqual(1);
  });

  test("updates total pages after applying a filter", async ({ page }) => {
    const results = paginationResults(page);
    await openSearchAllFilters(page);
    const { button, count } = await findFilterInRange(page);
    await triggerActionAndWaitForUpdate(results, async () => {
      await button.dispatchEvent("click");
      await closeAutocompletePopper(page);
    });
    const totalPages = parseTotalPages(await pagination(page).textContent());
    expect(totalPages).toEqual(Math.ceil(count / PAGE_SIZE));
  });

  test("disables the forward button on the last page", async ({ page }) => {
    const buttons = paginationButtons(page);
    const results = paginationResults(page);
    await openSearchAllFilters(page);
    const { button } = await findFilterInRange(page);
    await triggerActionAndWaitForUpdate(results, async () => {
      await button.dispatchEvent("click");
      await closeAutocompletePopper(page);
    });
    const totalPages =
      parseTotalPages(await pagination(page).textContent()) ?? 1;
    for (let i = 1; i < totalPages; i++) {
      await triggerActionAndWaitForUpdate(results, () =>
        buttons.last().click()
      );
    }
    await expect(buttons.last()).toBeDisabled();
  });
});

/* ——————————————————————————— helpers ——————————————————————————— */

/**
 * Finds the first filter item in the open search-all-filters dropdown whose
 * count is strictly between `min` and `max`.
 *
 * "Required" entries are skipped — those represent the consent-group facet's
 * controlled-access marker and may collide with the filter-mechanics under
 * test in unrelated ways.
 * @param page - Page.
 * @param min - Exclusive lower bound on the filter's count.
 * @param max - Exclusive upper bound on the filter's count.
 * @returns The matching filter-item locator and its numeric count.
 */
async function findFilterInRange(
  page: Page,
  min = FILTER_COUNT_MIN,
  max = FILTER_COUNT_MAX
): Promise<{ button: Locator; count: number }> {
  const items = page
    .getByTestId(TEST_IDS.FILTER_ITEM)
    .filter({ hasNotText: "Required" });
  const itemCount = await items.count();
  for (let i = 0; i < itemCount; i++) {
    const item = items.nth(i);
    const text = await item.getByTestId(TEST_IDS.FILTER_COUNT).textContent();
    const count = Number(text);
    if (count > min && count < max) {
      return { button: item, count };
    }
  }
  throw new Error(`No filter found with count between ${min} and ${max}`);
}

/**
 * Returns the pagination container locator.
 * @param page - Page.
 * @returns The pagination container locator.
 */
function pagination(page: Page): Locator {
  return page.getByTestId(TEST_IDS.TABLE_PAGINATION);
}

/**
 * Returns a locator for both pagination icon buttons (back and next).
 * @param page - Page.
 * @returns A locator selecting the two pagination buttons.
 */
function paginationButtons(page: Page): Locator {
  return pagination(page).locator(MUI_CLASSES.ICON_BUTTON);
}

/**
 * Returns a regex matching "Page N of <any positive integer>".
 * @param n - The expected current page number.
 * @returns A RegExp matching the formatted page counter text.
 */
function paginationRegex(n: number): RegExp {
  return new RegExp(`^Page\\s+${n}\\s+of\\s+\\d+$`);
}

/**
 * Returns the pagination results locator (the row-count summary cell). Used
 * as a content-change anchor for `triggerActionAndWaitForUpdate`.
 * @param page - Page.
 * @returns The pagination results locator.
 */
function paginationResults(page: Page): Locator {
  return page.getByTestId(TEST_IDS.TABLE_PAGINATION_RESULTS);
}

/**
 * Parses the total-pages value from a pagination text like "Page X of Y".
 * @param text - Pagination text.
 * @returns Y as a number, or undefined if the text doesn't match.
 */
function parseTotalPages(text: string | null): number | undefined {
  const match = text?.match(/Page\s+\d+\s+of\s+(\d+)/);
  if (!match?.[1]) return;
  return Number(match[1]);
}

/**
 * Returns the table's first-cell locator.
 * @param page - Page.
 * @returns The first-cell locator.
 */
function tableFirstCell(page: Page): Locator {
  return page.getByTestId(TEST_IDS.TABLE_FIRST_CELL);
}

/**
 * Captures the target locator's text content, runs the action, then polls
 * until the target's text differs from the captured value. Use this to wait
 * for the post-fetch row swap after pagination or filter clicks rather than
 * relying on `waitForLoadState`, which doesn't track in-place data updates.
 * @param target - Locator whose text content changes after the action.
 * @param action - The action to trigger (click, filter selection, etc.).
 */
async function triggerActionAndWaitForUpdate(
  target: Locator,
  action: () => Promise<void>
): Promise<void> {
  const before = await target.textContent();
  await action();
  await expect.poll(() => target.textContent()).not.toEqual(before);
}
