import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test("Expect clicking the datasets tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs.activities.url);
  await testTab(page, anvilTabs.datasets);
});

test("Expect clicking the activities tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, anvilTabs.activities);
});

test("Expect clicking the files tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, anvilTabs.files);
});

test("Expect clicking the donors tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, anvilTabs.donors);
});

test("Expect clicking the biosamples tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, anvilTabs.biosamples);
});
