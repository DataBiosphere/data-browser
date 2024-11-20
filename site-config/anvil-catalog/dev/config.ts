import * as C from "../../../app/components/index";
import { socialMedia } from "../../anvil/dev/socialMedia";
import { SiteConfig } from "../../common/entities";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../category";
import { PORTAL_ROUTES, ROUTES } from "./common/constants";
import { exportConfig } from "./export/export";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";
import { buildNavigation as buildFooterNavigation } from "./layout/footer/navigation/navigation";
import { buildNavigation } from "./layout/header/navigation/navigation";

// Template constants
const APP_TITLE = "AnVIL Dataset Catalog";
const BROWSER_URL = "https://anvilproject.dev.clevercanary.com";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
const GIT_HUB_REPO_URL = "https://github.com/DataBiosphere/data-browser";
const HOME_PAGE_PATH = ROUTES.CONSORTIA;
const PORTAL_URL = "https://anvilproject.dev.clevercanary.com";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  explorerUrl: string,
  gitHubUrl: string = GIT_HUB_REPO_URL
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "rrXpUu-I_wxMe0FRk_mnIg", // GTM environment-specific
      gtmId: "GTM-WCWXHT4",
      gtmPreview: "env-4",
    },
    appTitle: APP_TITLE,
    authentication: undefined,
    browserURL: browserUrl,
    categoryGroupConfig: {
      categoryGroups: [
        {
          categoryConfigs: [
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
              label: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
              label: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
              label: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
              label: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
              label: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
              label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
              label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
            },
            {
              key: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
              label: "Terra Workspace Name", // TODO review label here and elsewhere
            },
          ],
        },
      ],
      key: "anvil-catalog",
    },
    dataSource: {
      url: "",
    },
    entities: [
      consortiaEntityConfig,
      studiesEntityConfig,
      workspaceEntityConfig,
    ],
    explorerTitle: APP_TITLE,
    export: exportConfig, // TODO(cc) export config should be optional, we should add notFound to export pages.
    gitHubUrl,
    layout: {
      footer: {
        Branding: C.ANVILBranding({ portalURL: undefined }),
        navLinks: buildFooterNavigation(portalUrl),
        socials: socialMedia.socials,
        versionInfo: true,
      },
      header: {
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 40,
          link: portalUrl,
          src: "/images/logoAnvil.png",
        }),
        navigation: buildNavigation(portalUrl, explorerUrl),
        searchEnabled: true,
        searchURL: `${portalUrl}${PORTAL_ROUTES.SEARCH}`,
        slogan: SLOGAN,
        socialMedia,
      },
    },
    portalURL: portalUrl,
    redirectRootToPath: HOME_PAGE_PATH,
    summaryConfig: undefined,
    themeOptions: {
      palette: {
        primary: {
          dark: "#003E76",
          main: "#035C94",
        },
      },
    },
  };
}

const config: SiteConfig = makeConfig(BROWSER_URL, PORTAL_URL, EXPLORER_URL);

export default config;
