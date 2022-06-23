// Core dependencies
import React, { ReactNode } from "react";

// Styles
import { SectionContent as Content } from "./sectionContent.styles";

interface Props {
  children: ReactNode | ReactNode[];
  gap?: number;
}

export const SectionContent = ({ children, gap = 0 }: Props): JSX.Element => {
  return (
    <Content gap={gap} variant="text-body-400-2lines">
      {children}
    </Content>
  );
};
