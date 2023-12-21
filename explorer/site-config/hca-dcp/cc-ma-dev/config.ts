import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";
import { getMAExportConfig } from "./export/export";
import { getMAEntitiesConfig } from "./index/projectsEntityConfig";

// Template constants
const BROWSER_URL =
  "https://ma-pilot.explore.data.humancellatlas.dev.clevercanary.com";
const CATALOG = "dcp3";
const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";

const config: SiteConfig = {
  ...makeManagedAccessConfig(
    makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL, CATALOG)
  ),
  authentication: authenticationConfig,
};

/**
 * Returns managed access config.
 * @param config - Site config.
 * @returns managed access config.
 */
export function makeManagedAccessConfig(config: SiteConfig): SiteConfig {
  // Adding authentication to the header.
  const header = { ...config.layout.header };
  config.layout.header = { ...header, authenticationEnabled: true };

  // Update entities.
  const entities = [...config.entities];
  config.entities = getMAEntitiesConfig(entities);

  // Update export.
  if (config.export) {
    const exportConfig = { ...config.export };
    config.export = getMAExportConfig(exportConfig);
  }
  return config;
}

export default config;
