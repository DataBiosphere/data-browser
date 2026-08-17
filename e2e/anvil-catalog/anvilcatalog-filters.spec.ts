import type { Locator } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { TEST_IDS } from "../features/common/constants";
import {
  closeAutocompletePopper,
  closeFilterPopover,
  expectFilterItemNotSelected,
  expectFilterItemSelected,
  fillSearchAllFilters,
  filterTag,
  getFirstOptionName,
  namedFilterItem,
  openFilterDropdown,
  selectFirstOption,
} from "../features/common/filters";
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
          await closeFilterPopover(page);

          // Search for the option and select it
          await fillSearchAllFilters(searchAllFilters, optionName);
          const filterItem = namedFilterItem(page, optionName);
          await expectFilterItemNotSelected(filterItem);
          await filterItem.click();
          await expectFilterItemSelected(filterItem);
          await closeAutocompletePopper(page);

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
          await closeAutocompletePopper(page);

          // Verify filter tag disappeared
          await expect(filterTag(filters, optionName)).not.toBeVisible();
        }
      });
    });
  }
});
