/**
 * Handles Project's API requests
 */

import { convertUrlParams } from "../../utils/url";
import {
  DEFAULT_LIST_PARAMS,
  DEFAULT_DETAIL_PARAMS,
  URL,
} from "../../shared/constants";
import { ListParams } from "../../models/params";
import { ListResponseType, SummaryResponse } from "../../models/responses";

/**
 * Request to get a list of entities.
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @returns @see ListResponseType
 */
export const list = async (
  apiPath: string,
  listParams?: ListParams
): Promise<ListResponseType> => {
  const params = { ...DEFAULT_LIST_PARAMS, ...listParams };
  return await fetchList(`${URL}${apiPath}?${convertUrlParams(params)}`);
};

/**
 * Make a get request to get a list of entities.
 * @param url - Absolute URL to be used on the request
 * @returns JSON representation of request list.
 */
export const fetchList = async (url: string): Promise<ListResponseType> => {
  const res = await fetch(url);
  return await res.json();
};

/**
 * Recursively call the endpoint to get a list of entities. This will iterate over the entity list until the next entity comes null
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @returns @see ListResponseType
 */
export const listAll = async (
  apiPath: string,
  listParams?: ListParams
): Promise<ListResponseType> => {
  let hits = [];
  const result = await list(apiPath, listParams);
  hits = result.hits;
  let nextPage = result.pagination.next;
  while (nextPage) {
    const resNextPage = await fetch(nextPage);
    const nextPageJson: ListResponseType = await resNextPage.json();
    nextPage = nextPageJson.pagination.next;
    hits = [...hits, ...nextPageJson.hits];
  }
  return { ...result, hits } as ListResponseType;
};

/**
 *  Request to get a single project.
 * @param id - project's uuid.
 * @param apiPath - API endpoint URL.
 * @param param - Catalog's version, if none passed it will default to the current one.
 * @returns @see ProjectResponse
 */
export const detail = async (
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
 * @param apiPath - API endpoint URL.
 * @param param - Query string params to include in request.
 * @returns @see SummaryResponse
 */
export const summary = async (
  apiPath: string,
  param = DEFAULT_DETAIL_PARAMS
): Promise<SummaryResponse> => {
  const res = await fetch(`${URL}${apiPath}?${convertUrlParams({ ...param })}`);
  return await res.json();
};
