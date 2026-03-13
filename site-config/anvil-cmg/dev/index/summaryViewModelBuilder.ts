import { SummaryResponse } from "../../../../app/apis/azul/anvil-cmg/common/responses";
import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
import { formatFileSize } from "@databiosphere/findable-ui/lib/utils/formatFileSize";

/**
 * Maps the AnVIL-CMG summary response to summary display key-value pairs.
 * @param summaryResponse - Response model returned from the summary API.
 * @returns summary key-value pairs of [count, label].
 */
export const buildSummaries = (
  summaryResponse: SummaryResponse
): [string, string][] => {
  return [
    [formatCountSize(summaryResponse.biosampleCount), "BioSamples"],
    [formatCountSize(summaryResponse.donorCount), "Donors"],
    [formatCountSize(sumFileFormatCounts(summaryResponse)), "Files"],
    [formatFileSize(summaryResponse.totalFileSize), ""],
  ];
};

/**
 * Sums the file counts across all file formats in the summary response.
 * @param summaryResponse - Response model returned from the summary API.
 * @returns total file count across all formats.
 */
function sumFileFormatCounts(summaryResponse: SummaryResponse): number {
  return (summaryResponse.fileFormats ?? []).reduce((accum, { count }) => {
    return accum + count;
  }, 0);
}
