import { processEntityValue } from "../../common/utils";
import { DatasetsResponse } from "./responses";

/**
 * Returns the datasets title from the given API response.
 * Facilitates setting title within the `<Head>` element of the page.
 * @param datasetsResponse - Response model return from entity API.
 * @returns datasets title.
 */
export const getTitle = (
  datasetsResponse?: DatasetsResponse
): string | undefined => {
  if (!datasetsResponse) return;
  return processEntityValue(datasetsResponse.datasets, "title");
};
