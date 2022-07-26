/**
 * This component was created to make it easier to style MUI's @see <Typography> keeping the
 * control over the tag that will be used and the custom colors.
 * https://github.com/mui/material-ui/issues/15695
 */
import styled from "@emotion/styled";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { CustomColors } from "app/theme/theme";

interface TextProps extends Omit<TypographyProps, "color"> {
  component?: React.ElementType;
  customColor?: keyof CustomColors;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type -- move style def to .styles.ts file */
export const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "customColor",
})<TextProps>`
  text-decoration: none;
  color: ${({ customColor, theme }) =>
    customColor ? theme.palette[customColor] : undefined};
`;
/* eslint-enable @typescript-eslint/explicit-function-return-type -- move style def to .styles.ts file */
