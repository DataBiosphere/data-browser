// Core dependencies
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import {
  Column,
  ColumnInstance,
  TableState,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// App dependencies
import { PaginationConfig, SortConfig } from "app/hooks/useFetchEntities";
import { CheckboxMenu, CheckboxMenuItem } from "../CheckboxMenu/checkboxMenu";
import { newColumnKey, newColumnOrder } from "./functions";
import { Pagination } from "../Pagination/pagination";

// Styles
import { RoundedPaper } from "../common/Paper/paper.styles";
import { Table as GridTable, TableToolbar } from "./table.styles";

export interface EditColumnConfig {
  onVisibleColumnsChange: (newColumnId: string) => void;
  options: CheckboxMenuItem[];
  readOnlyColumns: string[];
  selectedColumns: string[];
}

interface TableProps<T extends object> {
  columns: Column<T>[];
  editColumns?: EditColumnConfig;
  gridTemplateColumns: string;
  items: T[];
  pageSize: number;
  pagination?: PaginationConfig;
  sort?: SortConfig;
  total?: number;
}

/**
 * This table can be Controlled or Uncontrolled based on the set of props passed to it.
 * Controlled table will receive the navigation functions and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.items - Row data to display.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.editColumns - True if edit column functionality is enabled for table.
 * @param tableProps.pageSize - Number of rows to display per page.
 * @param tableProps.total - Total number of rows in the result set.
 * @param tableProps.pagination - Config for rendering pagination and corresponding events.
 * @param tableProps.sort - Config for rendering current sort and handling corresponding events.
 * @param tableProps.gridTemplateColumns - Defines grid table track sizing.
 * @returns Configured table element for display.
 */
export const Table = <T extends object>({
  columns,
  editColumns,
  gridTemplateColumns,
  items,
  pageSize,
  pagination,
  sort,
  total,
}: TableProps<T>): JSX.Element => {
  const {
    canNextPage: tableCanNextPage,
    canPreviousPage: tableCanPreviousPage,
    getTableBodyProps,
    getTableProps,
    headers,
    nextPage: tableNextPage,
    page,
    pageOptions,
    prepareRow,
    previousPage: tablePreviousPage,
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

  const handleSortClicked = (column: ColumnInstance<T>): void => {
    if (sort) {
      const newColumn = newColumnKey<T>(sort, column);
      const newOrder = newColumnOrder(sort, newColumn);
      sort.sort(newColumn, newOrder);
    }
  };

  return (
    <RoundedPaper>
      {editColumns && (
        <TableToolbar>
          <CheckboxMenu
            label="Edit Columns"
            onItemSelectionChange={editColumns.onVisibleColumnsChange}
            options={editColumns.options}
            readOnly={editColumns.readOnlyColumns}
            selected={editColumns.selectedColumns}
          />
        </TableToolbar>
      )}
      <TableContainer>
        <GridTable
          gridTemplateColumns={gridTemplateColumns}
          {...getTableProps()}
        >
          <TableHead>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  <TableSortLabel
                    active={sort?.sortKey === column.id}
                    direction={
                      sort?.sortKey === column.id ? sort?.sortOrder : "asc"
                    }
                    disabled={column.disableSortBy}
                    IconComponent={SouthRoundedIcon}
                    onClick={(): void => handleSortClicked(column)}
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
          <TableFooter>
            <TableRow>
              <TableCell>
                <Pagination
                  currentPage={pagination?.currentPage ?? pageIndex + 1}
                  onNextPage={pagination?.nextPage ?? tableNextPage}
                  onPreviousPage={pagination?.previousPage ?? tablePreviousPage}
                  canNextPage={pagination?.canNextPage ?? tableCanNextPage}
                  canPreviousPage={
                    pagination?.canPreviousPage ?? tableCanPreviousPage
                  }
                  totalPage={total ?? pageOptions.length}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </GridTable>
      </TableContainer>
    </RoundedPaper>
  );
};
