import { useCallback, useEffect, useMemo } from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
  AzulListParams,
  Filters,
} from "../apis/azul/common/entities";
import {
  transformFilters,
  transformTermFacets,
} from "../apis/azul/common/filterTransformer";
import {
  CategoryKey,
  CategoryValueKey,
  Pagination,
  SelectCategory,
  Sort,
} from "../common/entities";
import { useAsync } from "./useAsync";
import { OnFilterFn, useCategoryFilter } from "./useCategoryFilter";
import { useFetcher } from "./useFetcher";
import { usePagination } from "./usePagination";
import { useSort } from "./useSort";

/**
 * Type of function called to update filter query string params and trigger re-fetch of entities.
 */
export type SetFilterFn = (nextFilters: Filters) => void;

/**
 * Model of loading state, pagination, sort, filter and data related to the fetch.
 */
interface EntitiesResponse {
  categories: SelectCategory[];
  loading: boolean;
  onFilter: OnFilterFn;
  pagination?: Pagination;
  response?: AzulEntitiesResponse;
  sort?: Sort;
}

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
): EntitiesResponse => {
  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { list, path, staticLoad } = useFetcher();

  // Init fetch of entities.
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>();
  const { resetPage, ...pagination } = usePagination(data);
  const { sort, sortKey, sortOrder } = useSort();

  // Generalize the filters returned from Azul.
  const categories = useMemo(() => {
    if (staticLoad || !data) {
      return [];
    }
    return transformTermFacets(data.termFacets);
  }, [data, staticLoad]);

  // Init filter functionality.
  const {
    categories: categoryViews,
    filter,
    onFilter,
  } = useCategoryFilter(categories, initialFilter);

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

  const handleFilterChange = useCallback(
    (
      categoryKey: CategoryKey,
      selectedCategoryValue: CategoryValueKey,
      selected: boolean
    ) => {
      onFilter(categoryKey, selectedCategoryValue, selected);
      resetPage();
    },
    [onFilter, resetPage]
  );

  // Exit if we're dealing with a statically-loaded entity; data has already been fetched during build; indicate
  // load is complete and return static data.
  if (staticLoad) {
    return {
      categories: [],
      loading: false,
      onFilter,
      response: staticResponse?.data,
    };
  }

  // Otherwise, return the fetching, pagination and sort state.
  return {
    categories: categoryViews,
    loading: isLoading || isIdle,
    onFilter: handleFilterChange,
    pagination: { ...pagination, resetPage },
    response: data,
    sort: {
      sort,
      sortKey,
      sortOrder,
    },
  };
};
