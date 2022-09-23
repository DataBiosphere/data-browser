/**
 * Model to represent anvil's TSV file
 * TODO review property types.
 */
export interface AnvilSourceItem {
  bucketName: string;
  bucketSize: number;
  COL: string;
  consentLongName: string;
  consentTitle: string;
  consortium: string;
  discoveryCount: number;
  diseaseText?: string;
  DS: string;
  familyCount: number;
  GRU: string;
  GSO: string;
  HMB: string;
  IRB: string;
  "library:datatype": string[];
  "library:dataUseRestriction": string;
  "library:indication": string;
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
