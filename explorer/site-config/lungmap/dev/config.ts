// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";

// Images
import LungMapLogo from "images/lungmap-logo.png";

// Config
import hcaConfig from "site-config/hca-dcp/dev/config";

const CATALOG_LM2 = "lm2";

const PROJECTS_URL = "/explore/projects";

const config: SiteConfig = {
  datasources: {
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
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "LungMAP Data Browser",
        height: 40,
        link: PROJECTS_URL,
        src: LungMapLogo,
      },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: {
        links: [
          {
            label: "Explore",
            url: PROJECTS_URL,
          },
          {
            label: "Metadata",
            url: "https://data-browser.lungmap.net/metadata",
          },
          {
            label: "APIs",
            url: "https://data-browser.lungmap.net/apis",
          },
        ],
      },
      searchEnabled: false,
      slogan: undefined,
      socialLinks: {
        links: [
          {
            type: "twitter",
            url: "https://twitter.com/lungmapnet",
          },
        ],
      },
    },
  },
  redirectRootToPath: PROJECTS_URL,
};

export default config;
