// Core dependencies
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export const Main = ({ children }: Props): JSX.Element => {
  return (
    <Box component="main" flex={1}>
      {children}
    </Box>
  );
};
