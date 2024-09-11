import { test } from "@playwright/test";
import { testSortCatalog } from "../testFunctions";
import { ANVIL_CATALOG_TABS } from "./anvilcatalog-tabs";
//TODO: handle boolean return value and fail if it's false for each test
test("On the Consortia tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  const testResult = await testSortCatalog(page, ANVIL_CATALOG_TABS.CONSORTIA);
  if (!testResult) {
    test.fail();
  }
});

test("On the Studies tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  const testResult = await testSortCatalog(page, ANVIL_CATALOG_TABS.STUDIES);
  if (!testResult) {
    test.fail();
  }
});

test("On the Workspaces tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  const testResult = await testSortCatalog(page, ANVIL_CATALOG_TABS.WORKSPACES);
  if (!testResult) {
    test.fail();
  }
});
