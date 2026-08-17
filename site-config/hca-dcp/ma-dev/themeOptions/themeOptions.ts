import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { SiteConfig } from "../../../common/entities";

const FONT_FAMILY_DIN = "'din-2014', sans-serif";

export const THEME_OPTIONS: SiteConfig["themeOptions"] = {
  palette: {
    primary: {
      dark: "#005EA9",
      main: "#1C7CC7",
    },
  },
  typography: {
    [TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: "18px",
      fontWeight: 400,
    },
    [TYPOGRAPHY_PROPS.VARIANT.HEADING]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: "22px",
      fontWeight: 400,
      letterSpacing: "normal",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "@media (min-width: 768px)": {
        fontSize: "26px",
        letterSpacing: "normal",
      },
    },
    [TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: "26px",
      fontWeight: 400,
      letterSpacing: "normal",
      lineHeight: "34px",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "@media (min-width: 768px)": {
        fontSize: "32px",
        letterSpacing: "normal",
      },
    },
    [TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "normal",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "@media (min-width: 768px)": {
        fontSize: "22px",
        letterSpacing: "normal",
      },
    },
    [TYPOGRAPHY_PROPS.VARIANT.HEADING_XLARGE]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: "32px",
      fontWeight: 400,
      letterSpacing: "normal",
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "@media (min-width: 768px)": {
        fontSize: "42px",
        letterSpacing: "-0.4px",
      },
    },
  },
};
