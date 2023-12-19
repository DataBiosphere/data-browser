import {
  ColumnConfig,
  ComponentConfig,
  EntityConfig,
  SiteConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../../category";
import { getMAProjectDetailTabs } from "../detail/project/mainColumn";
import { getMAProjectDetailTop } from "../detail/project/top";
import { listHero } from "../listView/projectsListHero";

// Accessible column.
const COLUMN_ACCESS: ColumnConfig = {
  componentConfig: {
    component: C.StatusBadge,
    viewBuilder: V.buildProjectAccess,
  } as ComponentConfig<typeof C.StatusBadge, ProjectsResponse>,
  disableSorting: true,
  header: HCA_DCP_CATEGORY_LABEL.ACCESSIBLE,
  id: HCA_DCP_CATEGORY_KEY.ACCESSIBLE,
  width: "auto",
};

/**
 * Returns managed access entity config.
 * @param entities - Entities config.
 * @returns managed access entity config.
 */
export function getMAEntitiesConfig(
  entities: SiteConfig["entities"]
): SiteConfig["entities"] {
  const projectsEntityConfig = getMAProjectsEntityConfig(entities);
  entities.splice(0, 1, projectsEntityConfig);
  return entities;
}

/**
 * Returns the entity config for managed access projects.
 * @param entitiesConfig - Entities config.
 * @returns entity config for managed access projects.
 */
export function getMAProjectsEntityConfig(
  entitiesConfig: EntityConfig[]
): EntityConfig {
  const entityConfig = { ...entitiesConfig[0] };
  // Update list.
  const list = { ...entityConfig.list };
  const columns = [...list.columns];
  columns.splice(1, 0, COLUMN_ACCESS); // Accessible column.
  list.columns = columns;
  entityConfig.list = list;
  // Update list view.
  entityConfig.listView = {
    ...entityConfig.listView,
    listHero,
  };
  // Clone detail.
  const detail = { ...entityConfig.detail };
  // Update detail top.
  detail.top = getMAProjectDetailTop(detail.top as ComponentConfig[]);
  // Update detail tabs.
  detail.tabs = getMAProjectDetailTabs(detail.tabs);
  // Update detail.
  entityConfig.detail = detail;
  return entityConfig;
}
