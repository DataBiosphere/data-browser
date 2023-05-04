import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { make_config } from "../dev/config";

const config: SiteConfig = {
  ...make_config("https://prod.anvil.gi.ucsc.edu"),
  exportToTerraUrl: "https://app.terra.bio/",
};

config.dataSource.url = "https://service.prod.anvil.gi.ucsc.edu/";

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "uzpbIpQCqYU7iBueAeD9MA";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
