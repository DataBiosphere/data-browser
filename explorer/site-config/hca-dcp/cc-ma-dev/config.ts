import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

// Template constants
const BROWSER_URL =
  "https://ma-pilot.explore.data.humancellatlas.dev.clevercanary.com";
const CATALOG = "dcp3";
const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, CATALOG),
  authentication: authenticationConfig,
};

const header = { ...config.layout.header };
config.layout.header = { ...header, authenticationEnabled: true };

export default config;
