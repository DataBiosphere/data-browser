import { Checkbox, ListItemButton, ListItemText } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import { DropdownButton } from "../../../common/Button/components/DropdownButton/dropdownButton";
import { CheckedIcon } from "../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { CheckboxMenu as Menu, ResetButton } from "./checkboxMenu.styles";

type MenuListItemOnChangeFn = (event: unknown) => void; // see React Table VisibilityColumn "getToggleVisibilityHandler".
type onResetFn = () => void; // see React Table VisibilityInstance "resetColumnVisibility".

export interface CheckboxMenuListItem {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: MenuListItemOnChangeFn;
  value: string;
}

interface Props {
  label: string;
  onReset: onResetFn;
  options: CheckboxMenuListItem[];
}

export const CheckboxMenu = ({
  label: buttonLabel,
  onReset,
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
            <ListItemButton
              disabled={disabled}
              key={value}
              onClick={onChange}
              role={undefined}
            >
              <Checkbox
                checked={checked}
                checkedIcon={<CheckedIcon />}
                disabled={disabled}
                icon={<UncheckedIcon />}
              />
              <ListItemText disableTypography primary={<span>{label}</span>} />
            </ListItemButton>
          )
        )}
        <ResetButton onClick={onReset}>
          <ListItemText disableTypography primary={"Reset"} />
        </ResetButton>
      </Menu>
    </>
  );
};
