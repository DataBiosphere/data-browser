import { test } from "@playwright/test";
import { testSortCatalog } from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test("On the Consortia tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.consortia);
});

test("On the Studies tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.studies);
});

test("On the Workspaces tab, expect clicking the column header (the sort button) to keep the first element of the column visible", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.workspaces);
});
