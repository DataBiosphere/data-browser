import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: "Inter",
    "text-heading-xlarge": {
      fontFamily: "Inter",
      fontSize: 40,
      lineHeight: "56px",
      fontWeight: 500,
      letterSpacing: "-1.4px",
    },
    "text-heading-large": {
      fontFamily: "Inter",
      fontSize: 30,
      lineHeight: "40px",
      fontWeight: 500,
      letterSpacing: "-0.8px",
    },
    "text-heading": {
      fontFamily: "Inter",
      fontSize: 24,
      lineHeight: "32px",
      fontWeight: 500,
      letterSpacing: "-0.4px",
    },
    "text-heading-small": {
      fontFamily: "Inter",
      fontSize: 20,
      lineHeight: "28px",
      fontWeight: 500,
      letterSpacing: "-0.2px",
    },
    "text-body-large-500": {
      fontFamily: "Inter",
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 500,
    },
    "text-body-large-400": {
      fontFamily: "Inter",
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 400,
    },
    "text-body-large-400-2lines": {
      fontFamily: "Inter",
      fontSize: 16,
      lineHeight: "28px",
      fontWeight: 400,
    },
    "text-body-500": {
      fontFamily: "Inter",
      fontSize: 14,
      lineHeight: "20px",
      fontWeight: 500,
    },
    "text-body-400": {
      fontFamily: "Inter",
      fontSize: 14,
      lineHeight: "20px",
      fontWeight: 400,
    },
    "text-body-400-2lines": {
      fontFamily: "Inter",
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 400,
    },
    "text-body-small-500": {
      fontFamily: "Inter",
      fontSize: 13,
      lineHeight: "16px",
      fontWeight: 500,
    },
    "text-body-small-400": {
      fontFamily: "Inter",
      fontSize: 13,
      lineHeight: "16px",
      fontWeight: 400,
    },
    "TEXT-UPPERCASE-500": {
      fontFamily: "Inter",
      fontSize: 12,
      lineHeight: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },
  palette: {
    colorInk: "#212B36",
    colorInkLight: "#637381",
    colorSmokeDark: "#C4CDD5",
    colorSmoke: "#E1E3E5",
    colorSmokeLight: "#F6F6F7",
    colorSmokeLightest: "#FAFBFB",
  },
});
