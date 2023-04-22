import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

const config: SiteConfig = { ...devConfig };

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "rrXpUu-I_wxMe0FRk_mnIg"; // TODO(cc) revert to "foHZB1OikGzRdcl1gkapNw"
  config.analytics = analytics;
}

export default config;
