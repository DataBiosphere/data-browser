import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
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
  entities: [platformsEntityConfig, studiesEntityConfig],
  explorerTitle: "NCPI Dataset Catalog",
  layout: {
    footer: {
      Branding: C.ANVILBranding({ portalURL: undefined }),
      navLinks: [],
      socials: socialMedia.socials,
    },
    header: {
      Logo: C.Logo({
        alt: APP_TITLE,
        height: 40,
        link: `ncpi-acc.org`,
        src: logoNcpi,
      }),
      authenticationEnabled: false,
      navAlignment: ELEMENT_ALIGNMENT.RIGHT,
      navLinks: [],
      searchEnabled: false,
      searchURL: ``,
      slogan: SLOGAN,
      socialMedia,
    },
  },
  redirectRootToPath: "/platforms",
};

export default config;
