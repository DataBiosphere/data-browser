import { NCPICatalogStudy } from "../../ncpi-catalog/common/entities";

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
