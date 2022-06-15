import { Box } from "@mui/material";
import React from "react";
import { Item } from "./Item";

interface LinksProps {
  links: { url: string; label: string }[];
  showCopyButton?: boolean;
  enumerate?: boolean;
}

export const Links = ({
  links,
  enumerate,
  showCopyButton,
}: LinksProps): JSX.Element => {
  return (
    <Box>
      {links.map((link, index) => {
        return (
          <Item
            key={link.url}
            link={link}
            number={enumerate ? index + 1 : undefined}
            showCopyButton={showCopyButton}
          />
        );
      })}
    </Box>
  );
};
