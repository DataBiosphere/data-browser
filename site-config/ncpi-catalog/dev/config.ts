import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../app/components/index";
import anvilConfig from "../../anvil/dev/config";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../category";
import { platformsEntityConfig } from "./index/platformsEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";

const logoNcpi = "/images/logoNCPI.png";

// Template constants
const APP_TITLE = "NCPI Dataset Catalog";
const PORTAL_URL = "https://ncpi-acc.org"; // https://www.ncpi-acc.org/
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
  categoryGroupConfig: {
    categoryGroups: [
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
    key: "ncpi-catalog",
  },
  entities: [platformsEntityConfig, studiesEntityConfig],
  explorerTitle: "NCPI Dataset Catalog",
  layout: {
    footer: {
      Branding: C.Logo({
        alt: APP_TITLE,
        height: 36,
        link: PORTAL_URL,
        src: logoNcpi,
        target: ANCHOR_TARGET.BLANK,
      }),
      navLinks: [],
    },
    header: {
      authenticationEnabled: false,
      logo: C.Logo({
        alt: APP_TITLE,
        height: 36,
        link: "/platforms",
        src: logoNcpi,
      }),
      navigation: [
        undefined,
        undefined,
        [
          {
            label: C.LabelIconMenuItem({ label: "Visit ncpi-acc.org" }),
            target: ANCHOR_TARGET.BLANK,
            url: PORTAL_URL,
          },
        ],
      ],
      searchEnabled: false,
      searchURL: ``,
      slogan: SLOGAN,
    },
  },
  redirectRootToPath: "/platforms",
};

export default config;
