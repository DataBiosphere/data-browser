import { ButtonProps } from "@mui/material";
import { ElementType } from "react";
import { ANCHOR_TARGET } from "../../../Links/common/entities";

/**
 * Model of basic button to be used as props for the Button component.
 */
export interface Button extends ButtonProps {
  EndIcon?: ElementType;
  StartIcon?: ElementType;
}

/**
 * Model of basic "call to action" button to be used as props for the Button component, typically used with the BackPageHero component.
 */
export interface CallToActionButton {
  label: string;
  target: ANCHOR_TARGET;
  url: string;
}
