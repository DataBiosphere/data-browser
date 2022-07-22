import { isDevelopment } from "app/shared/constants";
import { ListModel } from "app/models/viewModels";
import { ListResponseType } from "app/models/responses";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAsync } from "./useAsync";
import { useCurrentEntity } from "./useCurrentEntity";
import { isSSR } from "app/utils/ssr";
import { EntityConfig } from "app/config/model";
import { useFetcher } from "./useFetcher";

export interface PaginationConfig {
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
}

export type SortOrderType = "asc" | "desc";

export interface SortConfig {
  sort: (key?: string, sortOrder?: SortOrderType) => void;
  sortKey?: string;
  sortOrder?: SortOrderType;
}

interface UseEntityListResponse {
  response?: ListResponseType;
  isLoading: boolean;
  pagination?: PaginationConfig;
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
 * @param value - Statically loaded data, if any.
 * @returns An object with the loaded data and a flag indicating is the data is loading.
 */
export const useFetchEntities = (value?: ListModel): UseEntityListResponse => {
  const entity = useCurrentEntity();
  const { list, fetchList, path, staticLoad } = useFetcher();
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const defaultSort = useMemo(() => getDefaultSort(entity), [entity]);
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSort);
  const [sortOrder, setsortOrder] = useState<SortOrderType | undefined>(
    defaultSort ? "asc" : undefined
  );
  const {
    data: apiData,
    isLoading: apiIsLoading,
    run,
  } = useAsync<ListResponseType>();

  useEffect(() => {
    if ((!staticLoad || isDevelopment()) && !isSSR()) {
      run(list(path, { order: sortOrder, sort: sortKey }));
    }
  }, [list, path, run, sortKey, sortOrder, staticLoad]);

  const sort = useCallback(
    (key?: string, order?: SortOrderType) => {
      setSortKey(key ?? defaultSort);
      setsortOrder(order);
    },
    [defaultSort]
  );

  const nextPage = useCallback(async () => {
    if (apiData?.pagination.next) {
      setCurrentPage((s) => s + 1);
      run(fetchList(apiData?.pagination.next));
    }
  }, [apiData?.pagination.next, fetchList, run]);

  const previousPage = useCallback(async () => {
    if (apiData?.pagination.previous) {
      setCurrentPage((s) => s - 1);
      run(fetchList(apiData?.pagination.previous));
    }
  }, [apiData?.pagination.previous, fetchList, run]);

  const resetPage = useCallback(() => {
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  }, []);

  if (staticLoad) {
    return {
      isLoading: false,
      response: value?.data,
    };
  }

  return {
    isLoading: apiIsLoading || !apiData,
    pagination: {
      canNextPage: !!apiData?.pagination.next,
      canPreviousPage: !!apiData?.pagination.previous,
      currentPage,
      nextPage,
      previousPage,
      resetPage,
    },
    response: apiData,
    sort: {
      sort,
      sortKey,
      sortOrder,
    },
  };
};
