import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { CATALOG_DEFAULT } from "../../../app/apis/azul/anvil/common/constants";
import * as C from "../../../app/components/index";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "./category";
import { exportConfig } from "./export/export";
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { librariesEntityConfig } from "./index/librariesEntityConfig";
import { socialMedia } from "./socialMedia";

// Template constants
const APP_TITLE = "Anvil Data Explorer";
const BROWSER_URL = "https://anvil-portal.dev.clevercanary.com";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
export const URL_DATASETS = "/datasets";

const config: SiteConfig = {
  analytics: undefined,
  appTitle: APP_TITLE,
  authentication: undefined,
  browserURL: BROWSER_URL,
  categoryGroupConfig: {
    categoryGroups: [
      {
        categoryConfigs: [
          {
            key: ANVIL_CATEGORY_KEY.BIOSAMPLE_TYPE,
            label: ANVIL_CATEGORY_LABEL.BIOSAMPLE_TYPE,
          },
          {
            key: ANVIL_CATEGORY_KEY.DATA_MODALITY,
            label: ANVIL_CATEGORY_LABEL.DATA_MODALITY,
          },
          {
            key: ANVIL_CATEGORY_KEY.FILE_FORMAT,
            label: ANVIL_CATEGORY_LABEL.FILE_FORMAT,
          },
          {
            key: ANVIL_CATEGORY_KEY.FILE_TYPE,
            label: ANVIL_CATEGORY_LABEL.FILE_TYPE,
          },
          {
            key: ANVIL_CATEGORY_KEY.ORGANISM_TYPE,
            label: ANVIL_CATEGORY_LABEL.ORGANISM_TYPE,
          },
          {
            key: ANVIL_CATEGORY_KEY.PHENOTYPIC_SEX,
            label: ANVIL_CATEGORY_LABEL.PHENOTYPIC_SEX,
          },
          {
            key: ANVIL_CATEGORY_KEY.LIBRARY_PREPARATION,
            label: ANVIL_CATEGORY_LABEL.LIBRARY_PREPARATION,
          },
          {
            key: ANVIL_CATEGORY_KEY.REPORTED_ETHNICITY,
            label: ANVIL_CATEGORY_LABEL.REPORTED_ETHNICITY,
          },
        ],
      },
    ],
    key: "anvil",
  },
  dataSource: {
    defaultListParams: {
      size: "25",
      sort: "entryId",
    },
    defaultParams: {
      catalog: CATALOG_DEFAULT,
    },
    url: "https://service.nadove2.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [
    datasetsEntityConfig,
    donorsEntityConfig,
    biosamplesEntityConfig,
    librariesEntityConfig,
    activitiesEntityConfig,
    filesEntityConfig,
  ],
  export: exportConfig,
  exportToTerraUrl: "https://app.terra.bio",
  layout: {
    footer: {
      Branding: C.ANVILBranding({ portalURL: undefined }),
      navLinks: [
        {
          label: "Help",
          url: `${BROWSER_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${BROWSER_URL}/privacy`,
        },
      ],
      socials: socialMedia.socials,
    },
    header: {
      authenticationEnabled: true,
      logo: C.Logo({
        alt: APP_TITLE,
        height: 40,
        link: BROWSER_URL,
        src: "/images/logoAnvil.png",
      }),
      navigation: [
        undefined,
        [
          {
            label: "Overview",
            url: `${BROWSER_URL}/overview`,
          },
          {
            label: "Learn",
            url: `${BROWSER_URL}/learn`,
          },
          {
            label: "Datasets",
            url: URL_DATASETS,
          },
          {
            label: "News",
            url: `${BROWSER_URL}/news`,
          },
          {
            label: "Events",
            url: `${BROWSER_URL}/events`,
          },
          {
            label: "More",
            menuItems: [
              {
                label: "Team",
                url: `${BROWSER_URL}/team`,
              },
              {
                label: "FAQ",
                url: `${BROWSER_URL}/faq`,
              },
              {
                label: "Help",
                url: `${BROWSER_URL}/help`,
              },
            ],
            url: "",
          },
        ],
        undefined,
      ],
      searchEnabled: true,
      searchURL: `${BROWSER_URL}/search`,
      slogan: SLOGAN,
      socialMedia,
    },
  },
  redirectRootToPath: "/datasets",
  themeOptions: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#035C94",
      },
    },
  },
};

export default config;
