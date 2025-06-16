import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "@databiosphere/findable-ui/lib/common/entities";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "columns" | "data" | "getCoreRowModel"
> = {
  initialState: {
    columnVisibility: { classKey: false },
    expanded: true,
    grouping: ["classKey"],
  },
};
