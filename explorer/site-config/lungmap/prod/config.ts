import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import devConfig from "../dev/config";

// Template constants
const BROWSER_URL = "https://data-browser.lungmap.net";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
};

export default config;
