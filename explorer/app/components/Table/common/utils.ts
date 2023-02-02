import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { TableSortLabelProps } from "@mui/material/TableSortLabel/TableSortLabel";
import {
  ColumnSort,
  InitialTableState,
  memo,
  Row,
  RowData,
  SortDirection,
  sortingFns,
  Table,
} from "@tanstack/react-table";
import { Column } from "@tanstack/table-core";
import { VisibilityState } from "@tanstack/table-core/src/features/Visibility";
import { SelectCategory } from "../../../common/entities";
import {
  ColumnConfig,
  GridTrackMinMax,
  GridTrackSize,
} from "../../../config/common/entities";
import { CheckboxMenuListItem } from "../components/CheckboxMenu/checkboxMenu";

/**
 * Internal model of a category term count keyed by category term.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type see https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
type CountByTerms = Map<any, number>;

/**
 * Returns true if the row should be included in the filtered rows.
 * The row will be included if:
 * - the column value equals a value in the filter values array, or
 * - one of the column values is included in the filter values array.
 * See https://github.com/TanStack/table/blob/c895bda085d0886a7eba00a08019f377efbac54c/packages/table-core/src/filterFns.ts.
 * @param row - Row to filter.
 * @param columnId - Column identifier to retrieve the row's value.
 * @param filterValue - Filter value or values.
 * @returns True if the row should be included in the filtered rows.
 */
export function arrIncludesSome<T>(
  row: Row<T>,
  columnId: string,
  filterValue: unknown[]
): boolean {
  return filterValue.some((val) => {
    const columnValue = row.getValue<unknown[]>(columnId);
    if (Array.isArray(columnValue)) {
      return columnValue?.includes(val);
    } else {
      return columnValue === val;
    }
  });
}

/**
 * Build view-specific models from react table faceted values function.
 * @param columns - Table columns.
 * @returns Array of category views objects.
 */
export function buildCategoryViews<T>(columns: Column<T>[]): SelectCategory[] {
  const categoryViews: SelectCategory[] = [];
  for (const column of columns) {
    const { columnDef, getCanFilter, getFacetedUniqueValues, id } = column;
    const { header: columnHeader } = columnDef;
    if (getCanFilter()) {
      const key = id;
      const label = columnHeader as string;
      const values = [...getFacetedUniqueValues()].map(([value, count]) => ({
        count,
        key: value,
        label: value,
        selected: false, // Selected state updated in reducer.
      }));
      categoryViews.push({
        key,
        label,
        values: values,
      });
    }
  }
  return categoryViews;
}

/**
 * Returns the column sort direction.
 * @param sortDirection - Column sort direction.
 * @returns the coumn sort direction.
 */
export function getColumnSortDirection(
  sortDirection: false | SortDirection
): SortDirection | undefined {
  if (!sortDirection) {
    return;
  }
  return sortDirection;
}

/**
 * Returns edit column checkbox menu options.
 * @param table - Table.
 * @returns a list of edit column options.
 */
export function getEditColumnOptions<T>(
  table: Table<T>
): CheckboxMenuListItem[] {
  const { getAllColumns, initialState } = table;
  const { columnVisibility: initialVisibilityState } = initialState;
  const allColumns = getAllColumns();
  return allColumns.reduce(
    (
      acc,
      {
        columnDef: { header },
        getCanHide,
        getIsVisible,
        getToggleVisibilityHandler,
        id,
      }
    ) => {
      if (getCanHide()) {
        const option: CheckboxMenuListItem = {
          checked: getIsVisible(),
          disabled: initialVisibilityState[id],
          label: header as string, // TODO revisit type assertion here
          onChange: getToggleVisibilityHandler(),
          value: id,
        };
        acc.push(option);
      }
      return acc;
    },
    [] as CheckboxMenuListItem[]
  );
}

/**
 * Returns unique category term counts keyed by category terms.
 * Custom function based off react table function getFacetedUniqueValues, see
 * https://tanstack.com/table/v8/docs/api/features/filters#getfaceteduniquevalues, and
 * https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
 * @returns Unique category term counts keyed by category terms.
 */
export function getFacetedUniqueValuesWithArrayValues<T extends RowData>(): (
  table: Table<T>,
  columnId: string
) => () => CountByTerms {
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId).getFacetedRowModel()],
      (facetedRowModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type.
        const facetedUniqueValues = new Map<any, number>();
        for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
          const value = facetedRowModel.flatRows[i]?.getValue(columnId);
          if (Array.isArray(value)) {
            value.map((val) => {
              updateCountByTerms(facetedUniqueValues, val);
            });
          } else {
            updateCountByTerms(facetedUniqueValues, value);
          }
        }
        return facetedUniqueValues;
      },
      {
        debug: () => table.options.debugAll ?? table.options.debugTable,
        key:
          process.env.NODE_ENV === "development" &&
          "getFacetedUniqueValues_" + columnId,
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default.
        onChange: () => {},
      }
    );
}

/**
 * Generates a string value for the CSS property grid-template-columns.
 * Defines grid table track sizing (for each visible column).
 * @param columns - Table columns.
 * @returns string value for the css property grid-template-columns.
 */
