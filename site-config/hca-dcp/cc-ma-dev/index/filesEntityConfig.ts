import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { COLUMN } from "./common/constants";

/**
 * Returns the entity config for managed access files.
 * @param entitiesConfig - Entities config.
 * @returns entity config for managed access files.
 */
export function getMAFilesEntityConfig(
  entitiesConfig: EntityConfig
): EntityConfig {
  // Clone files entity.
  const cloneEntity = { ...entitiesConfig };
  // Clone list.
  const cloneList = { ...cloneEntity.list };
  // Clone columns.
  const cloneColumns = [...cloneList.columns];
  // Add data use restriction column.
  cloneColumns.splice(2, 0, COLUMN.DATA_USE_RESTRICTION);
  cloneList.columns = cloneColumns;
  cloneEntity.list = cloneList;
  return cloneEntity;
}
