import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { FileSummary, SUMMARY } from "./entities";

export const DEFAULT_SUMMARY: FileSummary = {
  biosampleCount: 0,
  donorCount: 0,
  fileCount: 0,
  fileFormats: [LABEL.UNSPECIFIED],
};

/**
 * Display text for summaries.
 */
export const SUMMARY_DISPLAY_TEXT: Record<SUMMARY, string> = {
  [SUMMARY.BIOSAMPLE_COUNT]: "BioSamples",
  [SUMMARY.DONOR_COUNT]: "Donors",
  [SUMMARY.FILE_COUNT]: "Files",
  [SUMMARY.FILE_FORMATS]: "File Formats",
  [SUMMARY.ORGANISM_TYPE]: "Organism Type",
};
