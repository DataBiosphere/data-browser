import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ELEMENT_ALIGNMENT } from "../../../../../../common/entities";
import { NavLinkItem } from "../../../../common/entities";
import { NavLinkMenu } from "../NavLinkMenu/navLinkMenu";

export type NavAlignment = Exclude<ELEMENT_ALIGNMENT, ELEMENT_ALIGNMENT.RIGHT>;

interface Props {
  center?: boolean;
  links: NavLinkItem[];
}

export const NavLinks = ({ center = false, links }: Props): JSX.Element => {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={{ desktopSm: "row", mobile: "column" }}
      gap={2}
      justifyContent={{
        desktopSm: center ? "center" : "flex-start",
        mobile: undefined,
      }}
      marginLeft={{ desktopSm: center ? undefined : 6, mobile: undefined }}
    >
      {links.map(({ label, menuItems, url }) =>
        menuItems ? (
          <NavLinkMenu key={label} menuItems={menuItems} menuLabel={label} />
        ) : (
          <Link key={url} href={url} passHref>
            <Button
              href="passHref"
              sx={{
                justifyContent: { desktopSm: "unset", mobile: "flex-start" },
              }}
              variant="nav"
            >
              {label}
            </Button>
          </Link>
        )
      )}
    </Box>
  );
};
