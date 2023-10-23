import { TEXT_HEADING_LARGE } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Theme, ThemeOptions } from "@mui/material";

export const contentThemeOptions = (theme: Theme): ThemeOptions => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          h1: {
            ...theme.typography[TEXT_HEADING_LARGE],
            margin: "0 0 8px",
          },
        },
      },
    },
  };
};
