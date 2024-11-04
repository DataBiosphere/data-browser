import test from "@playwright/test";
import {
  testIndexExportSummary,
  testIndexExportWorkflow,
} from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Smoke test File Manifest Request index export workflow on the Files tab", async ({
  page,
}) => {
  await testIndexExportWorkflow(page, ANVIL_TABS.FILES);
});

test("Check that figures in the Selected Data Summary tab on the index export page matches figures on the index page on the BioSamples tab", async ({
  page,
}) => {
  await testIndexExportSummary(page, ANVIL_TABS.BIOSAMPLES);
});
