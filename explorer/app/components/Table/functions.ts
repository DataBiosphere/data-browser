import { Sort, SortOrderType } from "../../common/entities";

/**
 * Determine the column ID to sort by, if any, based on the currently selected sort by column.
 * @param sort - Sort config of current sort order applied to the table.
 * @param columnId - ID of the selected column to change sort to.
 * @returns the column ID to sort the table by.
 */
export const newColumnKey = (
  sort: Sort,
  columnId: string
): string | undefined => {
  return columnId === sort.sortKey && sort.sortOrder === "desc"
    ? undefined
    : columnId;
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
