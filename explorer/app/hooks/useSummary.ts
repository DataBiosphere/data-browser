import { useEffect } from "react";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { useFetcher } from "./useFetcher";

interface UseSummaryResponse {
  isLoading: boolean;
  response?: AzulSummaryResponse;
}

/**
 * Hook responsible for handling the load of the summary values displayed on an entity index page.
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useSummary = (): UseSummaryResponse => {
  // Grab the summary config for this site.
  const { summaryConfig: summaryConfig } = useConfig();

  // Initialize the fetch.
  const {
    data: response,
    isLoading: apiIsLoading,
    run,
  } = useAsync<AzulSummaryResponse>();

  // Determine type of fetch to be executed, either API endpoint or TSV.
  const { summary } = useFetcher();

  // Fetch the summary if there's a summary config for this site. s
  useEffect(() => {
    if (summaryConfig) {
      run(summary(summaryConfig.apiPath));
    }
  }, [run, summary, summaryConfig]);

  // Return if there's no summary config for this site.
  if (!summaryConfig) {
    return { isLoading: false }; //TODO: return a summary placeholder
  }

  // Return the fetch status and summary data once fetch is complete..
  return {
    isLoading: apiIsLoading,
    response,
  };
};
