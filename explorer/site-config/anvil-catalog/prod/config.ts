import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import anvilCatalogDevConfig from "../dev/config";

const config: SiteConfig = { ...anvilCatalogDevConfig };

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "foHZB1OikGzRdcl1gkapNw";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
