import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { ButtonProps } from "@mui/material/Button";
import React from "react";
import { NavLinkDropdownButton as Button } from "./navLinkDropdownButton.styles";

type MButtonProps = Exclude<ButtonProps, "StartIcon">;

interface Props extends MButtonProps {
  isActive: boolean;
}

export const NavLinkDropdownButton = ({
  children,
  isActive,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: Props): JSX.Element => {
  return (
    <Button EndIcon={ArrowDropDownRoundedIcon} isActive={isActive} {...props}>
      {children}
    </Button>
  );
};
