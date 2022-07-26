import { AzulEntitiesResponse } from "../../apis/azul/common/entities";

export const EMPTY_PAGE: AzulEntitiesResponse = {
  hits: [],
  pagination: { count: 0, pages: 0, size: 0, total: 0 },
  termFacets: {},
};
