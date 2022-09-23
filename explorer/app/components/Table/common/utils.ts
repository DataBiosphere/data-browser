import { HeaderGroup, memo, Row, RowData, Table } from "@tanstack/react-table";
import { SelectCategory } from "../../../common/entities";

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
 * @param headerGroups - Header groups for the table.
 * @returns Array of category views objects.
 */
export function buildCategoryViews<T>(
  headerGroups: HeaderGroup<T>[]
): SelectCategory[] {
  const categoryViews: SelectCategory[] = [];
  for (const headerGroup of headerGroups) {
    for (const header of headerGroup.headers) {
      const { column } = header;
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
  }
  return categoryViews;
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
