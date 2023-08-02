/**
 * Model of file summary.
 */
export interface FileSummary {
  donorCount: number;
  fileCount: number;
  fileTypeSummaries: FileTypeSummary[];
  organTypes: string[];
  projectCount: number;
  specimenCount: number;
  totalCellCount: number;
  totalFileSize: number;
}

/**
 * Model of file type summary.
 */
export interface FileTypeSummary {
  count: number;
  fileType: string;
  matrixCellCount: number;
  totalSize: number;
}

/**
 * Possible set of summaries.
 */
export const enum SUMMARY {
  DONOR_COUNT = "DONOR_COUNT",
  DONOR_DISEASE = "DONOR_DISEASE",
  FILE_COUNT = "FILE_COUNT",
  GENUS_SPECIES = "GENUS_SPECIES",
  LIBRARY_CONSTRUCTION_APPROACH = "LIBRARY_CONSTRUCTION_APPROACH",
  ORGAN = "ORGAN",
  ORGAN_PART = "ORGAN_PART",
  PAIRED_END = "PAIRED_END",
  PROJECT_COUNT = "PROJECT_COUNT",
  SPECIMEN_COUNT = "SPECIMEN_COUNT",
  SPECIMEN_DISEASE = "SPECIMEN_DISEASE",
  TOTAL_CELL_COUNT = "TOTAL_CELL_COUNT",
  TOTAL_FILE_SIZE = "TOTAL_FILE_SIZE",
}
