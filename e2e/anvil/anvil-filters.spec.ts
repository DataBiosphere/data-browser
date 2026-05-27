import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { MUI_CLASSES, TEST_IDS } from "../features/common/constants";
import {
  closeFilterPopover,
  expectFilterItemNotSelected,
  expectFilterItemSelected,
  filterPopover,
  filterTag,
  firstFilterItem,
  namedPopoverFilterItem,
  openFilterDropdown,
  selectFirstOption,
} from "../features/common/filters";
import { ANVIL_CMG_CATEGORY_NAMES } from "./constants";

const ENTITIES = {
  ACTIVITIES: { name: "Activities", url: "/activities" },
  BIOSAMPLES: { name: "BioSamples", url: "/biosamples" },
  DATASETS: { name: "Datasets", url: "/datasets" },
  DONORS: { name: "Donors", url: "/donors" },
  FILES: { name: "Files", url: "/files" },
};

const FACET_NAMES = Object.values(ANVIL_CMG_CATEGORY_NAMES);

test.describe("AnVIL CMG filters", () => {
  // Two representative entities: the filter sidebar is the same component
  // across all entity pages, so per-entity coverage of the sidebar UI itself
  // is mostly redundant. Files and Donors give us opposite-shape data backing
  // (file-level rows vs donor-level rows) for catching entity-specific empties.
  for (const entity of [ENTITIES.FILES, ENTITIES.DONORS]) {
    test(`every filter on the ${entity.name} page is listed and opens`, async ({
      page,
    }) => {
      await goToEntity(page, entity.url);
      const filters = await getFilters(page);

      // Strict match — catches both missing AND unexpected filters.
      const names = await getFilterNames(filters);
      expect([...names].sort()).toEqual([...FACET_NAMES].sort());

      // Each opens with at least one option and closes cleanly.
      for (const filterName of FACET_NAMES) {
        await openFilterDropdown(filters, filterName);
        await expect(firstFilterItem(page)).toBeVisible();
        await closeFilterPopover(page);
      }
    });
  }

  test(`selecting up to 3 options on the File Format filter on the Datasets page leaves the table populated`, async ({
    page,
  }) => {
    const OPTIONS_TO_TEST = 3;

    await goToEntity(page, ENTITIES.DATASETS.url);
    const filters = await getFilters(page);
    await openFilterDropdown(filters, ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT);
    const items = filterPopover(page).getByTestId(TEST_IDS.FILTER_ITEM);
    const itemCount = Math.min(await items.count(), OPTIONS_TO_TEST);
    // Within a single facet popover, selecting items doesn't reorder the list,
    // so positional locators stay valid across iterations.
    for (let i = 0; i < itemCount; i++) {
      const item = items.nth(i);
      await item.dispatchEvent("click");
      await expectFilterItemSelected(item);
    }
    await closeFilterPopover(page);
    await expect(firstTableCell(page)).toBeVisible();
  });

  test(`selecting File Format on the Files page persists across the other pages`, async ({
    page,
  }) => {
    await goToEntity(page, ENTITIES.FILES.url);
    const filters = await getFilters(page);
    const filterValue = await selectFirstOption(
      filters,
      page,
      ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT
    );
    await expect(filterTag(filters, filterValue)).toBeVisible();
    await expect(firstTableCell(page)).toBeVisible();

    for (const entity of Object.values(ENTITIES)) {
      if (entity === ENTITIES.FILES) continue;
      await entityByName(page, entity.name).dispatchEvent("click");
      await expect(filterTag(filters, filterValue)).toBeVisible();
      await openFilterDropdown(filters, ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT);
      await expectFilterItemSelected(namedPopoverFilterItem(page, filterValue));
      await closeFilterPopover(page);
    }

    await entityByName(page, ENTITIES.FILES.name).dispatchEvent("click");
    await expect(firstTableCell(page)).toBeVisible();
    await expect(filterTag(filters, filterValue)).toBeVisible();
  });

  test(`filter counts on the Activities page match the table results count`, async ({
    page,
  }) => {
    const MAX_PAGE_SIZE = 25;

    await goToEntity(page, ENTITIES.ACTIVITIES.url);
    const filters = await getFilters(page);
    // Selections accumulate across iterations. Each facet's option count is
    // computed given all currently-applied filters, so the table's result
    // count after clicking an option always equals that option's displayed
    // count — regardless of previous selections from other facets.
    for (const filterName of [
      ANVIL_CMG_CATEGORY_NAMES.DIAGNOSIS,
      ANVIL_CMG_CATEGORY_NAMES.REPORTED_ETHNICITY,
      ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT,
    ]) {
      await openFilterDropdown(filters, filterName);
      const firstItem = firstFilterItem(page);
      const itemCount = await readFilterCount(firstItem);
      expect(itemCount).toBeGreaterThan(0);

      await firstItem.dispatchEvent("click");
      await expectFilterItemSelected(firstItem);
      await closeFilterPopover(page);
      await expect(firstTableCell(page)).toBeVisible();

      const visible = Math.min(itemCount, MAX_PAGE_SIZE);
      await expect(
        page.getByText(`Results 1 - ${visible} of ${itemCount}`)
      ).toBeVisible();
    }
  });

  test(`filter tags on the Biosamples page match selected filters and clear them when clicked`, async ({
    page,
  }) => {
    await goToEntity(page, ENTITIES.BIOSAMPLES.url);
    const filters = await getFilters(page);
    for (const filterName of [
      ANVIL_CMG_CATEGORY_NAMES.BIOSAMPLE_TYPE,
      ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT,
      ANVIL_CMG_CATEGORY_NAMES.DIAGNOSIS,
    ]) {
      const filterValue = await selectFirstOption(filters, page, filterName);

      await expect(filterTag(filters, filterValue)).toBeVisible();

      await filterTag(filters, filterValue).dispatchEvent("click");
      await expect(filterTag(filters, filterValue)).not.toBeVisible();

      await openFilterDropdown(filters, filterName);
      await expectFilterItemNotSelected(
        namedPopoverFilterItem(page, filterValue)
      );
      await closeFilterPopover(page);
    }
  });

  test("Clear All on the Files page clears every selected filter", async ({
    page,
  }) => {
    // File Format and Dataset are file-level facets: every file row has a real
    // value for both, so the first option of each is guaranteed not to be
    // "Unspecified" and the two selections produce two distinct filter tags.
    // Donor/biosample-level facets (Diagnosis, BioSample Type, etc.) are
    // populated transitively and can collapse to a single "Unspecified" entry
    // on the Files page, breaking per-name tag assertions.
    const FILE_LEVEL_FILTERS = [
      ANVIL_CMG_CATEGORY_NAMES.FILE_FORMAT,
      ANVIL_CMG_CATEGORY_NAMES.DATASET,
    ];

    await goToEntity(page, ENTITIES.FILES.url);
    const filters = await getFilters(page);

    const filterValues: string[] = [];

    for (const filterName of FILE_LEVEL_FILTERS) {
      filterValues.push(await selectFirstOption(filters, page, filterName));
    }

    for (const filterValue of filterValues) {
      await expect(filterTag(filters, filterValue)).toBeVisible();
    }

    await page.getByTestId(TEST_IDS.CLEAR_ALL_FILTERS).click();

    for (const filterValue of filterValues) {
      await expect(filterTag(filters, filterValue)).not.toBeVisible();
    }

    for (let i = 0; i < FILE_LEVEL_FILTERS.length; i++) {
      await openFilterDropdown(filters, FILE_LEVEL_FILTERS[i]);
      await expectFilterItemNotSelected(
        namedPopoverFilterItem(page, filterValues[i])
      );
      await closeFilterPopover(page);
    }
  });
});

