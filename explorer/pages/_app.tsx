import { ThemeProvider as Emotion10ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ConfigProvider } from "app/components/Config/Config";
import { Head } from "app/components/Head/head";
import { AppLayout } from "app/components/Layout/components/AppLayout/appLayout.styles";
import { Footer } from "app/components/Layout/components/Footer/footer";
import { Header } from "app/components/Layout/components/Header/header";
import { Main } from "app/components/Layout/components/Main/main.styles";
import { config } from "app/config/config";
import { getAppTheme } from "app/theme/theme";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const currentConfig = config();
  const currentLayout = currentConfig.layout;
  const theme = getAppTheme(currentConfig.theme);
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ConfigProvider value={currentConfig}>
          <Head />
          <CssBaseline />
          <AppLayout>
            <Header header={currentLayout.header} />
            <Main>
              <Component {...pageProps} />
            </Main>
            <Footer footer={currentLayout.footer} />
          </AppLayout>
        </ConfigProvider>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
}

export default MyApp;
