import { testSortCatalog } from "../testFunctions";
import { ANVIL_CATALOG_TABS } from "./anvilcatalog-tabs";
import { Page, Locator, test } from "@playwright/test";
import { TEST_IDS } from "../features/common/constants";

const tableFirstCell = (page: Page): Locator =>
  page.getByTestId(TEST_IDS.TABLE_FIRST_CELL);

const TABS = [
  ANVIL_CATALOG_TABS.CONSORTIA,
  ANVIL_CATALOG_TABS.STUDIES,
  ANVIL_CATALOG_TABS.WORKSPACES,
];

test.describe("AnVIL Catalog Table Sort Tests", () => {
  for (const tab of TABS) {
    test(`On the ${tab.tabName} tab, expect clicking the column header (the sort button) to keep the first element of the column visible`, async ({
      page,
    }) => {
      await page.goto(tab.url);
      await tableFirstCell(page).waitFor();
      const testResult = await testSortCatalog(page, tab);
      if (!testResult) {
        test.fail();
      }
    });
  }
});
