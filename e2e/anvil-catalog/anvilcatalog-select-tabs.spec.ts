import { test } from "@playwright/test";
import {
  testPreSelectedColumns,
  testSelectableColumns,
} from "../testFunctions";
import { ANVIL_CATALOG_TABS } from "./anvilcatalog-tabs";

test("Expect the checkboxes in the 'Edit Columns' menu to add those columns to the tab in the Consortia tab", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.CONSORTIA;
  await testSelectableColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the Consortia tab", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.CONSORTIA;
  await testPreSelectedColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the Studies tab", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.STUDIES;
  await testPreSelectedColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the Workspaces tab", async ({
  page,
}) => {
  const tab = ANVIL_CATALOG_TABS.WORKSPACES;
  await testPreSelectedColumns(page, tab);
});
