/**
 * Model of file summary.
 */
export interface FileSummary {
  biosampleCount: number;
  donorCount: number;
  fileCount: number;
  fileFormats: string[];
  fileSize: number;
}

/**
 * Possible set of summaries.
 */
export const enum SUMMARY {
  BIOSAMPLE_COUNT = "BIOSAMPLE_COUNT",
  DONOR_COUNT = "DONOR_COUNT",
  FILE_COUNT = "FILE_COUNT",
  FILE_FORMATS = "FILE_FORMATS",
  FILE_SIZE = "FILE_SIZE",
  ORGANISM_TYPE = "ORGANISM_TYPE",
}
