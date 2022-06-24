// Core dependencies
import LoginIcon from "@mui/icons-material/Login";
import { Button, IconButton } from "@mui/material";
import React from "react";

// App dependencies
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";

export const ProfileComponent = (): JSX.Element => {
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );
  return (
    <>
      {desktop ? (
        <Button startIcon={<LoginIcon />} variant="nav">
          Sign in
        </Button>
      ) : (
        <IconButton color="ink">
          <LoginIcon />
        </IconButton>
      )}
    </>
  );
};
