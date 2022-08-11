import { EntityConfig } from "app/config/common/entities";
import { CurrentEntityProvider } from "app/hooks/useCurrentEntity";
import React from "react";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
  entity: EntityConfig;
}

export const Page = ({ children, entity }: PageProps): JSX.Element => {
  return (
    <CurrentEntityProvider value={entity}>{children}</CurrentEntityProvider>
  );
};
