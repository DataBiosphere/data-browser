/* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
import { AnvilCatalogTabCollection, TabDescription } from "../testInterfaces";

export const anvilcatalogTabs: AnvilCatalogTabCollection = {
  consortia: {
    emptyFirstColumn: false,
    preselectedColumns: [
      { name: "Consortium", sortable: true },
      { name: "dbGap Id", sortable: true },
      { name: "Consent Codes", sortable: true },
      { name: "Disease (indication)", sortable: true },
      { name: "Data Type", sortable: true },
      { name: "Study Design", sortable: true },
      { name: "Participants", sortable: true },
      { name: "Size (TB)", sortable: true },
    ],
    selectableColumns: [
      { name: "Study", sortable: true },
      { name: "Workspaces", sortable: true },
    ],
    tabName: "Consortia",
    url: "/data/consortia",
  },
  studies: {
    emptyFirstColumn: false,
    preselectedColumns: [
      { name: "Study", sortable: true },
      { name: "dbGap Id", sortable: true },
      { name: "Consortium", sortable: true },
      { name: "Consent Codes", sortable: true },
      { name: "Disease (indication)", sortable: true },
      { name: "Data Type", sortable: true },
      { name: "Study Design", sortable: true },
      { name: "Workspaces", sortable: true },
      { name: "Participants", sortable: true },
      { name: "Size (TB)", sortable: true },
    ],
    selectableColumns: [],
    tabName: "Studies",
    url: "/data/studies",
  },
  workspaces: {
    emptyFirstColumn: false,
    preselectedColumns: [
      { name: "Consortium", sortable: true },
      { name: "Terra Workspace", sortable: true },
      { name: "Study", sortable: true },
      { name: "dbGap Id", sortable: true },
      { name: "Consent Code", sortable: true },
      { name: "Disease (indication)", sortable: true },
      { name: "Data Type", sortable: true },
      { name: "Study Design", sortable: false },
      { name: "Participants", sortable: true },
      { name: "Size (TB)", sortable: true },
    ],
    selectableColumns: [],
    tabName: "Workspaces",
    url: "/data/workspaces",
  },
};

export const anvilCatalogTabList: TabDescription[] = [
  anvilcatalogTabs.consortia,
  anvilcatalogTabs.studies,
  anvilcatalogTabs.workspaces,
];

/* eslint-enable sonarjs/no-duplicate-string -- Checking duplicate strings again*/
