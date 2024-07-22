import { expect, test } from "@playwright/test";
import { getFirstElementTextLocator } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

const pageCountRegex = /Page [0-9]+ of [0-9]+/;
const BackButtonTestID = "WestRoundedIcon";
const ForwardButtonTestID = "EastRoundedIcon";

test.setTimeout(90000);
test("Check forward and backwards pagination causes the page content to change on the Biosamples page", async ({
  page,
}) => {
  const tab = anvilTabs.biosamples;
  // Navigate to the BioSamples page
  await page.goto(tab.url);
  await expect(
    page.getByRole("tab").getByText(tab.tabName, { exact: true })
  ).toHaveAttribute("aria-selected", "true", { timeout: 25000 });

  const firstElementTextLocator = getFirstElementTextLocator(page, 0);

  // Should start on first page
  await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
    /Page 1 of [0-9]+/
  );
  const max_pages = 5;
  const FirstTableEntries = [];

  // Paginate forwards
  for (let i = 2; i < max_pages + 1; i++) {
    await expect(firstElementTextLocator).not.toHaveText("");
    const OriginalFirstTableEntry = await firstElementTextLocator.innerText();
    // Click the next button
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(ForwardButtonTestID) })
      .click();
    // Expect the page count to have incremented
    await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
      RegExp(`Page ${i} of [0-9]+`)
    );
    // Expect the back button to be enabled
    await expect(
      page
        .getByRole("button")
        .filter({ has: page.getByTestId(BackButtonTestID) })
    ).toBeEnabled();
    // Expect the forwards button to be enabled
    if (i != max_pages) {
      await expect(
        page
          .getByRole("button")
          .filter({ has: page.getByTestId(ForwardButtonTestID) })
      ).toBeEnabled();
    }
    // Expect the first entry to have changed on the new page
    await expect(firstElementTextLocator).not.toHaveText(
      OriginalFirstTableEntry
    );
    // Remember the first entry
    FirstTableEntries.push(OriginalFirstTableEntry);
  }

  // Paginate backwards
  for (let i = 0; i < max_pages - 1; i++) {
    const OldFirstTableEntry = FirstTableEntries[max_pages - i - 2];
    await page
      .getByRole("button")
      .filter({ has: page.getByTestId(BackButtonTestID) })
      .click();
    // Expect page number to be correct
    await expect(page.getByText(pageCountRegex, { exact: true })).toHaveText(
      RegExp(`Page ${max_pages - i - 1} of [0-9]+`)
    );
    // Expect page entry to be consistent with forward pagination
    await expect(firstElementTextLocator).toHaveText(OldFirstTableEntry);
  }
});
