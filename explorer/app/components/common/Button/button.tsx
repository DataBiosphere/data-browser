/**
 * Basic button component.
 * ButtonSecondary styles renders secondary button.
 */

// Core dependencies
import { ButtonProps, Button as MButton } from "@mui/material";
import React, { ElementType, ReactNode } from "react";

interface Props extends ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  dropdownIcon?: boolean;
  EndIcon?: ElementType;
  StartIcon?: ElementType;
}

export const Button = ({
  children,
  className,
  disabled = false,
  dropdownIcon = false,
  EndIcon,
  StartIcon,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <MButton
      className={className}
      disabled={disabled}
      endIcon={
        EndIcon ? (
          <EndIcon
            fontSize="small"
            sx={{ marginLeft: dropdownIcon ? "-6px" : undefined }}
          />
        ) : undefined
      }
      startIcon={StartIcon ? <StartIcon fontSize="small" /> : undefined}
      {...props}
    >
      {children}
    </MButton>
  );
};
