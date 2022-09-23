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
import { useRouter } from "next/router";
import { AuthProvider } from "../app/common/context/authState";
import { ExploreStateProvider } from "../app/common/context/exploreState";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Set up the site configuration, layout and theme.
  const siteConfig = config();
  const layout = siteConfig.layout;
  const theme = getAppTheme(siteConfig.theme);

  // Determine the entity type.
  const router = useRouter();
  const { entityListType } = router.query;
  pageProps.entityListType = entityListType;

  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ConfigProvider value={siteConfig}>
          <Head />
          <CssBaseline />
          <AuthProvider>
            <AppLayout>
              <Header header={layout.header} />
              <ExploreStateProvider>
                <Main>
                  <Component {...pageProps} />
                </Main>
              </ExploreStateProvider>
              <Footer footer={layout.footer} />
            </AppLayout>
          </AuthProvider>
        </ConfigProvider>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
}

export default MyApp;
