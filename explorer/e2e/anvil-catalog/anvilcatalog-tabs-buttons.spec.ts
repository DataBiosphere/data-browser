import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test("Expect clicking the consortia tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilcatalogTabs.studies, anvilcatalogTabs.consortia);
});

test("Expect clicking the studies tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilcatalogTabs.workspaces, anvilcatalogTabs.studies);
});

test("Expect clicking the workspaces tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilcatalogTabs.consortia, anvilcatalogTabs.workspaces);
});
