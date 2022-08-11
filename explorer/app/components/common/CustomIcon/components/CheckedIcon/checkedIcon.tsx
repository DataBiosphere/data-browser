/**
 * Custom checked icon.
 */

import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

interface Props {
  fontSize?: SvgIconProps["fontSize"];
  viewBox?: string;
}

export const CheckedIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for svg icon specific props SvgIconProps e.g. "htmlColor". */
}: Props): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H14C16.2091 0 18 1.79086 18 4V14C18 16.2091 16.2091 18 14 18H4C1.79086 18 0 16.2091 0 14V4Z"
        fill="currentColor"
      />
      <path
        d="M7.84875 12.188C7.96008 12.188 8.06775 12.167 8.17175 12.125C8.27575 12.083 8.37641 12.0137 8.47375 11.917L13.0987 7.29201C13.2654 7.12535 13.3521 6.92401 13.3587 6.68801C13.3661 6.45135 13.2794 6.24268 13.0987 6.06201C12.9321 5.89535 12.7271 5.81201 12.4837 5.81201C12.2411 5.81201 12.0364 5.89535 11.8697 6.06201L7.84875 10.083L6.09875 8.33301C5.93208 8.16635 5.73408 8.07968 5.50475 8.07301C5.27608 8.06568 5.07141 8.15235 4.89075 8.33301C4.72408 8.49968 4.64075 8.70468 4.64075 8.94801C4.64075 9.19068 4.72408 9.39535 4.89075 9.56201L7.22375 11.917C7.32108 12.0137 7.42175 12.083 7.52575 12.125C7.62975 12.167 7.73741 12.188 7.84875 12.188Z"
        fill="white"
      />
    </SvgIcon>
  );
};
