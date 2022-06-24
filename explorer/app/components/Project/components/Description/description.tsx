// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

// App dependencies
import { Section } from "../Section/section";

interface Props {
  projectDescription: string;
}

export const Description = ({ projectDescription }: Props): JSX.Element => {
  return (
    <Section title={"Description"}>
      <Typography variant="inherit">{projectDescription}</Typography>
    </Section>
  );
};
