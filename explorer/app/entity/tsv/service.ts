/**
 * Handles requests to TSV file
 */

import { PAGINATION_PAGE_SIZE } from "app/shared/constants";
import { database } from "app/utils/database";
import { AnvilSourceItem } from "../../apis/anvil/common/entities";
import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";

export const fetchEntitiesFromQuery =
  async (): Promise<AzulEntitiesResponse> => {
    const items = database.get().all();
    return Promise.resolve({
      hits: items,
      pagination: {
        count: 0,
        pages: Math.ceil(items.length / PAGINATION_PAGE_SIZE),
        size: PAGINATION_PAGE_SIZE,
        total: items.length,
      },
      termFacets: {},
    });
  };

export const fetchEntitiesFromURL = async (): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery();
};

export const fetchAllEntities = async (): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery();
};

export const fetchEntityDetail = async (): Promise<AnvilSourceItem> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};

export const fetchSummary = async (): Promise<AzulSummaryResponse> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};
