import React, { useContext } from "react";
import { EntityConfig, SiteConfig } from "app/config/model";

/**
 * Empty entity configuration to serve as default for the context
 */
const EMPTY_ENTITY: EntityConfig = {
  apiPath: "",
  detail: {
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
 * @param path url path
 * @returns the current entity or undefined
 */
export const getCurrentEntity = (path: string, config: SiteConfig) => {
  const value = path.replace("/explore/", "");

  const entity = config.entities.find((entity) => entity.route === value);

  if (!entity) {
    throw Error("No entity found");
  }

  return entity;
};

const CurrentEntityContext = React.createContext<EntityConfig>(EMPTY_ENTITY);

export const CurrentEntityProvider = CurrentEntityContext.Provider;

/**
 * @returns the current entity based using the context value
 * provided by the current page
 */
export const useCurrentEntity = () => {
  return useContext(CurrentEntityContext);
};
