/**
 * Loading component.
 * For the loading component to consume its parent's container the component should be a direct descendant of the parent container.
 */

import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { LoadingIcon } from "../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { PaperPanelStyle, PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { LoadingBackground } from "./loading.styles";

interface Props {
  loading: boolean;
  panelStyle?: PaperPanelStyle; // Enables loading to mirror parent container styles.
  text?: string;
}

export const Loading = ({
  loading,
  panelStyle = PAPER_PANEL_STYLE.ROUNDED,
  text,
}: Props): JSX.Element | null => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);

  // On loading, the parent container element is assigned to a ref variable.
  useEffect(() => {
    if (loadingRef.current) {
      parentRef.current = loadingRef.current.parentElement;
    }
  }, [loading]);

  // Positions the loading panel.
  // Inline style is added to the parent container element when loading is true, and removed when loading is false.
  useEffect(() => {
    if (parentRef.current) {
      if (loading) {
        parentRef.current.style.position = "relative";
      } else {
        parentRef.current.style.position = "";
      }
    }
  }, [loading]);

  return loading ? (
    <LoadingBackground panelStyle={panelStyle} ref={loadingRef}>
      <LoadingIcon color="primary" fontSize="large" />
      {text && <Typography variant="text-body-400">{text}</Typography>}
    </LoadingBackground>
  ) : null;
};
