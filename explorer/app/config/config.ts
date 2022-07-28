import hcaDcpDev from "../../site-config/hca-dcp/dev/config";
import hcaDcpProd from "../../site-config/hca-dcp/prod/config";
import anvilProd from "../../site-config/anvil/prod/config";
import anvilDev from "../../site-config/anvil/dev/config";
import anvilCatalogProd from "../../site-config/anvil-catalog/prod/config";
import anvilCatalogDev from "../../site-config/anvil-catalog/dev/config";
import lungMapProd from "../../site-config/lungmap/prod/config";
import lungMapDev from "../../site-config/lungmap/dev/config";
import ncpiMapProd from "../../site-config/ncpi-catalog/prod/config";
import ncpiMapDev from "../../site-config/ncpi-catalog/dev/config";
import ncpiDugMapProd from "../../site-config/ncpi-catalog-dug/prod/config";
import ncpiDugMapDev from "../../site-config/ncpi-catalog-dug/dev/config";
import { SiteConfig } from "./common/entities";

const CONFIGS: { [k: string]: SiteConfig } = {
  "anvil-catalog-dev": anvilCatalogDev,
  "anvil-catalog-prod": anvilCatalogProd,
  "anvil-dev": anvilDev,
  "anvil-prod": anvilProd,
  "hca-dcp-dev": hcaDcpDev,
  "hca-dcp-prod": hcaDcpProd,
  "lungmap-dev": lungMapDev,
  "lungmap-prod": lungMapProd,
  "ncpi-catalog-dev": ncpiMapDev,
  "ncpi-catalog-dug-dev": ncpiDugMapDev,
  "ncpi-catalog-dug-prod": ncpiDugMapProd,
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

  return appConfig;
};
