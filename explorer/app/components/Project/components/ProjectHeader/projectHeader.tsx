// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { ProjectHeader as ProjectHero } from "./projectHeader.styles";

interface Props {
  children: ReactNode | ReactNode[];
}

export const ProjectHeader = ({ children }: Props): JSX.Element => {
  return <ProjectHero>{children}</ProjectHero>;
};
