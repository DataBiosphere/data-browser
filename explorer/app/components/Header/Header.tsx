import React from "react";
import { Logo, LogoProps } from "../Logo";
import { NavLinks, NavLinksProps } from "../NavLinks";
import { ProfileComponent } from "../ProfileComponent";
import { Search } from "../Search";
import { SocialLinks, SocialLinksProps } from "../SocialLinks";

export interface HeaderProps {
  logo: LogoProps;
  navLinks: NavLinksProps;
  socialLinks: SocialLinksProps;
  navAlignment: "left" | "center";
  searchEnabled?: boolean;
  authenticationEnabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navAlignment,
  navLinks,
  authenticationEnabled,
  searchEnabled,
  socialLinks,
}: HeaderProps) => {
  return (
    //FIXME: these styles will change after we start using @Emotion
    <header style={{ display: "flex", alignItems: "center" }}>
      <Logo {...logo} />
      <NavLinks {...navLinks} />
      <SocialLinks {...socialLinks} />
      {searchEnabled && <Search />}
      {authenticationEnabled && <ProfileComponent />}
    </header>
  );
};
