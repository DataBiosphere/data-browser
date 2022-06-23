import { isDevelopment } from "app/shared/constants";
import { ListModel } from "app/models/viewModels";
import { ListResponseType } from "app/models/responses";
import { fetchList, list } from "app/entity/api/service";
import { useCallback, useEffect, useState } from "react";
import { useAsync } from "./useAsync";
import { useCurrentEntity } from "./useCurrentEntity";
import { isSSR } from "app/utils/ssr";

export interface PaginationConfig {
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  currentPage: number;
}

interface UseEntityListResponse {
  response?: ListResponseType;
  isLoading: boolean;
  pagination?: PaginationConfig;
}

const DEFAULT_CURRENT_PAGE = 1;

/**
 * Hook responsible to handle the load and transformation of the values that will be used by listing pages.
 * If the current entity loaded statically, this hook will return the already loaded data. Otherwise, it will make
 * a request for the entity's pathUrl
 * @param value statically loaded data, if any
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useFetchEntities = (value?: ListModel): UseEntityListResponse => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const entity = useCurrentEntity();
  const {
    data: apiData,
    isLoading: apiIsLoading,
    run,
  } = useAsync<ListResponseType>();

  useEffect(() => {
    if (entity && (!entity.staticLoad || isDevelopment()) && !isSSR()) {
      run(list(entity.apiPath));
    }
  }, [entity, run]);

  const nextPage = useCallback(async () => {
    if (apiData?.pagination.next) {
      setCurrentPage((s) => s + 1);
      run(fetchList(apiData?.pagination.next));
    }
  }, [apiData?.pagination.next, run]);

  const previousPage = useCallback(async () => {
    if (apiData?.pagination.previous) {
      setCurrentPage((s) => s - 1);
      run(fetchList(apiData?.pagination.previous));
    }
  }, [apiData?.pagination.previous, run]);

  if (!entity) {
    return {
      isLoading: false,
    }; //TODO: return a error to make the user know that the entity doest exist
  }

  if (entity.staticLoad) {
    return {
      response: value?.data,
      isLoading: false,
    };
  }

  return {
    response: apiData,
    isLoading: apiIsLoading,
    pagination: {
      nextPage,
      previousPage,
      canNextPage: !!apiData?.pagination.next,
      canPreviousPage: !!apiData?.pagination.previous,
      currentPage,
    },
  };
};
