import {
  ComponentConfig,
  EntityConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { COLUMN } from "./common/column";

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
  cloneColumns.splice(2, 0, {
    ...COLUMN.DATA_USE_RESTRICTION,
    componentConfig: {
      component: C.NTagCell,
      viewBuilder: V.buildAggregatedDataUseRestriction,
    } as ComponentConfig<typeof C.NTagCell>,
  });
  cloneList.columns = cloneColumns;
  cloneEntity.list = cloneList;
  return cloneEntity;
}
