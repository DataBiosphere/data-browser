import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { ButtonProps } from "@mui/material/Button";
import React from "react";
import { NavLinkDropdownButton as Button } from "./navLinkDropdownButton.styles";

type Props = Exclude<ButtonProps, "StartIcon">;

export const NavLinkDropdownButton = ({
  children,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <Button EndIcon={ArrowDropDownRoundedIcon} {...props}>
      {children}
    </Button>
  );
};
