import "@clevercanary/data-explorer-ui";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
import { RouterContext } from "next/dist/shared/lib/router-context";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    basePath: "",
  },
  layout: "centered",
};

const withThemeProvider = (Story, context) => {
  // TODO current config is not returned, and extended theme interfaces are not recognised.
  const { config } = useConfig();
  const theme = createAppTheme(config.themeOptions);
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
