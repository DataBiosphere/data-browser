import { EntityConfig } from "../config/common/entities";
import { getEntityConfig } from "../config/config";
import { createEntityService } from "../entity/service/factory";
import { EntityService } from "../entity/service/model";

interface FetcherResponse extends EntityService {
  detailStaticLoad: boolean;
  listStaticLoad: boolean;
  path: string;
}

export const getEntityService = (
  entityConfig: EntityConfig
): FetcherResponse => {
  if (entityConfig.apiPath) {
    return {
      ...createEntityService("API"),
      detailStaticLoad: !!entityConfig.detail.staticLoad,
      listStaticLoad: !!entityConfig.staticLoad,
      path: entityConfig.apiPath,
    };
  }

  if (entityConfig.staticLoad) {
    return {
      ...createEntityService("TSV"),
      detailStaticLoad: true,
      listStaticLoad: true,
      path: entityConfig.route, //the entity list type
    };
  }

  throw Error(
    `There's no data path for the entity ${entityConfig.label}. Define a tsvPath or an apiPath`
  );
};

/**
 * Hook to determine how the data should be loaded.
 * From API or from a tsv file.
 * @param tabValue - the selected entity type
 * @returns @see FetcherResponse
 */
export const useEntityService = (tabValue: string): FetcherResponse => {
  return getEntityServiceByPath(tabValue);
};

export const getEntityServiceByPath = (path: string): FetcherResponse => {
  const entityConfig = getEntityConfig(path);
  return getEntityService(entityConfig);
};
