import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://anvilproject.org";
const EXPLORER_URL = "https://explore.anvilproject.org";
const PORTAL_URL = "https://anvilproject.org";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, EXPLORER_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "foHZB1OikGzRdcl1gkapNw";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
