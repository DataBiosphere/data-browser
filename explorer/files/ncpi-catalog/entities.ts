import { DbGapStudy } from "../common/dbGaP";

export interface NCPIPlatformStudy {
  dbGapId: string;
  platform: string;
}

export interface NCPIStudy extends DbGapStudy {
  platforms: string[];
}
