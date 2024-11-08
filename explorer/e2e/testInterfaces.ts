export type StringToColumnDescription = {
  [k: string]: ColumnDescription;
};

export interface TabDescription {
  backpageAccessTags?: BackpageAccessTags;
  backpageExportButtons?: BackpageExportButtons;
  backpageHeaders?: BackpageHeader[];
  emptyFirstColumn: boolean;
  indexExportPage?: IndexExportButtons;
  maxPages?: number;
  preselectedColumns: StringToColumnDescription;
  searchFiltersPlaceholderText: string;
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

export interface ExportButtonInfo {
  actionLandingMessage: string;
  detailsName: string;
  exportActionButtonText: string;
  exportRequestButtonText: string;
  requestLandingMessage: string;
}

export interface BackpageExportButtons extends ExportButtonInfo {
  accessNotGrantedMessage: string;
  exportTabName: string;
  exportUrlRegExp: RegExp;
  newTabMessage: string;
}

//TODO: might need to make it so that there's an interface with indexExportButtonText
// and a list of other objects that go to different export pages for this to work with HCA
export interface IndexExportButtons extends ExportButtonInfo {
  detailsToCheck: string[];
  exportOptionButtonText: string;
  indexExportButtonText: string;
}
