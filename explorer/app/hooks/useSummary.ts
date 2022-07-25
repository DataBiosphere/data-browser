import { summary as loadSummary } from "app/entity/api/service";
import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { AzulSummaryResponse } from "../apis/azul/common/entities";

interface UseSummaryResponse {
  isLoading: boolean;
  response?: AzulSummaryResponse;
}

/**
 * Hook responsible to handle the load of the values that will be used on listing page's summary.
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useSummary = (): UseSummaryResponse => {
  const { summary } = useConfig();
  const {
    data: response,
    isLoading: apiIsLoading,
    run,
  } = useAsync<AzulSummaryResponse>();

  useEffect(() => {
    if (summary) {
      run(loadSummary(summary.apiPath));
    }
  }, [run, summary]);

  if (!summary) {
    return { isLoading: false }; //TODO: return a summary placeholder
  }

  return {
    isLoading: apiIsLoading,
    response,
  };
};
