/**
 * Model of AnVIL catalog.
 */

export type AnVILCatalogEntity =
  | AnVILCatalogStudy
  | AnVILCatalogWorkspace
  | AnVILCatalogConsortium;

export interface AnVILCatalogConsortium {
  consentCode: string[]; // consentCodes - a list of consent codes.
  consortium: string;
  dataType: string[];
  dbGapId: string[]; // dbGapIds - a list of study ids.
  disease: string[];
  participantCount: number;
  studyDesign: string[];
  studyName: string[];
  workspaceCount: number;
  workspaceName: string[]; // workspaceNames - a list of workspace names.
}

export interface AnVILCatalogStudy {
  consentCode: string[]; // consentCodes - a list of consent codes.
  consortium: string;
  dataType: string[];
  dbGapId: string;
  disease: string[];
  participantCount: number;
  studyDescription: string;
  studyDesign: string[];
  studyName: string;
  workspaceCount: number;
  workspaceName: string[]; // workspaceNames - a list of workspace names.
}

export interface AnVILCatalogWorkspace {
  consentCode: string;
  consortium: string;
  dataType: string[];
  dbGapId: string;
  disease: string[];
  participantCount: number;
  studyDesign: string[];
  studyName: string;
  workspaceName: string;
}
