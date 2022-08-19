import {
  FluidPaper,
  GridPaper,
} from "app/components/common/Paper/paper.styles";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Sections = ({ children, className }: Props): JSX.Element => {
  return (
    <FluidPaper className={className}>
      <GridPaper>{children}</GridPaper>
    </FluidPaper>
  );
};
