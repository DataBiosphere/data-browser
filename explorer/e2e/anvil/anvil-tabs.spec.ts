import { expect, test } from "@playwright/test";
import { anvilTabs, anvilTabTestOrder } from "./anvil-tabs";
/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */

test.setTimeout(60000);
test("Expect each tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  for (const tabKey of anvilTabTestOrder) {
    const tab = anvilTabs[tabKey];
    await page.goto(tab.url);
    await expect(page.getByRole("tab").getByText(tab.tabName)).toHaveAttribute(
      "aria-selected",
      "true"
    );
    for (const otherTabKey of anvilTabTestOrder) {
      if (anvilTabs[otherTabKey].tabName !== tab.tabName) {
        await expect(
          page.getByRole("tab").getByText(anvilTabs[otherTabKey].tabName)
        ).toHaveAttribute("aria-selected", "false");
      }
    }
  }
});

test.setTimeout(60000);
test("Expect each tab to become selected and to show all of its columns when selected", async ({
  page,
}) => {
  await page.goto(anvilTabs[anvilTabTestOrder[0]].url);
  for (const tab_id of anvilTabTestOrder.concat(anvilTabTestOrder[0])) {
    const tab = anvilTabs[tab_id];
    await page.getByRole("tab").getByText(tab.tabName).click();
    await expect(page.getByRole("tab").getByText(tab.tabName)).toHaveAttribute(
      "aria-selected",
      "true"
    );
    if (tab.emptyFirstColumn) {
      await expect(page.getByRole("columnheader")).toHaveText(
        [" "].concat(tab.preselectedColumns.map((x) => x.name))
      );
    } else {
      await expect(page.getByRole("columnheader")).toHaveText(
        tab.preselectedColumns.map((x) => x.name)
      );
    }
  }
});
/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
