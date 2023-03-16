import { expect, test } from "@playwright/test";

test.afterEach(async ({ page }) => {
  // Select the filter dropdown
  await page.locator("_react=Filter >> nth=0").click();
  // Get the name of the first and second filter dropdown
  const FirstFilter = await page.locator("_react=FilterMenu >> nth=0");
  const FilterNames = (await FirstFilter.innerText()).split("\n");
  const FirstFilterName = FilterNames[1];
  const SecondFilterName = FilterNames[3];
  // Get the entries matching the first and second filter entries
  const FirstFilterEntries = await page
    .locator(`_react=TableComponent >> text=${FirstFilterName} >> visible=true`)
    .allInnerTexts();
  const SecondFilterEntries = await page
    .locator(
      `_react=TableComponent >> text=${SecondFilterName} >> visible=true`
    )
    .allInnerTexts();
  // Click the first filter button
  await page.locator(`_react=FilterMenu >> text='${SecondFilterName}'`).click();
  // Expect the names matching the selected filter button to be visible
  // but the names from the non-selected filter button to be invisible
  for (let i = 0; i < FirstFilterEntries.length; i++) {
    await expect(
      page.locator(
        `_react=TableComponent >> text='${FirstFilterName}' >> nth=${i}`
      )
    ).toBeHidden();
  }
  for (let i = 0; i < SecondFilterEntries.length; i++) {
    await expect(
      page.locator(
        `_react=TableComponent >> text=${SecondFilterName} >> nth=${i}`
      )
    ).toBeVisible;
  }
});

test("Select a filter and expect it to change displayed components on the Workspaces tab", async ({
  page,
}) => {
  // Go to the Workspace tab
  await page.goto("/explore/");
  await expect(
    page.locator("text=Terra Workspace Name >> nth=0")
  ).toBeVisible();
});

test("Select a filter and expect it to change displayed components on the Studies tab", async ({
  page,
}) => {
  // Go to the Workspace tab
  await page.goto("/explore/studies");
  await expect(page.locator("text=Study Design >> nth=0")).toBeVisible();
});

test("Select a filter and expect it to change displayed components on the Consortia tab", async ({
  page,
}) => {
  // Go to the Workspace tab
  await page.goto("/explore/consortia");
  await expect(page.locator("text=Study Design >> nth=0")).toBeVisible();
});
