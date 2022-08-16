import { Social } from "app/components/common/Socials/socials";
import logoLungmap from "images/logoLungmap.png";
import hcaConfig from "site-config/hca-dcp/dev/config";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import { summary } from "./index/summary";

// Template constants
const BROWSER_URL = "https://data-browser.dev.lungmap.net";
const CATALOG_LM2 = "lm2";
const PROJECTS_URL = "/projects";
const LOGO: Logo = {
  alt: "LungMAP Data Browser",
  height: 32,
  link: PROJECTS_URL,
  src: logoLungmap,
};
const SOCIALS: Social[] = [
  {
    type: "twitter",
    url: "https://twitter.com/lungmapnet",
  },
];

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  categoryConfigs: hcaConfig.categoryConfigs,
  dataSource: {
    defaultDetailParams: {
      catalog: CATALOG_LM2,
    },
    defaultListParams: {
      catalog: CATALOG_LM2,
    },
    // url: "https://service.dev.singlecell.gi.ucsc.edu/",
    url: "https://service.azul.data.humancellatlas.org/",
  },
  entities: hcaConfig.entities,
  entityTitle: "Explore Data",
  export: hcaConfig.export,
  layout: {
    footer: {
      logos: [LOGO],
      navLinks: [
        {
          label: "Privacy",
          url: `${BROWSER_URL}/lungmap-privacy`,
        },
      ],
      socials: SOCIALS,
    },
    header: {
      authenticationEnabled: false,
      logo: LOGO,
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: [
        {
          label: "Explore",
          url: PROJECTS_URL,
        },
        {
          label: "Metadata",
          url: `${BROWSER_URL}/metadata`,
        },
        {
          label: "APIs",
          url: `${BROWSER_URL}/apis`,
        },
      ],
      searchEnabled: false,
      slogan: undefined,
      socials: SOCIALS,
    },
  },
  redirectRootToPath: PROJECTS_URL,
  summaryConfig: {
    apiPath: "index/summary",
    components: summary,
  },
};

export default config;
