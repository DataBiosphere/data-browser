/**
 * Basic button component.
 * ButtonSecondary styles renders secondary button.
 */

// Core dependencies
import { Button as MButton } from "@mui/material";
import React, { forwardRef } from "react";

// App dependencies
import { Button as ButtonProps } from "./common/entities";

type Props = ButtonProps;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    disabled = false,
    EndIcon,
    StartIcon,
    ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
  }: Props,
  ref
): JSX.Element {
  return (
    <MButton
      disabled={disabled}
      endIcon={EndIcon ? <EndIcon fontSize="small" /> : undefined}
      ref={ref}
      startIcon={StartIcon ? <StartIcon fontSize="small" /> : undefined}
      {...props}
    >
      {children}
    </MButton>
  );
});
