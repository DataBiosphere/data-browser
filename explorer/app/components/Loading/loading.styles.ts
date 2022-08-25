import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BREAKPOINT } from "../../hooks/useBreakpointHelper";
import {
  Paper,
  PaperPanelStyle,
  PAPER_PANEL_STYLE,
} from "../common/Paper/paper";

interface Props {
  panelStyle: PaperPanelStyle;
}

export const LoadingPositioner = styled.div`
  display: grid;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export const LoadingPaper = styled(Paper)<Props>`
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  gap: 16px;
  justify-items: center;
  place-content: center center;

  // Style "Flat" paper.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.FLAT &&
    css`
      border-left: none;
      border-radius: 0;
      border-right: none;
      box-shadow: none;
    `};

  // Style "Fluid" paper.
  ${({ panelStyle, theme }) =>
    panelStyle === PAPER_PANEL_STYLE.FLUID &&
    css`
      border-radius: 8px;

      ${theme.breakpoints.down(BREAKPOINT.TABLET)} {
        border-left: none;
        border-radius: 0;
        border-right: none;
        box-shadow: none;
      }
    `};

  // No style - borderless with no elevation.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.NONE &&
    css`
      border: 0;
      border-radius: 0;
      box-shadow: none;
    `};

  // Style "Rounded" paper.
  ${({ panelStyle }) =>
    panelStyle === PAPER_PANEL_STYLE.ROUNDED &&
    css`
      border-radius: 8px;
    `};
`;
