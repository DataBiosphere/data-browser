import { AzulSummaryResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { Summary } from "@clevercanary/data-explorer-ui/lib/components/Index/components/Hero/components/Summaries/summaries";
import { formatCountSize } from "@clevercanary/data-explorer-ui/lib/utils/formatCountSize";
import {
  BIND_SUMMARY_RESPONSE,
  PLURALIZED_METADATA_LABEL,
  SUMMARY_LABEL,
} from "./constants";
import { METADATA_KEY, SUMMARY } from "./entities";

/**
 * Returns the pluralized metadata label for the specified metadata.
 * @param metadataKey - Metadata key.
 * @returns string label describing the metadata in plural form.
 */
export function getPluralizedMetadataLabel(
  metadataKey: keyof typeof METADATA_KEY
): string {
  return PLURALIZED_METADATA_LABEL[metadataKey];
}

/**
 * Maps index summaries from summary API response.
 * @param summaries - Summary list.
 * @param summaryResponse - Response model return from summary API.
 * @returns summary counts.
 */
export function getSummaries(
  summaries: Array<keyof typeof SUMMARY>,
  summaryResponse: AzulSummaryResponse
): Summary[] {
  return summaries.map((summary) => {
    const summaryBinderFn = BIND_SUMMARY_RESPONSE[summary];
    const count = summaryBinderFn(summaryResponse);
    const formattedCount = formatCountSize(count);
    const label = SUMMARY_LABEL[summary];
    return {
      count: formattedCount,
      label,
    };
  });
}
