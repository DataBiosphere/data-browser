import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test("Expect clicking the activities tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilTabs.datasets, anvilTabs.activities);
});

test("Expect clicking the datasets tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilTabs.activities, anvilTabs.datasets);
});

test("Expect clicking the files tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilTabs.datasets, anvilTabs.files);
});

test("Expect clicking the donors tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilTabs.datasets, anvilTabs.donors);
});

test("Expect clicking the biosamples tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, anvilTabs.datasets, anvilTabs.biosamples);
});
