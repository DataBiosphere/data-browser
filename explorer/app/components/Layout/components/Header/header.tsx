import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ELEMENT_ALIGNMENT } from "../../../../common/entities";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { Socials } from "../../../common/Socials/socials";
import { Header as HeaderProps } from "../../common/entities";
import { getHeaderNavigationLinks } from "./common/utils";
import { Content } from "./components/Content/content";
import { Logo } from "./components/Logo/logo";
import { NavLinks } from "./components/NavLinks/navLinks";
import { ProfileComponent } from "./components/ProfileComponent/profileComponent";
import { Search } from "./components/Search/search";
import { Header as AppBar } from "./header.styles";

// Template variables
export const HEADER_HEIGHT = 56;

interface Props {
  header: HeaderProps;
}

export const Header = ({ header }: Props): JSX.Element => {
  const {
    authenticationEnabled,
    logo,
    navAlignment,
    navLinks,
    searchEnabled,
    slogan,
    socials,
  } = header;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const smDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP_SM
  );
  const onlySmDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.ONLY,
    BREAKPOINT.DESKTOP_SM
  );

  // Set drawer open state to false on change of media breakpoint from mobile to "small desktop".
  useEffect(() => {
    if (smDesktop) {
      setDrawerOpen(false);
    }
  }, [smDesktop]);

  return (
    <AppBar elevation={1} position="fixed">
      <Toolbar sx={{ gap: 4, height: HEADER_HEIGHT }} variant="dense">
        {/* Logo */}
        <Logo logo={logo} />
        <Content
          desktopSm={smDesktop}
          drawerOpen={drawerOpen}
          onDrawerClose={(): void => setDrawerOpen(false)}
        >
          {/* Slogan divider */}
          {slogan && smDesktop && (
            <Divider orientation="vertical" sx={{ maxHeight: 32 }} />
          )}
          {/* Slogan */}
          {slogan && (
            <Typography
              component="div"
              sx={
                smDesktop
                  ? { fontSize: 12, lineHeight: "18px", maxWidth: 180 }
                  : { px: 6, py: 2 }
              }
              variant={smDesktop ? undefined : "text-body-400"}
            >
              {slogan}
            </Typography>
          )}
          {/* Nav links */}
          <NavLinks
            center={navAlignment === ELEMENT_ALIGNMENT.CENTER}
            links={getHeaderNavigationLinks(navLinks, socials, onlySmDesktop)}
          />
          {/* Socials */}
          {!onlySmDesktop && (
            <Socials
              buttonSize={smDesktop ? "small" : "xlarge"}
              socials={socials}
              sx={{
                gap: smDesktop ? 2 : 4,
                px: smDesktop ? undefined : 4,
                py: smDesktop ? undefined : 2,
              }}
            />
          )}
        </Content>
        {/* Actions */}
        {(searchEnabled || authenticationEnabled || !smDesktop) && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flex: { desktopSm: "none", mobile: 1 },
              gap: { desktopSm: 2, mobile: 3 },
              justifyContent: "flex-end",
            }}
          >
            {/* Search */}
            {searchEnabled && <Search />}
            {/* LoginView */}
            {authenticationEnabled && <ProfileComponent />}
            {/* Menu */}
            {!smDesktop && (
              <IconButton
                aria-label="drawer"
                color="ink"
                onClick={(): void => setDrawerOpen((open) => !open)}
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
