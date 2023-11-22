import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../app/components/index";
import anvilConfig from "../../anvil/dev/config";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../category";
import { platformsEntityConfig } from "./index/platformsEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { socialMedia } from "./socialMedia";

const logoNcpi = "/images/logoNcpi.svg";

// Template constants
const APP_TITLE = "NCPI Dataset Catalog";
const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const SLOGAN = "NIH Cloud Platform Interoperability Effort";

// Remove the summary from the AnVIL config.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- using rest syntax to remove summary from config.
const { summaryConfig, ...basicConfig } = anvilConfig;
const config: SiteConfig = {
  ...basicConfig,
  analytics: {
    gtmAuth: "hQW1TUjhQSW9j0XTXzshYA", // GTM environment-specific
    gtmId: "GTM-55VGZN8",
    gtmPreview: "env-3",
  },
  appTitle: APP_TITLE,
  authentication: undefined,
  categoryGroupConfigs: [
    {
      categoryConfigs: [
        {
          key: NCPI_CATALOG_CATEGORY_KEY.PLATFORM,
          label: NCPI_CATALOG_CATEGORY_LABEL.PLATFORM,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.TITLE,
          label: NCPI_CATALOG_CATEGORY_LABEL.TITLE,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID,
          label: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.FOCUS,
          label: NCPI_CATALOG_CATEGORY_LABEL.FOCUS,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.DATA_TYPE,
          label: NCPI_CATALOG_CATEGORY_LABEL.DATA_TYPE,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
          label: NCPI_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
        },
        {
          key: NCPI_CATALOG_CATEGORY_KEY.CONSENT_CODE,
          label: NCPI_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
        },
      ],
    },
  ],
  entities: [studiesEntityConfig, platformsEntityConfig],
  explorerTitle: "NCPI Dataset Catalog",
  layout: {
    footer: { ...anvilConfig.layout.footer, socials: socialMedia.socials },
    header: {
      Logo: C.Logo({
        alt: APP_TITLE,
        height: 40,
        link: `${BROWSER_URL}/ncpi`,
        src: logoNcpi,
      }),
      authenticationEnabled: false,
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
      navLinks: [
        {
          label: "Overview",
          url: `${BROWSER_URL}/ncpi`,
        },
        {
          label: "Platforms",
          url: `${BROWSER_URL}/ncpi/platforms`,
        },
        {
          label: "Technologies",
          url: `${BROWSER_URL}/ncpi/technologies`,
        },
        {
          label: "Datasets",
          url: `${BROWSER_URL}/ncpi/data`,
        },
        {
          label: HEADER_NAVIGATION_LABEL.MORE,
          menuItems: [
            {
              label: "Demonstration Projects",
              url: `${BROWSER_URL}/ncpi/demonstration-projects`,
            },
            {
              label: "Training",
              url: `${BROWSER_URL}/ncpi/training`,
            },
            {
              label: "Updates",
              url: `${BROWSER_URL}/ncpi/progress-updates`,
            },
          ],
          url: "",
        },
      ],
      searchEnabled: true,
      searchURL: `${BROWSER_URL}/ncpi/search`,
      slogan: SLOGAN,
      socialMedia,
    },
  },
  redirectRootToPath: "/studies",
};

export default config;
