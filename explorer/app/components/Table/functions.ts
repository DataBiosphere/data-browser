import { ColumnInstance } from "react-table";
import { Sort, SortOrderType } from "../../common/entities";

/**
 * Determine the column ID to sort by, if any, based on the currently selected sort by column.
 * @param sort - Sort config of current sort order applied to the table.
 * @param column - Column selected to change sort to.
 * @returns the column ID to sort the table by.
 */
export const newColumnKey = <T extends object>(
  sort: Sort,
  column: ColumnInstance<T>
): string | undefined => {
  return column.id === sort.sortKey && sort.sortOrder === "desc"
    ? undefined
    : column.id;
};

/**
 * Determine the sort direction to be used to sort the given column by.
 * @param sort - Sort config of current sort order applied to the table.
 * @param columnId - ID of column to sort.
 * @returns the direction to sort the given column by.
 */
export const newColumnOrder = (
  sort: Sort,
  columnId?: string
): SortOrderType | undefined => {
  if (columnId !== sort.sortKey) {
    return "asc";
  } else if (sort.sortOrder === "desc") {
    return;
  } else if (sort.sortOrder === "asc") {
    return "desc";
  }

  return "asc";
};
