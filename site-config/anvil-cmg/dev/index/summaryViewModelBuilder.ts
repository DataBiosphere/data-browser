import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { mapSummary } from "../../../../app/components/Index/common/indexTransformer";
import { SUMMARIES } from "./common/constants";

export const buildSummaries = (
  summaryResponse: AzulSummaryResponse
): [string, string][] => {
  return mapSummary(SUMMARIES, summaryResponse);
};
