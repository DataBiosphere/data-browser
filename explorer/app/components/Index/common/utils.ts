import { AzulSummaryResponse } from "../../../apis/azul/common/entities";
import { MetadataValue } from "./entities";

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
 * Returns a list of values that are not null.
 * @param values - List of values.
 * @returns a list of values that are not null.
 */
export function filterDefinedValues(
  values: string[] | undefined
): string[] | undefined {
  return values?.filter((value) => value ?? false);
}

/**
 * Formats count sizes.
 * @param value - Count size.
 * @returns formatted count size as display string.
 */
export function formatCountSize(value: number): string {
  const countSizes = ["k", "M", "G", "T", "P", "E"];

  // Determine count size display value and unit
  let val = value || 0;
  let sigFig = 0;
  while (val >= 1000) {
    val = val / 1000;
    sigFig += 1;
  }

  // No format of count size - tens, hundreds
  if (sigFig === 0) {
    return `${val}`;
  }

  // Format of count size to "n.0k"
  // Round value to precision
  const precision = 1;
  const roundedValue = val.toFixed(precision);
  return `${roundedValue}${countSizes[sigFig - 1]}`;
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
 * String-concatenates the specified list of metadata values to a string value, joined by a comma ",".
 * @param metadataValues - List of metadata values.
 * @returns the metadata values in a string, each value joined by a comma.
 */
export function stringifyMetadataValues(
  metadataValues: MetadataValue[]
): string {
  return metadataValues.join(", ");
}
