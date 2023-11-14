import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../../app/components/index";
import anvilDevConfig from "../../anvil/dev/config";
import { socials } from "../../anvil/dev/constants";
import { SiteConfig } from "../../common/entities";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../category";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";

// Template constants
const APP_TITLE = "AnVIL Dataset Catalog";
const EXPLORER_URL = "https://explore.anvilproject.dev.clevercanary.com";
const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const ROOT_PATH = "/consortia";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";

const config: SiteConfig = {
  ...anvilDevConfig,
  analytics: {
    gtmAuth: "rrXpUu-I_wxMe0FRk_mnIg", // GTM environment-specific
    gtmId: "GTM-WCWXHT4",
    gtmPreview: "env-4",
  },
  appTitle: APP_TITLE,
  authentication: undefined,
  browserURL: BROWSER_URL,
  categoryGroupConfigs: [
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
  dataSource: {
    url: "",
  },
  entities: [consortiaEntityConfig, studiesEntityConfig, workspaceEntityConfig],
  explorerTitle: APP_TITLE,
  layout: {
    footer: {
      Branding: C.ANVILBranding({ portalURL: undefined }),
      navLinks: [
        {
          label: "Help",
          url: `${PORTAL_URL}help`,
        },
        {
          label: "Privacy",
          url: `${PORTAL_URL}privacy`,
        },
      ],
      socials,
    },
    header: {
      Logo: C.Logo({
        alt: SLOGAN,
        height: 40,
        link: PORTAL_URL,
        src: "/images/logoAnvil.png",
      }),
      authenticationEnabled: false,
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
      navLinks: [
        {
          label: "Overview",
          url: `${PORTAL_URL}overview`,
        },
        {
          label: "Learn",
          url: `${PORTAL_URL}learn`,
        },
        {
          featureFlag: false,
          label: "Datasets",
          url: ROOT_PATH,
        },
        {
          featureFlag: true,
          label: "Datasets",
          menuItems: [
            {
              description:
                "An open-access view of studies, workspaces, and consortia.",
              label: "Catalog",
              url: ROOT_PATH,
            },
            {
              description:
                "Build, download, and export cross-study cohorts of open and managed access data.",
              label: C.LabelIconMenuItem({
                iconFontSize: "small",
                label: "Explorer",
              }),
              target: ANCHOR_TARGET.BLANK,
              url: `${EXPLORER_URL}/datasets`,
            },
          ],
          url: "",
        },
        {
          label: "Consortia",
          url: `${PORTAL_URL}consortia`,
        },
        {
          label: "News",
          url: `${PORTAL_URL}news`,
        },
        {
          label: "Events",
          url: `${PORTAL_URL}events`,
        },
        {
          label: HEADER_NAVIGATION_LABEL.MORE,
          menuItems: [
            {
              label: "Team",
              url: `${PORTAL_URL}team`,
            },
            {
              label: "FAQ",
              url: `${PORTAL_URL}faq`,
            },
            {
              label: "Help",
              url: `${PORTAL_URL}help`,
            },
          ],
          url: "",
        },
      ],
      searchEnabled: true,
      searchURL: `${PORTAL_URL}search`,
      slogan: SLOGAN,
      socials,
    },
  },
  redirectRootToPath: ROOT_PATH,
  summaryConfig: undefined,
};

export default config;
