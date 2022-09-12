import { EntityConfig } from "../config/common/entities";
import { createEntityService } from "../entity/service/factory";
import { EntityService } from "../entity/service/model";
import { useCurrentEntity } from "./useCurrentEntity";

interface FetcherResponse extends EntityService {
  path: string;
  staticLoad: boolean;
}

export const getEntityService = (entity: EntityConfig): FetcherResponse => {
  if (entity.apiPath) {
    return {
      ...createEntityService("API"),
      path: entity.apiPath,
      staticLoad: !!entity.staticLoad,
    };
  }

  if (entity.tsv) {
    return {
      ...createEntityService("TSV"),
      path: entity.tsv.path,
      staticLoad: true,
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
  const entity = useCurrentEntity();
  return getEntityService(entity);
};
