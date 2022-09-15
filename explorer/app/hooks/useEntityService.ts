import { EntityConfig } from "../config/common/entities";
import { createEntityService } from "../entity/service/factory";
import { EntityService } from "../entity/service/model";
import { useCurrentEntityConfig } from "./useCurrentEntityConfig";

interface FetcherResponse extends EntityService {
  detailStaticLoad: boolean;
  listStaticLoad: boolean;
  path: string;
}

export const getEntityService = (entity: EntityConfig): FetcherResponse => {
  if (entity.apiPath) {
    return {
      ...createEntityService("API"),
      detailStaticLoad: !!entity.detail.staticLoad,
      listStaticLoad: !!entity.staticLoad,
      path: entity.apiPath,
    };
  }

  if (entity.tsv) {
    return {
      ...createEntityService("TSV"),
      detailStaticLoad: true,
      listStaticLoad: true,
      path: entity.tsv.path,
    };
  }

  throw Error(
    `There's no data path for the entity ${entity.label}. Define a tsvPath or an apiPath`
  );
};

/**
 * Hook to determine how the data should be loaded.
 * From API or from a tsv file.
 * @returns @see FetcherResponse
 */
export const useEntityService = (): FetcherResponse => {
  const entity = useCurrentEntityConfig();
  return getEntityService(entity);
};
