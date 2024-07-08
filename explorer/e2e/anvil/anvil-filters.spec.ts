import { expect, test } from "@playwright/test";
import { testFilterPresence } from "../testFunctions";
import { anvilFilters, anvilTabs, anvilTabTestOrder } from "./anvil-tabs";

test.describe.configure({ mode: "parallel" });

const filter_regex = (filter: string): RegExp =>
  new RegExp(filter + "\\s+\\([0-9]+\\)\\s*");

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
    .getByText(filter_regex(anvilFilters[4]))
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
  const firstElementTextLocator = page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(0)
    .getByRole("cell")
    .first();
  await expect(firstElementTextLocator).toBeVisible();
});

test("Check that filter checkboxes are persistent across pages", async ({
  page,
}) => {
  await page.goto(anvilTabs.datasets.url);
  await expect(
    page.getByRole("tab").getByText(anvilTabs.datasets.tabName)
  ).toBeVisible();
  await page.getByText(filter_regex(anvilFilters[3])).click(); // maybe should select a random one instead;
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  await page.getByRole("checkbox").first().click();
  await expect(page.getByRole("checkbox").first()).toBeChecked();
  await page.locator("body").click();
  for (const blah of anvilTabTestOrder) {
    console.log(blah);
    await page.getByRole("tab").getByText(anvilTabs[blah].tabName).click();
    const firstElementTextLocator = page
      .getByRole("rowgroup")
      .nth(1)
      .getByRole("row")
      .nth(0)
      .getByRole("cell")
      .first();
    await expect(firstElementTextLocator).toBeVisible();
    await expect(page.getByText(filter_regex(anvilFilters[3]))).toBeVisible();
    await page.getByText(filter_regex(anvilFilters[3])).click();
    await expect(page.getByRole("checkbox").first()).toBeChecked();
    await page.locator("body").click();
  }
});
