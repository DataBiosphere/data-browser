import { BasicCell } from "@databiosphere/findable-ui/lib/components/DataDictionary/components/Table/components/BasicCell/basicCell";
import {
  AccessorFn,
  ColumnDefTemplate,
  CellContext,
  RowData,
} from "@tanstack/react-table";

/**
 * Returns an accessor function based on the accessor function name.
 * @param accessorFnName - Name of the accessor function.
 * @returns Accessor function.
 */
export function mapAccessorFn<T extends RowData, TValue>(
  accessorFnName: string | undefined,
  accessorFns: Record<string, AccessorFn<T, TValue>>
): AccessorFn<T, TValue> | undefined {
  if (!accessorFnName) return undefined;
  return accessorFns[accessorFnName];
}

/**
 * Returns a cell component based on the cell component name.
 * @param componentName - Name of the cell component.
 * @returns Cell component.
 */
export function mapCell<T extends RowData, TValue>(
  componentName: string | undefined,
  componentsMap: Record<string, ColumnDefTemplate<CellContext<T, TValue>>>
): ColumnDefTemplate<CellContext<T, TValue>> {
  if (!componentName) return BasicCell;
  return componentsMap[componentName];
}
