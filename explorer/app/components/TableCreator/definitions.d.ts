import { RowData } from "@tanstack/react-table";
import { GridTrackSize } from "../../config/common/entities";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO revisit no unused variables
  interface ColumnMeta<TData extends RowData, TValue> {
    width: GridTrackSize;
  }
}
