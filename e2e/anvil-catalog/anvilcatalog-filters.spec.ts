import { test } from "@playwright/test";
import {
  testDeselectFiltersThroughSearchBar,
  testSelectFiltersThroughSearchBar,
} from "../testFunctions";
import {
  ANVIL_CATALOG_FILTERS,
  ANVIL_CATALOG_TABS,
  CONSENT_CODE_INDEX,
  DBGAP_ID_INDEX,
  TERRA_WORKSPACE_INDEX,
} from "./anvilcatalog-tabs";

const filterList = [CONSENT_CODE_INDEX, DBGAP_ID_INDEX, TERRA_WORKSPACE_INDEX];

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Consortia tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.CONSORTIA,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Studies tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.STUDIES,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Workspaces tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.WORKSPACES,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Consortia tab', async ({
  page,
}) => {
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.CONSORTIA,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Studies tab', async ({
  page,
}) => {
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.STUDIES,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Workspaces tab', async ({
  page,
}) => {
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_CATALOG_TABS.WORKSPACES,
    filterList.map((i: number) => ANVIL_CATALOG_FILTERS[i])
  );
});
