import { test } from "@playwright/test";
import { testSort } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test.describe.configure({ mode: "parallel" });

test("Expect clicking the column header to change the first displayed entry in each column on the datasets tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilTabs.datasets);
});

test("Expect clicking the column header to change the first displayed entry in each column on the donors tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilTabs.donors);
});

test("Expect clicking the column header to change the first displayed entry in each column on the biosamples tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilTabs.biosamples);
});

test("Expect clicking the column header to change the first displayed entry in each column on the activities tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilTabs.activities);
});

test("Expect clicking the column header to change the first displayed entry in each column on the files tab, except where all tabs have the same values", async ({
  page,
}) => {
  await testSort(page, anvilTabs.files);
});
