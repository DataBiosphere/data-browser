import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { getAuthenticationConfig } from "./authentication/authentication";
import { getMAExportConfig } from "./export/export";
import {
  getMACategoryGroupConfig,
  getMAEntitiesConfig,
} from "./index/projectsEntityConfig";

// Template constants
const BROWSER_URL =
  "https://ma-pilot.explore.data.humancellatlas.dev.clevercanary.com";
const CATALOG = "dcp3";
const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const GIT_HUB_REPO_URL = "https://github.com/DataBiosphere/data-browser";
const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";

const config: SiteConfig = {
  ...makeManagedAccessConfig(
    makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, GIT_HUB_REPO_URL, CATALOG)
  ),
};

/**
 * Returns managed access config.
 * @param config - Site config.
 * @returns managed access config.
 */
export function makeManagedAccessConfig(config: SiteConfig): SiteConfig {
  // Clone config.
  const cloneConfig = { ...config };

  // Add authentication to the config.
  cloneConfig.authentication = getAuthenticationConfig();

  // Update categoryGroupConfig.
  cloneConfig.categoryGroupConfig = getMACategoryGroupConfig(
    cloneConfig.categoryGroupConfig
  );

  // Adding authentication to the header.
  const header = { ...cloneConfig.layout.header };
  cloneConfig.layout.header = { ...header, authenticationEnabled: true };

  // Update entities.
  cloneConfig.entities = getMAEntitiesConfig(cloneConfig.entities);

  // Update export.
  if (cloneConfig.export) {
    cloneConfig.export = getMAExportConfig(cloneConfig.export);
  }

  return cloneConfig;
}

export default config;
