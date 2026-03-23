import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "@databiosphere/findable-ui/lib/common/entities";
import { COLUMN_DEFS } from "./constants";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: COLUMN_DEFS,
  enableColumnFilters: false,
  enableExpanding: false,
  enableGlobalFilter: false,
  getRowCanExpand: () => false,
  getRowId: (row) => row.name,
  initialState: {
    columnVisibility: { classKey: false },
    grouping: ["classKey"],
  },
};
