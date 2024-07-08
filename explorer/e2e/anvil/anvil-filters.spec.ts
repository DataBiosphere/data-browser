import { expect, test } from "@playwright/test";
import {
  filter_regex,
  getFirstElementTextLocator,
  testFilterPresence,
} from "../testFunctions";
import { anvilFilters, anvilTabs, anvilTabTestOrder } from "./anvil-tabs";

test.describe.configure({ mode: "parallel" });

test("Check that all filters exist on the Datasets tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.datasets);
});

test("Check that all filters exist on the Donors tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.donors);
});

test("Check that all filters exist on the BioSamples tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.biosamples);
});

test("Check that all filters exist on the Activities tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.activities);
});

test("Check that all filters exist on the Files tab and are clickable", async ({
  page,
}) => {
  await testFilterPresence(page, anvilTabs.files);
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
      filter_regex(
        anvilFilters[Math.floor(Math.random() * anvilFilters.length)]
      )
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

test("Check that filter checkboxes are persistent across pages", async ({
  page,
}) => {
  // Randomly select a filter
  const test_filter =
    anvilFilters[Math.floor(Math.random() * anvilFilters.length)];
  // Start on the first tab in the test order (should be files)
  await page.goto(anvilTabs[anvilTabTestOrder[0]].url);
  await expect(
    page.getByRole("tab").getByText(anvilTabs.datasets.tabName)
  ).toBeVisible();
  // Select the first checkbox on the test filter
  await page.getByText(filter_regex(test_filter)).click();
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  await page.getByRole("checkbox").first().click();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await page.locator("body").click();
  // Expect at least some text to still be visible
  await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
  // For each tab, check that the selected filter is still checked
  for (const tab of anvilTabTestOrder.slice(1)) {
    await page.getByRole("tab").getByText(anvilTabs[tab].tabName).click();
    await expect(page.getByText(filter_regex(test_filter))).toBeVisible();
    await page.getByText(filter_regex(test_filter)).click();
    await expect(page.getByRole("checkbox").first()).toBeChecked();
    await page.locator("body").click();
  }
  // Return to the start tab and confirm that the filter stays checked and that some content is visible
  await page
    .getByRole("tab")
    .getByText(anvilTabs[anvilTabTestOrder[0]].tabName)
    .click();
  await expect(getFirstElementTextLocator(page, 0)).toBeVisible();
  await page.getByText(filter_regex(test_filter)).click();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
});
