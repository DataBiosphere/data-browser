// Core dependencies
import { createTheme } from "@mui/material/styles";

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
  palette: {
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
            "&:hover": {
              backgroundColor: defaultTheme.palette.smokeLight,
            },
            [defaultTheme.breakpoints.up("lg")]: {
              padding: "6px 12px",
            },
          },
        },
      ],
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
      ],
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          [defaultTheme.breakpoints.up("xs")]: {
            paddingLeft: 12,
            paddingRight: 12,
          },
          [defaultTheme.breakpoints.up("lg")]: {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
  },
});
