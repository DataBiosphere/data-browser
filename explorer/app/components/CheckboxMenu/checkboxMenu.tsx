import React, { useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-haspopup="true"
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {label}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.id} disableRipple>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(option.id)}
                  disabled={readOnly.includes(option.id)}
                  onChange={() => onItemSelectionChange(option.id)}
                />
              }
              label={option.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
