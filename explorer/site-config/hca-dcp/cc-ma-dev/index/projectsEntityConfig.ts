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
  return [...entities].map((entity) => {
    if (entity.route !== "projects") {
      return entity;
    }
    return getMAProjectsEntityConfig(entity);
  });
}

/**
 * Returns the entity config for managed access projects.
 * @param entitiesConfig - Entities config.
 * @returns entity config for managed access projects.
 */
export function getMAProjectsEntityConfig(
  entitiesConfig: EntityConfig
): EntityConfig {
  // Clone project entity.
  const cloneEntity = { ...entitiesConfig };
  // Clone list.
  const cloneList = { ...cloneEntity.list };
  // Clone columns.
  const cloneColumns = [...cloneList.columns];
  // Add accessible column.
  cloneColumns.splice(1, 0, COLUMN_ACCESS); // Accessible column.
  cloneList.columns = cloneColumns;
  cloneEntity.list = cloneList;
  // Update list view.
  cloneEntity.listView = {
    ...cloneEntity.listView,
    listHero,
  };
  // Clone detail.
  const cloneDetail = { ...cloneEntity.detail };
  // Update detail top.
  cloneDetail.top = getMAProjectDetailTop(cloneDetail.top as ComponentConfig[]);
  // Update detail tabs.
  cloneDetail.tabs = getMAProjectDetailTabs(cloneDetail.tabs);
  // Update detail.
  cloneEntity.detail = cloneDetail;
  return cloneEntity;
}
