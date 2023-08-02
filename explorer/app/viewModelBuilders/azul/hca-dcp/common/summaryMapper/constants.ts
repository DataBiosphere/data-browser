import { HCA_DCP_CATEGORY_LABEL } from "../../../../../../site-config/hca-dcp/category";
import { FileSummary, SUMMARY } from "./entities";

export const DEFAULT_SUMMARY: FileSummary = {
  donorCount: 0,
  fileCount: 0,
  fileTypeSummaries: [],
  organTypes: [],
  projectCount: 0,
  specimenCount: 0,
  totalCellCount: 0,
  totalFileSize: 0,
};

/**
 * Display text for summaries.
 */
export const SUMMARY_DISPLAY_TEXT = {
  [SUMMARY.DONOR_COUNT]: "Donors",
  [SUMMARY.DONOR_DISEASE]: "Disease Status (Donor)",
  [SUMMARY.FILE_COUNT]: "Files",
  [SUMMARY.GENUS_SPECIES]: "Species",
  [SUMMARY.LIBRARY_CONSTRUCTION_APPROACH]:
    HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
  [SUMMARY.ORGAN]: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY, // anatomical entity
  [SUMMARY.ORGAN_PART]: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
  [SUMMARY.PAIRED_END]: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
  [SUMMARY.PROJECT_COUNT]: "Projects",
  [SUMMARY.SPECIMEN_COUNT]: "Specimens",
  [SUMMARY.SPECIMEN_DISEASE]: "Disease Status (Specimen)",
  [SUMMARY.TOTAL_CELL_COUNT]: "Estimated Cells",
  [SUMMARY.TOTAL_FILE_SIZE]: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
};
