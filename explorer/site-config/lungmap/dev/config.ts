import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { LogoProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Logo/logo";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoLungmap from "images/logoLungmap.png";
import hcaConfig from "site-config/hca-dcp/dev/config";
import { filesEntityConfig as hcaFilesEntityConfig } from "../../hca-dcp/dev/index/filesEntityConfig";
import { samplesEntityConfig as hcaSamplesEntityConfig } from "../../hca-dcp/dev/index/samplesEntityConfig";
import { socials } from "./constants";
import { exportConfig } from "./export/exportConfig";
import { projectsEntityConfig } from "./index/projectsEntityConfig";
import { summary } from "./index/summary";

// Template constants
const BROWSER_URL = "https://data-browser.dev.lungmap.net";
const CATALOG_LM2 = "lm2";
const PROJECTS_URL = "/projects";
const LOGO: LogoProps = {
  alt: "LungMAP Data Browser",
  height: 32,
  link: PROJECTS_URL,
  src: logoLungmap,
};

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
      logos: [LOGO],
      navLinks: [
        {
          label: "Privacy",
          url: `${BROWSER_URL}/lungmap-privacy`,
        },
      ],
      socials,
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
