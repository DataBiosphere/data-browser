import React, { useMemo } from "react";
import { ColumnConfig } from "app/config/model";
import { PaginationConfig, SortConfig } from "app/hooks/useFetchEntities";
import { CellProps, Column } from "react-table";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Table } from "../Table/table";
import { useEditColumns } from "app/hooks/useEditColumns";

interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  items: T[];
  pageSize: number;
  total?: number;
  pagination?: PaginationConfig;
  sort?: SortConfig;
}

const createCell = <T extends object>(config: ColumnConfig<T>) =>
  function CellCreator({ row }: CellProps<T>) {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={row.original}
      />
    );
  };

export const TableCreator = <T extends object>({
  columns,
  items,
  pageSize,
  total,
  pagination,
  sort,
}: TableCreatorProps<T>): JSX.Element => {
  const { editColumns, visibleColumns } = useEditColumns(columns);

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
      items={items}
      columns={reactVisibleColumns}
      pageSize={pageSize}
      total={total}
      pagination={pagination}
      sort={sort}
      editColumns={editColumns}
    />
  );
};
