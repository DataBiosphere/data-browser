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
  DBGAP_ID,
  DEVELOPMENT_STAGE,
  DIAGNOSIS,
  DISEASE_DONOR,
  DISEASE_INDICATION,
  FOCUS_DISEASE,
  LIBRARY_CONSTRUCTION_APPROACH,
  LIBRARY_PREPARATION,
  ORGANISM_TYPE,
  PHENOTYPIC_SEX,
  PLATFORM,
  REPORTED_ETHNICITY,
  STUDY,
  STUDY_DESIGN,
  WORKSPACE_NAME,
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
  [DBGAP_ID]: "dbGap ids",
  [DEVELOPMENT_STAGE]: "development stages",
  [DIAGNOSIS]: "diagnoses",
  [DISEASE_DONOR]: "diseases",
  [DISEASE_INDICATION]: "diseases",
  [FOCUS_DISEASE]: "focuses / diseases",
  [LIBRARY_CONSTRUCTION_APPROACH]: "library construction approaches",
  [LIBRARY_PREPARATION]: "library preparations",
  [ORGANISM_TYPE]: "organism types",
  [PHENOTYPIC_SEX]: "phenotypic sexes",
  [PLATFORM]: "platforms",
  [REPORTED_ETHNICITY]: "reported ethnicities",
  [STUDY]: "studies",
  [STUDY_DESIGN]: "study designs",
  [METADATA_KEY.SPECIES]: "species",
  [WORKSPACE_NAME]: "workspaces",
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
