import { GridProps } from "@mui/material";

export const GRID_PROPS: Record<
  string,
  Partial<Omit<GridProps, "component">>
> = {
  COLUMN: { container: true, direction: "column" },
};
