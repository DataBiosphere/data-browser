import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

// Template constants
const BROWSER_URL = "https://anvil.gi.ucsc.edu";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  exportToTerraUrl: "https://app.terra.bio",
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "uzpbIpQCqYU7iBueAeD9MA";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
