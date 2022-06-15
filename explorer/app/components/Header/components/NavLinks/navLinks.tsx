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
      flexDirection={{ xs: "column", lg: "row" }}
      gap={2}
      justifyContent={{
        xs: undefined,
        lg: center ? "center" : "flex-start",
      }}
      marginLeft={{ xs: undefined, lg: center ? undefined : 6 }}
    >
      {links.map(({ label, url }) => (
        <Link key={url} href={url} passHref>
          <Button
            href="passHref"
            sx={{
              justifyContent: { xs: "flex-start", lg: "unset" },
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
