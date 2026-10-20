import { ButtonOutline as DXButtonOutline } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonOutline/buttonOutline";
import type { ButtonProps } from "@mui/material";
import { JSX } from "react";

export const ButtonOutline = ({ ...props }: ButtonProps): JSX.Element => {
  return <DXButtonOutline {...props} />;
};
