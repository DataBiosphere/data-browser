// Core dependencies
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, Theme, useMediaQuery } from "@mui/material";
import React from "react";

export const Search = (): JSX.Element => {
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  return (
    <>
      {desktop ? (
        <Button startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      ) : (
        <IconButton color="ink">
          <SearchIcon />
        </IconButton>
      )}
    </>
  );
};
