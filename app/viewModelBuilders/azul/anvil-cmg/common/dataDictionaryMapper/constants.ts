import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";
import { Attribute } from "@databiosphere/findable-ui/lib/common/entities";
import { ColumnDef, CellContext } from "@tanstack/react-table";

export const COLUMN_DEFS: ColumnDef<Attribute>[] = [
  {
    accessorKey: "classKey",
    enableColumnFilter: false,
    header: "Class Key",
    id: "classKey",
  },
  {
    accessorKey: "title",
    enableColumnFilter: false,
    header: "Title",
    meta: {
      width: {
        max: "1fr",
        min: "200px",
      },
    },
  },
  {
    accessorKey: "description",
    cell: (cellContext) =>
      MarkdownCell(cellContext as CellContext<Attribute, string>),
    enableColumnFilter: false,
    header: "Description",
    meta: {
      width: {
        max: "2fr",
        min: "480px",
      },
    },
  },
  {
    accessorKey: "name",
    enableColumnFilter: false,
    header: "Name",
    meta: {
      width: {
        max: "1fr",
        min: "180px",
      },
    },
  },
];
