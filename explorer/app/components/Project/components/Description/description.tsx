import { Typography } from "@mui/material";
import React from "react";
import { CollapsableSection } from "../../../Detail/components/Section/components/CollapsableSection/collapsableSection";
import { Description as ProjectDescription } from "../../common/entities";

interface Props {
  projectDescription: ProjectDescription;
}

export const Description = ({ projectDescription }: Props): JSX.Element => {
  return (
    <CollapsableSection title={"Description"}>
      <Typography>{projectDescription}</Typography>
    </CollapsableSection>
  );
};
