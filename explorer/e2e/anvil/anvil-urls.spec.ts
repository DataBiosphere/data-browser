import { test } from "@playwright/test";
import { testUrl } from "../testFunctions";
import { anvilTabList, anvilTabs } from "./anvil-tabs";

test("Expect the activities tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilTabs.activities;
  await testUrl(page, tab, anvilTabList);
});

test("Expect the datasets tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilTabs.datasets;
  await testUrl(page, tab, anvilTabList);
});

test("Expect the files tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilTabs.files;
  await testUrl(page, tab, anvilTabList);
});

test("Expect the donors tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilTabs.donors;
  await testUrl(page, tab, anvilTabList);
});

test("Expect the biosamples tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = anvilTabs.biosamples;
  await testUrl(page, tab, anvilTabList);
});
