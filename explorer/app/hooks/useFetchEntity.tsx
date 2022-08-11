import { PARAMS_INDEX_UUID } from "app/shared/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AzulEntityStaticResponse } from "../apis/azul/common/entities";
import { useAsync } from "./useAsync";
import { useFetcher } from "./useFetcher";

interface UseEntityDetailResponse<T> {
  isLoading: boolean;
  response?: T;
}

/**
 * Hook handling the load and transformation of the values used by detail pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl
 * @param value - Statically loaded data, if any.
 * @returns Object with the loaded data and a flag indicating is the data is loading.
 */
export const useFetchEntity = <T,>(
  value?: AzulEntityStaticResponse
): UseEntityDetailResponse<T> => {
  const { detail, path, staticLoad } = useFetcher();
  const router = useRouter();
  const uuid = router.query.params?.[PARAMS_INDEX_UUID] as string;
  const {
    data: response,
    isIdle,
    isLoading: apiIsLoading,
    run,
  } = useAsync<T>();

  useEffect(() => {
    if (!staticLoad && uuid) {
      run(detail(uuid, path));
    }
  }, [detail, path, run, staticLoad, uuid]);

  if (staticLoad) {
    return { isLoading: false, response: value?.data };
  }

  return {
    isLoading: apiIsLoading || isIdle,
    response,
  };
};
