import { SiteConfig } from "../../../app/config/common/entities";
import devConfig from "../dev/config";

// Template constants
const BROWSER_URL = "https://data.humancellatlas.org";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  dataSource: {
    defaultDetailParams: {
      catalog: "dcp21",
    },
    defaultListParams: {
      catalog: "dcp21",
      size: "25",
    },
    url: "https://service.azul.data.humancellatlas.org/",
  },
  exportToTerraUrl: "https://app.terra.bio/",
};

export default config;
