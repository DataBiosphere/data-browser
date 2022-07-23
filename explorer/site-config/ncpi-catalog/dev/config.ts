// App dependencies
import { SiteConfig } from "../../../app/config/model";
import anvilConfig from "../../anvil/dev/config";
import { Social } from "app/components/common/Socials/socials";
import { Logo } from "../../../app/components/Layout/common/entities";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";

// Entities config
import { studiesEntity } from "./studieEntity";

// Images
import logoNcpi from "images/logoNcpi.svg";

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

const config: SiteConfig = {
  ...anvilConfig,
  entities: [studiesEntity],
  entityTitle: "NCPI Dataset Catalog",
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
  summary: {
    apiPath: "",
    components: [],
  },
};

export default config;
