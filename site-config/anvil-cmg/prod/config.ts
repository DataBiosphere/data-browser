import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://explore.anvilproject.org",
    "https://anvilproject.org",
    "https://service.explore.anvilproject.org",
    GIT_HUB_REPO_URL,
    "anvil12"
  ),
  exportToTerraUrl: "https://anvil.terra.bio/",
};

config.authentication = authenticationConfig;

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "uzpbIpQCqYU7iBueAeD9MA";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
