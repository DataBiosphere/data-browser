import { test } from "@playwright/test";
import { testSort } from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test.describe.configure({ mode: "parallel" });

test("Expect clicking the column header to change the first displayed entry in each column on the consortia tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilcatalogTabs.consortia);
});

test.setTimeout(120000);
test("Expect clicking the column header to change the first displayed entry in each column on the studies tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilcatalogTabs.studies);
});

test("Expect clicking the column header to change the first displayed entry in each column on the workspaces tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilcatalogTabs.workspaces);
});
