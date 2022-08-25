/**
 * Loading component.
 * For the loading component to consume its parent's container the component should be a direct descendant of the parent container.
 */

import { Fade, Typography } from "@mui/material";
import React from "react";
import { LoadingIcon } from "../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { PaperPanelStyle, PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { LoadingPaper, LoadingPositioner } from "./loading.styles";

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
  return (
    <Fade
      in={loading}
      mountOnEnter
      onEnter={(node: HTMLElement): void => onFadeEnter(node)}
      onExited={(node: HTMLElement): void => onFadeExited(node)}
      timeout={300}
      unmountOnExit
    >
      <LoadingPositioner>
        <LoadingPaper panelStyle={panelStyle}>
          <LoadingIcon color="primary" fontSize="large" />
          {text && <Typography variant="text-body-400">{text}</Typography>}
        </LoadingPaper>
      </LoadingPositioner>
    </Fade>
  );
};

/**
 * Callback fired before the "entering" status is applied.
 * The loading element's parent element is assigned position style "relative" for positioning of the loading element.
 * @param node - Loading element.
 */
function onFadeEnter(node: HTMLElement): void {
  const parentEl = node.parentElement;
  if (parentEl) parentEl.style.position = "relative";
}

/**
 * Callback fired after the "exited" status is applied.
 * Removes the loading element's parent element position styles.
 * @param node - Loading element.
 */
function onFadeExited(node: HTMLElement): void {
  const parentEl = node.parentElement;
  if (parentEl) parentEl.style.position = "";
}
