import { test } from "@playwright/test";
import { testSortCatalog } from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test.describe.configure({ mode: "parallel" });

test.setTimeout(120000);
test("Expect clicking the column header to change the first displayed entry in each column on the consortia tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.consortia);
});

test.setTimeout(120000);
test("Expect clicking the column header to change the first displayed entry in each column on the studies tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.studies);
});

test.setTimeout(120000);
test("Expect clicking the column header to change the first displayed entry in each column on the workspaces tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSortCatalog(page, anvilcatalogTabs.workspaces);
});
