import { test } from "@playwright/test";
import { testUrl } from "../testFunctions";
import { anvilCatalogTabList, anvilcatalogTabs } from "./anvilcatalog-tabs";

test("Expect the consortia tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.consortia;
  await testUrl(page, tab, anvilCatalogTabList);
});

test("Expect the studies tab to appear as selected when the corresponding url is accessedb", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.studies;
  await testUrl(page, tab, anvilCatalogTabList);
});

test("Expect the workspaces tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.workspaces;
  await testUrl(page, tab, anvilCatalogTabList);
});
