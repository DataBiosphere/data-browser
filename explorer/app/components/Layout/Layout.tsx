import { Box } from "@mui/material";
import React from "react";

interface LayoutProps {
  mainColumn: React.ReactNode;
  sideColumn: React.ReactNode;
}

export const Layout = ({
  mainColumn,
  sideColumn,
}: LayoutProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      gap={(theme) => theme.spacing(4)}
    >
      <Box width="100%">{mainColumn}</Box>
      <Box width={350} display="flex">
        {sideColumn}
      </Box>
    </Box>
  );
};
