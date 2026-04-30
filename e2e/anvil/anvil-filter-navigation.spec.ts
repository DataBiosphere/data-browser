import { expect, Locator, Page, test } from "@playwright/test";
import { MUI_CLASSES, TEST_IDS } from "../features/common/constants";

const DATASETS_URL = "/datasets";

const FILTER_NAMES = {
  ORGANISM_TYPE: "Organism Type",
  PHENOTYPIC_SEX: "Phenotypic Sex",
};

test.describe("Filter navigation persistence", () => {
  let filters: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto(DATASETS_URL);
    filters = page.getByTestId(TEST_IDS.FILTERS);
    await expect(firstTableCell(page)).toBeVisible();
  });

  test("filters persist through detail page navigation and appear in export Current Query", async ({
    page,
  }) => {
    // Select filters from two different categories.
    const filterValueA = await selectFirstFilterOption(
      page,
      FILTER_NAMES.PHENOTYPIC_SEX
    );
    const filterValueB = await selectFirstFilterOption(
      page,
      FILTER_NAMES.ORGANISM_TYPE
    );

    // Verify URL contains filter params and both filter tags display.
    await expect(page).toHaveURL(/filter=/);
    await expectFilterTagCount(filters, 2);

    // Navigate to a dataset detail page and return back.
    await firstTableCell(page).locator("a").click();
    await page.goBack();

    // Confirm filters persist after returning from the detail page.
    await expect(firstTableCell(page)).toBeVisible();
    await expect(page).toHaveURL(/filter=/);
    await expectFilterTagCount(filters, 2);

    // Navigate to the export page via the Export button.
    await page.getByTestId(TEST_IDS.EXPORT_BUTTON).click();
    await page.waitForURL(/\/export/);

    // Verify "Current Query" shows both filter facet names and selected terms.
    // Labels and values may appear in both "Current Query" and "Selected Data
    // Summary", so use .first() to target the "Current Query" section which
    // renders first in the DOM.
    await expect(page.getByText("Current Query")).toBeVisible();
    await expect(
      page.getByText(FILTER_NAMES.PHENOTYPIC_SEX).first()
    ).toBeVisible();
    await expect(
      page.getByText(FILTER_NAMES.ORGANISM_TYPE).first()
    ).toBeVisible();
    await expect(page.getByText(filterValueA).first()).toBeVisible();
    await expect(page.getByText(filterValueB).first()).toBeVisible();
  });
});

/* ——————————————————————————— helpers ——————————————————————————— */

/**
 * Escape regex special characters in a string.
 * @param s - the string to escape.
 * @returns a string with all RegExp special characters escaped.
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Assert that the filters container has the expected number of filter tags.
 * @param filters - the filters container locator.
 * @param count - the expected number of filter tag chips.
 */
async function expectFilterTagCount(
  filters: Locator,
  count: number
): Promise<void> {
  await expect(filters.locator(MUI_CLASSES.CHIP)).toHaveCount(count);
}

/**
 * Return a regex matching a sidebar filter button, e.g. "Diagnosis (123)".
 * @param filterName - the name of the filter.
 * @returns a RegExp matching the sidebar button text.
 */
function filterRegex(filterName: string): RegExp {
  return new RegExp(escapeRegExp(filterName) + "\\s+\\(\\d+\\)\\s*");
}

/**
 * Return a locator for the first table cell in the first data row.
 * @param page - a Playwright page object.
 * @returns a locator for the first cell.
 */
function firstTableCell(page: Page): Locator {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .first()
    .getByRole("cell")
    .first();
}

/**
 * Extract the display name from a filter option element.
 * Filter options render as "[name]\n[count]" — this returns the name part.
 * @param filterOption - a locator for the filter option.
 * @returns the display name of the filter option.
 */
async function getOptionName(filterOption: Locator): Promise<string> {
  return (
    (await filterOption.innerText())
      .split("\n")
      .map((s) => s.trim())
      .find((s) => s.length > 0) ?? ""
  );
}

/**
 * Open a filter dropdown, select the first option, close the dropdown,
 * and return the selected option's display name.
 * @param page - a Playwright page object.
 * @param filterName - the display name of the filter category.
 * @returns the display name of the selected filter option.
 */
async function selectFirstFilterOption(
  page: Page,
  filterName: string
): Promise<string> {
  await page.getByText(filterRegex(filterName)).dispatchEvent("click");
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const filterOption = page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .first();
  const filterValue = await getOptionName(filterOption);
  await filterOption.getByRole("checkbox").click();
  await expect(filterOption.getByRole("checkbox")).toBeChecked();
  await page.locator("body").click();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  return filterValue;
}
