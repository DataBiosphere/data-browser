import { HeaderProps } from "../components/Header/Header";

export interface SiteConfig {
  datasources: {
    catalog: "dcp2";
    url: string;
  };
  layout: {
    header: HeaderProps;
  };
}
