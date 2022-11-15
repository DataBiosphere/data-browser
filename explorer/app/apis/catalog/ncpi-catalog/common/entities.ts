// /**

export type NCPICatalogEntity = NCPICatalogPlatform | NCPICatalogStudy;

export interface NCPICatalogPlatform {
  consentCode: string[];
  dataType: string[];
  dbGapId: string[]; // dbGapIds - a list of study ids.
  focus: string[]; // focusDiseases - a list of focuses / diseases.
  participantCount: number;
  platform: string; // platform - a singular platform.
  studyAccession: string[]; // studyAccessions - a list of study accessions.
  studyDesign: string[];
  title: string[]; // studyNames - a list of study names.
}

export interface NCPICatalogStudy {
  consentCode: string[];
  dataType: string[];
  dbGapId: string;
  focus: string;
  participantCount: number;
  platform: string[];
  studyAccession: string[];
  studyDesign: string[];
  title: string;
}
