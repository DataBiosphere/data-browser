/**
 * An extension of the basic Mui Paper component with custom variants e.g. "panel".
 */

// Core dependencies
import { Paper as Panel, PaperProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: PaperProps["variant"];
}

export const Paper = ({
  children,
  className,
  variant = "panel",
}: Props): JSX.Element => {
  return (
    <Panel className={className} variant={variant}>
      {children}
    </Panel>
  );
};
