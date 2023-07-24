import { AzulSummaryResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";

/**
 * Calculates the summary file format count using count values returned for each file format in the summary response.
 * @param summaryResponse - Response model return from summary API.
 * @returns count of file formats.
 */
export function calculateSummaryFileFormatsCount(
  summaryResponse: AzulSummaryResponse
): number {
  return (summaryResponse.fileFormats ?? []).reduce((accum, { count }) => {
    return accum + count;
  }, 0);
}

/**
 * Calculates the summary total cell count using the estimatedCellCount and totalCells values fom the summary response.
 * @param summaryResponse - Response model return from summary API.
 * @returns count of total cell count.
 */
export function calculateSummaryTotalCellCount(
  summaryResponse: AzulSummaryResponse
): number {
  return (summaryResponse.projects ?? []).reduce(
    (accum, { cellSuspensions, projects }) => {
      if (
        projects &&
        (projects.estimatedCellCount || projects.estimatedCellCount === 0)
      ) {
        accum += projects.estimatedCellCount;
      } else if (
        cellSuspensions &&
        (cellSuspensions.totalCells || cellSuspensions.totalCells === 0)
      ) {
        accum += cellSuspensions.totalCells;
      }
      return accum;
    },
    0
  );
}

/**
 * Calculates the summary count for the specified summary property key in the summary response.
 * @param summaryResponse - Response model return from summary API.
 * @param summaryKey - Summary response property key.
 * @returns count of specified summary property key.
 */
export function getSummaryCount(
  summaryResponse: AzulSummaryResponse,
  summaryKey: keyof AzulSummaryResponse
): number {
  return summaryResponse[summaryKey] as number;
}
