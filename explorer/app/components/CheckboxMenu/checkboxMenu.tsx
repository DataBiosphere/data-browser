// Core dependencies
import { Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";

// App dependencies
import { DropdownButton } from "../common/Button/components/DropdownButton/dropdownButton";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";

// Styles
import { CheckboxMenu as Menu } from "./checkboxMenu.styles";

export interface CheckboxMenuItem {
  id: string;
  label: string;
}

interface Props {
  label: string;
  readOnly?: string[];
  onItemSelectionChange: (id: string) => void;
  options: CheckboxMenuItem[];
  selected: string[];
}

export const CheckboxMenu = ({
  label,
  onItemSelectionChange,
  options,
  readOnly = [],
  selected,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <DropdownButton onClick={onOpenMenu}>{label}</DropdownButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={onCloseMenu}
        open={open}
        PaperProps={{ variant: "menu" }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        {options.map(({ id: value, label }) => (
          <MenuItem disabled={readOnly.includes(value)} key={value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(value)}
                  checkedIcon={<CheckedIcon />}
                  disabled={readOnly.includes(value)}
                  icon={<UncheckedIcon />}
                  onChange={(): void => onItemSelectionChange(value)}
                />
              }
              label={label}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
