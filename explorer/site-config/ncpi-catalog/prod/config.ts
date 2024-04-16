import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import devConfig from "../dev/config";

const config: SiteConfig = { ...devConfig };

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "fMpsUBfsBk6PX_2YnVY64g";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
