import { Typography } from "@mui/material";
import React from "react";
import { Description as ProjectDescription } from "../../common/entities";
import { Section } from "../Section/section";

interface Props {
  projectDescription: ProjectDescription;
}

export const Description = ({ projectDescription }: Props): JSX.Element => {
  return (
    <Section title={"Description"}>
      <Typography>{projectDescription}</Typography>
    </Section>
  );
};
