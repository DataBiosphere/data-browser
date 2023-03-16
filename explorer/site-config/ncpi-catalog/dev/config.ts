import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoNcpi from "images/logoNcpi.svg";
import anvilConfig from "../../anvil/dev/config";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../category";
import { socials } from "./constants";
import { platformsEntityConfig } from "./index/platformsEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";

// Template constants
const BROWSER_URL = "https://anvilproject.org";
const SLOGAN = "NIH Cloud Platform Interoperability Effort";

// Remove the summary from the AnVIL config.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- using rest syntax to remove summary from config.
const { summaryConfig, ...basicConfig } = anvilConfig;
const config: SiteConfig = {
  ...basicConfig,
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
  entities: [studiesEntityConfig, platformsEntityConfig],
  explorerTitle: "NCPI Dataset Catalog",
  layout: {
    footer: anvilConfig.layout.footer,
    header: {
      authenticationEnabled: false,
      logo: {
        alt: SLOGAN,
        height: 40,
        link: "/",
        src: logoNcpi,
      },
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
          label: "More",
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
      slogan: SLOGAN,
      socials,
    },
  },
  redirectRootToPath: "/studies",
};

export default config;
