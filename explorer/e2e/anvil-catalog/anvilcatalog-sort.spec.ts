import { test } from "@playwright/test";
import { testSortCatalog } from "../testFunctions";
import { ANVIL_CATALOG_TABS } from "./anvilcatalog-tabs";

test("On the Consortia tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, ANVIL_CATALOG_TABS.CONSORTIA);
});

test("On the Studies tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, ANVIL_CATALOG_TABS.STUDIES);
});

test("On the Workspaces tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, ANVIL_CATALOG_TABS.WORKSPACES);
});
