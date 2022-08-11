/**
 * Custom unchecked icon.
 */

import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

interface Props {
  fontSize?: SvgIconProps["fontSize"];
  viewBox?: string;
}

export const UncheckedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for svg icon specific props SvgIconProps e.g. "htmlColor". */
}: Props): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <rect
        fill="white"
        height="17"
        rx="3.5"
        stroke="currentColor"
        width="17"
        x="0.5"
        y="0.5"
      />
    </SvgIcon>
  );
};
