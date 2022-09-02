import { expect, test } from "@playwright/test";

test("Should navigate to Biosamples tab", async ({ page }) => {
  // Start from the datasets page
  await page.goto("http://localhost:3000/explore/datasets");
  // Find an element with the text "BioSamples"
  await page.click("text=BioSamples");
  // The new url should be /explore/biosamples
  await expect(page).toHaveURL("http://localhost:3000/explore/biosamples");
});
