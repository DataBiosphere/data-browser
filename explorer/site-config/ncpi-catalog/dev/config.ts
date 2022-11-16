import { Social } from "app/components/common/Socials/socials";
import logoNcpi from "images/logoNcpi.svg";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import anvilConfig from "../../anvil/dev/config";
import { NCPI_CATALOG_FILTER_CATEGORY_KEYS } from "../filter-category-keys";
import { platformsEntity } from "./index/platformsEntity";
import { studiesEntity } from "./index/studiesEntity";

// Template constants
const BROWSER_URL = "https://anvilproject.org";
const SLOGAN = "NIH Cloud Platform Interoperability Effort";
const LOGO: Logo = {
  alt: SLOGAN,
  height: 40,
  link: "/",
  src: logoNcpi,
};

const SOCIALS: Social[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/channel/UCJvPdDZOxJvOwObfnZ8X3gA",
  },
  {
    type: "github",
    url: "https://github.com/NIH-NCPI/",
  },
  {
    type: "slack",
    url: "https://nihcloudplatforms.slack.com/",
  },
];

// Remove the summary from the AnVIL config.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- using rest syntax to remove summary from config.
const { summaryConfig, ...basicConfig } = anvilConfig;
const config: SiteConfig = {
  ...basicConfig,
  categoryConfigs: [
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.PLATFORM,
      label: "Platform",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.TITLE,
      label: "Study",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
      label: "dbGap Id",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.FOCUS,
      label: "Focus / Disease",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DATA_TYPE,
      label: "Data Type",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.STUDY_DESIGN,
      label: "Study Design",
    },
    {
      key: NCPI_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
      label: "Consent Code",
    },
  ],
  disablePagination: true,
  entities: [studiesEntity, platformsEntity],
  explorerTitle: "NCPI Dataset Catalog",
  layout: {
    footer: anvilConfig.layout.footer,
    header: {
      authenticationEnabled: false,
      logo: LOGO,
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
      searchEnabled: true,
      slogan: SLOGAN,
      socials: SOCIALS,
    },
  },
  redirectRootToPath: "/studies",
};

export default config;