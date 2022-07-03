// Core dependencies
import { createTheme } from "@mui/material/styles";

// App dependencies
import { BREAKPOINT } from "../hooks/useBreakpointHelper";

/**
 * Custom colors
 */
export interface CustomColors {
  ink: string;
  inkLight: string;
  primaryAnvil: string;
  smoke: string;
  smokeDark: string;
  smokeLight: string;
  smokeLightest: string;
}

/**
 * Default theme
 */
const defaultTheme = createTheme({
  breakpoints: {
    values: {
      [BREAKPOINT.DESKTOP]: 1440,
      [BREAKPOINT.MOBILE]: 0,
      [BREAKPOINT.TABLET]: 768,
    },
  },
  palette: {
    background: {
      default: "#F6F6F7", // smokeLight
    },
    info: {
      contrastText: "#00729C",
      main: "#97D6EA",
    },
    ink: "#212B36",
    inkLight: "#637381",
    primaryAnvil: "#035C94",
    smoke: "#E1E3E5",
    smokeDark: "#C4CDD5",
    smokeLight: "#F6F6F7",
    smokeLightest: "#FAFBFB",
    warning: {
      contrastText: "#B54708",
      main: "#FFD79D",
    },
  },
  spacing: 4,
  typography: {
    fontFamily: "Inter",
    "text-body-400": {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
    },
    "text-body-400-2lines": {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "24px",
    },
    "text-body-500": {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "20px",
    },
    "text-body-500-2lines": {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "24px",
    },
    "text-body-large-400": {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
    },
    "text-body-large-400-2lines": {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "28px",
    },
    "text-body-large-500": {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "24px",
    },
    "text-body-small-400": {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: "16px",
    },
    "text-body-small-500": {
      fontSize: 13,
      fontWeight: 500,
      lineHeight: "16px",
    },
    "text-heading": {
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: "-0.4px",
      lineHeight: "32px",
    },
    "text-heading-large": {
      fontSize: 30,
      fontWeight: 500,
      letterSpacing: "-0.8px",
      lineHeight: "40px",
    },
    "text-heading-small": {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: "-0.2px",
      lineHeight: "28px",
    },
    "text-heading-xlarge": {
      fontSize: 40,
      fontWeight: 500,
      letterSpacing: "-1.4px",
      lineHeight: "56px",
    },
    "text-uppercase-500": {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "16px",
      textTransform: "uppercase",
    },
  },
});

/**
 * App theme
 */
export const theme = createTheme(defaultTheme, {
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
        position: "static",
      },
      styleOverrides: {
        colorDefault: {
          backgroundColor: defaultTheme.palette.common.white,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      variants: [
        {
          props: {
            variant: "nav",
          },
          style: {
            ...defaultTheme.typography["text-body-500"],
            color: defaultTheme.palette.ink,
            minWidth: 0,
            padding: "12px 24px",
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              backgroundColor: defaultTheme.palette.smokeLight,
            },
            [defaultTheme.breakpoints.up(BREAKPOINT.DESKTOP)]: {
              padding: "6px 12px",
            },
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        status: {
          ...defaultTheme.typography["text-body-small-500"],
          borderColor: defaultTheme.palette.common.white,
          borderStyle: "solid",
          borderWidth: 2,
          height: 24,
        },
      },
      variants: [
        {
          props: { variant: "status" },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: defaultTheme.typography.fontFamily,
        },
        img: {
          display: "block",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        sizeSmall: {
          padding: 6,
        },
      },
      variants: [
        {
          props: {
            color: "ink",
          },
          style: {
            color: defaultTheme.palette.ink,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              backgroundColor: defaultTheme.palette.smokeLight,
            },
          },
        },
        {
          props: {
            color: "inkLight",
          },
          style: {
            color: defaultTheme.palette.inkLight,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              backgroundColor: defaultTheme.palette.smokeLight,
            },
          },
        },
        {
          props: {
            size: "xlarge",
          },
          style: {
            padding: 14,
          },
        },
        {
          props: {
            size: "xsmall",
          },
          style: {
            padding: 2,
          },
        },
        {
          props: {
            edge: "end",
            size: "xsmall",
          },
          style: {
            marginRight: -2,
          },
        },
        {
          props: {
            size: "xxsmall",
          },
          style: {
            padding: 0,
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiPaper: {
      styleOverrides: {
        footer: {
          backgroundColor: defaultTheme.palette.smokeLight,
          boxShadow: `inset 0 -1px 0 0 ${defaultTheme.palette.smoke}, inset 0 1px 0 0 ${defaultTheme.palette.smoke}`,
        },
        panel: {
          backgroundColor: defaultTheme.palette.smoke,
          borderColor: defaultTheme.palette.smoke,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.07)",
          display: "grid",
          gap: 1,
        },
      },
      variants: [
        {
          props: { variant: "footer" },
        },
        {
          props: { variant: "panel" },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          [defaultTheme.breakpoints.up(BREAKPOINT.MOBILE)]: {
            paddingLeft: 12,
            paddingRight: 12,
          },
          [defaultTheme.breakpoints.up(BREAKPOINT.DESKTOP)]: {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: defaultTheme.palette.ink,
        },
        tooltip: {
          ...defaultTheme.typography["text-body-small-400"],
          backgroundColor: defaultTheme.palette.ink,
          boxShadow:
            "0px 8px 8px -4px rgb(16 24 40 / 0.03), 0px 20px 24px -4px rgb(16 24 40 / 0.08)",
          padding: "8px 12px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "inherit",
      },
    },
  },
});
