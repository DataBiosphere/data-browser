// Core dependencies
import React from "react";

// App dependencies
import { Typography } from "@mui/material";

interface Props {
  projectTitle: string;
}

export const ProjectTitle = ({ projectTitle }: Props): JSX.Element => {
  return (
    <Typography component="h1" variant="text-heading-large">
      {projectTitle}
    </Typography>
  );
};
