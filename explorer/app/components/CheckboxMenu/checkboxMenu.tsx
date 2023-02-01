import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { DropdownButton } from "../common/Button/components/DropdownButton/dropdownButton";
import { CheckedIcon } from "../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { CheckboxMenu as Menu } from "./checkboxMenu.styles";

export interface CheckboxMenuItem {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: CheckboxProps["onChange"];
  value: string;
}

interface Props {
  label: string;
  options: CheckboxMenuItem[];
}

export const CheckboxMenu = ({
  label: buttonLabel,
  options,
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
      <DropdownButton onClick={onOpenMenu}>{buttonLabel}</DropdownButton>
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
        {options.map(
          ({ checked, disabled = false, label, onChange, value }) => (
            <MenuItem disabled={disabled} key={value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    checkedIcon={<CheckedIcon />}
                    disabled={disabled}
                    icon={<UncheckedIcon />}
                    onChange={onChange}
                  />
                }
                label={label}
              />
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};
