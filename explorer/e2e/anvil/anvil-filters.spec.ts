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
import { anvilFilters, anvilTabs, anvilTabTestOrder } from "./anvil-tabs";

test.describe.configure({ mode: "parallel", timeout: 60 * 1000 });
const filter_index_list = [3, 4, 5, 7, 6, 2];

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
  const all_checkboxes = await page.getByRole("checkbox").all();
  for (let i = 0; i < all_checkboxes.length && i < 5; i++) {
    const checkbox = all_checkboxes[i];
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
    anvilFilters[3],
    anvilTabTestOrder.map((x) => anvilTabs[x])
  );
});

test("Check that filter menu counts match actual counts on the Datasets tab", async ({
  page,
}) => {
  const result = await testFilterCounts(
    page,
    anvilTabs.datasets,
    filter_index_list.map((x) => anvilFilters[x]),
    25
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
    filter_index_list.map((x) => anvilFilters[x]),
    25
  );
});

test("Check that the blue filter bubbles match the selected filter for an arbitrary filter on the Files tab", async ({
  page,
}) => {
  await testFilterBubbles(
    page,
    anvilTabs.files,
    filter_index_list.map((x) => anvilFilters[x])
  );
});

test("Check that the blue filter bubbles match the selected filter for an arbitrary filter on the BioSamples tab", async ({
  page,
}) => {
  await testFilterBubbles(
    page,
    anvilTabs.biosamples,
    filter_index_list.map((x) => anvilFilters[x])
  );
});

test("Check that the clear all button functions on the files tab", async ({
  page,
}) => {
  await testClearAll(
    page,
    anvilTabs.files,
    filter_index_list.map((x) => anvilFilters[x])
  );
});
