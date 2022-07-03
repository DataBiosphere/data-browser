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
import { ANCHOR_TARGET } from "../../Links/components/Link/link";

export interface Social {
  type: IconName;
  url: string;
}

interface Props {
  buttonColor?: IconButtonProps["color"];
  buttonSize?: IconButtonProps["size"];
  socials: Social[];
  sx?: SxProps<Theme>;
}

export const Socials = ({
  buttonColor = "default",
  buttonSize = "medium",
  socials,
  sx,
}: Props): JSX.Element => {
  return (
    <Box display="flex" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {socials.map(({ type, url }) => (
        <Link key={type} href={url} passHref>
          <IconButton
            color={buttonColor}
            href="passHref"
            rel="noopener"
            size={buttonSize}
            target={ANCHOR_TARGET.BLANK}
          >
            <CustomIcon fontSize="small" iconName={type} />
          </IconButton>
        </Link>
      ))}
    </Box>
  );
};
