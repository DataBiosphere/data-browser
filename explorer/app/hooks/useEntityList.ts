import { useCallback, useContext, useEffect, useMemo } from "react";
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
import { AuthContext } from "../common/context/authState";
import {
  ExploreActionKind,
  FilterStateContext,
} from "../common/context/filterState";
import {
  CategoryKey,
  CategoryValueKey,
  Pagination,
  SelectCategory,
  Sort,
} from "../common/entities";
import { config } from "../config/config";
import { useAsync } from "./useAsync";
import { buildCategoryViews, OnFilterFn } from "./useCategoryFilter";
//import { OnFilterFn, useCategoryFilter } from "./useCategoryFilter";
import { getEntityServiceByPath } from "./useEntityService";
import { usePagination } from "./usePagination";

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
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse | null
): EntitiesResponse => {
  // Load up the relevant contexts
  const { exploreDispatch, exploreState } = useContext(FilterStateContext);
  const filterState = exploreState.filterState;
  const sortKey = exploreState.sortState.sortKey;
  const sortOrder = exploreState.sortState.sortOrder;
  const { token } = useContext(AuthContext);

  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { fetchEntitiesFromQuery, listStaticLoad, path } =
    getEntityServiceByPath(exploreState.tabValue);

  // Init fetch of entities.
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>();
  const { resetPage, ...pagination } = usePagination(data);
  //const { sort, sortKey, sortOrder } = useSort();
  const { categoryConfigs = [] } = config();

  // calculate the categories from the data response
  // only re-calc if the data changes.
  // TODO - revisit for client side filter.
  const categories = useMemo(() => {
    if (listStaticLoad || !data || !data.termFacets) {
      return [];
    }
    return transformTermFacets(data.termFacets);
  }, [data, listStaticLoad]);

  // Init filter functionality.
  // const {
  //   categories: categoryViews,
  //   filter,
  //   onFilter,
  // } = useMemoseCategoryFilter(categories, filterState);

  /**
   * Hook for updating the global FilterStateContext with current selected values.
   * This is in a hook to limit when it runs. The set filter state will only be run
   * if if the fitler value changes or the setFilterState function changes. These functions are
   * retrived from FilteStateContext
   * @param filter -
   * @param setFilerState - used to set the FilterStateContext
   */
  // useEffect(() => {
  //   setFilterState(filter);
  // }, [filter, setFilterState]);

  /**
   * Hook for fetching entites matching the current query and authentication state.
   * Only runs if one of its deps changes.
   */
  useEffect(() => {
    if (!listStaticLoad) {
      // Build basic list params
      const listParams: AzulListParams = { order: sortOrder, sort: sortKey };

      // Build filter query params, if any
      const filtersParam = transformFilters(filterState);
      if (filtersParam) {
        listParams.filters = filtersParam;
      }
      // Execute the fetch.
      run(fetchEntitiesFromQuery(path, listParams, token));
    }
  }, [
    fetchEntitiesFromQuery,
    filterState,
    path,
    run,
    sortKey,
    sortOrder,
    listStaticLoad,
    token,
  ]);

  // Function to call when the filter changes.
  // Wrapped in a useCallback so that it is memoized unless its deps change,
  // returned as part of this hook.
  const handleFilterChange = useCallback(
    (
      categoryKey: CategoryKey,
      selectedCategoryValue: CategoryValueKey,
      selected: boolean
    ) => {
      exploreDispatch({
        payload: {
          categoryKey,
          selected,
          selectedValue: selectedCategoryValue,
        },
        type: ExploreActionKind.UpdateFilter,
      });
      //    onFilter(categoryKey, selectedCategoryValue, selected);
      resetPage();
    },
    [exploreDispatch, resetPage]
  );

  // Exit if we're dealing with a statically-loaded entity; data has already been fetched during build; indicate
  // load is complete and return static data.
  if (listStaticLoad) {
    return {
      categories: [],
      loading: false,
      onFilter: (): string => {
        return "";
      },
      response: staticResponse?.data,
    };
  }

  // Otherwise, return the fetching, pagination and sort state.
  return {
    categories: buildCategoryViews(categories, categoryConfigs, filterState),
    loading: isLoading || isIdle,
    onFilter: handleFilterChange,
    pagination: { ...pagination, resetPage },
    response: data,
    sort: {
      sortKey,
      sortOrder,
    },
  };
};
