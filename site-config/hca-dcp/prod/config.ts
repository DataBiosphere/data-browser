import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://explore.data.humancellatlas.org";
export const DATA_URL = "https://service.azul.data.humancellatlas.org";
export const PORTAL_URL = "https://data.humancellatlas.org";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, GIT_HUB_REPO_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
