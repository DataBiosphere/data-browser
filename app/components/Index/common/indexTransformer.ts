import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
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
 * Maps entity list summaries from summary API response.
 * @param summaries - Summary list.
 * @param summaryResponse - Response model return from summary API.
 * @returns summary key-value pairs (count, label).
 */
export function mapSummary(
  summaries: Array<keyof typeof SUMMARY>,
  summaryResponse: AzulSummaryResponse
): [string, string][] {
  return summaries.map((summary) => {
    const summaryBinderFn = BIND_SUMMARY_RESPONSE[summary];
    const count = formatCountSize(summaryBinderFn(summaryResponse));
    const label = SUMMARY_LABEL[summary];
    return [count, label];
  });
}
