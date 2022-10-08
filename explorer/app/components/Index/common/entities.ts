/**
 * Set of possible metadata keys.
 */
export enum METADATA_KEY {
  ANATOMICAL_ENTITY = "ANATOMICAL_ENTITY",
  BIOSAMPLE_TYPE = "BIOSAMPLE_TYPE",
  CONSENT_CODE = "CONSENT_CODE",
  DATA_MODALITY = "DATA_MODALITY",
  DATA_TYPE = "DATA_TYPE",
  DATASET_NAME = "DATASET_NAME",
  DBGAP_ID = "DBGAP_ID",
  DEVELOPMENT_STAGE = "DEVELOPMENT_STAGE",
  DISEASE_DONOR = "DISEASE_DONOR",
  DISEASE_INDICATION = "DISEASE_INDICATION",
  FOCUS_DISEASE = "FOCUS_DISEASE",
  LIBRARY_CONSTRUCTION_APPROACH = "LIBRARY_CONSTRUCTION_APPROACH",
  LIBRARY_PREPARATION = "LIBRARY_PREPARATION",
  ORGANISM_TYPE = "ORGANISM_TYPE",
  PHENOTYPIC_SEX = "PHENOTYPIC_SEX",
  PLATFORM = "PLATFORM",
  REPORTED_ETHNICITY = "REPORTED_ETHNICITY",
  SPECIES = "SPECIES",
  STUDY = "STUDY",
  STUDY_DESIGN = "STUDY_DESIGN",
  WORKSPACE_NAME = "WORKSPACE_NAME",
}

/**
 * Model of metadata value to be used as props for the NTagCell and NTag component.
 */
export type MetadataValue = string;

/**
 * Set of possible summary counts and other summary values as part of summary response.
 */
export enum SUMMARY {
  DONORS = "DONORS",
  ESTIMATED_CELLS = "ESTIMATED_CELLS",
  FILE_FORMATS = "FILE_FORMATS",
  FILES = "FILES",
  SPECIES = "SPECIES",
  SPECIMENS = "SPECIMENS",
}

/**
 * Model of summary to be used as props for the Hero component.
 */
export interface Summary {
  count: string;
  label: string;
}
