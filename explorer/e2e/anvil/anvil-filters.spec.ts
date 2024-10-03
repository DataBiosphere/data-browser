import { expect, test } from "@playwright/test";
import {
  filterRegex,
  getFirstRowNthColumnCellLocator,
  testClearAll,
  testDeselectFiltersThroughSearchBar,
  testFilterCounts,
  testFilterPersistence,
  testFilterPresence,
  testFilterTags,
  testSelectFiltersThroughSearchBar,
} from "../testFunctions";
import {
  ANVIL_FILTER_NAMES,
  ANVIL_TABS,
  ANVIL_TAB_TEST_ORDER,
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
  await testFilterPresence(page, ANVIL_TABS.DATASETS, ANVIL_FILTER_NAMES);
});

test("Check that all filters exist on the Donors tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, ANVIL_TABS.DONORS, ANVIL_FILTER_NAMES);
});

test("Check that all filters exist on the BioSamples tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, ANVIL_TABS.BIOSAMPLES, ANVIL_FILTER_NAMES);
});

test("Check that all filters exist on the Activities tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, ANVIL_TABS.ACTIVITIES, ANVIL_FILTER_NAMES);
});

test("Check that all filters exist on the Files tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, ANVIL_TABS.FILES, ANVIL_FILTER_NAMES);
});

test("Check that the first filter on the Datasets tab creates at least one checkbox, and that checking up to the first five does not cause an error and does not cause there to be no entries in the table", async ({
  page,
}) => {
  test.setTimeout(120000);
  // Goto the datasets tab
  await page.goto(ANVIL_TABS.DATASETS.url);
  await expect(
    page.getByRole("tab").getByText(ANVIL_TABS.DATASETS.tabName)
  ).toBeVisible();

  // Select a filter
  await page
    .getByRole("button")
    .getByText(
      filterRegex(
        ANVIL_FILTER_NAMES[
          Math.floor(Math.random() * ANVIL_FILTER_NAMES.length)
        ]
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
    ANVIL_FILTER_NAMES[FILE_FORMAT_INDEX],
    ANVIL_TAB_TEST_ORDER.map((x) => ANVIL_TABS[x])
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
    ANVIL_TABS.DATASETS,
    FILTER_INDEX_LIST.map((x) => ANVIL_FILTER_NAMES[x]),
    ANVIL_TABS.DATASETS.maxPages ?? 0
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
    ANVIL_TABS.ACTIVITIES,
    FILTER_INDEX_LIST.map((x) => ANVIL_FILTER_NAMES[x]),
    ANVIL_TABS.ACTIVITIES.maxPages ?? 0
  );
});

test("Check that the filter tags match the selected filter for an arbitrary filter on the Files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterTags(
    page,
    ANVIL_TABS.FILES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test("Check that the filter tags match the selected filter for an arbitrary filter on the BioSamples tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testFilterTags(
    page,
    ANVIL_TABS.BIOSAMPLES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test("Check that the clear all button functions on the files tab", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testClearAll(
    page,
    ANVIL_TABS.FILES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Datasets tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.DATASETS,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Donors tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.DONORS,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the BioSamples tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.BIOSAMPLES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Activities tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.ACTIVITIES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that selecting filters through the "Search all Filters" textbox works correctly on the Files tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testSelectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.FILES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Datasets tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.DATASETS,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Donors tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.DONORS,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the BioSamples tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.BIOSAMPLES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Activities tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.ACTIVITIES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});

test('Check that deselecting filters through the "Search all Filters" textbox works correctly on the Files tab', async ({
  page,
}) => {
  test.setTimeout(120000);
  await testDeselectFiltersThroughSearchBar(
    page,
    ANVIL_TABS.FILES,
    FILTER_INDEX_LIST_SHORT.map((x) => ANVIL_FILTER_NAMES[x])
  );
});
