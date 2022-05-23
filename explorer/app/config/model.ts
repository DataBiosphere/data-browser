import { HeaderProps } from "../components/Header/Header";

export interface SiteConfig {
  redirectRootToPath?: string;
  datasources: {
    catalog: string;
    url: string;
  };
  layout: {
    header: HeaderProps;
  };
}
