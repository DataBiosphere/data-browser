import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useScroll } from "app/hooks/useScroll";
import React, { useContext } from "react";
import {
  ExploreActionKind,
  FilterStateContext,
} from "../../common/context/filterState";
import { Pagination, Sort, SortOrderType } from "../../common/entities";
import { CheckboxMenu, CheckboxMenuItem } from "../CheckboxMenu/checkboxMenu";
import { GridPaper, RoundedPaper } from "../common/Paper/paper.styles";
import { Pagination as DXPagination } from "./components/Pagination/pagination";
import { PaginationSummary } from "./components/PaginationSummary/paginationSummary";
import { Table as GridTable, TableToolbar } from "./table.styles";

export interface EditColumnConfig {
  onVisibleColumnsChange: (newColumnId: string) => void;
  options: CheckboxMenuItem[];
  readOnlyColumns: string[];
  selectedColumns: string[];
}

interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  count?: number;
  disablePagination?: boolean;
  editColumns?: EditColumnConfig;
  gridTemplateColumns: string;
  items: T[];
  loading?: boolean;
  pages?: number;
  pageSize: number;
  pagination?: Pagination;
  sort?: Sort;
  staticallyLoaded?: boolean;
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
 * @param tableProps.count - Total number of rows in the current page.
 * @param tableProps.pages - Total amount of pages.
 * @param tableProps.pagination - Config for rendering pagination and corresponding events.
 * @param tableProps.sort - Config for rendering current sort and handling corresponding events.
 * @param tableProps.gridTemplateColumns - Defines grid table track sizing.
 * @param tableProps.disablePagination - Determine if the table shouldn't be paginated
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends object>({
  columns,
  count,
  disablePagination,
  editColumns,
  gridTemplateColumns,
  items,
  pages,
  pageSize,
  pagination,
  sort,
  total,
}: TableProps<T>): JSX.Element => {
  const { exploreDispatch } = useContext(FilterStateContext);

  const initialSorting = sort
    ? [{ desc: sort.sortOrder === "desc", id: sort.sortKey ?? "" }]
    : [];

  const initialState = disablePagination
    ? {
        pagination: {
          pageIndex: 0,
          pageSize: Number.MAX_SAFE_INTEGER,
        },
        sorting: initialSorting,
      }
    : {
        sorting: initialSorting,
      };

  const {
    getCanNextPage: tableCanNextPage,
    getCanPreviousPage: tableCanPreviousPage,
    getHeaderGroups,
    getRowModel,
    getState,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = useReactTable({
    columns,
    data: items,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!pagination,
    manualSorting: true,
    pageCount: total,
    state: initialState,
  });
  const scrollTop = useScroll();
  const currentPage =
    pagination?.currentPage ?? getState().pagination.pageIndex + 1;
  const totalPage = total ?? getState().pagination.pageSize;
  const pageCount = count ?? getState().pagination.pageSize;

  const handleTableNextPage = (): void => {
    const nextPage = pagination?.nextPage ?? tableNextPage;
    nextPage();
    scrollTop();
  };

  const handleTablePreviousPage = (): void => {
    const previousPage = pagination?.previousPage ?? tablePreviousPage;
    previousPage();
    scrollTop();
  };

  const handleSortClicked = (columnDef: ColumnDef<T>): void => {
    if (sort) {
      if (sort.sortKey !== columnDef.id) {
        exploreDispatch({
          payload: columnDef.id ?? "", // TODO fix or empty string
          type: ExploreActionKind.SetSortKey,
        });
      } else {
        exploreDispatch({
          payload: "asc", // TODO asc is ignored how to not specify?
          type: ExploreActionKind.FlipSortOrder,
        });
      }
      pagination?.resetPage();
    }
  };

  const isLastPage = currentPage === pages;

  return (
    <RoundedPaper>
      <GridPaper>
        {editColumns && (
          <TableToolbar>
            <PaginationSummary
              firstResult={(currentPage - 1) * pageSize + 1}
              lastResult={isLastPage ? totalPage : pageCount * currentPage}
              totalResult={totalPage}
            />
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
          <GridTable gridTemplateColumns={gridTemplateColumns}>
            {getHeaderGroups().map((headerGroup) => (
              <TableHead key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      <TableSortLabel
                        active={!!header.column.getIsSorted()}
                        direction={
                          !header.column.getIsSorted()
                            ? "asc"
                            : (header.column.getIsSorted() as SortOrderType)
                        }
                        disabled={!header.column.columnDef.enableSorting}
                        IconComponent={SouthRoundedIcon}
                        onClick={(): void =>
                          handleSortClicked(header.column.columnDef)
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            ))}

            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </GridTable>
        </TableContainer>
        {!disablePagination && (
          <DXPagination
            canNextPage={pagination?.canNextPage ?? !!tableCanNextPage}
            canPreviousPage={
              pagination?.canPreviousPage ?? !!tableCanPreviousPage
            }
            currentPage={currentPage}
            onNextPage={handleTableNextPage}
            onPreviousPage={handleTablePreviousPage}
            totalPage={pages ?? 0}
          />
        )}
      </GridPaper>
    </RoundedPaper>
  );
};

/**
 * comparison function used to determine if the component should skip the next render
 * @param prevProps - current props used by the component
 * @param nextProps - next props that the component will receive
 * @returns boolean value
 */
const shouldSkipRender = <T extends object>(
  prevProps: TableProps<T>,
  nextProps: TableProps<T>
): boolean => {
  /**
   * If the table's items aren't statically loaded, skip the next render when the component
   * is loading
   */
  if (!nextProps.staticallyLoaded) {
    return !!nextProps.loading;
  }

  /**
   * If the table's items are statically loaded, check if both columns config and items
   * have changed. If not, skip the next render
   */
  return (
    (prevProps.columns !== nextProps.columns &&
      prevProps.items === nextProps.items) ||
    (prevProps.columns === nextProps.columns &&
      prevProps.items !== nextProps.items)
  );
};

export const Table = React.memo(
  TableComponent,
  shouldSkipRender
) as typeof TableComponent;
