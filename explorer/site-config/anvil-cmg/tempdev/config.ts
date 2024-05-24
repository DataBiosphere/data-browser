import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://explore.temp.gi.ucsc.edu",
    "https://anvilproject.org",
    "https://service.temp.gi.ucsc.edu",
    "anvil"
  ),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};

config.authentication = authenticationConfig;

export default config;
