import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "@databiosphere/findable-ui/lib/common/entities";
import { COLUMN_DEFS } from "./constants";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: COLUMN_DEFS,
  enableColumnFilters: false,
  enableGlobalFilter: false,
  initialState: {
    columnVisibility: { classKey: false },
    expanded: true,
    grouping: ["classKey"],
  },
};
