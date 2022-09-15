import { Sort, SortOrderType } from "app/common/entities";
import { EntityConfig } from "app/config/common/entities";
import { useCallback, useMemo, useState } from "react";
import { useCurrentEntityConfig } from "./useCurrentEntityConfig";
import { useResetableState } from "./useResetableState";

/**
 * Determine the default sort column.
 * @param entity - Current entity config containing all column definitions.
 * @returns Column name of default sorted column, or the first column if no default is specified.
 */
const getDefaultSort = (entity: EntityConfig): string | undefined => {
  return (
    entity.list.columns.find((column) => column.sort?.default)?.sort?.sortKey ??
    entity.list.columns[0].sort?.sortKey
  );
};

export const useSort = (): Sort => {
  // Grab the current entity.
  const entityConfig = useCurrentEntityConfig();

  // Init sort.
  const defaultSort = useMemo(
    () => getDefaultSort(entityConfig),
    [entityConfig]
  );
  const [sortKey, setSortKey] = useResetableState<string | undefined>(
    defaultSort
  );
  const [sortOrder, setSortOrder] = useState<SortOrderType | undefined>(
    defaultSort ? "asc" : undefined
  );

  // Handle change of sort.
  const sort = useCallback(
    (key?: string, order?: SortOrderType) => {
      setSortKey(key ?? defaultSort);
      setSortOrder(order);
    },
    [defaultSort, setSortKey]
  );

  return {
    sort,
    sortKey,
    sortOrder,
  };
};
