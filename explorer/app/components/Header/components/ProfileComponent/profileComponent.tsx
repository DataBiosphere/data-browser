// Core dependencies
import LoginIcon from "@mui/icons-material/Login";
import { Button, IconButton, Theme, useMediaQuery } from "@mui/material";
import React from "react";

export const ProfileComponent = (): JSX.Element => {
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
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
