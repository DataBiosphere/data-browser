import "@clevercanary/data-explorer-ui";
import { AzulEntitiesStaticResponse } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { Error } from "@clevercanary/data-explorer-ui/lib/components/Error/error";
import { ErrorBoundary } from "@clevercanary/data-explorer-ui/lib/components/ErrorBoundary";
import { Head } from "@clevercanary/data-explorer-ui/lib/components/Head/head";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Footer } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main";
import { Support } from "@clevercanary/data-explorer-ui/lib/components/Support/support";
import { AuthProvider } from "@clevercanary/data-explorer-ui/lib/providers/authentication";
import { ConfigProvider as DXConfigProvider } from "@clevercanary/data-explorer-ui/lib/providers/config";
import { ExploreStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/exploreState";
import { FileManifestStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/fileManifestState";
import { LayoutStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/layoutState";
import { SystemStatusProvider } from "@clevercanary/data-explorer-ui/lib/providers/systemStatus";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { DataExplorerError } from "@clevercanary/data-explorer-ui/lib/types/error";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { config } from "app/config/config";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect, useMemo } from "react";
import TagManager from "react-gtm-module";
import { FEATURES } from "../app/hooks/useFeatureFlag/common/entities";
import { setFeatureFlags } from "../app/hooks/useFeatureFlag/common/utils";
import { useFeatureFlag } from "../app/hooks/useFeatureFlag/useFeatureFlag";
import { configureHeader } from "../app/shared/utils";

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export type NextPageWithComponent = NextPage & {
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

setFeatureFlags();

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  // Set up the site configuration, layout and theme.
  const appConfig = config();
  const { analytics, layout, redirectRootToPath, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const theme = createAppTheme(themeOptions);
  const { entityListType } = pageProps as AzulEntitiesStaticResponse;
  const isFeatureFlag = useFeatureFlag(FEATURES.HEADER);
  const configuredHeaderProps = useMemo(
    () => configureHeader(appConfig, isFeatureFlag),
    [appConfig, isFeatureFlag]
  ); // Configure header.
  const Main = Component.Main || DXMain;

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
          <SystemStatusProvider>
            <AuthProvider sessionTimeout={SESSION_TIMEOUT}>
              <LayoutStateProvider>
                <AppLayout>
                  <Header {...configuredHeaderProps} />
                  <ExploreStateProvider entityListType={entityListType}>
                    <FileManifestStateProvider>
                      <Main>
                        <ErrorBoundary
                          fallbackRender={({
                            error,
                            reset,
                          }: {
                            error: DataExplorerError;
                            reset: () => void;
                          }): JSX.Element => (
                            <Error
                              errorMessage={error.message}
                              requestUrlMessage={error.requestUrlMessage}
                              rootPath={redirectRootToPath}
                              onReset={reset}
                            />
                          )}
                        >
                          <Component {...pageProps} />
                        </ErrorBoundary>
                        {layout.support && <Support {...layout.support} />}
                      </Main>
                    </FileManifestStateProvider>
                  </ExploreStateProvider>
                  <Footer {...layout.footer} />
                </AppLayout>
              </LayoutStateProvider>
            </AuthProvider>
          </SystemStatusProvider>
        </DXConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
