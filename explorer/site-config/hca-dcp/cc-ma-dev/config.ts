import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";

// Template constants
const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";
const BROWSER_URL =
  "https://ma-pilot.explore.data.humancellatlas.dev.clevercanary.com";

const config: SiteConfig = {
  ...makeConfig(BROWSER_URL, PORTAL_URL),
};

export default config;
