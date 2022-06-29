// App dependencies
import { SiteConfig } from "../../../app/config/model";
import devConfig from "../dev/config";

const BROWSER_URL = "https://data.humancellatlas.org";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  datasources: {
    defaultDetailParams: {
      catalog: "dcp16",
    },
    defaultListParams: {
      catalog: "dcp16",
      size: "25",
    },
    url: "https://service.azul.data.humancellatlas.org/",
  },
};

export default config;
