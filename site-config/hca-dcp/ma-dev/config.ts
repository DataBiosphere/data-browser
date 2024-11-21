import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { makeManagedAccessConfig } from "../cc-ma-dev/config";
import { makeConfig } from "../dev/config";

// Template constants
const BROWSER_URL = "https://explore.dev.singlecell.gi.ucsc.edu";
const CATALOG = "dcp3";
export const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
export const PORTAL_URL = "https://dev.singlecell.gi.ucsc.edu";

const config: SiteConfig = {
  ...makeManagedAccessConfig(
    makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, GIT_HUB_REPO_URL, CATALOG)
  ),
};

// Removing analytics from the config.
if (config.analytics) {
  config.analytics = undefined;
}

export default config;
