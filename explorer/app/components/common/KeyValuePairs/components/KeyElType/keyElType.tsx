/**
 * Basic KeyValuePairs "key" wrapper component.
 */
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const KeyElType = ({ children }: Props): JSX.Element => {
  return (
    <Typography color="ink.light" variant="text-body-400-2lines">
      {children}
    </Typography>
  );
};
