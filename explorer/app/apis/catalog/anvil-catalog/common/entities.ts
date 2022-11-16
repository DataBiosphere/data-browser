export type AnVILCatalogEntity =
  | AnVILCatalogStudy
  | AnVILCatalogWorkspace
  | AnVILCatalogConsortium;

export interface AnVILCatalogConsortium {
  consentCode: string[];
  consortium: string;
  dataType: string[];
  dbGapId: string[];
  disease: string[];
  participantCount: number;
  studyDesign: string[];
  studyName: string[];
  workspaceCount: number;
  workspaceName: string[];
}

export interface AnVILCatalogStudy {
  consentCode: string[];
  consortium: string;
  dataType: string[];
  dbGapId: string;
  disease: string[];
  participantCount: number;
  studyDescription: string;
  studyDesign: string[];
  studyName: string;
  workspaceCount: number;
  workspaceName: string[];
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
