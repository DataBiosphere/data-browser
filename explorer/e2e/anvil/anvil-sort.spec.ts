import { test } from "@playwright/test";
import { testSortAzul } from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Expect clicking each column header three times to keep the first text element visible on the Datasets tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  const testResult = await testSortAzul(page, ANVIL_TABS.DATASETS);
  if (!testResult) {
    test.fail();
  }
});

test("Expect clicking each column header three times to keep the first text element visible on the Donors tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  const testResult = await testSortAzul(page, ANVIL_TABS.DONORS);
  if (!testResult) {
    test.fail();
  }
});

test("Expect clicking each column header of each tab three times to keep the first text element visible on the BioSamples tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  const testResult = await testSortAzul(page, ANVIL_TABS.BIOSAMPLES);
  if (!testResult) {
    test.fail();
  }
});

test("Expect clicking each column header three times to keep the first text element visible on the Activities tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  const testResult = await testSortAzul(page, ANVIL_TABS.ACTIVITIES);
  if (!testResult) {
    test.fail();
  }
});

test("Expect clicking each column header three times to keep the first text element visible on the Files tab", async ({
  page,
}) => {
  test.setTimeout(180000);
  const testResult = await testSortAzul(page, ANVIL_TABS.FILES);
  if (!testResult) {
    test.fail();
  }
});
