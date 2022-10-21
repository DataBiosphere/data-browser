import { createContext, Dispatch, ReactNode, useReducer } from "react";
import {
  AzulSearchIndex,
  SelectedFilter,
} from "../../apis/azul/common/entities";
import { config, getDefaultSort, getEntityConfig } from "../../config/config";
import {
  buildCategoryViews,
  buildNextFilterState,
} from "../../hooks/useCategoryFilter";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  SelectCategory,
  Sort,
  SortOrderType,
} from "../entities";

/**
 * Model of explore state context.
 */
interface IExploreStateContext {
  exploreDispatch: Dispatch<ExploreAction>;
  exploreState: ExploreState;
}

const defaultPaginationState = {
  currentPage: 1,
  index: null,
  nextIndex: null,
  pageSize: 25,
  pages: 1,
  previousIndex: null,
  rows: 0,
};

const defaultEntity = config().redirectRootToPath?.slice(1) ?? ""; // TODO remove ??

/**
 * Explore state context for storing and using filter-related and explore state.
 */
export const ExploreStateContext = createContext<IExploreStateContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  /**
   * The defaultValue argument is only used when a component does not have a matching Provider
   * above it in the tree. This default value can be helpful for testing components
   * in isolation without wrapping them. Note: passing undefined as a Provider value
   * does not cause consuming components to use defaultValue.
   * So basically the default value is not used...
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- default note used
  exploreDispatch: () => {},
  exploreState: {
    categoryViews: [],
    filterState: [],
    listItems: [],
    listStaticLoad: false,
    loading: false,
    paginationState: defaultPaginationState,
    sortState: {
      sortKey: getDefaultSort(getEntityConfig(defaultEntity)) ?? "",
      sortOrder: "asc",
    }, // TODO remove ??
    tabValue: defaultEntity,
  },
});

/**
 * Explore state provider for consuming components to subscribe to changes in filter-related and explore-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @param props.entityListType - type of list to display
 * @returns Provider element to be used by consumers to both update explore state and subscribe to changes in explore state.
 */
export function ExploreStateProvider({
  children,
  entityListType,
}: {
  children: ReactNode | ReactNode[];
  entityListType: string;
}): JSX.Element {
  if (!entityListType) {
    entityListType = defaultEntity;
  }
  const [exploreState, exploreDispatch] = useReducer(exploreReducer, {
    categoryViews: [],
    filterState: [],
    listItems: [],
    listStaticLoad: getEntityConfig(entityListType).staticLoad ?? false,
    loading: true,
    paginationState: defaultPaginationState,
    sortState: {
      sortKey: getDefaultSort(getEntityConfig(entityListType)) ?? "", // TODO remove ??
      sortOrder: "asc",
    },
    tabValue: entityListType,
  });

  return (
    <ExploreStateContext.Provider value={{ exploreDispatch, exploreState }}>
      {children}
    </ExploreStateContext.Provider>
  );
}

export interface PaginationIndex {
  type: AzulSearchIndex;
  value: string | null;
}

export interface PaginationState {
  currentPage: number;
  index: PaginationIndex | null;
  nextIndex: PaginationIndex | null;
  pages: number;
  pageSize: number;
  previousIndex: PaginationIndex | null;
  rows: number;
}

export interface PaginationResponse {
  nextIndex: PaginationIndex | null;
  pages: number;
  pageSize: number;
  previousIndex: PaginationIndex | null;
  rows: number;
}

export interface ExploreResponse {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding reqct query or similar
  listItems: any[] | undefined;
  loading: boolean;
  paginationResponse: PaginationResponse;
  selectCategories: SelectCategory[];
}

