import {
  CategoryKey,
  SelectedFilterValue,
} from "@clevercanary/data-explorer-ui/lib/common/entities";
import { RelatedSearchResult } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  DugSearchResponse,
  DugSearchResultResponse,
} from "../../../../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import { DUG_API_PARAMS, DUG_API_PATH, DUG_API_URL } from "../../constants";

// Template variables
const DUG_KEYS = ["AnVIL", "DbGaP"]; // keyof DugSearchResultResponse.

/**
 * Fetches BioDataCatalyst page specified by URL and corresponding search param and returns related studies.
 * @param searchKey - Category key used as search param for related studies.
 * @param resultKey - Category key used to filter for related studies.
 * @param selectedCategoryValues - Selected category values used as the search parameters.
 * @returns {Promise.<*>} - Promise with a list of related studies.
 */
export async function fetchRelatedStudies(
  searchKey: CategoryKey | undefined,
  resultKey: CategoryKey | undefined,
  selectedCategoryValues: SelectedFilterValue | undefined
): Promise<RelatedSearchResult | undefined> {
  if (!searchKey || !resultKey || !selectedCategoryValues) {
    return;
  }
  const relatedStudies: string[] = [];
  for (const selectedCategoryValue of selectedCategoryValues) {
    const params = { ...DUG_API_PARAMS, query: selectedCategoryValue };
    const options = {
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    try {
      const response = await fetch(`${DUG_API_URL}${DUG_API_PATH}`, options);
      const { result } = (await response.json()) as DugSearchResponse;
      for (const key of DUG_KEYS) {
        result[key as keyof DugSearchResultResponse]?.forEach((r) => {
          const dbGapId = r.c_id?.split(".")[0];
          return relatedStudies.push(dbGapId);
        });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return { resultKey, searchKey, values: relatedStudies };
}
