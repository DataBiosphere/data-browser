import "@clevercanary/data-explorer-ui";
import { AzulEntitiesStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { Error } from "@clevercanary/data-explorer-ui/lib/components/Error/error";
import { ErrorBoundary } from "@clevercanary/data-explorer-ui/lib/components/ErrorBoundary";
import { Head } from "@clevercanary/data-explorer-ui/lib/components/Head/head";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Footer } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { Support } from "@clevercanary/data-explorer-ui/lib/components/Support/support";
import { AuthProvider } from "@clevercanary/data-explorer-ui/lib/providers/authentication";
import { ConfigProvider as DXConfigProvider } from "@clevercanary/data-explorer-ui/lib/providers/config";
import { ExploreStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/exploreState";
import { FileManifestStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/fileManifestState";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { DataExplorerError } from "@clevercanary/data-explorer-ui/lib/types/error";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { config } from "app/config/config";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Set up the site configuration, layout and theme.
  const appConfig = config();
  const { asPath } = useRouter();
  const { analytics, layout, redirectRootToPath, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const theme = createAppTheme(themeOptions);
  const { entityListType } = pageProps as AzulEntitiesStaticResponse;

  // Initialize Google Tag Manager.
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ auth: gtmAuth, gtmId, preview: gtmPreview });
    }
  }, [gtmAuth, gtmId, gtmPreview]);

  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <DXConfigProvider config={appConfig} entityListType={entityListType}>
          <Head />
          <CssBaseline />
          <AuthProvider sessionTimeout={SESSION_TIMEOUT}>
            <AppLayout>
              <Header {...layout.header} />
              <ExploreStateProvider entityListType={entityListType}>
                <FileManifestStateProvider>
                  <Main>
                    <ErrorBoundary
                      key={asPath}
                      fallbackRender={(
                        error: DataExplorerError
                      ): JSX.Element => (
                        <Error
                          errorMessage={error.message}
                          requestUrlMessage={error.requestUrlMessage}
                          rootPath={redirectRootToPath}
                        />
                      )}
                    >
                      <Component {...pageProps} />
                    </ErrorBoundary>
                  </Main>
                </FileManifestStateProvider>
              </ExploreStateProvider>
              {layout.support && <Support {...layout.support} />}
              <Footer {...layout.footer} />
            </AppLayout>
          </AuthProvider>
        </DXConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
