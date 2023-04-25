import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

// Template constants
const BROWSER_URL = "https://anvilproject.org/";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  exportToTerraUrl: "https://app.terra.bio/",
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "IgbX8s-NCGg81Z0eWB6KAQ";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
