import { setConfig } from "@databiosphere/findable-ui/lib/config/config";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import anvilCatalogDev from "../../site-config/anvil-catalog/dev/config";
import anvilCatalogProd from "../../site-config/anvil-catalog/prod/config";
import anvilCmgCCDev from "../../site-config/anvil-cmg/cc-dev/config";
import anvilCmgDev from "../../site-config/anvil-cmg/dev/config";
import anvilCmgProd from "../../site-config/anvil-cmg/prod/config";
import anvilCmgTempdev from "../../site-config/anvil-cmg/tempdev/config";
import anvilDev from "../../site-config/anvil/dev/config";
import anvilProd from "../../site-config/anvil/prod/config";
import hcaDcpCCMaDev from "../../site-config/hca-dcp/cc-ma-dev/config";
import hcaDcpDev from "../../site-config/hca-dcp/dev/config";
import hcaDcpMaDev from "../../site-config/hca-dcp/ma-dev/config";
import hcaDcpMaProd from "../../site-config/hca-dcp/ma-prod/config";
import hcaDcpProd from "../../site-config/hca-dcp/prod/config";
import lungMapDev from "../../site-config/lungmap/dev/config";
import lungMapProd from "../../site-config/lungmap/prod/config";
import ncpiMapDev from "../../site-config/ncpi-catalog/dev/config";
import ncpiMapProd from "../../site-config/ncpi-catalog/prod/config";

const CONFIGS: { [k: string]: SiteConfig } = {
  "anvil-catalog-dev": anvilCatalogDev,
  "anvil-catalog-prod": anvilCatalogProd,
  "anvil-cmg-cc-dev": anvilCmgCCDev,
  "anvil-cmg-dev": anvilCmgDev,
  "anvil-cmg-prod": anvilCmgProd,
  "anvil-cmg-tempdev": anvilCmgTempdev,
  "anvil-dev": anvilDev,
  "anvil-prod": anvilProd,
  "hca-dcp-cc-ma-dev": hcaDcpCCMaDev,
  "hca-dcp-dev": hcaDcpDev,
  "hca-dcp-ma-dev": hcaDcpMaDev,
  "hca-dcp-ma-prod": hcaDcpMaProd,
  "hca-dcp-prod": hcaDcpProd,
  "lungmap-dev": lungMapDev,
  "lungmap-prod": lungMapProd,
  "ncpi-catalog-dev": ncpiMapDev,
  "ncpi-catalog-prod": ncpiMapProd,
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

  setConfig(appConfig); // Sets app config.
  return appConfig;
};
