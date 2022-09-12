import { config } from "app/config/config";
import { useContext, useEffect } from "react";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { AuthContext } from "../common/context/authState";
import { FilterStateContext } from "../common/context/filterState";
import { useAsync } from "./useAsync";
import { useEntityService } from "./useEntityService";

const { summaryConfig: summaryConfig } = config();

interface UseSummaryResponse {
  isLoading: boolean;
  response?: AzulSummaryResponse;
}

/**
 * Hook responsible for handling the load of the summary values displayed on an entity index page.
 * @returns an object with the loaded data and a flag indicating is the data is loading
 */
export const useSummary = (): UseSummaryResponse => {
  const { token } = useContext(AuthContext);
  const { filterState } = useContext(FilterStateContext);
  const {
    data: response,
    isLoading: apiIsLoading,
    run,
  } = useAsync<AzulSummaryResponse>();
  const { fetchSummary } = useEntityService(); // Determine type of fetch to be executed, either API endpoint or TSV.

  useEffect(() => {
    if (summaryConfig) {
      run(fetchSummary(filterState, token));
    }
  }, [fetchSummary, filterState, run, token]);

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
