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

interface TableProps<T extends object> {
  items: T[];
  pageSize: number;
  columns: Column<T>[];
}

export const Table = <T extends object>({
  items,
  columns,
  pageSize,
}: TableProps<T>): JSX.Element => {
  const {
    nextPage,
    previousPage,
    getTableProps,
    headers,
    getTableBodyProps,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
  } = useTable<T>(
    {
      columns,
      data: items,
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
        currentPage={pageIndex + 1}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        totalPage={pageOptions.length}
      />
    </>
  );
};
