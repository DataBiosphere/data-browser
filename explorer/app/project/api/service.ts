/**
 * Handles Project's API requests
 */

import { convertUrlParams } from "./../../utils";
import { CATALOG_VERSION, URL } from "../../shared";
import {
  ListParams,
  ProjectListResponse,
  ProjectResponse,
  VersionParam,
} from "../../models";

const DEFAULT_VERSION: VersionParam = {
  catalog: CATALOG_VERSION,
};

const DEFAULT_LIST_PARAMS: ListParams = {
  ...DEFAULT_VERSION,
  size: "25",
};

/**
 * Request to get a list of projects.
 * @param listParams Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @returns @see ProjectListResponse
 */
export const list = async (
  listParams?: ListParams
): Promise<ProjectListResponse> => {
  const params = { ...DEFAULT_LIST_PARAMS, ...listParams };
  const res = await fetch(`${URL}index/projects?${convertUrlParams(params)}`);
  return await res.json();
};

/**
 *  Request to get a single project.
 * @param id project's uuid.
 * @param param Catalog's version, if none passed it will default to the current one.
 * @returns @see ProjectResponse
 */
export const detail = async (
  id: string,
  param: VersionParam = DEFAULT_VERSION
): Promise<ProjectResponse> => {
  const res = await fetch(
    `${URL}index/projects/${id}?${convertUrlParams({ ...param })}`
  );
  return await res.json();
};
