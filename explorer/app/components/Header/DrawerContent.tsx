import { Typography } from "@mui/material";
import React from "react";
import { LogoProps } from "../Logo/Logo";
import { NavLinksProps, NavLinks } from "../NavLinks/NavLinks";
import { SocialLinksProps, SocialLinks } from "../SocialLinks/SocialLinks";
import { DrawerContainer } from "./Header.styles";

interface DrawerContentProps {
  logo: LogoProps;
  navLinks: NavLinksProps;
  socialLinks: SocialLinksProps;
}

export const DrawerContent = ({
  logo,
  navLinks,
  socialLinks,
}: DrawerContentProps): JSX.Element => {
  return (
    <DrawerContainer>
      {logo.slogan && (
        <Typography
          variant="text-body-400"
          component="div"
          color={(theme) => theme.palette.colorInk}
          pb={2}
          px={6}
        >
          {logo.slogan}
        </Typography>
      )}
      <NavLinks {...navLinks} />
      <SocialLinks
        {...socialLinks}
        sx={(theme) => ({
          gap: theme.spacing(10),
          px: theme.spacing(7),
          color: theme.palette.colorInkLight,
        })}
      />
    </DrawerContainer>
  );
};
