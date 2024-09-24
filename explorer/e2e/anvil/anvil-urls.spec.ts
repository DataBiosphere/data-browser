import { test } from "@playwright/test";
import { testUrl } from "../testFunctions";
import { ANVIL_TABS, ANVIL_TAB_LIST } from "./anvil-tabs";

test("Expect the activities tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_TABS.ACTIVITIES;
  await testUrl(page, tab, ANVIL_TAB_LIST);
});

test("Expect the datasets tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_TABS.DATASETS;
  await testUrl(page, tab, ANVIL_TAB_LIST);
});

test("Expect the files tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_TABS.FILES;
  await testUrl(page, tab, ANVIL_TAB_LIST);
});

test("Expect the donors tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_TABS.DONORS;
  await testUrl(page, tab, ANVIL_TAB_LIST);
});

test("Expect the biosamples tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = ANVIL_TABS.BIOSAMPLES;
  await testUrl(page, tab, ANVIL_TAB_LIST);
});
