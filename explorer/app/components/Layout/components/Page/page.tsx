/**
 * Page component will hold page's structure, header, content and footer.
 * Header and Footer will be configurable through props.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Main } from "../Main/main";

// Styles
import { EntityConfig } from "app/config/model";
import { CurrentEntityProvider } from "app/hooks/useCurrentEntity";

interface PageProps {
  entity: EntityConfig;
  children: React.ReactNode | React.ReactNode[];
}

export const Page = ({ children, entity }: PageProps): JSX.Element => {
  return (
    <CurrentEntityProvider value={entity}>
      <Main>{children}</Main>
    </CurrentEntityProvider>
  );
};
