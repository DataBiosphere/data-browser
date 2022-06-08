import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as Emotion10ThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "app/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
}

export default MyApp;
