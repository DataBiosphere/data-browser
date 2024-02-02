import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import hcaConfig, {
  DATA_URL as HCA_DATA_URL,
  EXPORT_TO_TERRA_URL as HCA_EXPORT_TO_TERRA_URL,
  PORTAL_URL as HCA_PORTAL_URL,
} from "site-config/hca-dcp/dev/config";
import * as C from "../../../app/components/index";
import { filesEntityConfig as hcaFilesEntityConfig } from "../../hca-dcp/dev/index/filesEntityConfig";
import { samplesEntityConfig as hcaSamplesEntityConfig } from "../../hca-dcp/dev/index/samplesEntityConfig";
import { exportConfig } from "./export/exportConfig";
import { projectsEntityConfig } from "./index/projectsEntityConfig";
import { summary } from "./index/summary";
import { socialMedia } from "./socialMedia";

// Template constants
const APP_TITLE = "LungMAP Data Explorer";
const BROWSER_URL = "https://data-browser.dev.lungmap.net";
const CATALOG = "lm4";
const DATA_URL = HCA_DATA_URL;
const EXPORT_TO_TERRA_URL = HCA_EXPORT_TO_TERRA_URL;
const HOME_PAGE_PATH = "/projects";
const PORTAL_URL = HCA_PORTAL_URL;

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
  catalog: string = CATALOG
): SiteConfig {
  return {
    appTitle: APP_TITLE,
    authentication: undefined,
    browserURL: browserUrl,
    categoryGroupConfigs: hcaConfig.categoryGroupConfigs,
    contentDir: "lungmap",
    dataSource: {
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/`,
    },
    entities: [
      projectsEntityConfig,
      hcaSamplesEntityConfig,
      hcaFilesEntityConfig,
    ],
    explorerTitle: "Explore Data",
    export: exportConfig,
    exportToTerraUrl: EXPORT_TO_TERRA_URL,
    layout: {
      footer: {
        Branding: C.Logo({
          alt: APP_TITLE,
          height: 32,
          link: HOME_PAGE_PATH,
          src: "/images/logoLungmap.png",
        }),
        navLinks: [
          {
            label: "Privacy",
            url: "/privacy",
          },
        ],
        socials: socialMedia.socials,
      },
      header: {
        Logo: C.Logo({
          alt: APP_TITLE,
          height: 32,
          link: HOME_PAGE_PATH,
          src: "/images/logoLungmap.png",
        }),
        authenticationEnabled: false,
        navAlignment: ELEMENT_ALIGNMENT.RIGHT,
        navLinks: [
          {
            flatten: true,
            label: "Help & Documentation",
            menuItems: [
              {
                label: "Metadata",
                target: ANCHOR_TARGET.BLANK,
                url: `${portalUrl}/metadata`,
              },
              {
                label: "APIs",
                url: "/apis",
              },
              {
                label: "Privacy",
                url: "/privacy",
              },
            ],
            url: "",
          },
        ],
        searchEnabled: false,
        slogan: undefined,
        socialMedia,
      },
    },
    redirectRootToPath: HOME_PAGE_PATH,
    summaryConfig: {
      apiPath: "index/summary",
      components: summary,
    },
  };
}

const config: SiteConfig = makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL);

export default config;
