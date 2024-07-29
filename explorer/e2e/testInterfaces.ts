export interface TabDescription {
  emptyFirstColumn: boolean;
  maxPages?: number;
  preselectedColumns: columnDescription[];
  selectableColumns: columnDescription[];
  tabName: string;
  url: string;
}

export interface AnvilCMGTabCollection {
  activities: TabDescription;
  biosamples: TabDescription;
  datasets: TabDescription;
  donors: TabDescription;
  files: TabDescription;
}

export interface AnvilCatalogTabCollection {
  consortia: TabDescription;
  studies: TabDescription;
  workspaces: TabDescription;
}

export type TabCollectionKeys = keyof AnvilCMGTabCollection;

export interface columnDescription {
  name: string;
  sortable: boolean;
}
