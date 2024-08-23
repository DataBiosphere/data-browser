import { expect, test } from "@playwright/test";
import {
  filterRegex,
  getFirstRowNthColumnCellLocator,
  testClearAll,
  testFilterCounts,
  testFilterPersistence,
  testFilterPresence,
  testFilterTags,
} from "../testFunctions";
import {
  anvilFilterNames,
  anvilTabs,
  anvilTabTestOrder,
  BIOSAMPLE_TYPE_INDEX,
  CONSENT_GROUP_INDEX,
  DATASET_INDEX,
  DATA_MODALITY_INDEX,
  DIAGNOSIS_INDEX,
  FILE_FORMAT_INDEX,
  REPORTED_ETHNICITY_INDEX,
} from "./anvil-tabs";

const FILTER_INDEX_LIST = [
  DATA_MODALITY_INDEX,
  DATASET_INDEX,
  DIAGNOSIS_INDEX,
  REPORTED_ETHNICITY_INDEX,
  FILE_FORMAT_INDEX,
  CONSENT_GROUP_INDEX,
];
const FILTER_INDEX_LIST_SHORT = [
  BIOSAMPLE_TYPE_INDEX,
  FILE_FORMAT_INDEX,
  DIAGNOSIS_INDEX,
];

test("Check that all filters exist on the Datasets tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.datasets, anvilFilterNames);
});

test("Check that all filters exist on the Donors tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.donors, anvilFilterNames);
});

test("Check that all filters exist on the BioSamples tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.biosamples, anvilFilterNames);
});

test("Check that all filters exist on the Activities tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.activities, anvilFilterNames);
});

test("Check that all filters exist on the Files tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.files, anvilFilterNames);
});

test("Check that the first filter on the Datasets tab creates at least one checkbox, and that checking up to the first five does not cause an error and does not cause there to be no entries in the table", async ({
  page,
}) => {
  test.setTimeout(120000);
  // Goto the datasets tab
  await page.goto(anvilTabs.datasets.url);
  await expect(
    page.getByRole("tab").getByText(anvilTabs.datasets.tabName)
  ).toBeVisible();

  // Select a filter
  await page
    .getByRole("button")
    .getByText(
      filterRegex(
        anvilFilterNames[Math.floor(Math.random() * anvilFilterNames.length)]
      )
    )
    .click();
  // Expect all checkboxes to be unchecked initially and to work properly
  await expect(page.getByRole("checkbox").first()).toBeVisible();
  const allCheckboxes = await page.getByRole("checkbox").all();
  for (let i = 0; i < allCheckboxes.length && i < 5; i++) {
    const checkbox = allCheckboxes[i];
    await checkbox.scrollIntoViewIfNeeded();
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  }
  await page.locator("body").click();
  await expect(getFirstRowNthColumnCellLocator(page, 0)).toBeVisible();
});

test("Check that filter checkboxes are persistent across pages on an arbitrary filter", async ({
  page,
}) => {
  test.setTimeout(120000);
  const result = await testFilterPersistence(
    page,
    anvilFilterNames[FILE_FORMAT_INDEX],
    anvilTabTestOrder.map((x) => anvilTabs[x])
  );
  if (!result) {
    test.fail();
  }
});

test("Check that filter menu counts match actual counts on the Datasets tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  const result = await testFilterCounts(
    page,
    anvilTabs.datasets,
    FILTER_INDEX_LIST.map((x) => anvilFilterNames[x]),
    anvilTabs.datasets.maxPages ?? 0
  );
  if (!result) {
    test.fail();
  }
});

test("Check that filter menu counts match actual counts on the Activities tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterCounts(
    page,
    anvilTabs.activities,
    FILTER_INDEX_LIST.map((x) => anvilFilterNames[x]),
    anvilTabs.activities.maxPages ?? 0
  );
});

test("Check that the filter tags match the selected filter for an arbitrary filter on the Files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterTags(
    page,
    anvilTabs.files,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilterNames[x])
  );
});

test("Check that the filter tags match the selected filter for an arbitrary filter on the BioSamples tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterTags(
    page,
    anvilTabs.biosamples,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilterNames[x])
  );
});

test("Check that the clear all button functions on the files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testClearAll(
    page,
    anvilTabs.files,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilterNames[x])
  );
});
