/**
 * Handles Project's API requests
 */

import {
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { Options } from "../../config/common/entities";
import {
  DEFAULT_DETAIL_PARAMS,
  DEFAULT_LIST_PARAMS,
  URL,
} from "../../shared/constants";
import { convertUrlParams } from "../../utils/url";

/**
 * Make a GET or POST request for a list of entities
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @param options - String with the type of API call, must be either GET or POST for now
 * @returns @see ListResponseType
 */
export const list = async (
  apiPath: string,
  listParams?: AzulListParams,
  options?: Options
): Promise<AzulEntitiesResponse> => {
  const params = { ...DEFAULT_LIST_PARAMS, ...listParams };
  return await fetchList(`${URL}${apiPath}`, params, options);
};

/**
 * Make a get request to get a list of entities.
 * @param url - Absolute URL to be used on the request
 * @param params - The parameters to be used for the API call
 * @param options - String with the type of API call, must be either GET or POST for now
 * @returns JSON representation of request list.
 */
export const fetchList = async (
  url: string,
  params?: Record<string, string>,
  options?: Options
): Promise<AzulEntitiesResponse> => {
  if (options?.method === "GET" || options?.method === undefined) {
    const urlWithParams = `${url}?${convertUrlParams(params ?? {})}`;
    const res = await fetch(urlWithParams);
    return await res.json();
  } else {
    const res = await fetch(url, {
      ...options,
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  }
};

/**
 * Recursively call the endpoint to get a list of entities. This will iterate over the entity list until the next entity comes null
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @param options - String with the type of API call, must be either GET or POST for now
 * @returns @see ListResponseType
 */
export const listAll = async (
  apiPath: string,
  listParams?: AzulListParams,
  options?: Options
): Promise<AzulEntitiesResponse> => {
  let hits = [];
  const result = await list(apiPath, listParams, options);
  hits = result.hits;
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
 * @param id - project's uuid.
 * @param apiPath - API endpoint URL.
 * @param options - The method to use to make the API call, right now either GET or POST
 * @param param - Catalog's version, if none passed it will default to the current one.
 * @returns @see ProjectResponse
 */
export const detail = async (
  id: string,
  apiPath: string,
  options?: Options,
  param = DEFAULT_DETAIL_PARAMS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this response type can't be determined beforehand
): Promise<any> => {
  const res = await fetch(
    `${URL}${apiPath}/${id}?${convertUrlParams({ ...param })}`,
    options
  );
  return await res.json();
};

/**
 * Request to a single summary object that doesn't need id
 * @param apiPath - API endpoint URL.
 * @param param - Query string params to include in request.
 * @returns @see SummaryResponse
 */
export const summary = async (
  apiPath: string,
  param = DEFAULT_DETAIL_PARAMS
): Promise<AzulSummaryResponse> => {
  const res = await fetch(`${URL}${apiPath}?${convertUrlParams({ ...param })}`);
  return await res.json();
};
