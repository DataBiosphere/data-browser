import React from "react";
import { Column, TableState, usePagination, useTable } from "react-table";

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
      <table {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          {">"}
        </button>
      </div>
    </>
  );
};
