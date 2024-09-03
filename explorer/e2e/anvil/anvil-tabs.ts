/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
import {
  AnvilCMGTabCollection,
  TabCollectionKeys,
  TabDescription,
} from "../testInterfaces";
import {
  ANVIL_COLUMN_NAMES,
  ANVIL_DATASETS_BACKPAGE_HEADER_NAMES,
  ANVIL_PLURALIZED_METADATA_LABELS,
} from "./constants";

export const anvilFilterNames: string[] = [
  "Anatomical Site",
  "BioSample Type",
  "Consent Group",
  "Data Modality",
  "Dataset",
  "Diagnosis",
  "File Format",
  "Identifier",
  "Organism Type",
  "Phenotypic Sex",
  "Reported Ethnicity",
];
export const ANATOMICAL_SITE_INDEX = 0;
export const BIOSAMPLE_TYPE_INDEX = 1;
export const CONSENT_GROUP_INDEX = 2;
export const DATA_MODALITY_INDEX = 3;
export const DATASET_INDEX = 4;
export const DIAGNOSIS_INDEX = 5;
export const FILE_FORMAT_INDEX = 6;
export const IDENTIFIER_INDEX = 7;
export const ORGANISM_TYPE_INDEX = 8;
export const PHENOTYPIC_SEX_INDEX = 9;
export const REPORTED_ETHNICITY_INDEX = 10;

const anvilDatasetsPreselectedColumns = [
  { name: ANVIL_COLUMN_NAMES.DATASET, sortable: true },
  { name: ANVIL_COLUMN_NAMES.ACCESS, sortable: false },
  { name: ANVIL_COLUMN_NAMES.IDENTIFIER, sortable: true },
  { name: ANVIL_COLUMN_NAMES.CONSENT_GROUP, sortable: true },
  { name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE, sortable: true },
  { name: ANVIL_COLUMN_NAMES.DIAGNOSIS, sortable: true },
  { name: ANVIL_COLUMN_NAMES.DATA_MODALITY, sortable: true },
];
const anvilDatasetsSelectableColumns = [
  {
    name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
    pluralizedLabel: ANVIL_PLURALIZED_METADATA_LABELS.PHENOTYPIC_SEX,
    sortable: true,
  },
  {
    name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
    pluralizedLabel: ANVIL_PLURALIZED_METADATA_LABELS.PHENOTYPIC_SEX,
    sortable: true,
  },
];

export const anvilTabs: AnvilCMGTabCollection = {
  activities: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: ANVIL_COLUMN_NAMES.DOCUMENT_ID, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ACTIVITY_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DATA_MODALITY, sortable: true },
      { name: ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DATASET, sortable: true },
    ],
    selectableColumns: [
      { name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX, sortable: true },
      { name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DIAGNOSIS, sortable: true },
    ],
    tabName: "Activities",
    url: "/activities",
  },
  biosamples: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: ANVIL_COLUMN_NAMES.BIOSAMPLE_ID, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ANATOMICAL_SITE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.BIOSAMPLE_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DIAGNOSIS, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DATASET, sortable: true },
    ],
    selectableColumns: [
      {
        name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX,
        pluralizedLabel: ANVIL_PLURALIZED_METADATA_LABELS.PHENOTYPIC_SEX,
        sortable: true,
      },
      {
        name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY,
        pluralizedLabel: ANVIL_PLURALIZED_METADATA_LABELS.REPORTED_ETHNICITIES,
        sortable: true,
      },
    ],
    tabName: "BioSamples",
    url: "/biosamples",
  },
  datasets: {
    backpageAccessTags: {
      deniedLongName: "Access Required",
      deniedShortName: "Required",
      grantedLongName: "Access Granted",
      grantedShortName: "Granted",
    },
    backpageExportButtons: {
      accessNotGrantedMessage:
        "To export this dataset, please sign in and, if necessary, request access.",
      detailsName: "Dataset Details",
      exportActionButtonText: "Open Terra",
      exportRequestButtonText: "Request Link",
      exportTabName: "Export",
      exportUrlRegExp: /\.*\/export-to-terra/,
      firstLoadingMessage: "Your link will be ready shortly...",
      newTabMessage:
        "If you are a new user or returning user, click sign in to continue.",
      secondLandingMessage: "Your Terra Workspace Link is Ready",
    },
    backpageHeaders: [
      {
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.DATASET_ID,
      },
      {
        correspondingColumn: anvilDatasetsPreselectedColumns[3],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.CONSENT_GROUP,
      },
      {
        correspondingColumn: anvilDatasetsPreselectedColumns[4],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.ORGANISM_TYPE,
      },
      {
        correspondingColumn: anvilDatasetsPreselectedColumns[5],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.DIAGNOSIS,
      },
      {
        correspondingColumn: anvilDatasetsPreselectedColumns[6],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.DATA_MODALITY,
      },
      {
        correspondingColumn: anvilDatasetsSelectableColumns[0],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.PHENOTYPIC_SEX,
      },
      {
        correspondingColumn: anvilDatasetsSelectableColumns[1],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.REPORTED_ETHNICITY,
      },
    ],
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: anvilDatasetsPreselectedColumns,
    selectableColumns: anvilDatasetsSelectableColumns,
    tabName: "Datasets",
    url: "/datasets",
  },
  donors: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: ANVIL_COLUMN_NAMES.DONOR_ID, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX, sortable: true },
      { name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DIAGNOSIS, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DATASET, sortable: true },
    ],
    selectableColumns: [],
    tabName: "Donors",
    url: "/donors",
  },
  files: {
    emptyFirstColumn: true,
    maxPages: 25,
    preselectedColumns: [
      { name: ANVIL_COLUMN_NAMES.NAME, sortable: true },
      { name: ANVIL_COLUMN_NAMES.FILE_FORMAT, sortable: true },
      { name: ANVIL_COLUMN_NAMES.SIZE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DRS_URI, sortable: false },
      { name: ANVIL_COLUMN_NAMES.DATA_MODALITY, sortable: true },
      { name: ANVIL_COLUMN_NAMES.ORGANISM_TYPE, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DATASET, sortable: true },
    ],
    selectableColumns: [
      { name: ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX, sortable: true },
      { name: ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY, sortable: true },
      { name: ANVIL_COLUMN_NAMES.DIAGNOSIS, sortable: true },
    ],
    tabName: "Files",
    url: "/files",
  },
};

export const anvilTabList: TabDescription[] = [
  anvilTabs.activities,
  anvilTabs.datasets,
  anvilTabs.biosamples,
  anvilTabs.donors,
  anvilTabs.files,
];

export const anvilTabTestOrder: TabCollectionKeys[] = [
  "files",
  "datasets",
  "activities",
  "donors",
  "biosamples",
];

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
