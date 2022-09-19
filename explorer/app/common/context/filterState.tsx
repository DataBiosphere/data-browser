import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { SelectedFilter } from "../../apis/azul/common/entities";
import { config, getDefaultSort, getEntityConfig } from "../../config/config";
import { buildNextFilterState } from "../../hooks/useCategoryFilter";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  Sort,
  SortOrderType,
} from "../entities";

/**
 * Model of filter state context.
 */
interface IFilterStateContext {
  exploreDispatch: Dispatch<ExploreAction>;
  exploreState: ExploreState;
}

const defaultPaginationState = {
  canNextPage: false,
  canPreviousPage: false,
  currentPage: 1,
  pageCount: 1,
  rowsPerPage: 0,
  totalRows: 0,
};

const defaultEntity = config().redirectRootToPath?.slice(1) ?? ""; // TODO remove ??

/**
 * Filter state context for storing and using filter-related state.
 */
export const FilterStateContext = createContext<IFilterStateContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  exploreDispatch: () => {},
  exploreState: {
    filterState: [],
    paginationState: defaultPaginationState,
    sortState: {
      sortKey: getDefaultSort(getEntityConfig(defaultEntity)) ?? "",
      sortOrder: "asc",
    }, // TODO remove ??
    tabValue: defaultEntity,
  },
});

/**
 * Filter state provider for consuming components to subscribe to changes in filter-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @returns Provider element to be used by consumers to both update filter state and subscribe to changes in filter state.
 */
export function FilterStateProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  // const [filterState, setFilterState] = useState<FilterState>([]);
  const [exploreState, exploreDispatch] = useReducer(exploreReducer, {
    filterState: [],
    paginationState: defaultPaginationState,
    sortState: {
      sortKey: getDefaultSort(getEntityConfig(defaultEntity)) ?? "", // TODO remove ??
      sortOrder: "asc",
    },
    tabValue: defaultEntity,
  });

  return (
    <FilterStateContext.Provider value={{ exploreDispatch, exploreState }}>
      {children}
    </FilterStateContext.Provider>
  );
}

export interface PaginationState {
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
  pageCount: number;
  rowsPerPage: number;
  totalRows: number;
}

type ExploreState = {
  filterState: SelectedFilter[];
  paginationState: PaginationState;
  sortState: Sort;
  tabValue: string;
};

export enum ExploreActionKind {
  ClearFilters = "CLEAR_FILTERS",
  FlipSortOrder = "FLIP_SORT_ORDER",
  PaginateTable = "PAGINATE_TABLE",
  SelectEntityType = "SELECT_ENTITY_TYPE",
  SetSortKey = "SET_SORT_KEY",
  UpdateFilter = "UPDATE_FILTER",
}

type ExploreAction =
  | UpdateFilterAction
  | SelectEntityTypeAction
  | SetSortOrderAction
  | SetSortKeyAction
  | PaginateTableAction;

type UpdateFilterPayload = {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
};

type UpdateFilterAction = {
  payload: UpdateFilterPayload;
  type: ExploreActionKind.UpdateFilter;
};

type SelectEntityTypeAction = {
  payload: string;
  type: ExploreActionKind.SelectEntityType;
};

type PaginateTableAction = {
  payload: PaginationDirectionType;
  type: ExploreActionKind.PaginateTable;
};

type SetSortKeyAction = {
  payload: string;
  type: ExploreActionKind.SetSortKey;
};

type SetSortOrderAction = {
  payload: SortOrderType;
  type: ExploreActionKind.FlipSortOrder;
};

function exploreReducer(
  state: ExploreState,
  action: ExploreAction
): ExploreState {
  const { payload, type } = action;
  switch (type) {
    /**
     * Update Filter
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
      };
    }
    /**
     * Select entity Type
     **/
    case ExploreActionKind.SelectEntityType: {
      const nextSort: Sort = {
        sortKey: getDefaultSort(getEntityConfig(payload)),
        sortOrder: "asc",
      };
      return {
        ...state,
        sortState: nextSort,
        tabValue: payload,
      };
    }
    /**
     * Flip Sort Order
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
        sortState: nextSort,
      };
    }
    /**
     * Set Sort Key
     **/
    case ExploreActionKind.SetSortKey: {
      const nextSort: Sort = {
        sortKey: payload,
        sortOrder: "asc",
      };
      return {
        ...state,
        sortState: nextSort,
      };
    }
    /**
     * Paginate Tale
     **/
    case ExploreActionKind.PaginateTable: {
      return {
        ...state, // TODO implement this case
      };
    }
    default:
      return state;
  }
}
