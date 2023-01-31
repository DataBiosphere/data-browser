import { CellContext, ColumnDef, ColumnSort } from "@tanstack/react-table";
import {
  ColumnConfig,
  GridTrackMinMax,
  GridTrackSize,
} from "app/config/common/entities";
import { useEditColumns } from "app/hooks/useEditColumns";
import React, { useMemo } from "react";
import { Pagination } from "../../common/entities";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Loading } from "../Loading/loading";
import { arrIncludesSome, getInitialState } from "../Table/common/utils";
import { Table } from "../Table/table";

interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  defaultSort: ColumnSort | undefined;
  disablePagination?: boolean;
  items: T[];
  loading?: boolean;
  pageCount?: number;
  pages: number;
  pageSize: number;
  pagination?: Pagination;
  staticallyLoaded?: boolean;
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
  defaultSort,
  disablePagination,
  items,
  loading,
  pageCount,
  pages,
  pageSize,
  pagination,
  staticallyLoaded,
  total,
}: TableCreatorProps<T>): JSX.Element => {
  const { editColumns, visibleColumns } = useEditColumns(columns); // TODO(Dave or Fran) include hidden table functionality in to table - we want access to all columns for table categories.
  const gridTemplateColumns = getGridTemplateColumnsValue(visibleColumns);

  const reactVisibleColumns: ColumnDef<T>[] = useMemo(
    () =>
      visibleColumns.map(({ disableSorting, ...columnConfig }) => ({
        accessorKey: columnConfig.id,
        cell: createCell(columnConfig),
        enableSorting: !disableSorting,
        filterFn: arrIncludesSome,
        header: columnConfig.header,
        id: columnConfig.id,
      })),
    [visibleColumns]
  );
  const initialState = getInitialState(defaultSort);
  return (
    <div>
      <Loading loading={loading || false} />
      <Table<T>
        columns={reactVisibleColumns}
        count={pageCount}
        disablePagination={disablePagination}
        editColumns={editColumns}
        gridTemplateColumns={gridTemplateColumns}
        initialState={initialState}
        items={items}
        loading={loading}
        pages={pages}
        pageSize={pageSize}
        pagination={pagination}
        staticallyLoaded={staticallyLoaded}
        total={total}
      />
    </div>
  );
};
