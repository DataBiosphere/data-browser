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

export const ANVIL_CATALOG_TABS: AnvilCatalogTabCollection = {
  CONSORTIA: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_CONSORTIA_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_CATALOG_CONSORTIA_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Consortia",
    url: "/data/consortia",
  },
  STUDIES: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_STUDIES_PRESELECTED_COLUMNS_BY_NAME,
    selectableColumns: ANVIL_CATALOG_STUDIES_SELECTABLE_COLUMNS_BY_NAME,
    tabName: "Studies",
    url: "/data/studies",
  },
  WORKSPACES: {
    emptyFirstColumn: false,
    preselectedColumns: ANVIL_CATALOG_WORKSPACES_PRESELECTED_COLUMNS_BY_NAME,
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
