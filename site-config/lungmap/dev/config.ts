import { CategoryGroupConfig } from "@databiosphere/findable-ui/lib/config/entities";
import hcaConfig, {
  DATA_URL as HCA_DATA_URL,
  PORTAL_URL as HCA_PORTAL_URL,
} from "site-config/hca-dcp/ma-dev/config";
import * as C from "../../../app/components/index";
import { FLATTEN, GIT_HUB_REPO_URL } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { filesEntityConfig as hcaFilesEntityConfig } from "../../hca-dcp/dev/index/filesEntityConfig";
import { samplesEntityConfig as hcaSamplesEntityConfig } from "../../hca-dcp/dev/index/samplesEntityConfig";
import { exportConfig } from "./export/exportConfig";
import { projectsEntityConfig } from "./index/projectsEntityConfig";
import { summary } from "./index/summary";
import { socialMedia } from "./socialMedia";

// Template constants
const APP_TITLE = "LungMAP Data Explorer";
const BROWSER_URL = "https://dev.data-browser.lungmap.net";
const CATALOG = "lm2";
const DATA_URL = HCA_DATA_URL;
const EXPORT_TO_TERRA_URL = "https://bvdp-saturn-dev.appspot.com/";
const HOME_PAGE_PATH = "/projects";
const PAGINATION_PAGE_SIZE = "25";
const PORTAL_URL = HCA_PORTAL_URL;

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
  gitHubUrl: string,
  catalog: string
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "XOKAlpBSltsrm1PKGR-fow", // GTM environment-specific
      gtmId: "GTM-M2J5NTJ",
      gtmPreview: "env-149",
    },
    appTitle: APP_TITLE,
    authentication: undefined,
    browserURL: browserUrl,
    categoryGroupConfig: {
      ...(hcaConfig.categoryGroupConfig as CategoryGroupConfig),
      key: "lungmap",
    },
    contentDir: "lungmap",
    dataSource: {
      defaultListParams: {
        size: PAGINATION_PAGE_SIZE,
      },
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
    gitHubUrl,
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
        versionInfo: true,
      },
      header: {
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32,
          link: HOME_PAGE_PATH,
          src: "/images/logoLungmap.png",
        }),
        navigation: [
          undefined,
          undefined,
          [
            {
              flatten: FLATTEN.XS_ONLY,
              label: "Help & Documentation",
              menuItems: [
                {
                  label: "Metadata Dictionary",
                  url: "/metadata",
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
        ],
        searchEnabled: false,
        slogan: undefined,
      },
    },
    portalURL: portalUrl,
    redirectRootToPath: HOME_PAGE_PATH,
    summaryConfig: {
      apiPath: "index/summary",
      components: summary,
    },
  };
}

const config: SiteConfig = makeConfig(
  BROWSER_URL,
  PORTAL_URL,
  DATA_URL,
  GIT_HUB_REPO_URL,
  CATALOG
);

export default config;
