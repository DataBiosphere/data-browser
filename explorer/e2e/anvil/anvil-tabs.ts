/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
import {
  AnvilCMGTabCollection,
  TabCollectionKeys,
  TabDescription,
} from "../testInterfaces";

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

export const anvilTabs: AnvilCMGTabCollection = {
  activities: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: "Document Id", sortable: true },
      { name: "Activity Type", sortable: true },
      { name: "Data Modality", sortable: true },
      { name: "BioSample Type", sortable: true },
      { name: "Organism Type", sortable: true },
      { name: "Dataset", sortable: true },
    ],
    selectableColumns: [
      { name: "Phenotypic Sex", sortable: true },
      { name: "Reported Ethnicity", sortable: true },
      { name: "Diagnosis", sortable: true },
    ],
    tabName: "Activities",
    url: "/activities",
  },
  biosamples: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: "BioSample Id", sortable: true },
      { name: "Anatomical Site", sortable: true },
      { name: "BioSample Type", sortable: true },
      { name: "Organism Type", sortable: true },
      { name: "Diagnosis", sortable: true },
      { name: "Dataset", sortable: true },
    ],
    selectableColumns: [
      { name: "Phenotypic Sex", sortable: true },
      { name: "Reported Ethnicity", sortable: true },
    ],
    tabName: "BioSamples",
    url: "/biosamples",
  },
  datasets: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: "Dataset", sortable: true },
      { name: "Access", sortable: false },
      { name: "Identifier", sortable: true },
      { name: "Consent Group", sortable: true },
      { name: "Organism Type", sortable: true },
      { name: "Diagnosis", sortable: true },
      { name: "Data Modality", sortable: true },
    ],
    selectableColumns: [
      { name: "Phenotypic Sex", sortable: true },
      { name: "Reported Ethnicity", sortable: true },
    ],
    tabName: "Datasets",
    url: "/datasets",
  },
  donors: {
    emptyFirstColumn: false,
    maxPages: 25,
    preselectedColumns: [
      { name: "Donor Id", sortable: true },
      { name: "Organism Type", sortable: true },
      { name: "Phenotypic Sex", sortable: true },
      { name: "Reported Ethnicity", sortable: true },
      { name: "Diagnosis", sortable: true },
      { name: "Dataset", sortable: true },
    ],
    selectableColumns: [],
    tabName: "Donors",
    url: "/donors",
  },
  files: {
    emptyFirstColumn: true,
    maxPages: 25,
    preselectedColumns: [
      { name: "Name", sortable: true },
      { name: "File Format", sortable: true },
      { name: "Size", sortable: true },
      { name: "DRS URI", sortable: false },
      { name: "Data Modality", sortable: true },
      { name: "Organism Type", sortable: true },
      { name: "Dataset", sortable: true },
    ],
    selectableColumns: [
      { name: "Phenotypic Sex", sortable: true },
      { name: "Reported Ethnicity", sortable: true },
      { name: "Diagnosis", sortable: true },
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
