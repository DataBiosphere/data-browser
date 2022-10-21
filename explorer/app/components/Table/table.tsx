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
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useScroll } from "app/hooks/useScroll";
import React, { useContext, useEffect } from "react";
import {
  ExploreActionKind,
  ExploreStateContext,
} from "../../common/context/exploreState";
import { Pagination, Sort, SortOrderType } from "../../common/entities";
import { CheckboxMenu, CheckboxMenuItem } from "../CheckboxMenu/checkboxMenu";
import { GridPaper, RoundedPaper } from "../common/Paper/paper.styles";
import {
  buildCategoryViews,
  getFacetedUniqueValuesWithArrayValues,
} from "./common/utils";
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
 * Controlled table will receive the navigation functions, and it will be used for dynamic loads.
 * Uncontrolled table will take advantage of React Table's state and will be used for static loads.
 * @param tableProps - Set of props required for displaying the table.
 * @param tableProps.items - Row data to display.
 * @param tableProps.columns - Set of columns to display.
 * @param tableProps.editColumns - True if edit column functionality is enabled for table.
 * @param tableProps.total - Total number of rows in the result set.
 * @param tableProps.sort - Config for rendering current sort and handling corresponding events.
 * @param tableProps.gridTemplateColumns - Defines grid table track sizing.
 * @param tableProps.disablePagination - Determine if the table shouldn't be paginated
 * @returns Configured table element for display.
 */
export const TableComponent = <T extends object>({
  columns,
  disablePagination,
  editColumns,
  gridTemplateColumns,
  items,
  sort,
  total,
}: TableProps<T>): JSX.Element => {
  const { exploreDispatch, exploreState } = useContext(ExploreStateContext);
  const { filterState } = exploreState;
  const listStaticLoad = exploreState.listStaticLoad;

  const initialSorting = sort
    ? [{ desc: sort.sortOrder === "desc", id: sort.sortKey ?? "" }]
    : [];
  const state = disablePagination
    ? {
        pagination: {
          pageIndex: 0,
          pageSize: Number.MAX_SAFE_INTEGER,
        },
        sorting: initialSorting,
      }
    : {
        pagination: {
          pageIndex: 0,
          pageSize: exploreState.paginationState.pageSize,
        },
        sorting: initialSorting,
      };

  const tableInstance = useReactTable({
    columns,
    data: items,
    enableColumnFilters: true, //listStaticLoad,
    enableFilters: true, //listStaticLoad,
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: listStaticLoad ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: listStaticLoad
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: listStaticLoad ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: listStaticLoad,
    manualSorting: !listStaticLoad,
    pageCount: total,
    state,
  });
  const {
    // getCanNextPage: tableCanNextPage,
    // getCanPreviousPage: tableCanPreviousPage,
    getHeaderGroups,
    getRowModel,
    getState,
    nextPage: tableNextPage,
    previousPage: tablePreviousPage,
  } = tableInstance;
  const tableState = getState();
  const { columnFilters } = tableState;
  const headerGroups = getHeaderGroups();
  const scrollTop = useScroll();

  const currentPage = exploreState.paginationState.currentPage;
  const pages = exploreState.paginationState.pages;
  const pageSize = exploreState.paginationState.pageSize;
  const rows = exploreState.paginationState.rows;
  const isLastPage =
    exploreState.paginationState.currentPage ===
    exploreState.paginationState.pages;

  const handleTableNextPage = (): void => {
    let nextPage = tableNextPage;
    if (!listStaticLoad) {
      nextPage = (): void => {
        exploreDispatch({
          payload: "next",
          type: ExploreActionKind.PaginateTable,
        });
      };
    }
    // const nextPage = pagination?.nextPage ?? tableNextPage;
    nextPage();
    scrollTop();
  };

  const handleTablePreviousPage = (): void => {
    //const previousPage = pagination?.previousPage ?? tablePreviousPage;
    let previousPage = tablePreviousPage;
    if (!listStaticLoad) {
      previousPage = (): void => {
        exploreDispatch({
          payload: "prev",
          type: ExploreActionKind.PaginateTable,
        });
      };
    }
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
    }
  };

  // Set react table column filters `columnFilters` state, for statically loaded api only, with update of filterState.
  useEffect(() => {
    if (listStaticLoad) {
      tableInstance.setColumnFilters(
        filterState.map(({ categoryKey, value }) => ({
          id: categoryKey,
          value,
        }))
      );
    }
  }, [filterState, listStaticLoad, tableInstance]);

  // Builds categoryViews using react table `getFacetedUniqueValues`, for statically loaded api only, with update of columnFilters.
  useEffect(() => {
    if (listStaticLoad) {
      exploreDispatch({
        payload: {
          listItems: exploreState.listItems,
          loading: false,
          paginationResponse: {
            nextIndex: null,
            pageSize: tableInstance.getFilteredRowModel().rows.length,
            pages: 1,
            previousIndex: null,
            rows: tableInstance.getFilteredRowModel().rows.length,
          },
          selectCategories: buildCategoryViews(headerGroups),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    columnFilters,
    exploreDispatch,
    headerGroups,
    listStaticLoad,
    exploreState.listItems,
    tableInstance,
  ]);

  function canNextPage(): boolean {
    return (
      exploreState.paginationState.currentPage <
      exploreState.paginationState.pages
    );
  }

  function canPreviousPage(): boolean {
    return exploreState.paginationState.currentPage > 1;
  }

  return (
    <RoundedPaper>
      <GridPaper>
        {editColumns && (
          <TableToolbar>
            <PaginationSummary
              firstResult={(currentPage - 1) * pageSize + 1}
              lastResult={isLastPage ? rows : pageSize * currentPage}
              totalResult={rows}
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
            canNextPage={canNextPage()}
            canPreviousPage={canPreviousPage()}
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

// TODO(Dave) review whether memo is necessary - flash between tabs / loading state.
// export const Table = React.memo(TableComponent) as typeof TableComponent;
export const Table = TableComponent as typeof TableComponent;
