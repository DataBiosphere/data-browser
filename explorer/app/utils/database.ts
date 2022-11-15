import { getEntityConfig } from "../config/config";

//type GetByIdFunction<T> = (value: T) => boolean;

/**
 * Database interface containing database functions available to the app.
 */
interface Database<T> {
  all: (entityListType: string) => T[];
  find: (entityListType: string, entityId: string) => T | undefined;
  seed: (entityListType: string, entities: T[]) => void;
}

/**
 * Database singleton.
 */
interface DatabaseReturn<T> {
  get: () => Database<T>;
}

/**
 * Closure to hide database implementation details and make all data available only through database functions.
 */
export const database = (<T>(): DatabaseReturn<T> => {
  const entityListByEntityListType: Map<string, T[]> = new Map();
  const entityDetailByEntityListType: Map<string, Map<string, T>> = new Map();

  const dbInstance: Database<T> = {
    all: (entityListType: string) =>
      entityListByEntityListType.get(entityListType) ?? [],
    find: (entityListType: string, entityId: string): T | undefined => {
      const entityDetailById = entityDetailByEntityListType.get(entityListType);
      if (!entityDetailById) {
        throw new Error(
          "No database entry for entityListType: " + entityListType
        );
      }
      return entityDetailById.get(entityId);
    },
    seed: (entityListType: string, entities: T[]): void => {
      const { getId } = getEntityConfig(entityListType);
      if (!getId) {
        throw new Error(
          "No getId function configured for entity: " + entityListType
        );
      }

      const entityDetailById = new Map<string, T>();
      for (const entity of entities) {
        entityDetailById.set(getId(entity), entity);
      }
      entityDetailByEntityListType.set(entityListType, entityDetailById);
      entityListByEntityListType.set(entityListType, entities);
    },
  };

  return {
    get: (): Database<T> => dbInstance,
  };
})();
