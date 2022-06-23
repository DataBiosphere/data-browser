// Core dependencies
import { JSXElementConstructor } from "react";

// App dependencies
import { HeaderProps } from "../components/Header/header";

type GetIdFunction<T> = (detail: T) => string;

/**
 * Interface used to define the entities and router that will be used on the application, alongside with
 * the detail and the list page configuration.
 */
export interface EntityConfig<D = any> {
  label: string;
  route: string;
  apiPath: string;
  getId?: GetIdFunction<D>;
  staticLoad?: boolean;
  detail?: DetailConfig;
  list?: ListConfig;
}

/**
 * Interface used to define the configuration of a component.
 * This will be used by @see ComponentCreator to create the a react component with the given props and
 * making any necessary transformations.
 *
 */
export interface ComponentConfig<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any,
  D = any
> {
  component: React.FC<React.ComponentProps<T>>;
  props?: React.ComponentProps<T>;
  children?: ComponentConfig[];
  transformer?: (model: D) => React.ComponentProps<T>;
}

/**
 * Interface to determine the API URL and version
 */
export interface DataSourceConfig {
  defaultListParams?: {
    [key: string]: string;
  };
  defaultDetailParams?: {
    [key: string]: string;
  };
  url: string;
}

/**
 * Interface to define the set of components that will be used for the detail page.
 */
export interface DetailConfig {
  mainColumn: ComponentConfig[];
  sideColumn: ComponentConfig[];
  top: ComponentConfig[];
}

export interface ColumnConfig<
  T,
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any
> {
  header: string;
  key: string;
  tooltip?: string;
  componentConfig: ComponentConfig<C, T>;
}

export interface ListConfig<T = any> {
  columns: ColumnConfig<T>[];
}

/**
 * Interface that will hold the whole configuration for a given site.
 */
export interface SiteConfig {
  redirectRootToPath?: string;
  datasources: DataSourceConfig;
  layout: {
    header: HeaderProps;
  };
  entities: EntityConfig[];
}
