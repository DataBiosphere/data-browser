import hcaDcpDev from "../../site-config/hca-dcp/dev/config";
import hcaDcpProd from "../../site-config/hca-dcp/prod/config";
import { SiteConfig } from "./model";

const CONFIGS: { [k: string]: SiteConfig } = {
  "hca-dcp-dev": hcaDcpDev,
  "hca-dcp-prod": hcaDcpProd,
};

let appConfig: SiteConfig | null = null;

export const config = (): SiteConfig => {
  if (appConfig) {
    return appConfig;
  }

  const config = process.env.NEXT_PUBLIC_SITE_CONFIG;

  if (!config) {
    console.error(`Config not found. config: ${config}`);
  }

  appConfig = CONFIGS[config as string];

  if (!appConfig) {
    console.error(`No app config was found for the config: ${config}`);
  } else {
    console.log(`Using app config ${config}`);
  }

  return appConfig;
};
