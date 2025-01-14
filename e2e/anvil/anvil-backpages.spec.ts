import { test } from "@playwright/test";
import {
  testBackpageAccess,
  testBackpageDetails,
  testExportBackpage,
} from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

//TODO: this should probably check a feature flag instead
//eslint-disable-next-line sonarjs/no-skipped-tests -- disabled since Export to Terra is disabled on AnVIL
test.skip("Smoke test `Export to Terra` button on the first available dataset", async ({
  context,
  page,
}) => {
  const testResult = await testExportBackpage(
    context,
    page,
    ANVIL_TABS.DATASETS
  );
  if (!testResult) {
    test.fail();
  }
});

//TODO: this should probably check a feature flag instead
//eslint-disable-next-line sonarjs/no-skipped-tests -- disabled since Export to Terra is disabled on AnVIL
test.skip("Check access controls on the datasets backpages work for the first two tabs", async ({
  page,
}) => {
  const testResult = await testBackpageAccess(page, ANVIL_TABS.DATASETS);
  if (!testResult) {
    test.fail();
  }
});

test("Check that information on the backpages matches information in the data tables", async ({
  page,
}) => {
  const testResult = await testBackpageDetails(page, ANVIL_TABS.DATASETS);
  if (!testResult) {
    test.fail();
  }
});
