import React from "react";
import { EntityConfig, SiteConfig } from "../config/common/entities";

/**
 * Empty entity configuration to serve as default for the context
 */
const EMPTY_ENTITY: EntityConfig = {
  apiPath: "",
  detail: {
    staticLoad: false,
    tabs: [],
    top: [],
  },
  label: "",
  list: {
    columns: [],
  },
  route: "",
};

/**
 * Get the current entity based on the given path
 * @param path - Current URL path.
 * @param config - The site config for the current environment.
 * @returns The current entity or undefined
 */
export const getCurrentEntityConfig = (
  path: string,
  config: SiteConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
): EntityConfig<any> => {
  const entityConfig = config.entities.find((entity) => entity.route === path);

  if (!entityConfig) {
    throw Error("No entity found");
  }

  return entityConfig;
};

const CurrentEntityContext = React.createContext<EntityConfig>(EMPTY_ENTITY);

export const CurrentEntityProvider = CurrentEntityContext.Provider;

/**
 * Get the current entity config.
 * @returns The current entity based using the context value provided by the current page.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
// const useCurrentEntityConfig = (): EntityConfig<any> => {
//   return useContext(CurrentEntityContext);
// };
