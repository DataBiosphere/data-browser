/**
 * Model of AnVIL catalog.
 */
export interface AnVILCatalog {
  bucketName: string;
  bucketSize: number;
  COL: string;
  consentLongName: string;
  consentTitle: string;
  consortium: string;
  discoveryCount: number;
  diseaseText: string;
  DS: string;
  familyCount: number;
  GRU: string;
  GSO: string;
  HMB: string;
  IRB: string;
  "library:datatype": string[];
  "library:dataUseRestriction": string;
  "library:indication": string[];
  "library:studyDesign": string[];
  MDS: string;
  name: string;
  NPU: string;
  NRES: string;
  participantCount: number;
  phsId: string;
  PUB: string;
  requestorPays: boolean;
  sampleCount: number;
  status: string;
  subjectCount: number;
}

export type AnVILCatalogEntity = AnVILCatalogStudy | AnVILCatalogWorkspace;

export interface AnVILCatalogConsortium {
  consentCode: string[]; // consentCodes - a list of consent codes.
  consortium: string;
  dataTypes: string[];
  dbGapId: string[]; // dbGapIds - a list of study ids.
  diseases: string[];
  participantCount: number;
  studyDesigns: string[];
  workspaceCount: number;
  workspaceName: string[]; // workspaceNames - a list of workspace names.
}

export interface AnVILCatalogStudy {
  consentCode: string[]; // consentCodes - a list of consent codes.
  consortium: string;
  dataTypes: string[];
  dbGapId: string;
  diseases: string[];
  participantCount: number;
  studyDesigns: string[];
  workspaceCount: number;
  workspaceName: string[]; // workspaceNames - a list of workspace names.
}

export interface AnVILCatalogWorkspace {
  consentCode: string;
  consortium: string;
  dataTypes: string[];
  dbGapId: string;
  diseases: string[];
  participantCount: number;
  studyDesigns: string[];
  workspaceName: string;
}