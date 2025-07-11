import test, { ElementHandle, Response, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { testBulkDownloadIndexExportWorkflow } from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";
import { MUI_CLASSES, TEST_IDS } from "../features/common/constants";

test.describe("AnVIL Data Explorer Export", () => {
  test("Smoke test File Manifest Request index export workflow on the Files tab", async ({
    page,
  }) => {
    test.setTimeout(120000);
    const testResult = await testBulkDownloadIndexExportWorkflow(
      page,
      ANVIL_TABS.FILES
    );
    if (!testResult) {
      test.fail();
    }
  });

  test("Verifies that the Selected Data Summary on the export page displays the same label and count as the summary on the BioSamples tab", async ({
    page,
  }) => {
    await page.goto("/biosamples");
    await page.waitForURL(/\/biosamples/);
    await Promise.all([waitForTestId(page, TEST_IDS.ENTITY_SUMMARY)]);

    // Export button should be visible.
    const button = page.getByTestId(TEST_IDS.EXPORT_BUTTON);
    await expect(button).toBeVisible();

    // Summary should be visible.
    const summaryLocator = page.getByTestId(TEST_IDS.ENTITY_SUMMARY);
    await expect(summaryLocator).toBeVisible();

    // Get each summary span's inner text.
    const innerTexts = await summaryLocator
      .locator(MUI_CLASSES.TYPOGRAPHY) // Retrieves the count and label and omits the dot separator.
      .allTextContents();

    // Pair each summary item's label and count by iterating through the text contents
    // two at a time, and store them as [label, count] tuples in the summary array.
    const summary: [string, string][] = [];
    for (let i = 0; i < innerTexts.length; i += 2) {
      summary.push([innerTexts[i + 1], innerTexts[i]]);
    }

    // Click the export button and wait for the summary API to be called.
    await Promise.all([
      button.click(),
      page.waitForURL(/\/export/),
      page.waitForResponse(urlOrPredicate),
      waitForTestId(page, TEST_IDS.EXPORT_SUMMARY),
    ]);

    // Export summary should be visible.
    const exportSummaryLocator = page.getByTestId(TEST_IDS.EXPORT_SUMMARY);
    await expect(exportSummaryLocator).toBeVisible();

    // Test that each summary item is present in the export summary
    // with corresponding count.
    for (const [label, count] of summary) {
      const summaryItem = exportSummaryLocator
        .locator("> div")
        .filter({ hasText: label });
      await expect(summaryItem).toBeVisible();
      await expect(summaryItem).toContainText(count, { timeout: 5000 });
    }
  });
});

/**
 * Checks if the response is the index summary API.
 * @param r - Response.
 * @returns boolean.
 */
function urlOrPredicate(r: Response): boolean {
  return r.url().includes("/index/summary") && r.status() === 200;
}

/**
 * Waits for a locator to be visible.
 * @param page - Page.
 * @param testId - Test ID.
 * @returns Promise<void>.
 */
function waitForTestId(
  page: Page,
  testId: string
): Promise<ElementHandle<HTMLElement | SVGElement>> {
  return page.waitForSelector(`[data-testid="${testId}"]`, {
    state: "visible",
  });
}
