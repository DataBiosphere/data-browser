import { Grid2Props } from "@mui/material";

export const GRID_PROPS: Record<
  string,
  Partial<Omit<Grid2Props, "component">>
> = {
  COLUMN: { container: true, direction: "column" },
};
