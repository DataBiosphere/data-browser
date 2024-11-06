import test from "@playwright/test";
import {
  testBulkDownloadIndexExportWorkflow,
  testIndexExportSummary,
} from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Smoke test File Manifest Request index export workflow on the Files tab", async ({
  page,
}) => {
  const testResult = await testBulkDownloadIndexExportWorkflow(
    page,
    ANVIL_TABS.FILES
  );
  if (!testResult) {
    test.fail();
  }
});

test("Check that figures in the Selected Data Summary tab on the index export page matches figures on the index page on the BioSamples tab", async ({
  page,
}) => {
  const testResult = await testIndexExportSummary(page, ANVIL_TABS.BIOSAMPLES);
  if (!testResult) {
    test.fail();
  }
});
