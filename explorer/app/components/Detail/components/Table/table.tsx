import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  GridPaper,
  RoundedPaper,
} from "app/components/common/Paper/paper.styles";
import {
  Table as GridTable,
  TableToolbar,
} from "app/components/Table/table.styles";
import React, { ReactNode } from "react";
import { NoResults } from "../../../NoResults/noResults";

interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  noResultsTitle: string;
  tools?: ReactNode;
}

export const Table = <T extends object>({
  columns,
  gridTemplateColumns,
  items,
  noResultsTitle,
  tools,
}: TableProps<T>): JSX.Element => {
  const tableInstance = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = tableInstance;
  return items.length > 0 ? (
    <RoundedPaper>
      <GridPaper>
        {tools && <TableToolbar>{tools}</TableToolbar>}
        <TableContainer>
          <GridTable gridTemplateColumns={gridTemplateColumns}>
            {getHeaderGroups().map((headerGroup) => (
              <TableHead key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
      </GridPaper>
    </RoundedPaper>
  ) : (
    <NoResults title={noResultsTitle} />
  );
};
