import { config } from "app/config/config";
import { useContext, useEffect } from "react";
import { AzulSummaryResponse } from "../apis/azul/common/entities";
import { AuthContext } from "../common/context/authState";
import { ExploreStateContext } from "../common/context/exploreState";
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
  const { exploreState } = useContext(ExploreStateContext);
  const {
    data: response,
    isLoading: apiIsLoading,
    run,
  } = useAsync<AzulSummaryResponse>();

  const tabValue = exploreState.tabValue;
  const { fetchSummary } = useEntityService(tabValue); // Determine type of fetch to be executed, either API endpoint or TSV.

  useEffect(() => {
    if (summaryConfig) {
      run(fetchSummary(exploreState.filterState, token));
    }
  }, [fetchSummary, exploreState.filterState, run, token]);

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