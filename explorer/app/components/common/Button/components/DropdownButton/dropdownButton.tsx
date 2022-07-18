// Core dependencies
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";

// App dependencies
import { Button as ButtonProps } from "../../common/entities";

// Styles
import { DropdownButton as Button } from "./dropdownButton.styles";

type Props = Exclude<ButtonProps, "StartIcon">;

export const DropdownButton = ({
  children,
  disabled = false,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <Button disabled={disabled} EndIcon={ArrowDropDownRoundedIcon} {...props}>
      {children}
    </Button>
  );
};
