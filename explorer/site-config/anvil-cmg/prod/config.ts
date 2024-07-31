import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { SiteConfig } from "../../common/entities";
import { makeConfig } from "../dev/config";
import { downloadColumn } from "../dev/index/filesEntityConfig";
import { authenticationConfig } from "./authentication/authentication";

const config: SiteConfig = {
  ...makeConfig(
    "https://explore.anvilproject.org",
    "https://anvilproject.org",
    "https://service.explore.anvilproject.org",
    "anvil7"
  ),
  exportToTerraUrl: "https://anvil.terra.bio/",
};

config.authentication = authenticationConfig;

const filesEntityConfig = config.entities.find(
  (c) => c.apiPath == "index/files"
) as EntityConfig;
filesEntityConfig.list.columns.splice(0, 0, downloadColumn);

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "uzpbIpQCqYU7iBueAeD9MA";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
