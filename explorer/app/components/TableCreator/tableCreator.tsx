// Core dependencies
import React, { useMemo } from "react";
import { CellProps, Column } from "react-table";

// App dependencies
import {
  ColumnConfig,
  GridTrackMinMax,
  GridTrackSize,
} from "app/config/common/entities";
import { useEditColumns } from "app/hooks/useEditColumns";
import { PaginationConfig, SortConfig } from "app/hooks/useFetchEntities";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Table } from "../Table/table";

interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  disablePagination?: boolean;
  items: T[];
  loading?: boolean;
  pageSize: number;
  pagination?: PaginationConfig;
  sort?: SortConfig;
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
  function CellCreator({ row }: CellProps<T>): JSX.Element {
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

  const reactVisibleColumns: Column<T>[] = useMemo(
    () =>
      visibleColumns.map((columnConfig) => ({
        Cell: createCell(columnConfig),
        Header: columnConfig.header,
        disableSortBy: !columnConfig.sort,
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
