import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://anvilproject.dev.clevercanary.com",
    "https://anvilproject.dev.clevercanary.com"
  ),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};

config.dataSource.url = "https://service.anvil.gi.ucsc.edu/";
config.authentication = authenticationConfig;

export default config;
