/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
import { AnvilCatalogTabCollection, TabDescription } from "../testInterfaces";
import {
  ANVIL_CATALOG_CONSORTIA_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_CATALOG_CONSORTIA_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_CATALOG_STUDIES_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_CATALOG_STUDIES_SELECTABLE_COLUMNS_BY_NAME,
  ANVIL_CATALOG_WORKSPACES_PRESELECTED_COLUMNS_BY_NAME,
  ANVIL_CATALOG_WORKSPACES_SELECTABLE_COLUMNS_BY_NAME,
} from "./constants";

const ANVIL_CATALOG_SEARCH_FILTERS_PLACEHOLDER_TEXT = "Search all filters...";
export const ANVIL_CATALOG_FILTERS = [
  "Consent Code",
  "Consortium",
  "Data Type",
  "dbGap Id",
  "Disease (indication)",
  "Study Design",
  "Study",
  "Terra Workspace Name",
];

export const CONSENT_CODE_INDEX = 0;
export const CONSORTIUM_INDEX = 1;
export const DATA_TYPE_INDEX = 2;
export const DBGAP_ID_INDEX = 3;
export const DISEASE_INDICATION_INDEX = 4;
export const STUDY_DESIGN_INDEX = 5;
export const STUDY_INDEX = 6;
export const TERRA_WORKSPACE_INDEX = 7;


export const ANVIL_CATALOG_TABS: AnvilCatalogTabCollection = {
  CONSORTIA: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_CONSORTIA_PRESELECTED_COLUMNS_BY_NAME,
    searchFiltersPlaceholderText: ANVIL_CATALOG_SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: ANVIL_CATALOG_CONSORTIA_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Consortia",
    url: "/data/consortia",
  },
  STUDIES: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_STUDIES_PRESELECTED_COLUMNS_BY_NAME,
    searchFiltersPlaceholderText: ANVIL_CATALOG_SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: ANVIL_CATALOG_STUDIES_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Studies",
    url: "/data/studies",
  },
  WORKSPACES: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_WORKSPACES_PRESELECTED_COLUMNS_BY_NAME,
    searchFiltersPlaceholderText: ANVIL_CATALOG_SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: ANVIL_CATALOG_WORKSPACES_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Workspaces",
    url: "/data/workspaces",
  },
};

export const ANVIL_CATALOG_TAB_LIST: TabDescription[] = [
  ANVIL_CATALOG_TABS.CONSORTIA,
  ANVIL_CATALOG_TABS.STUDIES,
  ANVIL_CATALOG_TABS.WORKSPACES,
];

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
