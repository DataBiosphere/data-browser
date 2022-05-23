import hcaDcpDev from "../../site-config/hca-dcp/dev/config";
import hcaDcpProd from "../../site-config/hca-dcp/prod/config";
import anvilProd from "../../site-config/anvil/prod/config";
import anvilDev from "../../site-config/anvil/dev/config";
import lungMapProd from "../../site-config/lungmap/prod/config";
import lungMapDev from "../../site-config/lungmap/dev/config";
import { SiteConfig } from "./model";

const CONFIGS: { [k: string]: SiteConfig } = {
  "hca-dcp-dev": hcaDcpDev,
  "hca-dcp-prod": hcaDcpProd,
  "anvil-prod": anvilProd,
  "anvil-dev": anvilDev,
  "lungmap-dev": lungMapDev,
  "lungmap-prod": lungMapProd,
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
