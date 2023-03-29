import { authenticationConfig } from "./authentication/authentication";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { make_config } from "../dev/config";
import { downloadColumn } from "../dev/index/filesEntityConfig";

const config: SiteConfig = {
  ...make_config("https://prod.anvil.gi.ucsc.edu"),
  exportToTerraUrl: "https://app.terra.bio/",
};

config.dataSource.url = "https://service.prod.anvil.gi.ucsc.edu/";
config.authentication = authenticationConfig;

let filesEntityConfig = config.entities.find(c => c.apiPath == 'index/files');
filesEntityConfig!.list.columns.splice(0, 0, downloadColumn);

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "uzpbIpQCqYU7iBueAeD9MA";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
