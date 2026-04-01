import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

// TODO #4749: Temporary - pointing cc-dev to prod backend (revert when done)
// const config: SiteConfig = {
//   ...makeConfig(
//     "https://anvilproject.dev.clevercanary.com",
//     "https://anvilproject.dev.clevercanary.com",
//     "https://service.anvil.gi.ucsc.edu",
//     GIT_HUB_REPO_URL
//   ),
//   exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
// };
const config: SiteConfig = {
  ...makeConfig(
    "https://anvilproject.dev.clevercanary.com",
    "https://anvilproject.dev.clevercanary.com",
    "https://service.explore.anvilproject.org",
    GIT_HUB_REPO_URL,
    "anvil13" // Prod catalog required by prod backend
  ),
  exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
};
// END TODO #4749

config.authentication = authenticationConfig;

export default config;
