// Core dependencies
import { theme } from "app/theme";
import { ThemeProvider as Emotion10ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ConfigProvider } from "app/components/Config/Config";
import { config } from "app/config/config";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ConfigProvider value={config()}>
          <CssBaseline />
          <Component {...pageProps} />
        </ConfigProvider>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
}

export default MyApp;
