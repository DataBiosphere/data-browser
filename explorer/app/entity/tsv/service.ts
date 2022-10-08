/**
 * Handles requests to TSV file
 */

import { PAGINATION_PAGE_SIZE } from "app/shared/constants";
import { database } from "app/utils/database";
import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";

export const fetchEntitiesFromQuery = async (
  entityListType: string
): Promise<AzulEntitiesResponse> => {
  const entities = database.get().all(entityListType);
  return Promise.resolve({
    hits: entities,
    pagination: {
      count: 0,
      pages: Math.ceil(entities.length / PAGINATION_PAGE_SIZE),
      size: PAGINATION_PAGE_SIZE,
      total: entities.length,
    },
    termFacets: {},
  });
};

export const fetchEntitiesFromURL = async (
  entityListType: string
): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery(entityListType);
};

export const fetchAllEntities = async (
  entityListType: string
): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery(entityListType);
};

// TODO review type
export const fetchEntityDetail = async (): Promise<unknown[]> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};

export const fetchSummary = async (): Promise<AzulSummaryResponse> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};
