import { test } from "@playwright/test";
import { testSortAzul } from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Expect clicking each column header three times to keep the first text element visible on the Datasets tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  await testSortAzul(page, ANVIL_TABS.DATASETS);
});

test("Expect clicking each column header three times to keep the first text element visible on the Donors tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  await testSortAzul(page, ANVIL_TABS.DONORS);
});

test("Expect clicking each column header of each tab three times to keep the first text element visible on the BioSamples tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  await testSortAzul(page, ANVIL_TABS.BIOSAMPLES);
});

test("Expect clicking each column header three times to keep the first text element visible on the Activities tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  await testSortAzul(page, ANVIL_TABS.ACTIVITIES);
});

test("Expect clicking each column header three times to keep the first text element visible on the Files tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  await testSortAzul(page, ANVIL_TABS.FILES);
});
