// Core dependencies
import { Typography } from "@mui/material";
import React from "react";

// App dependencies
import { SectionContent } from "../Section/components/SectionContent/sectionContent";
import { Section } from "../Section/section";

interface Props {
  projectDescription: string;
}

export const Description = ({ projectDescription }: Props): JSX.Element => {
  return (
    <Section title={"Description"}>
      <SectionContent gap={4}>
        <Typography variant="inherit">{projectDescription}</Typography>
      </SectionContent>
    </Section>
  );
};
