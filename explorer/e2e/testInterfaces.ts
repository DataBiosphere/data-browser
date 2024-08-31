export interface TabDescription {
  backpageAccessTags?: BackpageAccessTags;
  backpageExportButtons?: BackpageExportButtons;
  backpageHeaders?: BackpageHeader[];
  emptyFirstColumn: boolean;
  maxPages?: number;
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

export interface BackpageAccessTags {
  deniedLongName: string;
  deniedShortName: string;
  grantedLongName: string;
  grantedShortName: string;
}

export interface BackpageExportButtons {
  accessNotGrantedMessage: string;
  detailsName: string;
  exportActionButtonText: string;
  exportRequestButtonText: string;
  exportTabName: string;
  exportUrlRegExp: RegExp;
  firstLoadingMessage: string;
  newTabMessage: string;
  secondLandingMessage: string;
}
