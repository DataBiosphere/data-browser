export type StringToColumnDescription = {
  [k: string]: ColumnDescription;
};

export interface TabDescription {
  backpageAccessTags?: BackpageAccessTags;
  backpageExportButtons?: BackpageExportButtons;
  backpageHeaders?: BackpageHeader[];
  emptyFirstColumn: boolean;
  maxPages?: number;
  preselectedColumns: StringToColumnDescription;
  selectableColumns: StringToColumnDescription;
  tabName: string;
  url: string;
}

export interface AnvilCMGTabCollection {
  ACTIVITIES: TabDescription;
  BIOSAMPLES: TabDescription;
  DATASETS: TabDescription;
  DONORS: TabDescription;
  FILES: TabDescription;
}

export interface AnvilCatalogTabCollection {
  CONSORTIA: TabDescription;
  STUDIES: TabDescription;
  WORKSPACES: TabDescription;
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
