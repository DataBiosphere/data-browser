// Core dependencies
import React from "react";

// App dependencies
import { EntityConfig } from "app/config/common/entities";
import { CurrentEntityProvider } from "app/hooks/useCurrentEntity";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
  entity: EntityConfig;
}

export const Page = ({ children, entity }: PageProps): JSX.Element => {
  return (
    <CurrentEntityProvider value={entity}>{children}</CurrentEntityProvider>
  );
};
