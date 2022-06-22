/**
 * An extension of the basic Mui Stack component with available Stack props.
 * Stack gutters may also be achieved between rows/columns by using the gap css property.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/gap.
 */

// Core dependencies
import { Stack as Stacker, StackProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  direction?: StackProps["direction"];
  divider?: StackProps["divider"];
  gap?: number;
  spacing?: number;
}

export const Stack = ({
  children,
  direction = "column",
  divider = undefined,
  gap = 0,
  spacing = 0,
}: Props): JSX.Element => {
  return (
    <Stacker
      direction={direction}
      divider={divider}
      gap={gap}
      spacing={spacing}
    >
      {children}
    </Stacker>
  );
};