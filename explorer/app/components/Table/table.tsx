import React from "react";
import { Column, TableState, usePagination, useTable } from "react-table";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "../Pagination/pagination";
import { PaginationConfig } from "app/hooks/useFetchEntities";

interface TableProps<T extends object> {
  items: T[];
  pageSize: number;
  columns: Column<T>[];
  total?: number;
  pagination?: PaginationConfig;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 */
export const Table = <T extends object>({
  items,
  columns,
  pageSize,
  total,
  pagination,
}: TableProps<T>): JSX.Element => {
  const {
    getTableProps,
    headers,
    getTableBodyProps,
    page,
    prepareRow,
    canNextPage: tableCanNextPage,
    canPreviousPage: tableCanPreviousPage,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable<T>(
    {
      columns,
      data: items,
      manualPagination: !!pagination,
      pageCount: total,
      initialState: {
        pageSize: pageSize,
      } as TableState,
    },
    usePagination
  );

  return (
    <>
      <MuiTable {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => {
                  return (
                    <TableCell {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      <Pagination
        currentPage={pagination?.currentPage ?? pageIndex + 1}
        onNextPage={pagination?.nextPage ?? tableNextPage}
        onPreviousPage={pagination?.previousPage ?? tablePreviousPage}
        canNextPage={pagination?.canNextPage ?? tableCanNextPage}
        canPreviousPage={pagination?.canPreviousPage ?? tableCanPreviousPage}
        totalPage={total ?? pageOptions.length}
      />
    </>
  );
};
