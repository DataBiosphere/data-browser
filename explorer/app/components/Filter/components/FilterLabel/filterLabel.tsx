// Core dependencies
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";

// Styles
import { FilterLabel as Label } from "./filterLabel.styles";

interface Props {
  count?: number;
  disabled: boolean;
  label: string;
}

export const FilterLabel = ({
  count,
  disabled,
  label,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  const filterLabel = count ? `${label} (${count})` : label;
  return (
    <Label
      color="inherit"
      disabled={disabled}
      endIcon={<ArrowDropDownRoundedIcon fontSize="small" />}
      fullWidth
      {...props}
    >
      {filterLabel}
    </Label>
  );
};
