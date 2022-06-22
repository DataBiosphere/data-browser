// Core dependencies
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  mainColumn: ReactNode;
  sideColumn: ReactNode;
  top: ReactNode;
}

export const Layout = ({ mainColumn, sideColumn, top }: Props): JSX.Element => {
  return (
    <Box color="ink" display="grid" gap={4} mx="auto" maxWidth={1232}>
      {top}
      <Box display="grid" gap={4} gridAutoFlow="column">
        {mainColumn}
        {sideColumn}
      </Box>
    </Box>
  );
};
