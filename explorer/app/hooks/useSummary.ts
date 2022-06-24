import { SummaryResponse } from "./../models/responses";
import { summary as loadSummary } from "app/entity/api/service";
import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";

interface UseSummaryResponse {
  isLoading: boolean;
  response?: SummaryResponse;
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
  } = useAsync<SummaryResponse>();

  useEffect(() => {
    if (summary) {
      run(loadSummary(summary.apiPath));
    }
  }, [run, summary]);

  if (!summary) {
    return { isLoading: false }; //TODO: return a summary placeholder
  }

  return {
    response,
    isLoading: apiIsLoading,
  };
};
