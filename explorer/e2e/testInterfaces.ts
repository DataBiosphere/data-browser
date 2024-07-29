export interface TabDescription {
  backpageExportButtons?: backpageExportButtons;
  backpageHeaders?: backpageHeader[];
  emptyFirstColumn: boolean;
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

export interface backpageHeader {
  correspondingColumn?: columnDescription;
  name: string;
}

export interface backpageExportButtons {
  accessNotGrantedMessage: string;
  detailsName: string;
  exportTabName: string;
  exportUrl: RegExp;
  firstButtonName: string;
  firstLoadingMessage: string;
  newTabMessage: string;
  secondButtonName: string;
  secondLandingMessage: string;
}
