import { ColumnConfig } from "app/config/model";
import { PaginationConfig } from "app/hooks/useFetchEntities";
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
}: TableCreatorProps<T>): JSX.Element => {
  const reactColumns: Column<T>[] = columns.map((columnConfig) => ({
    Header: columnConfig.header,
    Cell: createCell(columnConfig),
  }));

  return (
    <Table<T>
      items={items}
      columns={reactColumns}
      pageSize={pageSize}
      total={total}
      pagination={pagination}
    />
  );
};
