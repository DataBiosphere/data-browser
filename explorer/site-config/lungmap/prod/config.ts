import { SiteConfig } from "../../common/entities";
import {
  DATA_URL as HCA_DATA_URL,
  PORTAL_URL as HCA_PORTAL_URL,
} from "../../hca-dcp/prod/config";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://data-browser.lungmap.net";
const DATA_URL = HCA_DATA_URL;
const PORTAL_URL = HCA_PORTAL_URL;

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL),
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
