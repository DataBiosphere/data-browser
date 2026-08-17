import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import {
  getProjectId,
  getTitle,
} from "../../../../../app/apis/azul/hca-dcp/common/utils";
import { projectEdits } from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/projectMapper/projectEdits/projectEdits";
import { COLUMNS } from "./columns";
import { DETAIL } from "./entity/detail";
import { TABLE_OPTIONS } from "./tableOptions";
import { UI } from "./ui/ui";

/**
 * Entity config object responsible to config anything related to the /projects route.
 */
export const projectsEntityConfig: EntityConfig = {
  apiPath: "index/projects",
  detail: DETAIL,
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  getId: getProjectId,
  getTitle: getTitle,
  label: "Projects",
  list: { columns: COLUMNS, tableOptions: TABLE_OPTIONS },
  overrides: projectEdits,
  route: "projects",
  ui: UI,
};
