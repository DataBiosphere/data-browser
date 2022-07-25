// Core dependencies
import { CloseRounded } from "@mui/icons-material";
import { Drawer, PaperProps } from "@mui/material";
import React, { ReactNode, useEffect } from "react";

// App dependencies
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";

// Styles
import { CloseDrawerIconButton } from "../../../common/IconButton/iconButton.styles";
import { Sidebar as PermanentSidebar } from "./sidebar.styles";

interface Props {
  children: ReactNode | ReactNode[];
  drawerOpen?: boolean;
  Label?: ReactNode;
  onDrawerClose?: () => void;
}

export const Sidebar = ({
  children,
  drawerOpen,
  Label,
  onDrawerClose,
}: Props): JSX.Element => {
  const tablet = useBreakpointHelper(
    BREAKPOINT_FN_NAME.DOWN,
    BREAKPOINT.DESKTOP
  );
  const controlledSidebar = typeof drawerOpen === "boolean";
  const drawerSidebar = controlledSidebar && tablet; // Sidebar is "temporary" drawer when drawerOpen is defined and breakpoint is "tablet" or smaller.
  const Bar = drawerSidebar ? Drawer : PermanentSidebar;
  const barProps = drawerSidebar
    ? {
        PaperProps: {
          elevation: 0,
          variant: "sidebar" as PaperProps["variant"],
        },
        onClose: onDrawerClose,
        open: drawerOpen,
      }
    : {};

  // Closes an open, controlled drawer sidebar with a change of breakpoint to "desktop".
  useEffect(() => {
    if (drawerOpen && !tablet) {
      onDrawerClose && onDrawerClose();
    }
  }, [drawerOpen, tablet, onDrawerClose]);

  return (
    <Bar {...barProps}>
      {drawerOpen && tablet && (
        <CloseDrawerIconButton
          Icon={CloseRounded}
          onClick={onDrawerClose}
          size="medium" // overrides size specification of IconButton component via destructured props
        />
      )}
      {Label}
      {children}
    </Bar>
  );
};
