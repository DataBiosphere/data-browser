import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { FilesResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import { DETAIL } from "../common/detail/detail";
import { UI } from "../common/ui/ui";
import { COLUMNS } from "./columns";
import { TABLE_OPTIONS } from "./tableOptions";

/**
 * Entity config object responsible to config anything related to the /files route.
 */
export const filesEntityConfig: EntityConfig<FilesResponse> = {
  apiPath: "index/files",
  detail: DETAIL,
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  label: "Files",
  list: { columns: COLUMNS, tableOptions: TABLE_OPTIONS },
  route: "files",
  ui: UI,
};
