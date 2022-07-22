// App
import { ListParams } from "app/models/params";
import { ListResponseType, SummaryResponse } from "app/models/responses";

/**
 * Object that has all necessary functions to fetch data to fill listing and detail pages
 * for each entity
 */
export interface Fetcher {
  list: (apiPath: string, listParams?: ListParams) => Promise<ListResponseType>;
  listAll: (
    apiPath: string,
    listParams?: ListParams
  ) => Promise<ListResponseType>;
  fetchList: (url: string) => Promise<ListResponseType>;
  detail: (
    id: string,
    apiPath: string,
    param?: { [key: string]: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type can't be known before hand
  ) => Promise<any>;
  summary: (
    apiPath: string,
    param?: { [key: string]: string }
  ) => Promise<SummaryResponse>;
}

/**
 * Type that list all possible fetchers
 */
export type FetcherType = "API" | "TSV";
