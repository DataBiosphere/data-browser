import { APIEndpoints } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SystemStatusBindResponseFn } from "@databiosphere/findable-ui/lib/config/entities";
import { tabletUp } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import {
  TEXT_BODY_LARGE_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import * as C from "../../../app/components/index";
import { bindSystemStatusResponse } from "../../../app/viewModelBuilders/azul/common/systemStatusMapper/systemStatusMapper";
import { FLATTEN, GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { announcements } from "./announcements/announcements";
import { exportConfig } from "./export/export";
import { CATEGORY_GROUPS } from "./index/common/category";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { projectsEntityConfig } from "./index/projectsEntityConfig";
import { samplesEntityConfig } from "./index/samplesEntityConfig";
import { summary } from "./index/summary";
import { floating } from "./layout/floating";

// Template constants
const APP_TITLE = "HCA Data Explorer";
const CATALOG = "dcp50";
const BROWSER_URL = "https://explore.data.humancellatlas.dev.clevercanary.com";
const DATA_URL = "https://service.azul.data.humancellatlas.org";
const EXPORT_TO_TERRA_URL = "https://app.terra.bio";
const FONT_FAMILY_DIN = "'din-2014', sans-serif";
const HOME_PAGE_PATH = "/projects";
const ORG_URL = "https://www.humancellatlas.org";
const PAGINATION_PAGE_SIZE = "25";
export const PORTAL_URL = "https://data.humancellatlas.dev.clevercanary.com";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
  gitHubUrl: string,
  catalog: string = CATALOG
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "eQWri5eLUCDkm5SvLIv8eQ", // GTM environment-specific
      gtmId: "GTM-M2J5NTJ",
      gtmPreview: "env-186",
    },
    appTitle: APP_TITLE,
    authentication: undefined,
    browserURL: browserUrl,
    categoryGroupConfig: {
      categoryGroups: CATEGORY_GROUPS,
      key: "hca-dcp",
    },
    dataSource: {
      defaultListParams: {
        size: PAGINATION_PAGE_SIZE,
      },
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/`,
    },
    enableEntitiesView: true,
    entities: [projectsEntityConfig, samplesEntityConfig, filesEntityConfig],
    explorerTitle: "Explore Data",
    export: exportConfig,
    exportToTerraUrl: EXPORT_TO_TERRA_URL,
    gitHubUrl,
    layout: {
      floating,
      footer: {
        Branding: C.HCABranding({
          orgURL: ORG_URL,
          portalURL: portalUrl,
        }),
        navLinks: [
          {
            label: "About",
            target: ANCHOR_TARGET.BLANK,
            url: `${portalUrl}/about`,
          },
          {
            label: "Help",
            target: ANCHOR_TARGET.BLANK,
            url: `${portalUrl}/help`,
          },
          {
            label: "Privacy",
            target: ANCHOR_TARGET.BLANK,
            url: `${portalUrl}/privacy`,
          },
          {
            label: "Contact",
            target: ANCHOR_TARGET.BLANK,
            url: `${portalUrl}/contact`,
          },
        ],
        versionInfo: true,
      },
      header: {
        announcements,
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32.5,
          link: HOME_PAGE_PATH,
          src: "/images/hcaExplorer.png",
        }),
        navigation: [
          undefined,
          undefined,
          [
            {
              flatten: FLATTEN.XS_ONLY,
              label: "Help & Documentation",
              menuItems: [
                {
                  label: C.LabelIconMenuItem({ label: "Guides" }),
                  target: ANCHOR_TARGET.BLANK,
                  url: `${portalUrl}/guides`,
                },
                {
                  label: C.LabelIconMenuItem({ label: "Privacy" }),
                  target: ANCHOR_TARGET.BLANK,
                  url: `${portalUrl}/privacy`,
                },
              ],
              url: "",
            },
          ],
        ],
        searchEnabled: false,
        searchURL: `${portalUrl}/search`,
      },
    },
    portalURL: portalUrl,
    redirectRootToPath: HOME_PAGE_PATH,
    summaryConfig: {
      apiPath: "index/summary",
      components: summary,
    },
    systemStatus: {
      apiPath: `${dataUrl}${APIEndpoints.INDEX_STATUS}`,
      bindResponse: <SystemStatusBindResponseFn>bindSystemStatusResponse,
    },
    themeOptions: {
      palette: {
        primary: {
          dark: "#005EA9",
          main: "#1C7CC7",
        },
      },
      typography: {
        [TEXT_BODY_LARGE_500]: {
          fontFamily: FONT_FAMILY_DIN,
          fontSize: 18,
          fontWeight: 400,
        },
        [TEXT_HEADING]: {
          fontFamily: FONT_FAMILY_DIN,
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: "normal",
          [tabletUp]: {
            fontSize: 26,
            letterSpacing: "normal",
          },
        },
        [TEXT_HEADING_LARGE]: {
          fontFamily: FONT_FAMILY_DIN,
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: "normal",
          lineHeight: "34px",
          [tabletUp]: {
            fontSize: 32,
            letterSpacing: "normal",
          },
        },
        [TEXT_HEADING_SMALL]: {
          fontFamily: FONT_FAMILY_DIN,
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: "normal",
          [tabletUp]: {
            fontSize: 22,
            letterSpacing: "normal",
          },
        },
        [TEXT_HEADING_XLARGE]: {
          fontFamily: FONT_FAMILY_DIN,
          fontSize: 32,
          fontWeight: 400,
          letterSpacing: "normal",
          [tabletUp]: {
            fontSize: 42,
            letterSpacing: "-0.4px",
          },
        },
      },
    },
  };
}

const config: SiteConfig = makeConfig(
  BROWSER_URL,
  PORTAL_URL,
  DATA_URL,
  GIT_HUB_REPO_URL
);

export default config;
