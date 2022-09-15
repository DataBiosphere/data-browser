/**
 * Handles Project's API requests
 */
// TODO move to Azul APIs section
import { AZUL_PARAM } from "../../apis/azul/common/constants";
import {
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { transformFilters } from "../../apis/azul/common/filterTransformer";
import { config } from "../../config/config";
import { FilterState } from "../../hooks/useCategoryFilter";
import {
  DEFAULT_DETAIL_PARAMS,
  DEFAULT_LIST_PARAMS,
  URL,
} from "../../shared/constants";
import { convertUrlParams } from "../../utils/url";

const { summaryConfig: summaryConfig } = config();

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- see todo
function createFetchOptions(accessToken: string | undefined): any {
  // TODO https://github.com/clevercanary/data-browser/issues/545
  if (accessToken) {
    const headers = new Headers();
    headers.append("authorization", "Bearer " + accessToken);
    return { headers };
  } else return {};
}

/**
 * Make a GET or POST request for a list of entities
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @param accessToken - string - auth token
 * @returns @see ListResponseType
 */
export const fetchEntitiesFromQuery = async (
  apiPath: string,
  listParams: AzulListParams,
  accessToken: string | undefined
): Promise<AzulEntitiesResponse> => {
  const params = { ...DEFAULT_LIST_PARAMS, ...listParams };
  return await fetchEntitiesFromURL(
    `${URL}${apiPath}?${convertUrlParams(params)}`,
    accessToken
  );
};

/**
 * Fetch entites list corresponding to the givenURL
 * @param url - url to request the list from
 * @param accessToken - auth token
 */
export const fetchEntitiesFromURL = async (
  url: string,
  accessToken: string | undefined
): Promise<AzulEntitiesResponse> => {
  const res = await fetch(url, createFetchOptions(accessToken));
  return await res.json();
};

/**
 * Recursively call the endpoint to get a list of entities. This will iterate over the entity list until the next entity comes null
 * @param apiPath - Path that will be used to compose the API url
 * @returns @see ListResponseType
 */
export const fetchAllEntities = async (
  apiPath: string
): Promise<AzulEntitiesResponse> => {
  const listParams = {};
  const result = await fetchEntitiesFromQuery(apiPath, listParams, undefined);
  let hits = result.hits;
  let nextPage = result.pagination.next;
  while (nextPage) {
    const resNextPage = await fetch(nextPage);
    const nextPageJson: AzulEntitiesResponse = await resNextPage.json();
    nextPage = nextPageJson.pagination.next;
    hits = [...hits, ...nextPageJson.hits];
  }
  return { ...result, hits } as AzulEntitiesResponse;
};

/**
 *  Request to get a single project.
 * @param id - entity's uuid.
 * @param apiPath - API endpoint URL.
 * @param param - Catalog's version, if none passed it will default to the current one.
 * @returns @see ProjectResponse
 */
export const fetchEntityDetail = async (
  id: string,
  apiPath: string,
  param = DEFAULT_DETAIL_PARAMS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this response type can't be determined beforehand
): Promise<any> => {
  const res = await fetch(
    `${URL}${apiPath}/${id}?${convertUrlParams({ ...param })}`
  );
  return await res.json();
};

/**
 * Request to a single summary object that doesn't need id
 * @param filterState - selected filters
 * @param accessToken - auth token
 * @returns @see SummaryResponse
 */
export const fetchSummary = async (
  filterState: FilterState,
  accessToken: string | undefined
): Promise<AzulSummaryResponse> => {
  if (!summaryConfig) {
    throw new Error("Summary not configured!");
  }

  const apiPath = summaryConfig.apiPath;

  // Build filter query params, if any
  let summaryParams;
  const filtersParam = transformFilters(filterState);
  if (filtersParam) {
    summaryParams = { [AZUL_PARAM.FILTERS]: filtersParam }; //TODO Check if we need to add the catalog here (merge in default params)
  }

  const options = createFetchOptions(accessToken);
  const res = await fetch(
    `${URL}${apiPath}?${convertUrlParams({ ...summaryParams })}`,
    options
  );
  return await res.json();
};
