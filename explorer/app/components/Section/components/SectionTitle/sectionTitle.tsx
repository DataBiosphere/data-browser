// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title?: string;
}

export const SectionTitle = ({ title }: Props): JSX.Element => {
  return (
    <>
      {title && (
        <Typography
          color="ink"
          component="h3"
          fontWeight={600}
          variant="text-body-large-500"
        >
          {title}
        </Typography>
      )}
    </>
  );
};
