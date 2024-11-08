import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { FileFormat } from "../../../apis/azul/anvil-cmg/common/entities";
import { ProjectSummary } from "../../../apis/azul/hca-dcp/common/entities";
import { NETWORK_KEYS } from "./constants";
import { NetworkKey } from "./entities";

/**
 * Calculates the summary file format count using count values returned for each file format in the summary response.
 * TODO review configuration of summary response model and use of this method to calculate file formats.
 * @param summaryResponse - Response model return from summary API.
 * @returns count of file formats.
 */
export function calculateSummaryFileFormatsCount(
  summaryResponse: AzulSummaryResponse
): number {
  return ((summaryResponse.fileFormats as FileFormat[]) ?? []).reduce(
    (accum, { count }) => {
      return accum + count;
    },
    0 as number
  );
}

/**
 * Calculates the summary total cell count using the estimatedCellCount and totalCells values fom the summary response.
 * TODO review configuration of summary response model and use of this method to calculate total cell count.
 * @param summaryResponse - Response model return from summary API.
 * @returns count of total cell count.
 */
export function calculateSummaryTotalCellCount(
  summaryResponse: AzulSummaryResponse
): number {
  return ((summaryResponse.projects as ProjectSummary[]) ?? []).reduce(
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

/**
 * Type guard for NetworkKey.
 * @param value - Value.
 * @returns true if value is a NetworkKey.
 */
export function isNetworkKey(value: unknown): value is NetworkKey {
  if (typeof value !== "string") return false;
  return (NETWORK_KEYS as readonly string[]).includes(value);
}
