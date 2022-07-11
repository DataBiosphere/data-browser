import { config } from "../config/config";

/**
 * Site specific environment variables
 */
export const URL: string = config().datasources.url;
export const DEFAULT_LIST_PARAMS = config().datasources.defaultListParams ?? {};
export const DEFAULT_DETAIL_PARAMS =
  config().datasources.defaultDetailParams ?? {};

export const isDevelopment = () => process.env.NODE_ENV === "development";

/**
 * Values to determine the index for each param.
 * https://host/explore/[slug]/[param-uuid]/[param-tab]
 * Index 0 will return the current uuid
 * Index 1 will return the current tab
 */
export const PARAMS_INDEX_UUID = 0;
export const PARAMS_INDEX_TAB = 1;
