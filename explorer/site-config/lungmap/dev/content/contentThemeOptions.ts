import {
  TEXT_BODY_LARGE_400_2_LINES,
  TEXT_BODY_LARGE_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Theme, ThemeOptions } from "@mui/material";

export const contentThemeOptions = (theme: Theme): ThemeOptions => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            color: "inherit",
            textDecoration: "underline",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              textDecoration: "none",
            },
          },
          h1: {
            ...theme.typography[TEXT_HEADING_LARGE],
            margin: "0 0 16px",
          },
          h2: {
            ...theme.typography[TEXT_HEADING],
            margin: "32px 0 16px",
          },
          h3: {
            ...theme.typography[TEXT_HEADING_SMALL],
            margin: "40px 0 16px",
          },
          h4: {
            ...theme.typography[TEXT_BODY_LARGE_500],
            margin: "16px 0",
          },
          p: {
            ...theme.typography[TEXT_BODY_LARGE_400_2_LINES],
            margin: "0 0 16px",
          },
          ul: {
            ...theme.typography[TEXT_BODY_LARGE_400_2_LINES],
            margin: "16px 0",
            padding: "0 0 0 24px",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            li: {
              margin: "8px 0",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            backgroundColor: "pink",
          },
        },
      },
    },
  };
};
