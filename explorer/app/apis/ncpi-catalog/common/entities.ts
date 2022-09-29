/**
 * Model of NCPI catalog dataset.
 */
export interface NCPICatalogDataset {
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
