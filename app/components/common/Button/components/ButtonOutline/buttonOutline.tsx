import type { ButtonProps } from "@mui/material";
import type { JSX } from "react";
import { StyledButton } from "./buttonOutline.styles";

/**
 * Outline button for dark backgrounds: white text and a translucent white border.
 * @param props - Button props.
 * @returns The outline button.
 */
export const ButtonOutline = (props: ButtonProps): JSX.Element => {
  return <StyledButton color="secondary" variant="outlined" {...props} />;
};
