import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { make_config } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...make_config("https://anvilproject.dev.clevercanary.com"),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};

config.dataSource.url = "https://service.anvil.gi.ucsc.edu/";
config.authentication = authenticationConfig;

export default config;
