import { ButtonProps } from "@mui/material";
import { ElementType } from "react";

/**
 * Model of basic button to be used as props for the Button component.
 */
export interface Button extends ButtonProps {
  EndIcon?: ElementType;
  StartIcon?: ElementType;
}
