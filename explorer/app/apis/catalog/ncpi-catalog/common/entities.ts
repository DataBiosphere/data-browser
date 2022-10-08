/**
 * Model of NCPI catalog.
 */
export interface NCPICatalog {
  consentCodes: string[];
  dataTypes: string[];
  dbGapId: string;
  focusDisease: string;
  participantCount: number;
  platforms: string[];
  study: string;
  studyAccession: string;
  studyDesigns: string[];
}

export type NCPICatalogEntity = NCPICatalogPlatform | NCPICatalogStudy;

export interface NCPICatalogPlatform {
  consentCodes: string[];
  dataTypes: string[];
  dbGapId: string[]; // dbGapIds - a list of study ids.
  focusDisease: string[]; // focusDiseases - a list of focuses / diseases.
  participantCount: number;
  platforms: string; // platform - a singular platform.
  studyAccession: string[]; // studyAccessions - a list of study accessions.
  studyDesigns: string[];
  studyName: string[]; // studyNames - a list of study names.
}

export interface NCPICatalogStudy {
  consentCodes: string[];
  dataTypes: string[];
  dbGapId: string;
  focusDisease: string;
  participantCount: number;
  platforms: string[];
  studyAccession: string;
  studyDesigns: string[];
  studyName: string;
}
