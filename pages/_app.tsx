import "@databiosphere/findable-ui";
import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { Error } from "@databiosphere/findable-ui/lib/components/Error/error";
import { ErrorBoundary } from "@databiosphere/findable-ui/lib/components/ErrorBoundary";
import { Head } from "@databiosphere/findable-ui/lib/components/Head/head";
import { AppLayout } from "@databiosphere/findable-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Floating } from "@databiosphere/findable-ui/lib/components/Layout/components/Floating/floating";
import { Footer } from "@databiosphere/findable-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { setFeatureFlags } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/common/utils";
import { TerraProfileProvider } from "@databiosphere/findable-ui/lib/providers/authentication/terra/provider";
import { ConfigProvider as DXConfigProvider } from "@databiosphere/findable-ui/lib/providers/config";
import { ExploreStateProvider } from "@databiosphere/findable-ui/lib/providers/exploreState";
import { FileManifestStateProvider } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import { GoogleSignInAuthenticationProvider } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/provider";
import { LayoutStateProvider } from "@databiosphere/findable-ui/lib/providers/layoutState";
import { SystemStatusProvider } from "@databiosphere/findable-ui/lib/providers/systemStatus";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { DataExplorerError } from "@databiosphere/findable-ui/lib/types/error";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { createBreakpoints } from "@mui/system";
import { deepmerge } from "@mui/utils";
import { config } from "app/config/config";
import { FEATURES } from "app/shared/entities";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { BREAKPOINTS } from "../site-config/common/constants";

const FEATURE_FLAGS = Object.values(FEATURES);
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export interface PageProps extends AzulEntitiesStaticResponse {
  pageTitle?: string;
}

export type NextPageWithComponent = NextPage & {
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

setFeatureFlags(FEATURE_FLAGS);

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  // Set up the site configuration, layout and theme.
  const appConfig = config();
  const { analytics, layout, redirectRootToPath, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const { floating, footer, header } = layout || {};
  const theme = createAppTheme(themeOptions);
  const { entityListType, pageTitle } = pageProps as PageProps;
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
          <Head pageTitle={pageTitle} />
          <CssBaseline />
          <SystemStatusProvider>
            <GoogleSignInAuthenticationProvider
              SessionController={TerraProfileProvider}
              timeout={SESSION_TIMEOUT}
            >
              <LayoutStateProvider>
                <AppLayout>
                  <ThemeProvider
                    theme={(theme: Theme): Theme =>
                      createTheme(
                        deepmerge(theme, {
                          breakpoints: createBreakpoints(BREAKPOINTS),
                        })
                      )
                    }
                  >
                    <Header {...header} />
                  </ThemeProvider>
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
                          <Floating {...floating} />
                        </ErrorBoundary>
                      </Main>
                    </FileManifestStateProvider>
                  </ExploreStateProvider>
                  <Footer {...footer} />
                </AppLayout>
              </LayoutStateProvider>
            </GoogleSignInAuthenticationProvider>
          </SystemStatusProvider>
        </DXConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
