import { Box, IconButtonProps, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import React, { ElementType } from "react";
import { ANCHOR_TARGET } from "../../Links/common/entities";
import { IconName } from "../CustomIcon/common/iconSvgPathShapes";
import { CustomIcon } from "../CustomIcon/customIcon";
import { IconButtonSocials } from "../IconButton/iconButton.styles";

export const SOCIAL: Record<string, Omit<Social, "url">> = {
  DISCOURSE: { label: "Discourse", type: "discourse" },
  GITHUB: { label: "GitHub", type: "github" },
  SLACK: { label: "Slack", type: "slack" },
  TWITTER: { label: "Twitter", type: "twitter" },
  YOUTUBE: { label: "YouTube", type: "youtube" },
};

export interface Social {
  label: string;
  type: IconName;
  url: string;
}

interface Props {
  buttonSize?: IconButtonProps["size"];
  IconButtonElType?: ElementType;
  socials: Social[];
  sx?: SxProps<Theme>;
}

export const Socials = ({
  buttonSize = "medium",
  IconButtonElType = IconButtonSocials,
  socials,
  sx,
}: Props): JSX.Element => {
  return (
    <Box display="flex" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {socials.map(({ type, url }) => (
        <Link key={type} href={url} passHref>
          <IconButtonElType
            href="passHref"
            rel="noopener"
            size={buttonSize}
            target={ANCHOR_TARGET.BLANK}
          >
            <CustomIcon fontSize="small" iconName={type} />
          </IconButtonElType>
        </Link>
      ))}
    </Box>
  );
};