export type ExploreState = {
  categoryViews: SelectCategory[];
  filterState: SelectedFilter[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding reqct query or similar
  listItems: any[] | undefined;
  listStaticLoad: boolean;
  loading: boolean;
  paginationState: PaginationState;
  sortState: Sort;
  tabValue: string;
};

export enum ExploreActionKind {
  // ClearFilters = "CLEAR_FILTERS",
  FlipSortOrder = "FLIP_SORT_ORDER",
  PaginateTable = "PAGINATE_TABLE",
  ProcessExploreResponse = "PROCESS_EXPLORE_RESPONSE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  SetSortKey = "SET_SORT_KEY",
  UpdateFilter = "UPDATE_FILTER",
}

type ExploreAction =
  | PaginateTableAction
  | ProcessExploreResponseAction
  | SelectEntityTypeAction
  | SetSortKeyAction
  | SetSortOrderAction
  | UpdateFilterAction;

type PaginateTableAction = {
  payload: PaginationDirectionType;
  type: ExploreActionKind.PaginateTable;
};

type ProcessExploreResponseAction = {
  payload: ExploreResponse;
  type: ExploreActionKind.ProcessExploreResponse;
};

type SelectEntityTypeAction = {
  payload: string;
  type: ExploreActionKind.SelectEntityType;
};

type SetSortKeyAction = {
  payload: string;
  type: ExploreActionKind.SetSortKey;
};

type SetSortOrderAction = {
  payload: SortOrderType;
  type: ExploreActionKind.FlipSortOrder;
};

type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: ExploreActionKind.UpdateFilter;
};

type UpdateFilterPayload = {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
};

function resetPage(paginationState: PaginationState): PaginationState {
  const nextPaginationState = { ...paginationState };
  nextPaginationState.index = null;
  nextPaginationState.currentPage = 1;

  return nextPaginationState;
}

function exploreReducer(
  state: ExploreState,
  action: ExploreAction
): ExploreState {
  const { payload, type } = action;
  const { categoryConfigs } = config();

  switch (type) {
    /**
     * Flip sort order
     **/
    case ExploreActionKind.FlipSortOrder: {
      const nextSort: Sort = { ...state.sortState };
      if (state.sortState.sortOrder == "asc") {
        nextSort.sortOrder = "desc";
      } else {
        nextSort.sortOrder = "asc";
      }

      return {
        ...state,
        paginationState: resetPage(state.paginationState),
        sortState: nextSort,
      };
    }
    /**
     * Paginate table
     **/
    case ExploreActionKind.PaginateTable: {
      const nextPaginationState = { ...state.paginationState };
      if (payload == "next") {
        nextPaginationState.currentPage++;
        nextPaginationState.index = nextPaginationState.nextIndex;
      } else {
        nextPaginationState.currentPage--;
        nextPaginationState.index = nextPaginationState.previousIndex;
      }
      return {
        ...state,
        paginationState: nextPaginationState,
      };
    }
    /**
     * Process explore response
     **/
    case ExploreActionKind.ProcessExploreResponse: {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding reqct query or similar
      let listItems: any[] | undefined = [];
      if (!payload.loading) {
        listItems = payload.listItems;
      }
      return {
        ...state,
        categoryViews: buildCategoryViews(
          payload.selectCategories,
          categoryConfigs,
          state.filterState
        ),
        listItems: listItems,
        loading: payload.loading,
        paginationState: {
          currentPage: state.paginationState.currentPage,
          index: state.paginationState.index,
          nextIndex: payload.paginationResponse.nextIndex,
          pageSize: payload.paginationResponse.pageSize,
          pages: payload.paginationResponse.pages,
          previousIndex: payload.paginationResponse.previousIndex,
          rows: payload.paginationResponse.rows,
        },
      };
    }
    /**
     * Select entity type
     **/
    case ExploreActionKind.SelectEntityType: {
      if (payload === state.tabValue) {
        return state;
      }
      const nextSort: Sort = {
        sortKey: getDefaultSort(getEntityConfig(payload)),
        sortOrder: "asc",
      };

      const { tsv } = getEntityConfig(payload);
      const listStaticLoad = !!tsv;

      return {
        ...state,
        listItems: [],
        listStaticLoad,
        loading: true,
        paginationState: resetPage(state.paginationState),
        sortState: nextSort,
        tabValue: payload,
      };
    }
    /**
     * Set sort key
     **/
    case ExploreActionKind.SetSortKey: {
      const nextSort: Sort = {
        sortKey: payload,
        sortOrder: "asc",
      };
      return {
        ...state,
        paginationState: resetPage(state.paginationState),
        sortState: nextSort,
      };
    }
    /**
     * Update filter
     **/
    case ExploreActionKind.UpdateFilter: {
      return {
        ...state,
        filterState: buildNextFilterState(
          state.filterState,
          payload.categoryKey,
          payload.selectedValue,
          payload.selected
        ),
        paginationState: resetPage(state.paginationState),
      };
    }
    default:
      return state;
  }
}
