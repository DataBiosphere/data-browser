import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
import { ProjectSummary } from "../../../../app/apis/azul/hca-dcp/common/entities";
import { SummaryResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";

/**
 * Maps the LungMAP summary response to summary display key-value pairs.
 * @param summaryResponse - Response model returned from the summary API.
 * @returns summary key-value pairs of [count, label].
 */
export const buildSummaries = (
  summaryResponse: SummaryResponse
): [string, string][] => {
  return [
    [
      formatCountSize(sumEstimatedCellCounts(summaryResponse)),
      "Estimated Cells",
    ],
    [formatCountSize(summaryResponse.specimenCount), "Specimens"],
    [formatCountSize(summaryResponse.donorCount), "Donors"],
    [formatCountSize(summaryResponse.fileCount), "Files"],
  ];
};

/**
 * Sums the estimated cell counts across all projects in the summary response.
 * Uses estimatedCellCount when available, falling back to totalCells.
 * @param summaryResponse - Response model returned from the summary API.
 * @returns total estimated cell count across all projects.
 */
function sumEstimatedCellCounts(summaryResponse: SummaryResponse): number {
  return (summaryResponse.projects ?? []).reduce(
    (accum, { cellSuspensions, projects }: ProjectSummary) => {
      if (projects?.estimatedCellCount || projects?.estimatedCellCount === 0) {
        accum += projects.estimatedCellCount;
      } else if (
        cellSuspensions?.totalCells ||
        cellSuspensions?.totalCells === 0
      ) {
        accum += cellSuspensions.totalCells;
      }
      return accum;
    },
    0
  );
}
