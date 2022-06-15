// Core dependencies
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// App dependencies
import { theme } from "../app/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
}

const withThemeProvider = (Story, context) => {
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
