import { TypographyStyleOptions } from "@mui/material/styles/createTypography";
import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    colorInk: string;
    colorInkLight: string;
    colorSmokeDark: string;
    colorSmoke: string;
    colorSmokeLight: string;
    colorSmokeLightest: string;
  }
  interface PaletteOptions {
    colorInk: string;
    colorInkLight: string;
    colorSmokeDark: string;
    colorSmoke: string;
    colorSmokeLight: string;
    colorSmokeLightest: string;
  }
  interface TypographyVariants {
    "text-heading-xlarge": TypographyStyleOptions;
    "text-heading-large": TypographyStyleOptions;
    "text-heading": TypographyStyleOptions;
    "text-heading-small": TypographyStyleOptions;
    "text-body-large-500": TypographyStyleOptions;
    "text-body-large-400": TypographyStyleOptions;
    "text-body-large-400-2lines": TypographyStyleOptions;
    "text-body-500": TypographyStyleOptions;
    "text-body-400": TypographyStyleOptions;
    "text-body-400-2lines": TypographyStyleOptions;
    "text-body-small-500": TypographyStyleOptions;
    "text-body-small-400": TypographyStyleOptions;
    "TEXT-UPPERCASE-500": TypographyStyleOptions;
  }
  interface TypographyVariantsOptions {
    "text-heading-xlarge": TypographyStyleOptions;
    "text-heading-large": TypographyStyleOptions;
    "text-heading": TypographyStyleOptions;
    "text-heading-small": TypographyStyleOptions;
    "text-body-large-500": TypographyStyleOptions;
    "text-body-large-400": TypographyStyleOptions;
    "text-body-large-400-2lines": TypographyStyleOptions;
    "text-body-500": TypographyStyleOptions;
    "text-body-400": TypographyStyleOptions;
    "text-body-400-2lines": TypographyStyleOptions;
    "text-body-small-500": TypographyStyleOptions;
    "text-body-small-400": TypographyStyleOptions;
    "TEXT-UPPERCASE-500": TypographyStyleOptions;
  }
  interface TypographyPropsVariantOverrides {
    "text-heading-xlarge": true;
    "text-heading-large": true;
    "text-heading": true;
    "text-heading-small": true;
    "text-body-large-500": true;
    "text-body-large-400": true;
    "text-body-large-400-2lines": true;
    "text-body-500": true;
    "text-body-400": true;
    "text-body-400-2lines": true;
    "text-body-small-500": true;
    "text-body-small-400": true;
    "TEXT-UPPERCASE-500": true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "text-heading-xlarge": true;
    "text-heading-large": true;
    "text-heading": true;
    "text-heading-small": true;
    "text-body-large-500": true;
    "text-body-large-400": true;
    "text-body-large-400-2lines": true;
    "text-body-500": true;
    "text-body-400": true;
    "text-body-400-2lines": true;
    "text-body-small-500": true;
    "text-body-small-400": true;
    "TEXT-UPPERCASE-500": true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    name: "EmotionTheme";
  }
}
