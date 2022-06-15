import { config } from "../config/config";

/**
 * Env vars
 */
export const URL: string = config().datasources.url;
export const CATALOG_VERSION: string = config().datasources.catalog;

export const isDevelopment = () => process.env.NODE_ENV === "development";
