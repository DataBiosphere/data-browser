/**
 * Handles requests to TSV file
 */

import { PAGINATION_PAGE_SIZE } from "app/shared/constants";
import { database } from "app/utils/database";
import {
  AnvilSourceItem,
  ListResponseType,
  SummaryResponse,
} from "../../models/responses";

export const list = async (): Promise<ListResponseType> => {
  const items = database.get().all();
  return Promise.resolve({
    hits: items,
    pagination: {
      count: 0,
      pages: Math.ceil(items.length / PAGINATION_PAGE_SIZE),
      size: PAGINATION_PAGE_SIZE,
      total: items.length,
    },
  });
};

export const fetchList = async (): Promise<ListResponseType> => {
  return list();
};

export const listAll = async (): Promise<ListResponseType> => {
  return list();
};

export const detail = async (): Promise<AnvilSourceItem> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};

export const summary = async (): Promise<SummaryResponse> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};
