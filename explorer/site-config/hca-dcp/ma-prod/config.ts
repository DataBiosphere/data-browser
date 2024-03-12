import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeManagedAccessConfig } from "../cc-ma-dev/config";
import { makeConfig } from "../dev/config";
import { getAuthenticationConfig } from "./authentication/authentication";

// Template constants
const BROWSER_URL = "https://ma-pilot.explore.data.humancellatlas.org";
const DATA_URL = "https://service.azul.data.humancellatlas.org";
const PORTAL_URL = "https://data.humancellatlas.org";

const config: SiteConfig = {
  ...makeManagedAccessConfig(makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL)),
  authentication: getAuthenticationConfig(PORTAL_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
