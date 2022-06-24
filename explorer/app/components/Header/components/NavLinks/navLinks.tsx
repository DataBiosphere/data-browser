// Core dependencies
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";

export type NavAlignment = Exclude<ELEMENT_ALIGNMENT, ELEMENT_ALIGNMENT.RIGHT>;

export interface NavLinkItem {
  label: string;
  url: string;
}

export interface NavLinksProps {
  center?: boolean;
  links: NavLinkItem[];
}

export const NavLinks = ({
  center = false,
  links,
}: NavLinksProps): JSX.Element => {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={{ mobile: "column", desktop: "row" }}
      gap={2}
      justifyContent={{
        mobile: undefined,
        desktop: center ? "center" : "flex-start",
      }}
      marginLeft={{ mobile: undefined, desktop: center ? undefined : 6 }}
    >
      {links.map(({ label, url }) => (
        <Link key={url} href={url} passHref>
          <Button
            href="passHref"
            sx={{
              justifyContent: { mobile: "flex-start", desktop: "unset" },
            }}
            variant="nav"
          >
            {label}
          </Button>
        </Link>
      ))}
    </Box>
  );
};
