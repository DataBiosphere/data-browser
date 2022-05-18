import Link from "next/link";
import React from "react";

export type SocialType = "twitter" | "github" | "youtube" | "slack";

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
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
}: SocialLinksProps) => {
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
