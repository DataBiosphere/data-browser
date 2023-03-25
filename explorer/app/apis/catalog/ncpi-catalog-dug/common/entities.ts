import {
  NCPICatalogStudy,
  NCPIStudy,
} from "../../ncpi-catalog/common/entities";

export interface DugStudy extends NCPIStudy {
  relatedStudies?: NCPIStudy[];
}

export interface DugSearchResponse {
  result: DugSearchResultResponse;
  status: string;
}

export interface DugSearchResultResponse {
  AnVIL: DugDbGapIdResultResponse[];
  DBGapId: DugDbGapIdResultResponse[];
}

export interface DugDbGapIdResultResponse {
  c_id: string;
}

export interface DugCatalogStudy extends NCPICatalogStudy {
  relatedStudies?: DugCatalogStudy[];
}
