import { test } from "@playwright/test";
import {
  testBackpageAccess,
  testBackpageDetails,
  testExportBackpage,
} from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";

test.skip("Smoke test `Export to Terra` button on the first available dataset", async ({
  context,
  page,
}) => {
  test.setTimeout(120000);
  await testExportBackpage(context, page, anvilTabs.datasets);
});

test.skip("Check access controls on the datasets backpages work for the first two tabs", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testBackpageAccess(page, anvilTabs.datasets);
});

test("Check that information on the backpages matches information in the data tables", async ({
  page,
}) => {
  test.setTimeout(120000);
  await testBackpageDetails(page, anvilTabs.datasets);
});
