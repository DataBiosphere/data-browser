import { test } from "@playwright/test";
import { testUrl } from "../testFunctions";
import {
  ANVIL_CATALOG_TABS,
  ANVIL_CATALOG_TAB_LIST,
} from "./anvilcatalog-tabs";

test("Expect the consortia tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.CONSORTIA;
  await testUrl(page, tab, ANVIL_CATALOG_TAB_LIST);
});

test("Expect the studies tab to appear as selected when the corresponding url is accessedb", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.STUDIES;
  await testUrl(page, tab, ANVIL_CATALOG_TAB_LIST);
});

test("Expect the workspaces tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.WORKSPACES;
  await testUrl(page, tab, ANVIL_CATALOG_TAB_LIST);
});
