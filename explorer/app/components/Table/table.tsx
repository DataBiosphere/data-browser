import React from "react";
import {
  Column,
  ColumnInstance,
  TableState,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Pagination } from "../Pagination/pagination";
import { CheckboxMenu, CheckboxMenuItem } from "../CheckboxMenu/checkboxMenu";
import { PaginationConfig, SortConfig } from "app/hooks/useFetchEntities";
import { newColumnKey, newColumnOrder } from "./functions";

export interface EditColumnConfig {
  options: CheckboxMenuItem[];
  selectedColumns: string[];
  readOnlyColumns: string[];
  onVisibleColumnsChange: (newColumnId: string) => void;
}

interface TableProps<T extends object> {
  items: T[];
  pageSize: number;
  columns: Column<T>[];
  total?: number;
  pagination?: PaginationConfig;
  sort?: SortConfig;
  editColumns?: EditColumnConfig;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 */
export const Table = <T extends object>({
  items,
  columns,
  editColumns,
  pageSize,
  total,
  pagination,
  sort,
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
      disableMultiSort: true,
      initialState: {
        pageSize: pageSize,
      } as TableState,
      manualPagination: !!pagination,
      manualSortBy: true,
      pageCount: total,
    },
    useSortBy,
    usePagination
  );

  const handleSortClicked = (column: ColumnInstance<T>) => {
    if (sort) {
      const newColumn = newColumnKey<T>(sort, column);
      const newOrder = newColumnOrder(sort, newColumn);
      sort.sort(newColumn, newOrder);
    }
  };

  return (
    <div>
      {editColumns && (
        <Box display="flex" justifyContent="flex-end">
          <CheckboxMenu
            label="Edit Columns"
            onItemSelectionChange={editColumns.onVisibleColumnsChange}
            options={editColumns.options}
            readOnly={editColumns.readOnlyColumns}
            selected={editColumns.selectedColumns}
          />
        </Box>
      )}
      <MuiTable {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
              >
                <TableSortLabel
                  active={sort?.sortKey === column.id}
                  disabled={column.disableSortBy}
                  direction={
                    sort?.sortKey === column.id ? sort?.sortOrder : "asc"
                  }
                  onClick={() => handleSortClicked(column)}
                >
                  {column.render("Header")}
                </TableSortLabel>
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
    </div>
  );
};
