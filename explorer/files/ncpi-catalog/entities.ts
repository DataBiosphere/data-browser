import { DbGapStudy } from "../common/dbGaP";

export interface PlatformStudy {
  dbGapId: string;
  platform: string;
}

export interface NCPIStudy extends DbGapStudy {
  platforms: string[];
}

export type DbGapId = string;
