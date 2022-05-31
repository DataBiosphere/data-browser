import React from "react";
import { Logo, LogoProps } from "../Logo/Logo";
import { NavLinks, NavLinksProps } from "../NavLinks/NavLinks";
import { ProfileComponent } from "../ProfileComponent/ProfileComponent";
import { Search } from "../Search/Search";
import { SocialLinks, SocialLinksProps } from "../SocialLinks/SocialLinks";

export interface HeaderProps {
  logo: LogoProps;
  navLinks: NavLinksProps;
  socialLinks: SocialLinksProps;
  navAlignment: "left" | "center";
  searchEnabled?: boolean;
  authenticationEnabled?: boolean;
}

export const Header = ({
  logo,
  navAlignment,
  navLinks,
  authenticationEnabled,
  searchEnabled,
  socialLinks,
}: HeaderProps): JSX.Element => {
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
