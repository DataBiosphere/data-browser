import { ThemeOptions } from "@mui/material";
import { Footer, Header } from "app/components/Layout/common/entities";
import { JSXElementConstructor } from "react";
import { ExploreState } from "../../common/context/exploreState";
import { HeroTitle } from "../../components/common/Title/title";
import { ToggleButton } from "../../components/common/ToggleButtonGroup/toggleButtonGroup";

type GetIdFunction<T> = (detail: T) => string;
type EntityImportMapper<I, D> = (input: I) => D;

/**
 * Model of category configured in site config.
 */
export interface CategoryConfig {
  key: string;
  label: string;
}

/**
 * Interface used to define the tab label and route.
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
export interface EntityConfig<D = any, I = any> extends TabConfig {
  apiPath?: string;
  detail: BackPageConfig;
  getId?: GetIdFunction<D>;
  list: ListConfig;
  listView?: ListViewConfig;
  options?: Options;
  staticEntityImportMapper?: EntityImportMapper<I, D>;
  staticLoad: boolean;
  staticLoadFile?: string;
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
  children?: ComponentConfig[];
  component: React.FC<React.ComponentProps<T>>;
  props?: React.ComponentProps<T>;
  viewBuilder?: (
    model: D,
    exploreState?: ExploreState
  ) => React.ComponentProps<T>;
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
  defaultDetailParams?: {
    [key: string]: string;
  };
  defaultListParams?: {
    [key: string]: string;
  };
  url: string;
}

/**
 * Interface to define the set of components that will be used for the back page.
 */
export interface BackPageConfig {
  detailOverviews: TabConfig["label"][];
  staticLoad: boolean;
  tabs: BackPageTabConfig[];
  top: ComponentsConfig;
}

/**
 * Interface to determine the components for each tab on the back page
 */
export interface BackPageTabConfig extends TabConfig {
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
  componentConfig: ComponentConfig<C, T>;
  header: string;
  hiddenColumn?: boolean; //TODO rename to hidded by default or similar
  sort: {
    default?: boolean;
    sortKey: string;
  };
  tooltip?: string;
  width: GridTrackSize;
}

/**
 * Interface to define the entity list toggle button for switching between "views".
 */
export interface ListViewConfig {
  toggleButtons: ToggleButton[];
}

export interface GoogleGISAuthConfig {
  clientId: string;
  googleProfileEndpoint: string;
  scope: string;
  terraProfileEndpoint: string; // TODO move this to its own interface
}

/**
 * Interface to define the authentication configuration for a given site.
 */
export interface AuthenticationConfig {
  googleGISAuthConfig?: GoogleGISAuthConfig;
  loginNotice?: LoginNotice;
  text?: string;
  title: string;
}

/**
 * Interface to define the authentication login notice component.
 */
export interface LoginNotice {
  conditionsUrl: string;
  privacyUrl: string;
}

export type GridTrackAuto = "auto"; // Dimension specifying the track's maximum of the largest max-content size of the items in that track.
export type GridTrackFlex = `${number}fr`; // Dimension specifying the track's flex factor; unit in "fr".
export type GridTrackLength = `${number}px`; // Dimension specifying the track's (fixed) width; unit in "px".

/**
 * A min and max dimension specifying a size range greater than or equal to min and less than or equal to max.
 * As a maximum, a GridTrackFlex value sets the track's flex factor and is invalid as a minimum.
 */
export interface GridTrackMinMax {
  max: GridTrackAuto | GridTrackFlex | GridTrackLength;
  min: GridTrackAuto | GridTrackLength;
}

/**
 * A selection of possible types of track sizing values of each track (column).
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values.
 */
export type GridTrackSize =
  | GridTrackAuto
  | GridTrackLength
  | GridTrackFlex
  | GridTrackMinMax;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This config model can receive any model as type
export interface ListConfig<T = any> {
  columns: ColumnConfig<T>[];
}

/**
 * Interface that will hold the whole configuration for a given site.
 */
export interface SiteConfig {
  authentication?: AuthenticationConfig;
  browserURL: string;
  categoryConfigs?: CategoryConfig[];
  dataSource: DataSourceConfig;
  disablePagination?: boolean;
  entities: EntityConfig[];
  explorerTitle: HeroTitle;
  export?: BackPageConfig;
  exportToTerraUrl?: string; // TODO(cc) revist location; possibly nest inside "export"?
  layout: {
    footer: Footer;
    header: Header;
  };
  redirectRootToPath?: string;
  summaryConfig?: SummaryConfig;
  theme?: ThemeOptions;
}

export type ApiOption = "GET" | "POST";

export interface Options {
  method: ApiOption;
}
