import test from "@playwright/test";
import {
  testIndexExportDetails,
  testIndexExportWorkflow,
} from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Smoke test File Manifest Request index export workflow on the Diles tab", async ({
  page,
}) => {
  await testIndexExportWorkflow(page, ANVIL_TABS.FILES);
});

test("Check that figures in the details tab on the index export page matches figures on the index page on the BioSamples tab", async ({
  page,
}) => {
  await testIndexExportDetails(page, ANVIL_TABS.BIOSAMPLES);
});
