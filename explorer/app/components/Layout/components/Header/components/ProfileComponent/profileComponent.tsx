import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../../common/context/authState";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { ProfileImage } from "./profile.styles";

export const ProfileComponent = (): JSX.Element => {
  const { isAuthorized, requestAuthorization, userProfile } =
    useContext(AuthContext);
  const profileImageURL = userProfile?.picture;
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );
  return (
    <>
      {isAuthorized ? (
        <ProfileImage profileImageURL={profileImageURL} />
      ) : desktop ? (
        <Button
          startIcon={<LoginRoundedIcon />}
          variant="nav"
          onClick={requestAuthorization}
        >
          Sign in
        </Button>
      ) : (
        <IconButton color="ink" onClick={requestAuthorization}>
          <LoginRoundedIcon />
        </IconButton>
      )}
    </>
  );
};