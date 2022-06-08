import { Box, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Discourse, GitHub, Slack, Twitter, YouTube } from "./icons";
import { Hyperlink } from "./SocialLinks.styles";

export type SocialType =
  | "twitter"
  | "github"
  | "youtube"
  | "slack"
  | "discourse";

interface SocialLinkItem {
  type: SocialType;
  url: string;
}

export interface SocialLinksProps {
  links: SocialLinkItem[];
  sx?: SxProps<Theme>;
}

const ICONS: { [K in SocialType]: React.ReactNode } = {
  github: <GitHub />,
  slack: <Slack />,
  twitter: <Twitter />,
  youtube: <YouTube />,
  discourse: <Discourse />,
};

export const SocialLinks = ({ links, sx }: SocialLinksProps): JSX.Element => {
  return (
    <Box
      sx={[
        { display: "flex", alignItems: "center" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {links.map((link) => (
        <Link key={link.type} href={link.url}>
          <Hyperlink>{ICONS[link.type]}</Hyperlink>
        </Link>
      ))}
    </Box>
  );
};
