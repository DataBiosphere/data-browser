import { expect, test } from "@playwright/test";
import {
  filterRegex,
  getFirstElementTextLocator,
  testClearAll,
  testFilterBubbles,
  testFilterCounts,
  testFilterPersistence,
  testFilterPresence,
} from "../testFunctions";
import {
  anvilFilters,
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
  await testFilterPresence(page, anvilTabs.datasets, anvilFilters);
});

test("Check that all filters exist on the Donors tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.donors, anvilFilters);
});

test("Check that all filters exist on the BioSamples tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.biosamples, anvilFilters);
});

test("Check that all filters exist on the Activities tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.activities, anvilFilters);
});

test("Check that all filters exist on the Files tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.files, anvilFilters);
});

test("Check that the first filter on the Datasets tab creates at least one checkbox, and that checking up to the first five does not cause an error and does not cause there to be no entries in the table", async ({
  page,
}) => {
  // Goto the datasets tab
  await page.goto(anvilTabs.datasets.url);
  await expect(
    page.getByRole("tab").getByText(anvilTabs.datasets.tabName)
  ).toBeVisible();

  // Select a filter
  await page
    .getByRole("button")
    .getByText(
      filterRegex(anvilFilters[Math.floor(Math.random() * anvilFilters.length)])
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
  await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
});

test("Check that filter checkboxes are persistent across pages on an arbitrary filter", async ({
  page,
}) => {
  await testFilterPersistence(
    page,
    anvilFilters[FILE_FORMAT_INDEX],
    anvilTabTestOrder.map((x) => anvilTabs[x])
  );
});

test("Check that filter menu counts match actual counts on the Datasets tab", async ({
  page,
}) => {
  const result = await testFilterCounts(
    page,
    anvilTabs.datasets,
    FILTER_INDEX_LIST.map((x) => anvilFilters[x]),
    anvilTabs.datasets.maxPages ?? 0
  );
  if (!result) {
    test.fail();
  }
});

test("Check that filter menu counts match actual counts on the Activities tab", async ({
  page,
}) => {
  await testFilterCounts(
    page,
    anvilTabs.activities,
    FILTER_INDEX_LIST.map((x) => anvilFilters[x]),
    anvilTabs.activities.maxPages ?? 0
  );
});

test("Check that the blue filter bubbles match the selected filter for an arbitrary filter on the Files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterBubbles(
    page,
    anvilTabs.files,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilters[x])
  );
});

test("Check that the blue filter bubbles match the selected filter for an arbitrary filter on the BioSamples tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterBubbles(
    page,
    anvilTabs.biosamples,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilters[x])
  );
});

test("Check that the clear all button functions on the files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testClearAll(
    page,
    anvilTabs.files,
    FILTER_INDEX_LIST_SHORT.map((x) => anvilFilters[x])
  );
});
