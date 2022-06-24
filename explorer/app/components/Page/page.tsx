/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

// Core dependencies
import React from "react";

// App dependencies
import { useConfig } from "app/hooks/useConfig";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/header";
import { Main } from "../Main/main";

// Styles
import { PageLayout } from "./page.styles";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Page = ({ children }: PageProps): JSX.Element => {
  const config = useConfig();

  return (
    <PageLayout>
      <Header {...config.layout.header} />
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </PageLayout>
  );
};
