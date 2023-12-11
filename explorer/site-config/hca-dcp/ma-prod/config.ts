import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";

// Template constants
const PORTAL_URL = "https://data.humancellatlas.org";
const BROWSER_URL = "https://ma-pilot.explore.data.humancellatlas.org";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
