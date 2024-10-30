import test from "@playwright/test";
import {
  testIndexExportDetails,
  testIndexExportWorkflow,
} from "../testFunctions";
import { ANVIL_TABS } from "./anvil-tabs";

test("Check that the export button on the index page functions as expected, on the Files tab", async ({
  page,
}) => {
  await testIndexExportWorkflow(page, ANVIL_TABS.FILES);
});

test("Check that figures in the details tab on the index export page matches figures on the index page, on the BioSamples tab", async ({
  page,
}) => {
  await testIndexExportDetails(page, ANVIL_TABS.BIOSAMPLES);
});
