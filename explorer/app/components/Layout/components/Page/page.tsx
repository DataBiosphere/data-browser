import { EntityConfig } from "app/config/common/entities";
import { CurrentEntityProvider } from "app/hooks/useCurrentEntityConfig";
import React from "react";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
  entity: EntityConfig;
}

//TODO can we delete this now?
export const Page = ({ children, entity }: PageProps): JSX.Element => {
  return (
    <CurrentEntityProvider value={entity}>{children}</CurrentEntityProvider>
  );
};
