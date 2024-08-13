import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../app/components/index";
import { socialMedia, SOCIALS } from "../../anvil/dev/socialMedia";
import { SiteConfig } from "../../common/entities";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../category";
import { exportConfig } from "./export/export";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";

// Template constants
const APP_TITLE = "AnVIL Dataset Catalog";
const BROWSER_URL = "https://anvilproject.dev.clevercanary.com";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
const HOME_PAGE_PATH = "/consortia";
const PORTAL_URL = "https://anvilproject.dev.clevercanary.com";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  explorerUrl: string
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
    layout: {
      footer: {
        Branding: C.ANVILBranding({ portalURL: undefined }),
        navLinks: [
          {
            label: "Help",
            url: `${portalUrl}/help`,
          },
          {
            label: "Privacy",
            url: `${portalUrl}/privacy`,
          },
        ],
        socials: socialMedia.socials,
      },
      header: {
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 40,
          link: portalUrl,
          src: "/images/logoAnvil.png",
        }),
        navigation: [
          undefined,
          [
            {
              label: "Overview",
              url: `${portalUrl}/overview`,
            },
            {
              label: "Learn",
              url: `${portalUrl}/learn`,
            },
            {
              label: "Datasets",
              menuItems: [
                {
                  description:
                    "An open-access view of studies, workspaces, and consortia.",
                  label: "Catalog",
                  url: HOME_PAGE_PATH,
                },
                {
                  description:
                    "Build, download, and export cross-study cohorts of open and managed access data.",
                  label: C.LabelIconMenuItem({
                    iconFontSize: "small",
                    label: "Explorer",
                  }),
                  target: ANCHOR_TARGET.BLANK,
                  url: `${explorerUrl}/datasets`,
                },
              ],
              url: "",
            },
            {
              label: "Consortia",
              url: `${portalUrl}/consortia`,
            },
            {
              label: "More",
              menuItems: [
                {
                  label: "News",
                  url: `${portalUrl}/news`,
                },
                {
                  label: "Events",
                  url: `${portalUrl}/events`,
                },
                {
                  label: "Team",
                  url: `${portalUrl}/team`,
                },
                {
                  label: "FAQ",
                  url: `${portalUrl}/faq`,
                },
                {
                  label: "Help",
                  url: `${portalUrl}/help`,
                },
                {
                  label: "Follow Us",
                  menuItems: [
                    {
                      ...SOCIALS.DISCOURSE,
                      icon: C.DiscourseIcon({ fontSize: "small" }),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.X,
                      icon: C.XIcon({ fontSize: "small" }),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.YOUTUBE,
                      icon: C.YouTubeIcon({ fontSize: "small" }),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.GITHUB,
                      icon: C.GitHubIcon({ fontSize: "small" }),
                      target: ANCHOR_TARGET.BLANK,
                    },
                    {
                      ...SOCIALS.SLACK,
                      icon: C.SlackIcon({ fontSize: "small" }),
                      target: ANCHOR_TARGET.BLANK,
                    },
                  ],
                  url: "",
                  visible: { lg: false, sm: false, xs: false },
                },
              ],
              url: "",
            },
          ],
          undefined,
        ],
        searchEnabled: true,
        searchURL: `${portalUrl}/search`,
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
