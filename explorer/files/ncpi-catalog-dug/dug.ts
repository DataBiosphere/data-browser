import fetch from "node-fetch";
import {
  DugSearchResponse,
  DugSearchResultResponse,
} from "../../app/apis/catalog/ncpi-catalog-dug/common/entities";
import {
  DUG_API_PARAMS,
  DUG_API_PATH,
  DUG_API_URL,
} from "../../site-config/ncpi-catalog-dug/dev/constants";

// Template variables
const DUG_KEYS = ["AnVIL", "DbGaP"]; // keyof DugSearchResultResponse.

/**
 * Fetches BioDataCatalyst page specified by URL and corresponding search param and returns related studies.
 * @param focus - Selected category values used as the search parameters.
 * @returns {Promise.<*>} - Promise with a set of related studies.
 */
export async function fetchRelatedStudies(focus: string): Promise<Set<string>> {
  const setOfRelatedStudies = new Set<string>();
  if (!focus) {
    return setOfRelatedStudies;
  }
  const params = { ...DUG_API_PARAMS, query: focus };
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
        setOfRelatedStudies.add(dbGapId);
      });
    }
  } catch (error) {
    console.log(error);
  }
  return setOfRelatedStudies;
}
