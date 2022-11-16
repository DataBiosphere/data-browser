import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { MouseEvent, ReactNode, useState } from "react";
import { NavLinkDropdownButton } from "../../../../../common/Button/components/NavLinkDropdownButton/navLinkDropdownButton";
import { NavLinkMenu as Menu } from "./navLinkMenu.styles";

export interface MenuItem {
  icon?: ReactNode;
  label: string;
  url: string;
}

interface Props {
  menuItems: MenuItem[];
  menuLabel: string;
}

export const NavLinkMenu = ({ menuItems, menuLabel }: Props): JSX.Element => {
  const router = useRouter();
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
      <NavLinkDropdownButton isActive={open} onClick={onOpenMenu}>
        {menuLabel}
      </NavLinkDropdownButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoFocus={false}
        onClose={onCloseMenu}
        open={open}
        PaperProps={{ variant: "menu" }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
      >
        {menuItems.map(({ icon, label, url }) => (
          <MenuItem
            key={label}
            onClick={(): void => {
              setAnchorEl(null);
              router.push(url);
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primaryTypographyProps={{ variant: "text-body-400" }}>
              {label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
