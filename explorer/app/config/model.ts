// Core dependencies
import { JSXElementConstructor } from "react";

// App dependencies
import { Footer, Header } from "app/components/Layout/common/entities";

type GetIdFunction<T> = (detail: T) => string;

/**
 * Interface used to defined the tab name and route
 */
interface TabConfig {
  label: string;
  route: string;
}

/**
 * Interface used to define the entities and router that will be used on the application, alongside with
 * the detail and the list page configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
export interface EntityConfig<D = any> extends TabConfig {
  apiPath: string;
  getId?: GetIdFunction<D>;
  staticLoad?: boolean;
  detail: DetailConfig;
  list: ListConfig;
}

/**
 * Interface used to define the configuration of a component.
 * This will be used by @see ComponentCreator to create the a react component with the given props and
 * making any necessary transformations.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any -- This config model is part of a generic array */
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
 * Type to determine the array of components that will be created on using @see ComponentCreator.
 * This can be a array of @see ComponentConfig or a function that returns an array of @see ComponentConfig
 */
export type ComponentsConfig =
  | ComponentConfig[]
  | ((config: SiteConfig) => ComponentConfig[]);

/* eslint-enable @typescript-eslint/no-explicit-any -- This config model is part of a generic array */

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
  tabs: DetailTabConfig[];
  top: ComponentsConfig;
}

/**
 * Interface to determine the components for each tab on the detail page
 */
export interface DetailTabConfig extends TabConfig {
  mainColumn: ComponentsConfig;
  sideColumn: ComponentsConfig;
}

/**
 * Interface to determine the summary components and endpoint placed above the entities list.
 */
export interface SummaryConfig {
  apiPath: string;
  components: ComponentsConfig;
}

export interface ColumnConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model is part of a generic array
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = any
> {
  header: string;
  tooltip?: string;
  sort?: {
    sortKey: string;
    default?: boolean;
  };
  componentConfig: ComponentConfig<C, T>;
  hiddenColumn?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model can receive any model as type
export interface ListConfig<T = any> {
  columns: ColumnConfig<T>[];
}

/**
 * Interface that will hold the whole configuration for a given site.
 */
export interface SiteConfig {
  browserURL: string;
  datasources: DataSourceConfig;
  entities: EntityConfig[];
  layout: {
    footer: Footer;
    header: Header;
  };
  redirectRootToPath?: string;
  summary?: SummaryConfig;
}
