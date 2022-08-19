import { AzulEntitiesResponse } from "app/apis/azul/common/entities";
import { Pagination } from "app/common/entities";
import { useCallback, useState } from "react";
import { useAsync } from "./useAsync";
import { useFetcher } from "./useFetcher";

const DEFAULT_CURRENT_PAGE = 1;

export const usePagination = (data?: AzulEntitiesResponse): Pagination => {
  const { run } = useAsync<AzulEntitiesResponse>();

  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { fetchList } = useFetcher();

  // Init pagination-related state.
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

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

  return {
    canNextPage: !!data?.pagination.next,
    canPreviousPage: !!data?.pagination.previous,
    currentPage,
    nextPage,
    previousPage,
    resetPage,
  };
};
