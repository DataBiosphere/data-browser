type GetByIdFunction<T> = (value: T) => boolean;

/**
 * Database interface containing database functions available to the app.
 */
interface Database<T> {
  all: (entityListType: string) => T[];
  find: (getById: GetByIdFunction<T>, entityListType: string) => T | undefined;
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
  const entitiesByEntityListType: Map<string, T[]> = new Map();

  const dbInstance: Database<T> = {
    all: (entityListType: string) =>
      entitiesByEntityListType.get(entityListType) ?? [],
    find: (
      getById: GetByIdFunction<T>,
      entityListType: string
    ): T | undefined => {
      return entitiesByEntityListType
        .get(entityListType)
        ?.find((value: T) => getById(value));
    },
    seed: (entityListType: string, entities: T[]): void => {
      entitiesByEntityListType.set(entityListType, entities);
    },
  };

  return {
    get: (): Database<T> => dbInstance,
  };
})();
