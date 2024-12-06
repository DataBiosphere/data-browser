import { test } from "@playwright/test";
import {
  filterAndTestLastPagePagination,
  testFirstPagePagination,
  testPaginationContent,
} from "../testFunctions";
import {
  ANVIL_FILTER_NAMES,
  ANVIL_TABS,
  FILE_FORMAT_INDEX,
} from "./anvil-tabs";

test("Check first page has disabled back and enabled forward pagination buttons on Donors Page", async ({
  page,
}) => {
  await testFirstPagePagination(page, ANVIL_TABS.DONORS);
});

test("Paginate through the entire Files tab to confirm that the page number stays consistent and that paginating forwards is disabled on the last page. Uses filters to reduce the amount of calls necessary", async ({
  page,
}) => {
  const result = await filterAndTestLastPagePagination(
    page,
    ANVIL_TABS.FILES,
    ANVIL_FILTER_NAMES[FILE_FORMAT_INDEX]
  );
  if (!result) {
    test.fail();
  }
});

test("Check forward and backwards pagination causes the page content to change on the Biosamples page", async ({
  page,
}) => {
  await testPaginationContent(page, ANVIL_TABS.BIOSAMPLES);
});
