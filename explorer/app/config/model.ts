import { HeaderProps } from "../components/Header/Header";

export interface SiteConfig {
  redirectRootToPath?: string;
  datasources: {
    catalog: "dcp2";
    url: string;
  };
  layout: {
    header: HeaderProps;
  };
}
