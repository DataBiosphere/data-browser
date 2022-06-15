// Core dependencies
import {
  Box,
  IconButton,
  IconButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import Link from "next/link";
import React from "react";

// App dependencies
import { IconName } from "../CustomIcon/common/iconSvgPathShapes";
import { CustomIcon } from "../CustomIcon/customIcon";

interface SocialLinkItem {
  type: IconName;
  url: string;
}

export interface SocialLinksProps {
  buttonColor?: IconButtonProps["color"];
  buttonSize?: IconButtonProps["size"];
  links: SocialLinkItem[];
  sx?: SxProps<Theme>;
}

export const SocialLinks = ({
  buttonColor = "default",
  buttonSize = "medium",
  links,
  sx,
}: SocialLinksProps): JSX.Element => {
  return (
    <Box display="flex" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {links.map(({ type, url }) => (
        <Link key={type} href={url} passHref>
          <IconButton color={buttonColor} href="passHref" size={buttonSize}>
            <CustomIcon fontSize="small" iconName={type} />
          </IconButton>
        </Link>
      ))}
    </Box>
  );
};
