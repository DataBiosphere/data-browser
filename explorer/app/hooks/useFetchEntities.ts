import { useCallback, useEffect, useMemo, useState } from "react";
import { useAsync } from "./useAsync";
import { useCurrentEntity } from "./useCurrentEntity";
import { EntityConfig } from "app/config/common/entities";
import { useFetcher } from "./useFetcher";
import { useResetableState } from "./useResetableState";
import {
  AzulEntitiesStaticResponse,
  AzulEntitiesResponse,
  Filters,
  AzulListParams,
} from "../apis/azul/common/entities";
import { SelectCategory } from "../common/entities";
import {
  transformFilters,
  transformTermFacets,
} from "../apis/azul/common/filterTransformer";

/**
 * Type of function called to update filter query string params and trigger re-fetch of entities.
 */
export type SetFilterFn = (nextFilters: Filters) => void;

/**
 * Generic pagination model used by both static and dynamic lists.
 */
export interface PaginationConfig {
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

/**
 * Possible sort direction values.
 */
export type SortOrderType = "asc" | "desc";

/**
 * Generic sort model used by both static and dynamic lists.
 */
export interface SortConfig {
  sort: (key?: string, sortOrder?: SortOrderType) => void;
  sortKey?: string;
  sortOrder?: SortOrderType;
}

/**
 * Model of loading state, pagination, sort, filter and data related to the fetch.
 */
interface EntitiesResponse {
  categories: SelectCategory[];
  loading: boolean;
  pagination?: PaginationConfig;
  response?: AzulEntitiesResponse;
  setFilter: SetFilterFn;
  sort?: SortConfig;
}

const DEFAULT_CURRENT_PAGE = 1;

/**
 * Determine the default sort column.
 * @param entity - Current entity config containing all column definitions.
 * @returns Column name of default sorted column, or the first column if no default is specified.
 */
const getDefaultSort = (entity: EntityConfig): string | undefined => {
  return (
    entity.list.columns.find((column) => column.sort?.default)?.sort?.sortKey ??
    entity.list.columns[0].sort?.sortKey
  );
};

/**
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param staticResponse - Statically loaded data, if any.
 * @param initialFilter - Initial set of select categories.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useFetchEntities = (
  staticResponse: AzulEntitiesStaticResponse | null,
  initialFilter: Filters
  // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO revisit with #267.
): EntitiesResponse => {
  // Init pagination-related state.
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

  // Init query param-related state. TODO(mim) move to own hook to reduce complexity here, rename setFilterFn
  const [filter, setFilter] = useState<Filters>(initialFilter);
  const setFilterFn = useCallback((nextFilter: Filters) => {
    setFilter(nextFilter);
  }, []);

  // Grab the current entity.
  const entity = useCurrentEntity();

  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { fetchList, list, path, staticLoad } = useFetcher();

  // Init sort.
  const defaultSort = useMemo(() => getDefaultSort(entity), [entity]);
  const [sortKey, setSortKey] = useResetableState<string | undefined>(
    defaultSort
  );
  const [sortOrder, setSortOrder] = useState<SortOrderType | undefined>(
    defaultSort ? "asc" : undefined
  );

  // Init fetch of entities.
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>();

  // Execute fetch of entities.
  useEffect(() => {
    if (!staticLoad) {
      // Build basic list params
      const listParams: AzulListParams = { order: sortOrder, sort: sortKey };

      // Build filter query params, if any
      const filtersParam = transformFilters(filter);
      if (filtersParam) {
        listParams.filters = filtersParam;
      }

      // Execute the fetch.
      run(list(path, listParams));
    }
  }, [filter, list, path, run, sortKey, sortOrder, staticLoad]);

  // Handle change of sort.
  const sort = useCallback(
    (key?: string, order?: SortOrderType) => {
      setSortKey(key ?? defaultSort);
      setSortOrder(order);
    },
    [defaultSort, setSortKey]
  );

  // Create callback for next page action.
  const nextPage = useCallback(async () => {
    if (data?.pagination.next) {
      setCurrentPage((s) => s + 1);
      run(fetchList(data.pagination.next));
    }
  }, [data?.pagination.next, fetchList, run]);

  // Create callback for previous page action.
  const previousPage = useCallback(async () => {
    if (data?.pagination.previous) {
      setCurrentPage((s) => s - 1);
      run(fetchList(data.pagination.previous));
    }
  }, [data?.pagination.previous, fetchList, run]);

  const resetPage = useCallback(() => {
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  }, []);

  // Generalize the filters returned from Azul.
  const categories = useMemo(() => {
    if (staticLoad || !data) {
      return [];
    }
    return transformTermFacets(data.termFacets);
  }, [data, staticLoad]);

  // Exit if we're dealing with a statically-loaded entity; data has already been fetched during build; indicate
  // load is complete and return static data.
  if (staticLoad) {
    return {
      categories: [],
      loading: false,
      response: staticResponse?.data,
      setFilter: setFilterFn,
    };
  }

  // Otherwise, return the fetching, pagination and sort state.
  return {
    categories,
    loading: isLoading || isIdle,
    pagination: {
      canNextPage: !!data?.pagination.next,
      canPreviousPage: !!data?.pagination.previous,
      currentPage,
      nextPage,
      previousPage,
      resetPage,
    },
    response: data,
    setFilter: setFilterFn,
    sort: {
      sort,
      sortKey,
      sortOrder,
    },
  };
};
