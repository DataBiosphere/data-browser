import { useContext, useEffect } from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
  AzulListParams,
} from "../apis/azul/common/entities";
import {
  transformAzulPagination,
  transformFilters,
  transformTermFacets,
} from "../apis/azul/common/filterTransformer";
import { AuthContext } from "../common/context/authState";
import {
  ExploreActionKind,
  ExploreStateContext,
} from "../common/context/exploreState";
import { useAsync } from "./useAsync";
import { getEntityServiceByPath } from "./useEntityService";

/**
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param staticResponse - Statically loaded data, if any.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse
): void => {
  // Load up the relevant contexts
  const { exploreDispatch, exploreState } = useContext(ExploreStateContext);
  const { filterState, sortState } = exploreState;
  const { sortKey, sortOrder } = sortState;

  const { token } = useContext(AuthContext);
  const { fetchEntitiesFromQuery, listStaticLoad, path } =
    getEntityServiceByPath(exploreState.tabValue); // Determine type of fetch to be executed, either API endpoint or TSV.
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>(); // Init fetch of entities.
  const { termFacets } = data || {};

  /**
   * Hook for fetching entities matching the current query and authentication state.
   * Only runs if one of its deps changes. Skipped if staticLoaded entity
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

      if (
        exploreState.paginationState?.index?.type &&
        exploreState.paginationState.index.value
      ) {
        listParams[exploreState.paginationState.index.type] =
          exploreState.paginationState.index.value;
      }

      // Execute the fetch.
      run(fetchEntitiesFromQuery(path, listParams, token));
    }
  }, [
    exploreState.paginationState.index,
    fetchEntitiesFromQuery,
    filterState,
    path,
    run,
    sortKey,
    sortOrder,
    listStaticLoad,
    token,
  ]);

  // Builds categoryViews with an update of term facets.
  useEffect(() => {
    if (!listStaticLoad && termFacets) {
      exploreDispatch({
        payload: {
          listItems: data?.hits,
          loading: isLoading || isIdle,
          paginationResponse: transformAzulPagination(data?.pagination),
          selectCategories: transformTermFacets(termFacets),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    data?.hits,
    data?.pagination,
    exploreDispatch,
    isIdle,
    isLoading,
    listStaticLoad,
    termFacets,
  ]);

  useEffect(() => {
    if (
      listStaticLoad &&
      staticResponse &&
      staticResponse.data &&
      staticResponse.data.hits &&
      staticResponse.data.termFacets &&
      staticResponse.entityListType === exploreState.tabValue
    ) {
      const listItems = staticResponse?.data?.hits ?? [];
      exploreDispatch({
        payload: {
          listItems: listItems,
          loading: false,
          paginationResponse: {
            nextIndex: null,
            pageSize: listItems.length,
            pages: 1,
            previousIndex: null,
            rows: listItems.length,
          },
          selectCategories: [],
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    staticResponse?.data?.hits,
    staticResponse.entityListType,
    exploreState.tabValue,
    exploreDispatch,
    listStaticLoad,
    staticResponse,
  ]);
};
