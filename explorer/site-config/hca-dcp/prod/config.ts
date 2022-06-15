// App dependencies
import { SiteConfig } from "../../../app/config/model";
import devConfig from "../dev/config";

const config: SiteConfig = {
  ...devConfig,
  datasources: {
    catalog: "dcp16",
    url: "https://service.azul.data.humancellatlas.org/",
  },
};

export default config;
