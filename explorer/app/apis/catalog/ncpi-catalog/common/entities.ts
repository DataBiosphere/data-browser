import { DbGapStudy } from "../../common/entities";

export interface PlatformStudy {
  dbGapId: string;
  platform: string;
}

export interface NCPIStudy extends DbGapStudy {
  platforms: string[];
}

export type DbGapId = string;

export type NCPICatalogEntity = NCPICatalogPlatform | NCPICatalogStudy;

export interface NCPICatalogPlatform {
  consentCode: string[];
  dataType: string[];
  dbGapId: string[];
  focus: string[];
  participantCount: number;
  platform: string;
  studyAccession: string[];
  studyDesign: string[];
  title: string[];
}

export interface NCPICatalogStudy {
  consentCode: string[];
  dataType: string[];
  dbGapId: string;
  focus: string;
  participantCount: number;
  platform: string[];
  studyAccession: string;
  studyDescription: string;
  studyDesign: string[];
  title: string;
}