/* ——————————————————————————— helpers ——————————————————————————— */

/**
 * Return a locator for an entity tab in the entity tab list.
 * @param page - Page.
 * @param entityName - The display name of the entity.
 * @returns A locator for the matching entity.
 */
function entityByName(page: Page, entityName: string): Locator {
  return page.getByRole("tab").getByText(entityName, { exact: true });
}

/**
 * Return a locator for the first cell in the first data row.
 * @param page - Page.
 * @returns A locator for the first cell of the first row.
 */
function firstTableCell(page: Page): Locator {
  return page.getByTestId(TEST_IDS.TABLE_FIRST_CELL);
}

/**
 * Read the display names of every sidebar filter button. Each button renders
 * its name followed by a parenthesized count (e.g. "Dataset (3)"); strip the
 * count to get just the name.
 * @param filters - The filters container locator.
 * @returns The list of filter display names rendered in the sidebar.
 */
async function getFilterNames(filters: Locator): Promise<string[]> {
  const texts = await filters.locator(MUI_CLASSES.BUTTON).allInnerTexts();
  return texts.map((t) => t.trim().replace(/\s?\(\d+\)$/, ""));
}

/**
 * Locate the filters sidebar and wait for it to mount.
 * @param page - Page.
 * @returns The filters container locator.
 */
async function getFilters(page: Page): Promise<Locator> {
  const filters = page.getByTestId(TEST_IDS.FILTERS);
  await filters.waitFor();
  return filters;
}

/**
 * Navigate to an entity page.
 * @param page - Page.
 * @param url - Entity page URL.
 */
async function goToEntity(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

/**
 * Read the trailing count from a filter item, e.g. "T2D\n42" -> 42.
 * @param filterItem - A locator for the filter-item element.
 * @returns The numeric count shown on the filter item, or NaN if not present.
 */
async function readFilterCount(filterItem: Locator): Promise<number> {
  const countText = (
    await filterItem.getByTestId(TEST_IDS.FILTER_COUNT).innerText()
  ).trim();
  return Number(countText);
}
