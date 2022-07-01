import { SortConfig } from "app/hooks/useFetchEntities";
import { ColumnInstance } from "react-table";

/**
 * Function to determine the new column id, if any, based on the sort order
 * @param sort
 * @param column
 * @returns the new column id
 */
export const newColumnKey = <T extends object>(
  sort: SortConfig,
  column: ColumnInstance<T>
) => {
  return column.id === sort.sortKey && sort.sortOrder === "desc"
    ? undefined
    : column.id;
};

/**
 * Function to determine the new order to be used to sort the column id @param columnId
 * @param sort
 * @param columnId
 * @returns the new sort order
 */
export const newColumnOrder = (sort: SortConfig, columnId?: string) => {
  if (columnId !== sort.sortKey) {
    return "asc";
  } else if (sort.sortOrder === "desc") {
    return undefined;
  } else if (sort.sortOrder === "asc") {
    return "desc";
  }

  return "asc";
};
