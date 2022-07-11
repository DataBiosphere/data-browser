/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

// Core dependencies
import React from "react";

// App dependencies
import { useConfig } from "app/hooks/useConfig";
import { Footer } from "../Footer/footer";
import { Header } from "../Header/header";
import { Main } from "../Main/main";

// Styles
import { PageLayout } from "./page.styles";
import { EntityConfig } from "app/config/model";
import { CurrentEntityProvider } from "app/hooks/useCurrentEntity";

interface PageProps {
  entity: EntityConfig;
  children: React.ReactNode | React.ReactNode[];
}

export const Page = ({ children, entity }: PageProps): JSX.Element => {
  const config = useConfig();
  return (
    <PageLayout>
      <CurrentEntityProvider value={entity}>
        <Header header={config.layout.header} />
        <Main>{children}</Main>
        <Footer footer={config.layout.footer} />
      </CurrentEntityProvider>
    </PageLayout>
  );
};
