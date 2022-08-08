// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  className?: string;
  title: string;
}

export const SectionTitle = ({ className, title }: Props): JSX.Element => {
  return (
    <Typography
      className={className}
      color="ink"
      component="h3"
      variant="text-body-large-500"
    >
      {title}
    </Typography>
  );
};
