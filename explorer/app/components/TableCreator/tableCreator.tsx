// Core dependencies
import React, { useMemo } from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";

// App dependencies
import {
  ColumnConfig,
  GridTrackMinMax,
  GridTrackSize,
} from "app/config/common/entities";
import { useEditColumns } from "app/hooks/useEditColumns";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Table } from "../Table/table";
import { Pagination, Sort } from "../../common/entities";

interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  disablePagination?: boolean;
  items: T[];
  loading?: boolean;
  pageSize: number;
  pagination?: Pagination;
  sort?: Sort;
  total?: number;
}

/**
 * Generates a string value for the CSS property grid-template-columns.
 * Defines grid table track sizing (for each visible column).
 * @param visibleColumns - Column configuration.
 * @returns string value for the css property grid-template-columns.
 */
function getGridTemplateColumnsValue<T extends object>(
  visibleColumns: ColumnConfig<T>[]
): string {
  return visibleColumns
    .map(({ width }) => {
      if (isGridTrackMinMax(width)) {
        return `minmax(${width.min}, ${width.max})`;
      }
      return width;
    })
    .join(" ");
}

/**
 * Determine if the given track size width is a size range.
 * @param width - Grid table track size.
 * @returns true if the given track size width is a size range.
 */
function isGridTrackMinMax(width: GridTrackSize): width is GridTrackMinMax {
  return (width as GridTrackMinMax).min !== undefined;
}

const createCell = <T extends object>(config: ColumnConfig<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the cell type
  function CellCreator({ row }: CellContext<T, any>): JSX.Element {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={row.original}
      />
    );
  };

export const TableCreator = <T extends object>({
  columns,
  disablePagination,
  items,
  loading,
  pageSize,
  pagination,
  sort,
  total,
}: TableCreatorProps<T>): JSX.Element => {
  const { editColumns, visibleColumns } = useEditColumns(columns);
  const gridTemplateColumns = getGridTemplateColumnsValue(visibleColumns);

  const reactVisibleColumns: ColumnDef<T>[] = useMemo(
    () =>
      visibleColumns.map((columnConfig) => ({
        cell: createCell(columnConfig),
        enableSorting: !!columnConfig.sort,
        header: columnConfig.header,
        id: columnConfig.sort?.sortKey,
      })),
    [visibleColumns]
  );

  return (
    <Table<T>
      columns={reactVisibleColumns}
      disablePagination={disablePagination}
      editColumns={editColumns}
      gridTemplateColumns={gridTemplateColumns}
      items={items}
      pageSize={pageSize}
      pagination={pagination}
      sort={sort}
      total={total}
      loading={loading}
    />
  );
};
