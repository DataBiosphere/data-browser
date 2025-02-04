import { expect, Locator, Page, Request, test } from "@playwright/test";
import {
  BUTTON_TEXT_ANALYZE_IN_TERRA,
  BUTTON_TEXT_EXPORT,
  BUTTON_TEXT_REQUEST_ACCESS,
  BUTTON_TEXT_REQUEST_FILE_MANIFEST,
  CHIP_TEXT_ACCESS_GRANTED,
  CHIP_TEXT_ACCESS_REQUIRED,
  DatasetAccess,
} from "./common/constants";
import {
  MUI_ALERT_ROOT,
  MUI_BUTTON_GROUP_ROOT,
  MUI_TABLE_CELL_ROOT,
  MUI_TABLE_ROOT,
  MUI_TABLE_ROW_ROOT,
} from "../features/common/constants";
import { ROUTE_MANIFEST_DOWNLOAD } from "../../site-config/anvil-cmg/dev/export/constants";
import { ANVIL_CMG_CATEGORY_KEY } from "../../site-config/anvil-cmg/category";

const { describe } = test;

const API_ENDPOINT_SUMMARY = "summary";

describe("Dataset", () => {
  test.beforeEach(async ({ page }) => {
    await goToDatasetsList(page);
  });

  test("displays request access button", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_REQUIRED);

    // Confirm request access button is visible.
    const exportButton = getLinkWithText(page, BUTTON_TEXT_REQUEST_ACCESS);
    await expect(exportButton).toBeVisible();
  });

  test("displays export button", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible.
    const exportButton = getLinkWithText(page, BUTTON_TEXT_EXPORT);
    await expect(exportButton).toBeVisible();
  });

  test("displays login to export method", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_REQUIRED);

    // Navigate to the choose export method page.
    const currentUrl = page.url();
    await page.goto(`${currentUrl}/export`);

    // Confirm the login alert is displayed.
    await expect(
      page.locator(
        `${MUI_ALERT_ROOT}:has-text("To export this dataset, please sign in and, if necessary, request access.")`
      )
    ).toBeVisible();
  });

  test("displays export method", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confim Terra and file manifest export methods are listed.
    await expect(
      getLinkWithText(page, BUTTON_TEXT_ANALYZE_IN_TERRA)
    ).toBeVisible();
    await expect(
      getLinkWithText(page, BUTTON_TEXT_REQUEST_FILE_MANIFEST)
    ).toBeVisible();
  });

  test("displays export method selected data", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Wait for the summary request once the export button is clicked.
    const [request] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes(API_ENDPOINT_SUMMARY)
      ),
      clickLink(page, BUTTON_TEXT_EXPORT),
    ]);

    // Confirm summary request has dataset ID request param.
    verifySummaryRequest(request);
  });

  test("displays login to download file manifest", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_REQUIRED);

    // Navigate to the export file manifest page.
    const currentUrl = page.url();
    await page.goto(`${currentUrl}${ROUTE_MANIFEST_DOWNLOAD}`);

    // Confirm the login alert is displayed.
    await expect(
      page.locator(
        `${MUI_ALERT_ROOT}:has-text("To download this dataset manifest, please sign in and, if necessary, request access.")`
      )
    ).toBeVisible();
  });

  test("displays download file manifest", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confirm file manifest export method is visible and click it.
    await clickLink(page, BUTTON_TEXT_REQUEST_FILE_MANIFEST);

    // Confirm the file manifest page is loaded: check there are two buttons
    // (one for download, one for copy to clipboard).
    const buttons = page.locator(`${MUI_BUTTON_GROUP_ROOT} button`);

    // Ensure there are exactly two buttons.
    await expect(buttons).toHaveCount(2);

    // Ensure both buttons are visible.
    await expect(buttons.nth(0)).toBeVisible();
    await expect(buttons.nth(1)).toBeVisible();
  });

  test("displays download file manifest selected data", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Wait for the summary request once the file manifest button is clicked.
    const [request] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes(API_ENDPOINT_SUMMARY)
      ),
      clickLink(page, BUTTON_TEXT_REQUEST_FILE_MANIFEST),
    ]);

    // Confirm summary request has dataset ID request param.
    verifySummaryRequest(request);
  });

  test("displays analyze in Terra", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confirm Terra export method is visible and click it.
    await clickLink(page, BUTTON_TEXT_ANALYZE_IN_TERRA);

    // Confirm the analyze in Terra page is loaded: check the "coming soon"
    // message is displayed.
    await expect(
      page.locator(`${MUI_ALERT_ROOT}:has-text("under development")`)
    ).toBeVisible();
  });
});

/**
 * Click the link wit the given text.
 * @param page - Playwright page object.
 * @param buttonText - The text of the button to click.
 */
async function clickLink(page: Page, buttonText: string): Promise<void> {
  await getLinkWithText(page, buttonText).click();
}

/**
 * Return the link with the given text.
 * @param page - Playwright page object.
 * @param buttonText - The text of the button to find.
 * @returns - Playwright locator object for the dataset export button
 */
function getLinkWithText(page: Page, buttonText: string): Locator {
  return page.locator(`a:has-text("${buttonText}")`);
}

/**
 * Navigate to the datasets list.
 * @param page - Playwright page object.
 */
async function goToDatasetsList(page: Page): Promise<void> {
  if (page.url() !== "/") {
    await page.goto("/");
  }
}

/**
 * Select a dataset with the given access from the datasets list and navigate to it.
 * @param page - Playwright page object.
 * @param access - The access of the dataset, either "Granted" or "Required"
 */
async function goToDataset(page: Page, access: DatasetAccess): Promise<void> {
  // Find a dataset that user has access to.
  const datasetRow = page
    .locator(
      `${MUI_TABLE_ROOT} ${MUI_TABLE_ROW_ROOT}:has(${MUI_TABLE_CELL_ROOT}:has-text("${access}"))`
    )
    .first();
  await expect(datasetRow).toBeVisible(); // Confirm at least one dataset has been found.
  const datasetLink = datasetRow.locator(
    `${MUI_TABLE_CELL_ROOT}:first-child a`
  );
  const datasetTitle = await datasetLink.innerText();
  await datasetLink.click();

  // Wait for the dataset detail page to load (specifically the dataset title).
  await page.waitForSelector(`h1:has-text("${datasetTitle}")`);
}

/**
 * Confirm dataset ID is in the /summary request URL.
 * @param request - The request object.
 */
function verifySummaryRequest(request: Request): void {
  // Grab the filters param from the request.
  const url = new URL(request.url());
  const paramValue = url.searchParams.get("filters") || "";

  // Validate dataset ID is in the filters query parameter.
  expect(paramValue).toContain(ANVIL_CMG_CATEGORY_KEY.DATASET_ID);
}
