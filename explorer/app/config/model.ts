import { DetailResponseType, ListResponseType } from "app/models/responses";
import { ListViewModel } from "app/models/viewModels";
import { HeaderProps } from "../components/Header/header";
import { JSXElementConstructor } from "react";

type ListTransformerFunction<T extends ListResponseType> = (
  response: T
) => ListViewModel;

type GetIdFunction<T extends DetailResponseType> = (detail: T) => string;

/**
 * Interface used to define the entities and router that will be used on the application.
 */
export interface EntityConfig<
  L extends ListResponseType = any,
  D extends DetailResponseType = any
> {
  label: string;
  route: string;
  apiPath: string;
  listTransformer: ListTransformerFunction<L>;
  getId?: GetIdFunction<D>;
  staticLoad?: boolean;
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
  component: React.FC<any>;
  props?: React.ComponentProps<T>;
  children?: ComponentConfig[];
  transformer?: (model: D) => React.ComponentProps<T>;
}

/**
 * Interface to defermine the api URL and version
 */
export interface DataSourceConfig {
  catalog: string;
  url: string;
}

/**
 * Interface to define the the set of components that will be used for the two columns of the details pages.
 */
export interface DetailConfig {
  mainColumn: ComponentConfig[];
  sideColumn: ComponentConfig[];
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
  detail?: DetailConfig;
}
