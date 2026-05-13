import { APIEndpoints } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { FILTER_SORT } from "@databiosphere/findable-ui/lib/common/filters/sort/config/types";
import { SystemStatusBindResponseFn } from "@databiosphere/findable-ui/lib/config/entities";
import { bindSystemStatusResponse } from "../../../app/viewModelBuilders/azul/common/systemStatusMapper/systemStatusMapper";
import { GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { getAuthentication } from "./authentication/authentication";
import { CATEGORY_GROUP_CONFIG } from "./categoryGroup/categoryGroupConfig";
import { ENTITIES } from "./entities/entities";
import { EXPORT } from "./export/export";
import { getLayout } from "./layout/layout";
import { SUMMARY } from "./summary/summary";
import { THEME_OPTIONS } from "./themeOptions/themeOptions";

const APP_TITLE = "HCA Data Explorer";
const BROWSER_URL = "https://explore.dev.singlecell.gi.ucsc.edu";
const CATALOG = "dcp3";
export const DATA_URL = "https://service.dev.singlecell.gi.ucsc.edu";
const EXPORT_TO_TERRA_URL = "https://app.terra.bio";
const PAGINATION_PAGE_SIZE = "25";
export const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";
const REDIRECT_ROOT_TO_PATH = "/projects";

/**
 * Returns the config for the HCA DCP MA-DEV environment.
 * @param browserUrl - Browser URL.
 * @param portalUrl - Portal URL.
 * @param dataUrl - Data URL.
 * @param gitHubUrl - GitHub URL.
 * @param catalog - Catalog.
 * @param authentication - Authentication config.
 * @returns Config for the HCA DCP MA-DEV environment.
 */
export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
  gitHubUrl: string,
  catalog: string,
  authentication: SiteConfig["authentication"]
): SiteConfig {
  return {
    analytics: undefined,
    appTitle: APP_TITLE,
    authentication,
    browserURL: browserUrl,
    categoryGroupConfig: CATEGORY_GROUP_CONFIG,
    dataSource: {
      defaultListParams: { size: PAGINATION_PAGE_SIZE },
      defaultParams: { catalog },
      url: `${dataUrl}/`,
    },
    enableEntitiesView: true,
    entities: ENTITIES,
    export: EXPORT,
    exportToTerraUrl: EXPORT_TO_TERRA_URL,
    filterSort: { sortBy: FILTER_SORT.COUNT },
    gitHubUrl,
    layout: getLayout(APP_TITLE, portalUrl),
    portalURL: portalUrl,
    redirectRootToPath: REDIRECT_ROOT_TO_PATH,
    summaryConfig: SUMMARY,
    systemStatus: {
      apiPath: `${dataUrl}${APIEndpoints.INDEX_STATUS}`,
      bindResponse: <SystemStatusBindResponseFn>bindSystemStatusResponse,
    },
    themeOptions: THEME_OPTIONS,
  };
}

const config = makeConfig(
  BROWSER_URL,
  PORTAL_URL,
  DATA_URL,
  GIT_HUB_REPO_URL,
  CATALOG,
  getAuthentication(DATA_URL)
);

export default config;
