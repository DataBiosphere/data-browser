import Link from "next/link";
import React from "react";

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
}

const ICONS: { [K in SocialType]: string } = {
  github: "G",
  slack: "S",
  twitter: "T",
  youtube: "Y",
  discourse: "D",
};

export const SocialLinks = ({ links }: SocialLinksProps): JSX.Element => {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.type} href={link.url}>
          <a>{ICONS[link.type]}</a>
        </Link>
      ))}
    </div>
  );
};
