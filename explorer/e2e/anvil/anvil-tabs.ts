/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
import {
  AnvilCMGTabCollection,
  TabCollectionKeys,
  TabDescription,
} from "../testInterfaces";
import {
  ANVIL_ACTIVITIES_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_ACTIVITIES_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_BIOSAMPLES_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_BIOSAMPLES_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_COLUMN_NAMES,
  ANVIL_DATASETS_BACKPAGE_HEADER_NAMES,
  ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_DATASETS_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_DONORS_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_DONORS_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_FILES_PRESELECTED_COLUMNS_BY_NAME,
} from "./constants";

export const ANVIL_FILTER_NAMES: string[] = [
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

export const ANVIL_TABS: AnvilCMGTabCollection = {
  ACTIVITIES: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: ANVIL_ACTIVITIES_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_ACTIVITIES_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Activities",
    url: "/activities",
  },
  BIOSAMPLES: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: ANVIL_BIOSAMPLES_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_BIOSAMPLES_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "BioSamples",
    url: "/biosamples",
  },
  DATASETS: {
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
        correspondingColumn:
          ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.DATASET
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.CONSENT_GROUP,
      },
      {
        correspondingColumn:
          ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.ORGANISM_TYPE
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.ORGANISM_TYPE,
      },
      {
        correspondingColumn:
          ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.DIAGNOSIS
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.DIAGNOSIS,
      },
      {
        correspondingColumn:
          ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.DATA_MODALITY
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.DATA_MODALITY,
      },
      {
        correspondingColumn:
          ANVIL_DATASETS_SELECTABLE_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.PHENOTYPIC_SEX
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.PHENOTYPIC_SEX,
      },
      {
        correspondingColumn:
          ANVIL_DATASETS_SELECTABLE_COLUMNS_BY_NAME[
            ANVIL_COLUMN_NAMES.REPORTED_ETHNICITY
          ],
        name: ANVIL_DATASETS_BACKPAGE_HEADER_NAMES.REPORTED_ETHNICITY,
      },
    ],
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: ANVIL_DATASETS_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_DATASETS_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Datasets",
    url: "/datasets",
  },
  DONORS: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: ANVIL_DONORS_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_DONORS_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Donors",
    url: "/donors",
  },
  FILES: {
    emptyFirstColumn: true,
    maxPages: 25,
    preselectedColumns: ANVIL_FILES_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_DONORS_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Files",
    url: "/files",
  },
};

export const ANVIL_TAB_LIST: TabDescription[] = [
  ANVIL_TABS.ACTIVITIES,
  ANVIL_TABS.DATASETS,
  ANVIL_TABS.BIOSAMPLES,
  ANVIL_TABS.DONORS,
  ANVIL_TABS.FILES,
];

export const ANVIL_TAB_TEST_ORDER: TabCollectionKeys[] = [
  "FILES",
  "DATASETS",
  "ACTIVITIES",
  "DONORS",
  "BIOSAMPLES",
];

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
