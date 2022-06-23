import { config } from "../config/config";

/**
 * Site specific environment variables
 */
export const URL: string = config().datasources.url;
export const DEFAULT_LIST_PARAMS = config().datasources.defaultListParams ?? {};
export const DEFAULT_DETAIL_PARAMS =
  config().datasources.defaultDetailParams ?? {};

export const isDevelopment = () => process.env.NODE_ENV === "development";
