import { isDevelopment } from "app/shared/constants";
import { ListModel } from "app/models/viewModels";
import { ListResponseType } from "app/models/responses";
import { list } from "app/entity/api/service";
import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { useCurrentEntity } from "./useCurrentEntity";
import { isSSR } from "app/utils/ssr";

interface UseEntityListResponse {
  response?: ListResponseType;
  isLoading: boolean;
}

/**
 * Hook responsible to handle the load and transformation of the values that will be used by listing pages.
 * If the current entity loaded statically, this hook will return the already loaded data. Otherwise, it will make
 * a request for the entity's pathUrl
 * @param value statically loaded data, if any
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useFetchEntities = (value?: ListModel): UseEntityListResponse => {
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

  if (!entity) {
    return { isLoading: false }; //TODO: return a error to make the user know that the entity doest exist
  }

  if (entity.staticLoad && !isDevelopment()) {
    return { response: value?.data, isLoading: false };
  }

  return {
    response: apiData,
    isLoading: apiIsLoading,
  };
};
