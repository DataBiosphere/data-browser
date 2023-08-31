import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test("Expect clicking the activities tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilTabs.activities;
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, tab);
});

test("Expect clicking the datasets tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilTabs.datasets;
  await page.goto(anvilTabs.activities.url);
  await testTab(page, tab);
});

test("Expect clicking the files tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilTabs.files;
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, tab);
});

test("Expect clicking the donors tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilTabs.donors;
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, tab);
});

test("Expect clicking the biosamples tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  const tab = anvilTabs.biosamples;
  await page.goto(anvilTabs.datasets.url);
  await testTab(page, tab);
});
