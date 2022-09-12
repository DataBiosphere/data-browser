import {
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { FilterState } from "../../hooks/useCategoryFilter";

/**
 * Object that has all necessary functions to fetch data to fill listing and detail pages
 * for each entity
 */
export interface EntityService {
  fetchAllEntities: (apiPath: string) => Promise<AzulEntitiesResponse>;

  fetchEntitiesFromQuery: (
    apiPath: string,
    listParams: AzulListParams,
    accessToken: string | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type can't be known before hand
  ) => Promise<AzulEntitiesResponse>;

  fetchEntitiesFromURL: (
    url: string,
    accessToken: string | undefined
  ) => Promise<AzulEntitiesResponse>;

  fetchEntityDetail: (
    id: string,
    apiPath: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type can't be known before hand
  ) => Promise<any>;

  fetchSummary: (
    filterState: FilterState,
    accessToken: string | undefined
  ) => Promise<AzulSummaryResponse>;
}

/**
 * Type that list all possible fetchers
 */
export type EntityServiceType = "API" | "TSV";
