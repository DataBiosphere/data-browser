// Core dependencies
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

// App dependencies
import { NavLinkItem } from "../../../../common/entities";
import { ELEMENT_ALIGNMENT } from "../../../../../../common/entities";

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
      flexDirection={{ desktop: "row", mobile: "column" }}
      gap={2}
      justifyContent={{
        desktop: center ? "center" : "flex-start",
        mobile: undefined,
      }}
      marginLeft={{ desktop: center ? undefined : 6, mobile: undefined }}
    >
      {links.map(({ label, url }) => (
        <Link key={url} href={url} passHref>
          <Button
            href="passHref"
            sx={{
              justifyContent: { desktop: "unset", mobile: "flex-start" },
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
