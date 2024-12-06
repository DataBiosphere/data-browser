import {
  EntityConfig,
  SiteConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import { getMAProjectDetailTabs } from "../detail/project/mainColumn";
import { getMAProjectDetailTop } from "../detail/project/top";
import { listHero } from "../listView/projectsListHero";
import { CATEGORY_GROUPS } from "./common/category";
import { COLUMN } from "./common/constants";
import { getMAFilesEntityConfig } from "./filesEntityConfig";

/**
 * Returns managed access category group config.
 * @param categoryGroupConfig - Category group config.
 * @returns managed access category group config.
 */
export function getMACategoryGroupConfig(
  categoryGroupConfig: SiteConfig["categoryGroupConfig"]
): SiteConfig["categoryGroupConfig"] {
  if (categoryGroupConfig) {
    return {
      ...categoryGroupConfig,
      categoryGroups: CATEGORY_GROUPS,
    };
  }
}

/**
 * Returns managed access entity config.
 * @param entities - Entities config.
 * @returns managed access entity config.
 */
export function getMAEntitiesConfig(
  entities: SiteConfig["entities"]
): SiteConfig["entities"] {
  return [...entities].map((entity) => {
    if (entity.route === "projects") {
      return getMAProjectsEntityConfig(entity);
    }
    if (entity.route === "files") {
      return getMAFilesEntityConfig(entity);
    }
    return entity;
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
  cloneColumns.splice(1, 0, COLUMN.ACCESSIBLE); // Accessible column.
  // Add data use restriction column.
  cloneColumns.splice(2, 0, COLUMN.DATA_USE_RESTRICTION); // Data use restriction column.
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
  cloneDetail.top = getMAProjectDetailTop();
  // Update detail tabs.
  cloneDetail.tabs = getMAProjectDetailTabs(cloneDetail.tabs);
  // Update detail.
  cloneEntity.detail = cloneDetail;
  return cloneEntity;
}
