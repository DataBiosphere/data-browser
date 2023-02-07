import { Button, IconButton } from "@mui/material";
import React from "react";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../../../hooks/useBreakpointHelper";
import { SearchIcon } from "../../../../../common/CustomIcon/components/SearchIcon/searchIcon";

export const Search = (): JSX.Element => {
  const smDesktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP_SM
  );
  return (
    <>
      {smDesktop ? (
        <Button startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      ) : (
        <IconButton color="ink">
          <SearchIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
};
