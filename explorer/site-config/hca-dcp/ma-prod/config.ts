import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";
import maDevConfig from "../ma-dev/config";
import { authenticationConfig } from "./authentication/authentication";

// Template constants
const BROWSER_URL = "https://ma-pilot.explore.data.humancellatlas.org";
const DATA_URL = "https://service.azul.data.humancellatlas.org";
const PORTAL_URL = "https://data.humancellatlas.org";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL),
  authentication: authenticationConfig,
};

// Adding authentication to the header.
const header = { ...config.layout.header };
config.layout.header = { ...header, authenticationEnabled: true };

// Update entities.
config.entities = [...maDevConfig.entities];

// Update export.
if (config.export) {
  config.export = maDevConfig.export ? { ...maDevConfig.export } : undefined;
}

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
