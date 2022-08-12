import { Theme, ThemeOptions } from "@mui/material";
import { createTheme, Shadows } from "@mui/material/styles";
import { BREAKPOINT } from "../hooks/useBreakpointHelper";

/**
 * Custom breakpoints
 */
export const breakpointMobile = 0;
export const breakpointTablet = 768; // Tablet.
export const breakpointDesktop = 1440; // Desktop.

/**
 * Custom colors
 * TODO remove when Text component is decommissioned.
 */
export interface CustomColors {
  ink: string;
  smoke: string;
}

/**
 * Custom shadows
 */
const customShadows = [
  "none",
  "0 1px 4px 0 #00000012",
  "0 8px 8px -4px #10182808, 0 20px 24px -4px #10182814",
];

/**
 * Returns a generated theme with site customization.
 * @param customTheme - Custom theme option overrides.
 * @returns app theme with any custom theme overrides specified by the site config.
 */
export const getAppTheme = (customTheme?: ThemeOptions): Theme => {
  /**
   * Custom config theme
   */
  const customTypography = customTheme?.typography || {};
  const customPalette = customTheme?.palette || {};

  /**
   * Default theme
   */
  const defaultTheme = createTheme(
    {
      breakpoints: {
        values: {
          [BREAKPOINT.DESKTOP]: breakpointDesktop,
          [BREAKPOINT.MOBILE]: breakpointMobile,
          [BREAKPOINT.TABLET]: breakpointTablet,
        },
      },
      palette: {
        alert: {
          light: "#FED3D1",
          lightest: "#FFF4F4",
          main: "#B42318",
        },
        background: {
          default: "#F6F6F7", // smokeLight
        },
        info: {
          contrastText: "#00729C",
          light: "#97D6EA",
          lightest: "#F2FAFC",
          main: "#00729C",
        },
        ink: {
          light: "#637381",
          main: "#212B36",
        },
        smoke: {
          dark: "#C4CDD5",
          light: "#F6F6F7",
          lightest: "#FAFBFB",
          main: "#E1E3E5",
        },
        success: {
          light: "#AEE9D1",
          lightest: "#F1F8F5",
          main: "#287555",
        },
        warning: {
          contrastText: "#B54708",
          light: "#FFD79D",
          lightest: "#FFFAEB",
          main: "#B54708",
        },
      },
      spacing: 4,
      typography: {
        fontFamily: "Inter",
        "text-body-400": {
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
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.2px",
          lineHeight: "28px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 24,
            letterSpacing: "-0.4px",
            lineHeight: "32px",
          },
        },
        "text-heading-large": {
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "-0.4px",
          lineHeight: "32px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 30,
            letterSpacing: "-0.8px",
            lineHeight: "40px",
          },
        },
        "text-heading-small": {
          fontSize: 18,
          fontWeight: 500,
          lineHeight: "26px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 20,
            letterSpacing: "-0.2px",
            lineHeight: "28px",
          },
        },
        "text-heading-xlarge": {
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: "-0.8px",
          lineHeight: "40px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 40,
            letterSpacing: "-1.4px",
            lineHeight: "56px",
          },
        },
        "text-uppercase-500": {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: "16px",
          textTransform: "uppercase",
        },
      },
    },
    { palette: customPalette, typography: customTypography }
  );

  /**
   * Default theme overrides
   */
  defaultTheme.palette.text.primary = defaultTheme.palette.ink.main;
  defaultTheme.shadows = [...defaultTheme.shadows].map(
    (shadow, s) => customShadows[s] || shadow
  ) as Shadows;

  /**
   * Breakpoint constants
   */
  const breakpointUpDesktop = defaultTheme.breakpoints.up(BREAKPOINT.DESKTOP);
  const breakpointUpMobile = defaultTheme.breakpoints.up(BREAKPOINT.MOBILE);

  /**
   * Color constants
   */
  const infoLight = defaultTheme.palette.info.light;
  const ink = defaultTheme.palette.ink.main;
  const inkLight = defaultTheme.palette.ink.light;
  const smoke = defaultTheme.palette.smoke.main;
  const smokeDark = defaultTheme.palette.smoke.dark;
  const smokeLight = defaultTheme.palette.smoke.light;
  const warningLight = defaultTheme.palette.warning.light;
  const white = defaultTheme.palette.common.white;

  /**
   * Color alpha constants
   */
  const alpha80 = "cc";

  /*
   * Elevation constants
   */
  const elevation01 = defaultTheme.shadows[1];
  const elevation02 = defaultTheme.shadows[2];

  /**
   * Stroke constants
   */
  const strokeBottom = "inset 0 -1px 0 0";
  const strokeBottomSmoke = `${strokeBottom} ${smoke}`;
  const strokeTop = "inset 0 1px 0 0";
  const strokeTopSmoke = `${strokeTop} ${smoke}`;

  /**
   * Typography constants
   */
  const textBody400 = defaultTheme.typography["text-body-400"];
  const textBody500 = defaultTheme.typography["text-body-500"];
  const textBodySmall400 = defaultTheme.typography["text-body-small-400"];
  const textBodySmall500 = defaultTheme.typography["text-body-small-500"];

  /**
   * App theme
   */
  return createTheme(defaultTheme, {
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
          position: "static",
        },
        styleOverrides: {
          colorDefault: {
            backgroundColor: white,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          invisible: {
            backgroundColor: "transparent",
          },
          root: {
            backgroundColor: `${ink}${alpha80}`,
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          li: {
            ...textBodySmall400,
            "& .MuiLink-root": {
              color: "inherit",
            },
          },
          ol: {
            gap: 2,
          },
          root: {
            color: inkLight,
          },
          separator: {
            margin: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          endIcon: {
            margin: 0,
          },
          root: {
            ...textBody500,
            gap: 4,
            padding: "10px 16px",
            textTransform: "capitalize",
          },
        },
        variants: [
          {
            props: {
              variant: "nav",
            },
            style: {
              ...textBody500,
              color: ink,
              minWidth: 0,
              padding: "12px 24px",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
              [breakpointUpDesktop]: {
                padding: "6px 12px",
              },
            },
          },
        ],
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            fontFamily: defaultTheme.typography.fontFamily,
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          size: "xsmall",
        },
        styleOverrides: {
          fontSizeXsmall: {
            fontSize: "18px",
          },
          root: {
            color: smokeDark,
            padding: 0,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&.Mui-disabled": {
              color: smokeDark,
            },
          },
        },
        variants: [
          {
            props: {
              size: "xsmall",
            },
          },
        ],
      },
      MuiChip: {
        defaultProps: {
          size: "small",
        },
        styleOverrides: {
          colorDefault: {
            backgroundColor: smoke,
            color: ink,
          },
          colorInfo: {
            backgroundColor: infoLight,
          },
          colorWarning: {
            backgroundColor: warningLight,
          },
          deleteIcon: {
            color: "inherit",
            margin: "0 -2px 0 0",
          },
          filterTag: {
            ...textBodySmall500,
            cursor: "pointer", // "pointer" cursor required to restore "clickable" ui
            gap: 2,
            height: 24,
            justifySelf: "flex-start",
            padding: "0 8px",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiChip-label": {
              padding: 0,
            },
          },
          ntag: {
            ...textBodySmall400,
            backgroundColor: smoke,
            borderColor: white,
            borderStyle: "solid",
            borderWidth: 2,
            boxSizing: "content-box",
            height: 24,
          },
          status: {
            ...textBodySmall500,
            borderColor: white,
            borderStyle: "solid",
            borderWidth: 2,
            height: 24,
          },
        },
        variants: [
          {
            props: { variant: "filterTag" },
          },
          {
            props: { variant: "ntag" },
          },
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
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: smoke,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            overflowY: "visible", // required; allows backdrop button to render outside of drawer container
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            "&.Mui-disabled": {
              color: "inherit",
            },
          },
          labelPlacementEnd: {
            gap: 8,
          },
          root: {
            margin: 0,
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
          sizeLarge: {
            padding: 10,
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
              color: ink,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
            },
          },
          {
            props: {
              color: "inkLight",
            },
            style: {
              color: inkLight,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
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
      MuiListItemButton: {
        styleOverrides: {
          root: {
            ...textBody400,
            minHeight: "unset",
            padding: "10px 16px",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              backgroundColor: smokeLight,
            },
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&.Mui-selected": {
              backgroundColor: "unset",
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
      MuiMenuItem: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            ...textBody400,
            minHeight: "unset",
            padding: "10px 16px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          footer: {
            backgroundColor: smokeLight,
            boxShadow: `${strokeTopSmoke}, ${strokeBottomSmoke}`,
          },
          menu: {
            borderColor: smokeDark,
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 1,
            boxShadow: elevation02,
          },
          panel: {
            backgroundColor: smoke,
            borderColor: smoke,
            borderStyle: "solid",
            borderWidth: 1,
            boxShadow: elevation01,
            display: "grid",
            gap: 1,
          },
          sidebar: {
            backgroundColor: smokeLight,
            padding: "24px 0",
            width: 312,
          },
        },
        variants: [
          {
            props: { variant: "footer" },
          },
          {
            props: { variant: "menu" },
          },
          {
            props: { variant: "panel" },
          },
          {
            props: { variant: "sidebar" },
          },
        ],
      },
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeXsmall: {
            fontSize: "18px",
          },
          fontSizeXxlarge: {
            fontSize: "40px",
          },
          fontSizeXxsmall: {
            fontSize: "16px",
          },
        },
        variants: [
          {
            props: {
              size: "xsmall",
            },
          },
          {
            props: {
              size: "xxlarge",
            },
          },
          {
            props: {
              size: "xxsmall",
            },
          },
        ],
      },
      MuiTab: {
        styleOverrides: {
          labelIcon: {
            gap: 8,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& > img": {
              maxHeight: 20, // Tab image max height.
            },
          },
          root: {
            ...textBody500,
            color: inkLight,
            marginBottom: 3,
            minHeight: "unset",
            minWidth: "unset",
            opacity: 1,
            padding: 12,
            textTransform: "capitalize",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& > .MuiTab-iconWrapper": {
              marginRight: 0,
            },
            "&.Mui-selected": {
              color: ink,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          body: {
            ...textBody400,
          },
          head: {
            ...textBodySmall500,
          },
          root: {
            padding: "18px 20px",
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          icon: {
            fontSize: 20,
            margin: 0,
            transition: "none",
          },
          root: {
            "&.Mui-active": {
              color: "inherit",
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "& .MuiTableSortLabel-icon": {
                color: "inherit",
              },
            },
            "&:hover": {
              color: "inherit",
              opacity: 0.6,
            },
          },
        },
      },
      MuiTabs: {
        defaultProps: {
          textColor: "inherit",
          variant: "scrollable",
        },
        styleOverrides: {
          flexContainer: {
            gap: 8,
          },
          indicator: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: 3,
          },
          root: {
            boxShadow: strokeBottomSmoke,
            minHeight: "unset",
            position: "relative", // Positions scroll fuzz.
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            [breakpointUpMobile]: {
              paddingLeft: 12,
              paddingRight: 12,
            },
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            [breakpointUpDesktop]: {
              paddingLeft: 16,
              paddingRight: 16,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          arrow: {
            color: ink,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:before": {
              borderRadius: 1,
            },
          },
          tooltip: {
            ...textBodySmall400,
            backgroundColor: ink,
            boxShadow: elevation02,
            padding: "8px 12px",
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variant: "inherit",
        },
        styleOverrides: {
          gutterBottom: {
            marginBottom: 8,
          },
        },
      },
    },
  });
};
