/**
 * Basic KeyValuePairs "key" wrapper component.
 */
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const KeyElType = ({
  children,
  ...props /* Spread props to allow for Typography specific prop overrides e.g. "variant". */
}: Props): JSX.Element => {
  return (
    <Typography color="ink.light" variant="text-body-400-2lines" {...props}>
      {children}
    </Typography>
  );
};
