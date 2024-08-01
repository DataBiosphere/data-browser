export interface TabDescription {
  backpageExportButtons?: BackpageExportButtons;
  backpageHeaders?: BackpageHeader[];
  emptyFirstColumn: boolean;
  preselectedColumns: ColumnDescription[];
  selectableColumns: ColumnDescription[];
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

export interface ColumnDescription {
  name: string;
  pluralizedLabel?: string;
  sortable: boolean;
}

export interface BackpageHeader {
  correspondingColumn?: ColumnDescription;
  name: string;
}

export interface BackpageExportButtons {
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
