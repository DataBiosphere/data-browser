import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: Props): JSX.Element => {
  return (
    <Typography className={className} component="span" variant="text-body-500">
      {children}
    </Typography>
  );
};
