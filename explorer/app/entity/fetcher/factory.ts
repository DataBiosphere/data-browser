import * as apiService from "../api/service";
import * as tsvService from "../tsv/service";
import { Fetcher, FetcherType } from "./model";

const TSV_FETCHER: Fetcher = {
  detail: tsvService.detail,
  fetchList: tsvService.fetchList,
  list: tsvService.list,
  listAll: tsvService.listAll,
  summary: tsvService.summary,
};

const API_FETCHER: Fetcher = {
  detail: apiService.detail,
  fetchList: apiService.fetchList,
  list: apiService.list,
  listAll: apiService.listAll,
  summary: apiService.summary,
};

const FETCHERS: { [key in FetcherType]: Fetcher } = {
  API: API_FETCHER,
  TSV: TSV_FETCHER,
};

export const create = (type: FetcherType): Fetcher => FETCHERS[type];
