// Core dependencies
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Checkbox, FormControlLabel, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

// Styles
import { ButtonSecondary } from "../common/Button/button.styles";

export interface CheckboxMenuItem {
  id: string;
  label: string;
}

interface CheckboxMenuProps {
  options: CheckboxMenuItem[];
  selected: string[];
  readOnly?: string[];
  onItemSelectionChange: (id: string) => void;
  label: string;
}

export const CheckboxMenu = ({
  onItemSelectionChange,
  options,
  selected,
  label,
  readOnly = [],
}: CheckboxMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonSecondary
        aria-haspopup="true"
        dropdownIcon
        EndIcon={ArrowDropDownRoundedIcon}
        id="menu-button"
        onClick={handleClick}
      >
        {label}
      </ButtonSecondary>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.id} disableRipple>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(option.id)}
                  disabled={readOnly.includes(option.id)}
                  onChange={(): void => onItemSelectionChange(option.id)}
                />
              }
              label={option.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
