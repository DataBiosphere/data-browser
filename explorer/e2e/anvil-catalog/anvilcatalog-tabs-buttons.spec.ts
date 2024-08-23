import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test("Expect clicking the consortia tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.consortia;
  await page.goto(anvilcatalogTabs.studies.url);
  await testTab(page, tab);
});

test("Expect clicking the studies tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.studies;
  await page.goto(anvilcatalogTabs.workspaces.url);
  await testTab(page, tab);
});

test("Expect clicking the workspaces tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.workspaces;
  await page.goto(anvilcatalogTabs.consortia.url);
  await testTab(page, tab);
});
