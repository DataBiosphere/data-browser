import { test } from "@playwright/test";
import { testTab } from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Expect clicking the activities tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_TABS.DATASETS, ANVIL_TABS.ACTIVITIES);
});

test("Expect clicking the datasets tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_TABS.ACTIVITIES, ANVIL_TABS.DATASETS);
});

test("Expect clicking the files tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_TABS.DATASETS, ANVIL_TABS.FILES);
});

test("Expect clicking the donors tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_TABS.DATASETS, ANVIL_TABS.DONORS);
});

test("Expect clicking the biosamples tab to go to the correct url and to show all of the relevant columns when selected", async ({
  page,
}) => {
  await testTab(page, ANVIL_TABS.DATASETS, ANVIL_TABS.BIOSAMPLES);
});
