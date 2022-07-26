// Core dependencies
import { theme } from "app/theme";
import { ThemeProvider as Emotion10ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// App dependencies
import { ConfigProvider } from "app/components/Config/Config";
import { Footer } from "app/components/Layout/components/Footer/footer";
import { Header } from "app/components/Layout/components/Header/header";
import { config } from "app/config/config";

// Styles
import { AppLayout } from "app/components/Layout/components/AppLayout/appLayout.styles";
import { Main } from "app/components/Layout/components/Main/main.styles";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const currenctConfig = config();
  const currentLayout = currenctConfig.layout;
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ConfigProvider value={currenctConfig}>
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
