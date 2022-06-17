/**
 * Hook utilising Mui's breakpoint helper (media query hook).
 * https://mui.com/material-ui/react-use-media-query/#using-muis-breakpoint-helpers
 */

// Core dependencies
import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

type BreakpointFnName = "up" | "down";
type BreakpointKey = Breakpoint | number;

export const useBreakpointHelper = (
  fnName: BreakpointFnName,
  breakpointKey: BreakpointKey
): boolean => {
  return useMediaQuery((theme: Theme) =>
    theme.breakpoints[fnName](breakpointKey)
  );
};
