import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { useConfig } from "../app/hooks/useConfig";
import { getAppTheme } from "../app/theme/theme";

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
  const currentConfig = useConfig();
  const theme = getAppTheme(currentConfig.theme);
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
