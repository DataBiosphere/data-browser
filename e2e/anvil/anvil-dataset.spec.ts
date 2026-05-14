import { expect, Locator, Page, Request, test } from "@playwright/test";
import { ANVIL_CMG_CATEGORY_KEY } from "../../site-config/anvil-cmg/category";
import { ROUTES } from "../../site-config/anvil-cmg/dev/export/routes";
import { MUI_CLASSES } from "../features/common/constants";
import {
  BUTTON_TEXT_EXPORT,
  BUTTON_TEXT_REQUEST_ACCESS,
  BUTTON_TEXT_REQUEST_LINK,
  CHIP_TEXT_ACCESS_GRANTED,
  CHIP_TEXT_ACCESS_REQUIRED,
  DatasetAccess,
  TITLE_TEXT_ANALYZE_IN_TERRA,
  TITLE_TEXT_REQUEST_FILE_MANIFEST,
} from "./common/constants";

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
        `${MUI_CLASSES.ALERT}:has-text("To export this dataset, please sign in and, if necessary, request access.")`
      )
    ).toBeVisible();
  });

  test("displays export method", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confim Terra and file manifest export methods are listed.
    await expect(
      getHeadingWithText(page, TITLE_TEXT_ANALYZE_IN_TERRA)
    ).toBeVisible();
    await expect(
      getHeadingWithText(page, TITLE_TEXT_REQUEST_FILE_MANIFEST)
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
    await page.goto(`${currentUrl}${ROUTES.MANIFEST_DOWNLOAD}`);

    // Confirm the login alert is displayed.
    await expect(
      page.locator(
        `${MUI_CLASSES.ALERT}:has-text("To download this dataset manifest, please sign in and, if necessary, request access.")`
      )
    ).toBeVisible();
  });

  test("displays download file manifest", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confirm file manifest export method is visible and click it.
    await clickCard(page, TITLE_TEXT_REQUEST_FILE_MANIFEST);

    // Wait for navigation to the manifest page before asserting the button —
    // without this, the destination-page locator can poll an unmounted page
    // for 15s and fail with "0 elements" even though the click succeeded.
    await page.waitForURL((url) =>
      url.pathname.endsWith(ROUTES.MANIFEST_DOWNLOAD)
    );

    // Confirm the file manifest page is loaded: check there is one button to request the manifest.
    const buttons = page.locator(`${MUI_CLASSES.BUTTON}`, {
      hasText: BUTTON_TEXT_REQUEST_LINK,
    });

    // Ensure there is exactly one button.
    await expect(buttons).toHaveCount(1);

    // Ensure the button is visible.
    await expect(buttons).toBeVisible();
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
      clickCard(page, TITLE_TEXT_REQUEST_FILE_MANIFEST),
    ]);

    // Confirm summary request has dataset ID request param.
    verifySummaryRequest(request);
  });

  test("displays analyze in Terra", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Confirm Terra export method is visible and click it.
    await clickCard(page, TITLE_TEXT_ANALYZE_IN_TERRA);

    // Wait for navigation to the Terra page before asserting the form — same
    // defence as the manifest test above; the locator can otherwise poll an
    // unmounted page for 15s and fail even though the click succeeded.
    await page.waitForURL((url) => url.pathname.endsWith(ROUTES.TERRA));

    // Confirm the analyze in Terra page is loaded: check for form elements.
    await expect(page.locator(MUI_CLASSES.FORM_CONTROL).first()).toBeVisible();
  });

  test("displays analyze in Terra selected data", async ({ page }) => {
    await goToDataset(page, CHIP_TEXT_ACCESS_GRANTED);

    // Confirm export button is visible and click it.
    await clickLink(page, BUTTON_TEXT_EXPORT);

    // Wait for the summary request once the file manifest button is clicked.
    const [request] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes(API_ENDPOINT_SUMMARY)
      ),
      clickCard(page, TITLE_TEXT_ANALYZE_IN_TERRA),
    ]);

    // Confirm summary request has dataset ID request param.
    verifySummaryRequest(request);
  });
});

/**
 * Click the card with the given heading text.
 * @param page - Playwright page object.
 * @param headingText - Heading text.
 */
async function clickCard(page: Page, headingText: string): Promise<void> {
  await getHeadingWithText(page, headingText)
    .locator("xpath=ancestor::*[contains(@class,'MuiPaper-root')]")
    .locator(".MuiCardActionArea-root")
    .click();
}

/**
 * Click the link with the given text.
 * @param page - Playwright page object.
 * @param buttonText - The text of the button to click.
 */
async function clickLink(page: Page, buttonText: string): Promise<void> {
  await getLinkWithText(page, buttonText).click();
}

/**
 * Return the heading with the given text.
 * @param page - Playwright page object.
 * @param headingText - Heading text.
 * @returns - Playwright locator object for the dataset export method.
 */
function getHeadingWithText(page: Page, headingText: string): Locator {
  return page.locator(`h3:has-text("${headingText}")`);
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
      `${MUI_CLASSES.TABLE} ${MUI_CLASSES.TABLE_ROW}:has(${MUI_CLASSES.TABLE_CELL}:has-text("${access}"))`
    )
    .first();
  await expect(datasetRow).toBeVisible(); // Confirm at least one dataset has been found.
  const datasetLink = datasetRow.locator(
    `${MUI_CLASSES.TABLE_CELL}:first-child a`
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
