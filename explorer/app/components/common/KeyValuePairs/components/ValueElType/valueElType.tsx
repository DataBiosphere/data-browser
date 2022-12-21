/**
 * Basic KeyValuePairs "value" wrapper component.
 */
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ValueElType = ({
  children,
  ...props /* Spread props to allow for Typography specific prop overrides e.g. "variant". */
}: Props): JSX.Element => {
  return (
    <Typography variant="text-body-400-2lines" {...props}>
      {children}
    </Typography>
  );
};
