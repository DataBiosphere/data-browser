import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://anvilproject.dev.clevercanary.com",
    "https://anvilproject.dev.clevercanary.com",
    "https://service.anvil.gi.ucsc.edu",
    GIT_HUB_REPO_URL
  ),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};

config.authentication = authenticationConfig;

export default config;
