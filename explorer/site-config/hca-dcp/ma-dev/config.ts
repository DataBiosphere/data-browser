import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { authenticationConfig } from "../cc-ma-dev/authentication/authentication";
import maConfig from "../cc-ma-dev/config";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://ma-pilot.explore.data.dev.singlecell.gi.ucsc.edu";
const CATALOG = "dcp3";
const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const PORTAL_URL = "https://data.dev.singlecell.gi.ucsc.edu";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, CATALOG),
  authentication: authenticationConfig,
};

// Adding authentication to the header.
const header = { ...config.layout.header };
config.layout.header = { ...header, authenticationEnabled: true };

// Update entities.
config.entities = [...maConfig.entities];

// Update export.
if (config.export) {
  config.export = maConfig.export ? { ...maConfig.export } : undefined;
}

// Removing analytics from the config.
if (config.analytics) {
  config.analytics = undefined;
}

export default config;
