import {
  DataDictionaryColumnDef,
  SelectCategoryValue,
} from "@databiosphere/findable-ui/lib/common/entities";
import {
  AccessorFn,
  CellContext,
  ColumnDef,
  ColumnDefTemplate,
  RowData,
} from "@tanstack/react-table";
import { GridTrackSize } from "@databiosphere/findable-ui/lib/config/entities";
import {
  mapAccessorFn,
  mapCell,
} from "app/viewModelBuilders/common/dataDictionaryMapper/utils";

/**
 * Returns select category value with formatted label.
 * @param formatLabel - Function to format label.
 * @returns select category value with formatted label.
 */
export function mapSelectCategoryValue(
  formatLabel: (label: string) => string
): (select: SelectCategoryValue) => SelectCategoryValue {
  return (selectCategoryValue: SelectCategoryValue) => {
    return {
      ...selectCategoryValue,
      label: formatLabel(selectCategoryValue.label),
    };
  };
}

/**
 * Returns an array of column defs, built from column def configurations, to
 * use when displaying the data dictionary.
 * @param columnDefConfigs - Array of column def configurations.
 * @returns Array of column defs.
 */
export function buildColumnDefs<T extends RowData, TValue>(
  columnDefConfigs: DataDictionaryColumnDef[],
  accessorFns: Record<string, AccessorFn<T, TValue>>,
  cells: Record<string, ColumnDefTemplate<CellContext<T, TValue>>>
): ColumnDef<T, TValue>[] {
  return columnDefConfigs.map((columnDefConfig) => {
    const {
      attributeAccessorFnName,
      attributeCellName,
      attributeDisplayName: header,
      attributeSlotName: accessorKey,
      width,
    } = columnDefConfig;
    const accessorFn = mapAccessorFn(attributeAccessorFnName, accessorFns);
    return {
      accessorKey: accessorFn ? undefined : accessorKey, // Configured with either AccessorKeyConfig or AccessorFnConfig.
      accessorFn,
      cell: mapCell(attributeCellName, cells),
      header: `${header}`,
      id: accessorKey,
      meta: { width: width as GridTrackSize },
    };
  });
}
