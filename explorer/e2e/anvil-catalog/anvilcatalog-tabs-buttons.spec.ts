import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { ANVIL_CATALOG_TABS } from "./anvilcatalog-tabs";

test("Expect clicking the consortia tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_CATALOG_TABS.STUDIES, ANVIL_CATALOG_TABS.CONSORTIA);
});

test("Expect clicking the studies tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(
    page,
    ANVIL_CATALOG_TABS.WORKSPACES,
    ANVIL_CATALOG_TABS.STUDIES
  );
});

test("Expect clicking the workspaces tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(
    page,
    ANVIL_CATALOG_TABS.CONSORTIA,
    ANVIL_CATALOG_TABS.WORKSPACES
  );
});
