import { ColumnDescription } from "e2e/testInterfaces";

export const ANVIL_DATASETS_BACKPAGE_HEADER_NAMES = {
  CONSENT_GROUP: "Consent group",
  DATASET_ID: "Dataset Id",
  DATA_MODALITY: "Data modality",
  DIAGNOSIS: "Diagnosis",
  ORGANISM_TYPE: "Organism type",
  PHENOTYPIC_SEX: "Phenotypic sex",
  REPORTED_ETHNICITY: "Reported ethnicity",
};

export const ANVIL_COLUMN_NAMES = {
  ACCESS: "Access",
  ACTIVITY_TYPE: "Activity Type",
  ANATOMICAL_SITE: "Anatomical Site",
  BIOSAMPLE_ID: "BioSample Id",
  BIOSAMPLE_TYPE: "BioSample Type",
  CONSENT_GROUP: "Consent Group",
  DATASET: "Dataset",
  DATA_MODALITY: "Data Modality",
  DIAGNOSIS: "Diagnosis",
  DOCUMENT_ID: "Document Id",
  DONOR_ID: "Donor Id",
  DRS_URI: "DRS URI",
  FILE_FORMAT: "File Format",
  IDENTIFIER: "Identifier",
  NAME: "Name",
  ORGANISM_TYPE: "Organism Type",
  PHENOTYPIC_SEX: "Phenotypic Sex",
  REPORTED_ETHNICITY: "Reported Ethnicity",
  SIZE: "Size",
};

export const PLURALIZED_METADATA_LABEL = {
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: "diagnoses",
  [ANVIL_COLUMN_NAMES.DATA_MODALITY]: "data modalities",
  [ANVIL_COLUMN_NAMES.DATASET]: "dataset names",
  [ANVIL_COLUMN_NAMES.CONSENT_GROUP]: "consent codes",
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: "organism types",
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: "phenotypic sexes",
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: "reported ethnicities",
  [ANVIL_COLUMN_NAMES.ACTIVITY_TYPE]: "activity types",
  [ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE]: "biosample types",
  [ANVIL_COLUMN_NAMES.ANATOMICAL_SITE]: "anatomical entities",
  [ANVIL_COLUMN_NAMES.FILE_FORMAT]: "file formats",
};

export const ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: {
    name: ANVIL_COLUMN_NAMES.DIAGNOSIS,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DIAGNOSIS],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATA_MODALITY]: {
    name: ANVIL_COLUMN_NAMES.DATA_MODALITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATA_MODALITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATASET]: {
    name: ANVIL_COLUMN_NAMES.DATASET,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATASET],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ACCESS]: {
    name: ANVIL_COLUMN_NAMES.ACCESS,
    sortable: false,
  },
  [ANVIL_COLUMN_NAMES.IDENTIFIER]: {
    name: ANVIL_COLUMN_NAMES.IDENTIFIER,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.CONSENT_GROUP]: {
    name: ANVIL_COLUMN_NAMES.CONSENT_GROUP,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.CONSENT_GROUP],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ORGANISM_TYPE],
    sortable: true,
  },
};

export const ANVIL_DATASETS_SELECTABLE_COLUMNS_BY_NAME: {
  [k: string]: ColumnDescription;
} = {
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY],
    sortable: true,
  },
};

export const ANVIL_ACTIVITIES_PRESELECTED_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.DOCUMENT_ID]: {
    name: ANVIL_COLUMN_NAMES.DOCUMENT_ID,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ACTIVITY_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ACTIVITY_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ACTIVITY_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATA_MODALITY]: {
    name: ANVIL_COLUMN_NAMES.DATA_MODALITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATA_MODALITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE]: {
    name: ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ORGANISM_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATASET]: {
    name: ANVIL_COLUMN_NAMES.DATASET,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATASET],
    sortable: true,
  },
};

export const ANVIL_ACTIVITIES_SELECTABLE_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: {
    name: ANVIL_COLUMN_NAMES.DIAGNOSIS,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DIAGNOSIS],
    sortable: true,
  },
};

export const ANVIL_BIOSAMPLES_PRESELECTED_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.BIOSAMPLE_ID]: {
    name: ANVIL_COLUMN_NAMES.BIOSAMPLE_ID,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ANATOMICAL_SITE]: {
    name: ANVIL_COLUMN_NAMES.ANATOMICAL_SITE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ANATOMICAL_SITE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE]: {
    name: ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ORGANISM_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: {
    name: ANVIL_COLUMN_NAMES.DIAGNOSIS,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DIAGNOSIS],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATASET]: {
    name: ANVIL_COLUMN_NAMES.DATASET,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATASET],
    sortable: true,
  },
};

export const ANVIL_BIOSAMPLES_SELECTABLE_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY],
    sortable: true,
  },
};

export const ANVIL_DONORS_PRESELECTED_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.DONOR_ID]: {
    name: ANVIL_COLUMN_NAMES.DONOR_ID,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ORGANISM_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: {
    name: ANVIL_COLUMN_NAMES.DIAGNOSIS,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DIAGNOSIS],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATASET]: {
    name: ANVIL_COLUMN_NAMES.DATASET,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATASET],
    sortable: true,
  },
};

export const ANVIL_DONORS_SELECTABLE_COLUMNS_BY_NAME = {};

export const ANVIL_FILES_PRESELECTED_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.NAME]: {
    name: ANVIL_COLUMN_NAMES.NAME,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.FILE_FORMAT]: {
    name: ANVIL_COLUMN_NAMES.FILE_FORMAT,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.FILE_FORMAT],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.SIZE]: {
    name: ANVIL_COLUMN_NAMES.SIZE,
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DRS_URI]: {
    name: ANVIL_COLUMN_NAMES.DRS_URI,
    sortable: false,
  },
  [ANVIL_COLUMN_NAMES.DATA_MODALITY]: {
    name: ANVIL_COLUMN_NAMES.DATA_MODALITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATA_MODALITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.ORGANISM_TYPE]: {
    name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.ORGANISM_TYPE],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DATASET]: {
    name: ANVIL_COLUMN_NAMES.DATASET,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DATASET],
    sortable: true,
  },
};

export const ANVIL_FILES_SELECTABLE_COLUMNS_BY_NAME = {
  [ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX]: {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY]: {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel:
      PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY],
    sortable: true,
  },
  [ANVIL_COLUMN_NAMES.DIAGNOSIS]: {
    name: ANVIL_COLUMN_NAMES.DIAGNOSIS,
    pluralizedLabel: PLURALIZED_METADATA_LABEL[ANVIL_COLUMN_NAMES.DIAGNOSIS],
    sortable: true,
  },
};