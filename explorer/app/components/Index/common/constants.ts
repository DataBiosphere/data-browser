import { AzulSummaryResponse } from "../../../apis/azul/common/entities";
import { METADATA_KEY, SUMMARY } from "./entities";
import {
  calculateSummaryFileFormatsCount,
  calculateSummaryTotalCellCount,
  getSummaryCount,
} from "./utils";

// Template constants
const {
  ANATOMICAL_ENTITY,
  BIOSAMPLE_TYPE,
  CONSENT_CODE,
  DATA_MODALITY,
  DATA_TYPE,
  DATASET_NAME,
  DEVELOPMENT_STAGE,
  DISEASE_DONOR,
  LIBRARY_CONSTRUCTION_APPROACH,
  LIBRARY_PREPARATION,
  ORGANISM_TYPE,
  PHENOTYPIC_SEX,
  PLATFORM,
  REPORTED_ETHNICITY,
  STUDY_DESIGN,
} = METADATA_KEY;
const { DONORS, ESTIMATED_CELLS, FILE_FORMATS, FILES, SPECIES, SPECIMENS } =
  SUMMARY;

/**
 * Functions binding summary response API to summary count.
 */
export const BIND_SUMMARY_RESPONSE = {
  [DONORS]: (r: AzulSummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.DONORS),
  [ESTIMATED_CELLS]: calculateSummaryTotalCellCount,
  [FILES]: (r: AzulSummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.FILES),
  [FILE_FORMATS]: calculateSummaryFileFormatsCount,
  [SPECIES]: (r: AzulSummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.SPECIES),
  [SPECIMENS]: (r: AzulSummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.SPECIMENS),
};

/**
 * Value for displaying pluralized metadata labels, for example, "tissues" or "diseases".
 */
export const PLURALIZED_METADATA_LABEL = {
  [ANATOMICAL_ENTITY]: "anatomical entities",
  [BIOSAMPLE_TYPE]: "biosample types",
  [CONSENT_CODE]: "consent codes",
  [DATASET_NAME]: "dataset names",
  [DATA_MODALITY]: "data modalities",
  [DATA_TYPE]: "data types",
  [DEVELOPMENT_STAGE]: "development stages",
  [DISEASE_DONOR]: "diseases",
  [LIBRARY_CONSTRUCTION_APPROACH]: "library construction approaches",
  [LIBRARY_PREPARATION]: "library preparations",
  [ORGANISM_TYPE]: "organism types",
  [PHENOTYPIC_SEX]: "phenotypic sexes",
  [PLATFORM]: "platforms",
  [REPORTED_ETHNICITY]: "reported ethnicities",
  [STUDY_DESIGN]: "study designs",
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
