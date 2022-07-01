import { ColumnConfig } from "app/config/model";
import { PaginationConfig, SortConfig } from "app/hooks/useFetchEntities";
import React from "react";
import { CellProps, Column } from "react-table";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Table } from "../Table/table";

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
  const reactColumns: Column<T>[] = columns.map((columnConfig) => ({
    Cell: createCell(columnConfig),
    Header: columnConfig.header,
    disableSortBy: !columnConfig.sort,
    id: columnConfig.sort?.sortKey,
  }));

  return (
    <Table<T>
      items={items}
      columns={reactColumns}
      pageSize={pageSize}
      total={total}
      pagination={pagination}
      sort={sort}
    />
  );
};
