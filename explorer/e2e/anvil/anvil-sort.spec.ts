import { test } from "@playwright/test";
import { testSortAzure } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test.describe.configure({ mode: "parallel" });

test("Expect clicking each column header three times to keep the first text element visible on the Datasets tab", async ({
  page,
}) => {
  await testSortAzure(page, anvilTabs.datasets);
});

test("Expect clicking each column header three times to keep the first text element visible on the Donors tab", async ({
  page,
}) => {
  await testSortAzure(page, anvilTabs.donors);
});

test("Expect clicking each column header of each tab three times to keep the first text element visible on the BioSamples tab", async ({
  page,
}) => {
  await testSortAzure(page, anvilTabs.biosamples);
});

test("Expect clicking each column header three times to keep the first text element visible on the Activities tab", async ({
  page,
}) => {
  await testSortAzure(page, anvilTabs.activities);
});

test("Expect clicking each column header three times to keep the first text element visible on the Files tab", async ({
  page,
}) => {
  await testSortAzure(page, anvilTabs.files);
});
