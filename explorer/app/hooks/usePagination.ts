import { AzulEntitiesResponse } from "app/apis/azul/common/entities";
import { Pagination } from "app/common/entities";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../common/context/authState";
import { useAsync } from "./useAsync";
import { useEntityService } from "./useEntityService";

const DEFAULT_CURRENT_PAGE = 1;

// TODO(cc) revisit optional chaining; pagination needs to be optional. #338
export const usePagination = (data?: AzulEntitiesResponse): Pagination => {
  const { token } = useContext(AuthContext);
  const { run } = useAsync<AzulEntitiesResponse>();

  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { fetchEntitiesFromURL } = useEntityService();

  // Init pagination-related state.
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

  // Create callback for next page action.
  const nextPage = useCallback(async () => {
    if (data?.pagination?.next) {
      setCurrentPage((s) => s + 1);
      run(fetchEntitiesFromURL(data.pagination.next, token));
    }
  }, [data, fetchEntitiesFromURL, run, token]);

  // Create callback for previous page action.
  const previousPage = useCallback(async () => {
    if (data?.pagination?.previous) {
      setCurrentPage((s) => s - 1);
      run(fetchEntitiesFromURL(data.pagination.previous, token));
    }
  }, [data, fetchEntitiesFromURL, run, token]);

  const resetPage = useCallback(() => {
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  }, []);

  return {
    canNextPage: !!data?.pagination?.next,
    canPreviousPage: !!data?.pagination?.previous,
    currentPage,
    nextPage,
    previousPage,
    resetPage,
  };
};
