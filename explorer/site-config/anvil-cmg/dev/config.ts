import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { CATALOG_DEFAULT } from "../../../app/apis/azul/anvil-cmg/common/constants";
import * as C from "../../../app/components/index";
import { ANVIL_CMG_CATEGORY_KEY, ANVIL_CMG_CATEGORY_LABEL } from "../category";
import { authenticationConfig } from "./authentication/authentication";
import { contentThemeOptions } from "./content/contentThemeOptions";
import { exportConfig } from "./export/export";
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { summary } from "./index/summary";

const logoHhs = "/images/logoHhs.svg";
const logoNhgri = "/images/logoNhgri.svg";
const logoNih = "/images/logoNih.svg";
const logoUsagov = "/images/logoUsagov.png";

// Template constants
const APP_TITLE = "AnVIL Data Explorer";

export function makeConfig(
  browserUrl: string,
  catalog: string = CATALOG_DEFAULT
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "up3ucjProssPj7Iq59W45g", // GTM environment-specific
      gtmId: "GTM-KDZF5XS",
      gtmPreview: "env-3",
    },
    appTitle: APP_TITLE,
    authentication: authenticationConfig,
    browserURL: browserUrl,
    categoryGroupConfigs: [
      {
        categoryConfigs: [
          {
            key: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
            label: ANVIL_CMG_CATEGORY_LABEL.DATASET_TITLE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DATASET_REGISTERED_ID,
            label: ANVIL_CMG_CATEGORY_LABEL.DATASET_REGISTERED_ID,
          },
        ],
      },
      {
        categoryConfigs: [
          {
            key: ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_ANATOMICAL_SITE,
            label: ANVIL_CMG_CATEGORY_LABEL.BIOSAMPLE_ANATOMICAL_SITE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.BIOSAMPLE_BIOSAMPLE_TYPE,
            label: ANVIL_CMG_CATEGORY_LABEL.BIOSAMPLE_BIOSAMPLE_TYPE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DATASET_CONSENT_GROUP,
            label: ANVIL_CMG_CATEGORY_LABEL.DATASET_CONSENT_GROUP,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DATA_MODALITY,
            label: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DATA_MODALITY,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_PHENOTYPE,
            label: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_PHENOTYPE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
            label: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_TYPE,
            label: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_TYPE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
            label: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
            label: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.PREP_MATERIAL_NAME,
            label: ANVIL_CMG_CATEGORY_LABEL.PREP_MATERIAL_NAME,
          },
          {
            key: ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY,
            label: ANVIL_CMG_CATEGORY_LABEL.DONOR_REPORTED_ETHNICITY,
          },
        ],
      },
    ],
    contentDir: "anvil-cmg",
    contentThemeOptionsFn: contentThemeOptions,
    dataSource: {
      defaultDetailParams: {
        catalog: catalog,
      },
      defaultListParams: {
        catalog: catalog,
        size: "25",
        sort: "entryId",
      },
      url: "https://service.anvil.gi.ucsc.edu/",
    },
    entities: [
      datasetsEntityConfig,
      donorsEntityConfig,
      biosamplesEntityConfig,
      activitiesEntityConfig,
      filesEntityConfig,
    ],
    explorerTitle: "Explore Data",
    export: exportConfig,
    exportToTerraUrl: "https://bvdp-saturn-dev.appspot.com/",
    layout: {
      footer: {
        logos: [
          {
            alt: "nhgri",
            height: 24,
            link: "https://www.genome.gov/",
            src: logoNhgri,
          },
          {
            alt: "nih",
            height: 24,
            link: "https://www.nih.gov/",
            src: logoNih,
          },
          {
            alt: "hhs",
            height: 32,
            link: "https://www.hhs.gov/",
            src: logoHhs,
          },
          {
            alt: "hhs",
            height: 32,
            link: "https://www.usa.gov/",
            src: logoUsagov,
          },
        ],
        navLinks: [
          {
            label: "Help",
            url: `${browserUrl}/help`,
          },
          {
            label: "Privacy",
            url: `${browserUrl}/privacy`,
          },
        ],
      },
      header: {
        Logo: C.ANVILExplorer({ url: browserUrl }),
        authenticationEnabled: true,
        navAlignment: ELEMENT_ALIGNMENT.RIGHT,
        navLinks: [
          {
            flatten: true,
            label: "Help & Documentation",
            menuItems: [
              {
                label: "Guides",
                url: "/guides",
              },
              {
                label: "Terms of service",
                url: "/terms-of-service",
              },
            ],
            url: "",
          },
        ],
        searchEnabled: false,
        searchURL: `${browserUrl}/search`,
      },
    },
    redirectRootToPath: "/datasets",
    summaryConfig: {
      apiPath: "index/summary",
      components: summary,
    },
    themeOptions: {
      palette: {
        primary: {
          dark: "#003E76",
          main: "#035C94",
        },
      },
    },
  };
}

const config: SiteConfig = makeConfig("https://anvil.gi.ucsc.edu");

export default config;
