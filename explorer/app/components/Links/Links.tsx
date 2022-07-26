import { Box } from "@mui/material";
import React from "react";
import { Item } from "./Item";

interface LinksProps {
  enumerate?: boolean;
  links: { label: string; url: string }[];
  showCopyButton?: boolean;
}

export const Links = ({
  enumerate,
  links,
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
