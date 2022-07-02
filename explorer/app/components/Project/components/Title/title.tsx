// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

// App dependencies
import { ProjectTitle } from "../../common/entities";

interface Props {
  title: ProjectTitle;
}

export const Title = ({ title }: Props): JSX.Element => {
  return (
    <Typography component="h1" variant="text-heading-large">
      {title}
    </Typography>
  );
};
