/**
 * Basic button component.
 * ButtonSecondary styles renders secondary button.
 */

// Core dependencies
import { Button as MButton } from "@mui/material";
import React from "react";

// App dependencies
import { Button as ButtonProps } from "./common/entities";

type Props = ButtonProps;

export const Button = ({
  children,
  disabled = false,
  EndIcon,
  StartIcon,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <MButton
      disabled={disabled}
      endIcon={EndIcon ? <EndIcon fontSize="small" /> : undefined}
      startIcon={StartIcon ? <StartIcon fontSize="small" /> : undefined}
      {...props}
    >
      {children}
    </MButton>
  );
};
