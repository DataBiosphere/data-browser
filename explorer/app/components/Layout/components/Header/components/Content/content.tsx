import { Box, Drawer } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import { HEADER_HEIGHT } from "../../header";

interface Props {
  children: ReactNode | ReactNode[];
  desktopSm: boolean;
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

export const Content = ({
  children,
  desktopSm,
  drawerOpen,
  onDrawerClose,
}: Props): JSX.Element => {
  const HeaderContent = desktopSm ? Fragment : Drawer;
  const HeaderContentContainer = desktopSm ? Fragment : Box;
  const contentProps = desktopSm
    ? {}
    : {
        ModalProps: { sx: { top: `${HEADER_HEIGHT}px` } },
        PaperProps: {
          elevation: 0,
          sx: { marginTop: HEADER_HEIGHT / 4, width: "100%" },
        },
        hideBackdrop: true,
        onClose: onDrawerClose,
        open: drawerOpen,
      };
  const contentContainerProps = desktopSm
    ? {}
    : { sx: { display: "grid", gap: 2, py: 4 } };

  return (
    <HeaderContent {...contentProps}>
      <HeaderContentContainer {...contentContainerProps}>
        {children}
      </HeaderContentContainer>
    </HeaderContent>
  );
};