export function getGridTemplateColumns<T>(columns: Column<T>[]): string {
  return columns
    .map(({ columnDef: { meta } }) => {
      const width = meta?.width;
      if (isGridTrackMinMax(width)) {
        return `minmax(${width.min}, ${width.max})`;
      }
      return width;
    })
    .join(" ");
}

/**
 * Returns initial table state.
 * @param columns - Column configuration.
 * @param defaultSort - Column sort configuration.
 * @returns initial table state.
 */
export function getInitialState(
  columns: ColumnConfig[],
  defaultSort: ColumnSort | undefined
): InitialTableState {
  const columnVisibility = getInitialTableColumnVisibility(columns);
  const sorting = getInitialTableStateSorting(defaultSort);
  return {
    columnVisibility,
    sorting,
  };
}

/**
 * Returns the initial table sorting state for the specified column sort configuration.
 * @param defaultSort - Column sort configuration.
 * @returns initial table sorting state.
 */
export function getInitialTableStateSorting(
  defaultSort: ColumnSort | undefined
): ColumnSort[] {
  if (!defaultSort) {
    return [];
  }
  return [defaultSort];
}

/**
 * Returns table sort label props.
 * @param column - Table column.
 * @returns table sort label props.
 */
export function getTableSortLabelProps<T>(
  column: Column<T>
): TableSortLabelProps {
  const { getCanSort, getIsSorted, getToggleSortingHandler } = column;
  return {
    IconComponent: SouthRoundedIcon,
    active: isColumnSortActive(getIsSorted()),
    direction: getColumnSortDirection(getIsSorted()),
    disabled: !getCanSort(),
    onClick: getToggleSortingHandler(),
  };
}

/**
 * Returns true if column has a sort direction.
 * @param sortDirection - Column sort direction.
 * @returns true when column has a sort direction.
 */
export function isColumnSortActive(
  sortDirection: false | SortDirection
): boolean {
  if (!sortDirection) {
    return sortDirection;
  }
  return true;
}

/**
 * Returns sort return value from the compare function. The compare function is dependent on the row value type:
 * - row values of type "array" use a compare function based off React Table "basic" compare function,
 * - all other row values use the React Table "alphanumeric" compare function.
 * See React Table https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts.
 * @param rowA - First row to sort.
 * @param rowB - Second row to sort.
 * @param columnId - Sorted column identifier.
 * @returns sort return value from the compare function (0 | 1 | -1).
 */
export function sortingFn<T>(
  rowA: Row<T>,
  rowB: Row<T>,
  columnId: string
): number {
  const columnAValue = rowA.getValue(columnId);
  const columnBValue = rowB.getValue(columnId);
  if (Array.isArray(columnAValue) && Array.isArray(columnBValue)) {
    // Values are type "array", sort with a basic compare function.
    // Should the "basic" compare function not be sufficient for the given array value types see
    // React Table's "compareAlphanumeric" function
    // https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L73.
    return basicSort(
      toString(columnAValue[0]).toLowerCase(),
      toString(columnBValue[0]).toLowerCase()
    );
  }
  // Sort other values with React Table's "alphanumeric" compare function.
  return sortingFns.alphanumeric(rowA, rowB, columnId);
}

/**
 * Basic compare function, returning a sort return value.
 * See React Table https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L53
 * @param val0 - First value.
 * @param val1 - Second value.
 * @returns sort return value (0 | 1 | -1).
 */
function basicSort<TValue>(val0: TValue, val1: TValue): number {
  return val0 === val1 ? 0 : val0 > val1 ? 1 : -1;
}

/**
 * Returns the initial table visibility state for the specified column configuration.
 * @param columns - Column configuration.
 * @returns initial table visibility state.
 */
function getInitialTableColumnVisibility(
  columns: ColumnConfig[]
): VisibilityState {
  return columns.reduce((acc, { columnVisible = true, id }) => {
    Object.assign(acc, { [id]: columnVisible });
    return acc;
  }, {});
}

/**
 * Determine if the given track size width is a size range.
 * @param width - Grid table track size.
 * @returns true if the given track size width is a size range.
 */
function isGridTrackMinMax(width?: GridTrackSize): width is GridTrackMinMax {
  return (width as GridTrackMinMax).min !== undefined;
}

/**
 * Returns the given value as a string.
 * See React Table "toString" function
 * https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L57
 * @param tValue - Cell value.
 * @returns the value as a string.
 */
function toString<TValue>(tValue: TValue): string {
  if (typeof tValue === "number") {
    if (isNaN(tValue) || tValue === Infinity || tValue === -Infinity) {
      return "";
    }
    return String(tValue);
  }
  if (typeof tValue === "string") {
    return tValue;
  }
  return "";
}

/**
 * Adds or updates the map object category term count keyed by category term.
 * @param countByTerms - Category term count keyed by category term.
 * @param term - Category term.
 */
function updateCountByTerms(countByTerms: CountByTerms, term: unknown): void {
  if (countByTerms.has(term)) {
    countByTerms.set(term, (countByTerms.get(term) ?? 0) + 1);
  } else {
    countByTerms.set(term, 1);
  }
}
