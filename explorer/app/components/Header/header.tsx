// Core dependencies
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

// App dependencies
import { ELEMENT_ALIGNMENT } from "../../common/entities";
import { Logo, LogoProps } from "./components/Logo/logo";
import {
  NavAlignment,
  NavLinks,
  NavLinksProps,
} from "./components/NavLinks/navLinks";
import { ProfileComponent } from "./components/ProfileComponent/profileComponent";
import { Search } from "./components/Search/search";
import {
  SocialLinks,
  SocialLinksProps,
} from "../common/SocialLinks/socialLinks";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../hooks/useBreakpointHelper";

// Template variables
export const HEADER_HEIGHT = 56;

export interface HeaderProps {
  authenticationEnabled?: boolean;
  logo: LogoProps;
  navAlignment: NavAlignment;
  navLinks: NavLinksProps;
  searchEnabled?: boolean;
  slogan?: string;
  socialLinks: SocialLinksProps;
}

export const Header = ({
  authenticationEnabled,
  logo,
  navAlignment,
  navLinks,
  searchEnabled,
  slogan,
  socialLinks,
}: HeaderProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );
  const HeaderContent = desktop ? Fragment : Drawer;
  const HeaderContentContainer = desktop ? Fragment : Box;
  const contentProps = desktop
    ? {}
    : {
        hideBackdrop: true,
        ModalProps: { sx: { top: `${HEADER_HEIGHT}px` } },
        onClose: () => setDrawerOpen(false),
        open: drawerOpen,
        PaperProps: {
          elevation: 0,
          sx: { marginTop: HEADER_HEIGHT / 4, width: "100%" },
        },
      };
  const contentContainerProps = desktop
    ? {}
    : { sx: { display: "grid", gap: 2, py: 4 } };

  // Set drawer open state to false on change of media breakpoint from mobile to desktop.
  useEffect(() => {
    if (desktop) {
      setDrawerOpen(false);
    }
  }, [desktop]);

  return (
    <AppBar sx={{ borderBottom: 1, borderColor: "smoke" }}>
      <Toolbar sx={{ gap: 4, height: HEADER_HEIGHT }} variant="dense">
        {/* Logo */}
        <Logo {...logo} />
        <HeaderContent {...contentProps}>
          <HeaderContentContainer {...contentContainerProps}>
            {/* Slogan divider */}
            {slogan && desktop && (
              <Divider
                orientation="vertical"
                sx={{ borderColor: "smoke", maxHeight: 32 }}
              />
            )}
            {/* Slogan */}
            {slogan && (
              <Typography
                component="div"
                color="ink"
                sx={
                  desktop
                    ? { fontSize: 12, lineHeight: "18px", maxWidth: 180 }
                    : { px: 6, py: 2 }
                }
                variant={desktop ? undefined : "text-body-400"}
              >
                {slogan}
              </Typography>
            )}
            {/* Nav links */}
            <NavLinks
              center={navAlignment === ELEMENT_ALIGNMENT.CENTER}
              links={navLinks.links}
            />
            {/* Socials */}
            <SocialLinks
              buttonColor="inkLight"
              buttonSize={desktop ? "small" : "xlarge"}
              sx={{
                gap: desktop ? 2 : 4,
                px: desktop ? undefined : 4,
                py: desktop ? undefined : 2,
              }}
              {...socialLinks}
            />
          </HeaderContentContainer>
        </HeaderContent>
        {/* Actions */}
        {(searchEnabled || authenticationEnabled || !desktop) && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: { mobile: 1, desktop: "none" },
              gap: { mobile: 3, desktop: 2 },
              justifyContent: "flex-end",
            }}
          >
            {/* Search */}
            {searchEnabled && <Search />}
            {/* Login */}
            {authenticationEnabled && <ProfileComponent />}
            {/* Menu */}
            {!desktop && (
              <IconButton
                aria-label="drawer"
                color="ink"
                onClick={() => setDrawerOpen((open) => !open)}
              >
                {drawerOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
