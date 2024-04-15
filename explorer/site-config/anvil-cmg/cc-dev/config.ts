import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://anvilproject.dev.clevercanary.com",
    "https://anvilproject.dev.clevercanary.com",
    "https://service.anvil.gi.ucsc.edu"
  ),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};

config.authentication = authenticationConfig;

export default config;
