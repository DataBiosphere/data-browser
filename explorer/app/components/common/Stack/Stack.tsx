/**
 * An extension of the basic Mui Stack component with available Stack props.
 * Stack gutters may also be achieved between rows/columns by using the gap css property.
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/gap.
 */

// Core dependencies
import { Stack as Stacker, StackProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  alignItems?: StackProps["alignItems"];
  children: ReactNode | ReactNode[];
  className?: string;
  direction?: StackProps["direction"];
  divider?: StackProps["divider"];
  gap?: number;
  justifyContent?: StackProps["justifyContent"];
  spacing?: number;
}

export const Stack = ({
  children,
  className,
  direction = "column",
  divider = undefined,
  justifyContent,
  alignItems,
  gap = 0,
  spacing = 0,
}: Props): JSX.Element => {
  return (
    <Stacker
      className={className}
      direction={direction}
      divider={divider}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      spacing={spacing}
    >
      {children}
    </Stacker>
  );
};
