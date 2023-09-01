import { test } from "@playwright/test";
import {
  testPreSelectedColumns,
  testSelectableColumns,
} from "../testFunctions";
import { anvilcatalogTabs } from "./anvilcatalog-tabs";

test("Expect the checkboxes in the 'Edit Columns' menu to add those columns to the tab in the Consortia tab", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.consortia;
  await testSelectableColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the consortia tab", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.consortia;
  await testPreSelectedColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the studies tab", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.studies;
  await testPreSelectedColumns(page, tab);
});

test("Expect the checkboxes for preselected columns in the 'Edit Columns' menu to be checked and disabled on the workspaces tab", async ({
  page,
}) => {
  const tab = anvilcatalogTabs.workspaces;
  await testPreSelectedColumns(page, tab);
});
