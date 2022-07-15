/**
 * Basic icon button component.
 * Use IconButtonSecondary styles to render secondary icon button.
 */

// Core dependencies
import { IconButton as MIconButton, IconButtonProps } from "@mui/material";
import React, { ElementType } from "react";

interface Props extends IconButtonProps {
  className?: string;
  disabled?: boolean;
  Icon: ElementType;
}

export const IconButton = ({
  className,
  disabled = false,
  Icon,
  ...props /* Spread props to allow for IconButton specific props IconButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <MIconButton
      className={className}
      disabled={disabled}
      size="large"
      {...props}
    >
      <Icon fontSize="small" />
    </MIconButton>
  );
};
