// Core dependencies
import { Theme as MuiTheme } from "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material/styles/createPalette";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

// App dependencies
import { BREAKPOINT } from "../hooks/useBreakpointHelper";

/**
 * Palette definitions.
 */
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    alert: PaletteColor;
    ink: PaletteColor;
    smoke: PaletteColor;
  }

  interface PaletteColor {
    lightest?: string;
  }

  interface PaletteOptions {
    alert?: PaletteColorOptions;
    ink?: PaletteColorOptions;
    smoke?: PaletteColorOptions;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
  }
}

/**
 * Breakpoint and typography definitions.
 */
declare module "@mui/material/styles" {
  /* eslint-disable typescript-sort-keys/interface -- disabling for readability */
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    [BREAKPOINT.MOBILE]: true;
    [BREAKPOINT.DESKTOP]: true;
    [BREAKPOINT.TABLET]: true;
  }

  /* eslint-enable typescript-sort-keys/interface -- disabling for readability */

  /* eslint-disable sonarjs/no-duplicate-string  -- ignoring duplicate strings here */
  interface TypographyVariants {
    "text-body-400": TypographyStyleOptions;
    "text-body-400-2lines": TypographyStyleOptions;
    "text-body-500": TypographyStyleOptions;
    "text-body-500-2lines": TypographyStyleOptions;
    "text-body-large-400": TypographyStyleOptions;
    "text-body-large-400-2lines": TypographyStyleOptions;
    "text-body-large-500": TypographyStyleOptions;
    "text-body-small-400": TypographyStyleOptions;
    "text-body-small-500": TypographyStyleOptions;
    "text-heading": TypographyStyleOptions;
    "text-heading-large": TypographyStyleOptions;
    "text-heading-small": TypographyStyleOptions;
    "text-heading-xlarge": TypographyStyleOptions;
    "text-uppercase-500": TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    "text-body-400"?: TypographyStyleOptions;
    "text-body-400-2lines"?: TypographyStyleOptions;
    "text-body-500"?: TypographyStyleOptions;
    "text-body-500-2lines"?: TypographyStyleOptions;
    "text-body-large-400"?: TypographyStyleOptions;
    "text-body-large-400-2lines"?: TypographyStyleOptions;
    "text-body-large-500"?: TypographyStyleOptions;
    "text-body-small-400"?: TypographyStyleOptions;
    "text-body-small-500"?: TypographyStyleOptions;
    "text-heading"?: TypographyStyleOptions;
    "text-heading-large"?: TypographyStyleOptions;
    "text-heading-small"?: TypographyStyleOptions;
    "text-heading-xlarge"?: TypographyStyleOptions;
    "text-uppercase-500"?: TypographyStyleOptions;
  }
}

/**
 * Typography's variant prop options.
 */
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "text-body-400": true;
    "text-body-400-2lines": true;
    "text-body-500": true;
    "text-body-500-2lines": true;
    "text-body-large-400": true;
    "text-body-large-400-2lines": true;
    "text-body-large-500": true;
    "text-body-small-400": true;
    "text-body-small-500": true;
    "text-heading": true;
    "text-heading-large": true;
    "text-heading-small": true;
    "text-heading-xlarge": true;
    "text-uppercase-500": true;
  }
}
/* eslint-enable sonarjs/no-duplicate-string  -- watching duplicate strings here */

/**
 * Button prop options.
 */
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    nav: true;
  }
}

/**
 * Checkbox prop options.
 */
declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    xsmall: true;
  }
}

/**
 * Chip prop options.
 */
declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    filterTag: true;
    ntag: true;
    status: true;
  }
}

/**
 * IconButton prop options.
 */
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    ink: true;
  }

  interface IconButtonPropsSizeOverrides {
    xlarge: true;
    xsmall: true;
    xxsmall: true;
  }
}

/**
 * Paper prop options.
 */
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    footer: true;
    menu: true;
    panel: true;
    sidebar: true;
  }
}

/**
 * SvgIcon prop options.
 */
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    xsmall: true;
    xxlarge: true;
    xxsmall: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    name: "EmotionTheme";
  }
}
