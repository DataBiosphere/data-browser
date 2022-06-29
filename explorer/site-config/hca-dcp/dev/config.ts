// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";

// Entities config
import { filesEntity } from "./filesEntity";
import { projectEntity } from "./projectsEntity";
import { samplesEntity } from "./samplesEntity";
import { summary } from "./summary";

// Images
import HcaLogo from "images/hca-logo.png";

const BROWSER_URL = "https://dev.singlecell.gi.ucsc.edu";
const CATALOG_DCP2 = "dcp2";
const PAGINATION_PAGE_SIZE = "25";
const PROJECTS_URL = "/explore/projects";

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  datasources: {
    defaultDetailParams: {
      catalog: CATALOG_DCP2,
    },
    defaultListParams: {
      catalog: CATALOG_DCP2,
      size: PAGINATION_PAGE_SIZE,
    },
    url: "https://service.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [projectEntity, filesEntity, samplesEntity],
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "Human Cell Atlas Data Coordination Platform",
        height: 40,
        link: PROJECTS_URL,
        src: HcaLogo,
      },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: {
        links: [
          {
            label: "Explore",
            url: PROJECTS_URL,
          },
          {
            label: "Guides",
            url: "https://data.humancellatlas.org/guides",
          },
          {
            label: "Metadata",
            url: "https://data.humancellatlas.org/metadata",
          },
          {
            label: "Pipelines",
            url: "https://data.humancellatlas.org/pipelines",
          },
          {
            label: "Analysis Tools",
            url: "https://data.humancellatlas.org/analyze",
          },
          {
            label: "Contribute",
            url: "https://data.humancellatlas.org/contribute",
          },
          {
            label: "APIs",
            url: "https://data.humancellatlas.org/apis",
          },
          {
            label: "Updates",
            url: "https://data.humancellatlas.org/dcp-updates",
          },
        ],
      },
      searchEnabled: false,
      slogan: undefined,
      socialLinks: {
        links: [
          {
            type: "twitter",
            url: "https://twitter.com/humancellatlas",
          },
          {
            type: "github",
            url: "https://github.com/HumanCellAtlas",
          },
          {
            type: "slack",
            url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
          },
        ],
      },
    },
  },
  redirectRootToPath: PROJECTS_URL,
  summary: {
    apiPath: "index/summary",
    components: summary,
  },
};

export default config;
