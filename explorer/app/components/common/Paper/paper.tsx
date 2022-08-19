/**
 * An extension of the basic Mui Paper component with custom variants e.g. "panel".
 */

import { Paper as Panel, PaperProps } from "@mui/material";
import React, { forwardRef, ReactNode } from "react";

/**
 * Model of paper variant "panel" style.
 */
export type PaperPanelStyle = keyof typeof PAPER_PANEL_STYLE;

/**
 * Possible set of paper variant "panel" style values.
 */
export enum PAPER_PANEL_STYLE {
  FLAT = "FLAT",
  FLUID = "FLUID",
  NONE = "NONE",
  ROUNDED = "ROUNDED",
}

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: PaperProps["variant"];
}

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  { children, className, variant = "panel" }: Props,
  ref
): JSX.Element {
  return (
    <Panel className={className} ref={ref} variant={variant}>
      {children}
    </Panel>
  );
});
