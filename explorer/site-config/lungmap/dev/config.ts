import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import hcaConfig from "site-config/hca-dcp/dev/config";
import * as C from "../../../app/components/index";
import { filesEntityConfig as hcaFilesEntityConfig } from "../../hca-dcp/dev/index/filesEntityConfig";
import { samplesEntityConfig as hcaSamplesEntityConfig } from "../../hca-dcp/dev/index/samplesEntityConfig";
import { socials } from "./constants";
import { exportConfig } from "./export/exportConfig";
import { projectsEntityConfig } from "./index/projectsEntityConfig";
import { summary } from "./index/summary";

const logoLungmap = "/images/logoLungmap.png";

// Template constants
const APP_TITLE = "LungMAP Data Explorer";
const BROWSER_URL = "https://data-browser.dev.lungmap.net";
const CATALOG_LM2 = "lm2";
const PROJECTS_URL = "/projects";

const config: SiteConfig = {
  appTitle: APP_TITLE,
  browserURL: BROWSER_URL,
  categoryGroupConfigs: hcaConfig.categoryGroupConfigs,
  dataSource: {
    defaultParams: {
      catalog: CATALOG_LM2,
    },
    // url: "https://service.dev.singlecell.gi.ucsc.edu/",
    url: "https://service.azul.data.humancellatlas.org/",
  },
  entities: [
    projectsEntityConfig,
    hcaSamplesEntityConfig,
    hcaFilesEntityConfig,
  ],
  explorerTitle: "Explore Data",
  export: exportConfig,
  exportToTerraUrl: hcaConfig.exportToTerraUrl,
  layout: {
    footer: {
      Branding: C.Logo({
        alt: APP_TITLE,
        height: 32,
        link: PROJECTS_URL,
        src: logoLungmap,
      }),
      navLinks: [
        {
          label: "Privacy",
          url: `${BROWSER_URL}/lungmap-privacy`,
        },
      ],
      socials,
    },
    header: {
      Logo: C.Logo({
        alt: APP_TITLE,
        height: 32,
        link: PROJECTS_URL,
        src: logoLungmap,
      }),
      authenticationEnabled: false,
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
      socials,
    },
  },
  redirectRootToPath: PROJECTS_URL,
  summaryConfig: {
    apiPath: "index/summary",
    components: summary,
  },
};

export default config;
