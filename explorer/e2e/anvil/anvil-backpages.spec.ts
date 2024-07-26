import { test } from "@playwright/test";
import { testExportBackpage } from "../testFunctions";
import { anvilTabs } from "./anvil-tabs";
test("Smoke test `Export to Terra` button on the first available dataset", async ({
  context,
  page,
}) => {
  await testExportBackpage(context, page, anvilTabs.datasets);
});
