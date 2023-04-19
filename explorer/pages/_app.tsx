import "@clevercanary/data-explorer-ui";
import { AzulEntitiesStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { Head } from "@clevercanary/data-explorer-ui/lib/components/Head/head";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Footer } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { AuthProvider } from "@clevercanary/data-explorer-ui/lib/providers/authentication";
import { ConfigProvider as DXConfigProvider } from "@clevercanary/data-explorer-ui/lib/providers/config";
import { ExploreStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/exploreState";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ErrorBoundary } from "app/components/ErrorBoundary/errorBoundary";
import { TempError } from "app/components/TempError";
import { config } from "app/config/config";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Set up the site configuration, layout and theme.
  const appConfig = config();
  const { analytics, layout, themeOptions } = appConfig;
  const { gtmId } = analytics || {};
  const theme = createAppTheme(themeOptions);
  const { entityListType } = pageProps as AzulEntitiesStaticResponse;

  // Initialize Google Tag Manager.
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ gtmId: gtmId });
    }
  }, [gtmId]);

  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <DXConfigProvider config={appConfig} entityListType={entityListType}>
          <Head />
          <CssBaseline />
          <AuthProvider>
            <AppLayout>
              <Header {...layout.header} />
              <ExploreStateProvider entityListType={entityListType}>
                <Main>
                  <ErrorBoundary
                    fallbackRender={(error): JSX.Element => (
                      <TempError error={error} />
                    )}
                  >
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </Main>
              </ExploreStateProvider>
              <Footer {...layout.footer} />
            </AppLayout>
          </AuthProvider>
        </DXConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
