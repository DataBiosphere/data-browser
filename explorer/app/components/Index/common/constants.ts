import { AzulSummaryResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { METADATA_KEY, NetworkKey, SUMMARY } from "./entities";
import {
  calculateSummaryFileFormatsCount,
  calculateSummaryTotalCellCount,
  getSummaryCount,
} from "./utils";

// Template constants
const {
  ANATOMICAL_ENTITY,
  BIONETWORK_NAME,
  BIOSAMPLE_TYPE,
  CONSENT_CODE,
  CONTENT_DESCRIPTION,
  DATA_MODALITY,
  DATA_TYPE,
  DATASET_NAME,
  DBGAP_ID,
  DEVELOPMENT_STAGE,
  DIAGNOSIS,
  DISEASE_DONOR,
  DISEASE_INDICATION,
  DISEASE_SPECIMEN,
  DISEASE_STATUS_DONOR,
  DISEASE_STATUS_SPECIMEN,
  FILE_FORMAT,
  FOCUS_DISEASE,
  LIBRARY_CONSTRUCTION_APPROACH,
  LIBRARY_PREPARATION,
  MODEL_ORGAN,
  NUCLEIC_ACID_SOURCE,
  ORGAN_PART,
  ORGANISM_AGE,
  ORGANISM_TYPE,
  PHENOTYPIC_SEX,
  PLATFORM,
  REPORTED_ETHNICITY,
  SAMPLE_ID,
  SAMPLE_TYPE,
  SELECTED_CELL_TYPE,
  STUDY,
  STUDY_DESIGN,
  WORKFLOW,
  WORKSPACE_NAME,
} = METADATA_KEY;
const {
  BIOSAMPLES,
  DONORS,
  ESTIMATED_CELLS,
  FILE_FORMATS,
  FILES,
  SPECIES,
  SPECIMENS,
} = SUMMARY;

/**
 * Functions binding summary response API to summary count.
 */
export const BIND_SUMMARY_RESPONSE = {
  [BIOSAMPLES]: (r: AzulSummaryResponse): number =>
    getSummaryCount(r, SUMMARY_KEY.BIOSAMPLES),
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

export const NETWORK_KEYS = [
  "Adipose",
  "Breast",
  "Development",
  "Eye",
  "Genetic Diversity",
  "Gut",
  "Heart",
  "Immune",
  "Kidney",
  "Liver",
  "Lung",
  "Musculoskeletal",
  "Nervous System",
  "Oral",
  "Organoid",
  "Pancreas",
  "Reproduction",
  "Skin",
] as const;

export const NETWORK_ICONS: { [key in NetworkKey]: string } = {
  Adipose: "/images/icons/hca-bio-networks/adipose.png",
  Breast: "/images/icons/hca-bio-networks/breast.png",
  Development: "/images/icons/hca-bio-networks/development.png",
  Eye: "/images/icons/hca-bio-networks/eye.png",
  "Genetic Diversity": "/images/icons/hca-bio-networks/genetic-diversity.png",
  Gut: "/images/icons/hca-bio-networks/gut.png",
  Heart: "/images/icons/hca-bio-networks/heart.png",
  Immune: "/images/icons/hca-bio-networks/immune.png",
  Kidney: "/images/icons/hca-bio-networks/kidney.png",
  Liver: "/images/icons/hca-bio-networks/liver.png",
  Lung: "/images/icons/hca-bio-networks/lung.png",
  Musculoskeletal: "/images/icons/hca-bio-networks/musculoskeletal.png",
  "Nervous System": "/images/icons/hca-bio-networks/nervous-system.png",
  Oral: "/images/icons/hca-bio-networks/oral-and-craniofacial.png",
  Organoid: "/images/icons/hca-bio-networks/organoid.png",
  Pancreas: "/images/icons/hca-bio-networks/pancreas.png",
  Reproduction: "/images/icons/hca-bio-networks/reproduction.png",
  Skin: "/images/icons/hca-bio-networks/skin.png",
};

/**
 * Value for displaying pluralized metadata labels, for example, "tissues" or "diseases".
 */
export const PLURALIZED_METADATA_LABEL = {
  [ANATOMICAL_ENTITY]: "anatomical entities",
  [BIONETWORK_NAME]: "networks",
  [BIOSAMPLE_TYPE]: "biosample types",
  [CONSENT_CODE]: "consent codes",
  [CONTENT_DESCRIPTION]: "content descriptions",
  [DATASET_NAME]: "dataset names",
  [DATA_MODALITY]: "data modalities",
  [DATA_TYPE]: "data types",
  [DBGAP_ID]: "dbGap ids",
  [DEVELOPMENT_STAGE]: "development stages",
  [DIAGNOSIS]: "diagnoses",
  [DISEASE_DONOR]: "diseases",
  [DISEASE_INDICATION]: "diseases",
  [DISEASE_SPECIMEN]: "diseases",
  [DISEASE_STATUS_DONOR]: "disease statuses",
  [DISEASE_STATUS_SPECIMEN]: "disease statuses",
  [FILE_FORMAT]: "file formats",
  [FOCUS_DISEASE]: "focuses / diseases",
  [LIBRARY_CONSTRUCTION_APPROACH]: "library construction methods",
  [LIBRARY_PREPARATION]: "library preparations",
  [MODEL_ORGAN]: "model organs",
  [NUCLEIC_ACID_SOURCE]: "nucleic acid sources",
  [ORGANISM_AGE]: "ages",
  [ORGANISM_TYPE]: "organism types",
  [ORGAN_PART]: "organ parts",
  [PHENOTYPIC_SEX]: "phenotypic sexes",
  [PLATFORM]: "platforms",
  [REPORTED_ETHNICITY]: "reported ethnicities",
  [SAMPLE_ID]: "sample ids",
  [SAMPLE_TYPE]: "sample types",
  [SELECTED_CELL_TYPE]: "cell types",
  [STUDY]: "studies",
  [STUDY_DESIGN]: "study designs",
  [METADATA_KEY.SPECIES]: "species",
  [WORKFLOW]: "analysis protocols",
  [WORKSPACE_NAME]: "workspaces",
};

/**
 * Set of possible summary keys.
 */
export const SUMMARY_KEY = {
  [BIOSAMPLES]: "biosampleCount",
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
  [BIOSAMPLES]: "BioSamples",
  [DONORS]: "Donors",
  [ESTIMATED_CELLS]: "Estimated Cells",
  [FILES]: "Files",
  [FILE_FORMATS]: "Files",
  [SPECIES]: "Species",
  [SPECIMENS]: "Specimens",
};
