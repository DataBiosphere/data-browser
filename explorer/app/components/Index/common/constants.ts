// App dependencies
import { METADATA_KEY, SUMMARY } from "./entities";
import { SummaryResponse } from "../../../models/responses";
import {
  calculateSummaryFileFormatsCount,
  calculateSummaryTotalCellCount,
  getSummaryCount,
} from "./utils";

// Template constants
const { DONORS, ESTIMATED_CELLS, FILES, FILE_FORMATS, SPECIES, SPECIMENS } =
  SUMMARY;

/**
 * Functions binding summary response API to summary count.
 */
export const BIND_SUMMARY_RESPONSE = {
  [DONORS]: (r: SummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.DONORS),
  [ESTIMATED_CELLS]: calculateSummaryTotalCellCount,
  [FILES]: (r: SummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.FILES),
  [FILE_FORMATS]: calculateSummaryFileFormatsCount,
  [SPECIES]: (r: SummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.SPECIES),
  [SPECIMENS]: (r: SummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.SPECIMENS),
};

/**
 * Value for displaying pluralized metadata labels, for example, "tissues" or "diseases".
 * TODO refine with https://github.com/clevercanary/data-browser/issues/128
 */
export const PLURALIZED_METADATA_LABEL = {
  [METADATA_KEY.SPECIES]: "species",
};

/**
 * Set of possible summary keys.
 */
export const SUMMARY_KEY = {
  [DONORS]: "donorCount",
  [FILES]: "fileCount",
  [FILE_FORMATS]: "fileFormats",
  [SPECIES]: "speciesCount",
  [SPECIMENS]: "specimenCount",
} as const;

/**
 * Set of possible summary labels.
 */
export const SUMMARY_LABEL = {
  [DONORS]: "Donors",
  [ESTIMATED_CELLS]: "Estimated Cells",
  [FILES]: "Files",
  [FILE_FORMATS]: "Files",
  [SPECIES]: "Species",
  [SPECIMENS]: "Specimens",
};
