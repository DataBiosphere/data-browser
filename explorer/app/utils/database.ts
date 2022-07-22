type GetByFunction<T> = (value: T) => boolean;

/**
 * Database interface which contains all database functions available to the app
 */
interface Database<T> {
  find: (getById: GetByFunction<T>) => T | undefined;
  seed: (newItems: T[]) => void;
  all: () => T[];
}

/**
 * Database singleston
 */
interface DatabaseReturn<T> {
  get: () => Database<T>;
}

/**
 * Closure to hide database implementation details and make all data available
 * only through database functions
 */
export const database = (<T>(): DatabaseReturn<T> => {
  const ITEMS: T[] = [];

  const dbInstance: Database<T> = {
    all: () => ITEMS,
    find: (getById: GetByFunction<T>): T | undefined => {
      return ITEMS.find((value: T) => getById(value));
    },
    seed: (newItems: T[]): void => {
      ITEMS.push(...newItems);
    },
  };

  return {
    get: (): Database<T> => dbInstance,
  };
})();
