import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://ma-pilot.explore.data.dev.singlecell.gi.ucsc.edu";
const CATALOG = "dcp3";
const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const PORTAL_URL = "https://data.dev.singlecell.gi.ucsc.edu";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, CATALOG),
};

if (config.analytics) {
  config.analytics = undefined;
}

export default config;
