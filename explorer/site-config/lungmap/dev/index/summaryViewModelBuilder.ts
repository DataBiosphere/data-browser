// Core dependencies
import React from "react";

// App dependencies
import * as C from "../../../../app/components";
import { getSummaries } from "../../../../app/components/Index/common/indexTransformer";
import { SummaryResponse } from "app/models/responses";
import { SUMMARIES } from "./common/constants";

/**
 * Build props for index Summaries component from the given summary response.
 * @param summaryResponse - Response model return from summary API.
 * @returns model to be used as props for the Summaries component.
 */
export const buildSummaries = (
  summaryResponse: SummaryResponse
): React.ComponentProps<typeof C.Summaries> => {
  return {
    summaries: getSummaries(SUMMARIES, summaryResponse),
  };
};
