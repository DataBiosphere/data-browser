import { Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Logo, LogoProps } from "../Logo/Logo";
import { NavLinks, NavLinksProps } from "../NavLinks/NavLinks";
import { ProfileComponent } from "../ProfileComponent/ProfileComponent";
import { Search } from "../Search/Search";
import { SocialLinks, SocialLinksProps } from "../SocialLinks/SocialLinks";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  LinksContainer,
  Header as StyledHeader,
  LinksContent,
  SocialLinksContainer,
  MenuButton,
  MobileContainer,
  DesktopContainer,
  MenuContainer,
  HEADER_HEIGHT,
} from "./Header.styles";
import { DrawerContent } from "./DrawerContent";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen((s) => !s);
  };

  const renderMenuContent = () => (
    <>
      {searchEnabled && (
        <MenuButton>
          <Search />
        </MenuButton>
      )}
      {authenticationEnabled && (
        <MenuButton>
          <ProfileComponent />
        </MenuButton>
      )}
    </>
  );

  return (
    <Container>
      <StyledHeader>
        <Logo {...logo} />
        <DesktopContainer>
          <LinksContainer center={navAlignment === "center"}>
            <LinksContent>
              <NavLinks {...navLinks} />
            </LinksContent>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLinks
              sx={(theme) => ({
                gap: theme.spacing(6),
                color: theme.palette.colorInkLight,
              })}
              {...socialLinks}
            />
          </SocialLinksContainer>
          <MenuContainer>{renderMenuContent()}</MenuContainer>
        </DesktopContainer>
      </StyledHeader>
      <MobileContainer>
        {renderMenuContent()}
        <MenuButton>
          <IconButton aria-label="open drawer" onClick={handleToggleDrawer}>
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </MenuButton>
      </MobileContainer>
      <Drawer
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        open={drawerOpen}
        onClose={handleToggleDrawer}
        BackdropProps={{ invisible: true }}
        disableScrollLock
        hideBackdrop
        style={{ top: `${HEADER_HEIGHT}px` }}
        PaperProps={{
          style: {
            width: "100%",
            position: "absolute",
            boxShadow: "none",
          },
        }}
      >
        <DrawerContent
          navLinks={navLinks}
          logo={logo}
          socialLinks={socialLinks}
        />
      </Drawer>
    </Container>
  );
};
