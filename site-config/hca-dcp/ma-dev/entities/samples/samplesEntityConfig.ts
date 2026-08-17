import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { SamplesResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { DETAIL } from "../common/detail/detail";
import { UI } from "../common/ui/ui";
import { COLUMNS } from "./columns";
import { TABLE_OPTIONS } from "./tableOptions";

/**
 * Entity config object responsible to config anything related to the /samples route.
 */
export const samplesEntityConfig: EntityConfig<SamplesResponse> = {
  apiPath: "index/samples",
  detail: DETAIL,
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Samples",
  list: { columns: COLUMNS, tableOptions: TABLE_OPTIONS },
  route: "samples",
  ui: UI,
};
