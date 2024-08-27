import { APIEndpoints } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { SystemStatusBindResponseFn } from "@databiosphere/findable-ui/lib/config/entities";
import { CATALOG_DEFAULT } from "../../../app/apis/azul/anvil-cmg/common/constants";
import * as C from "../../../app/components/index";
import { bindSystemStatusResponse } from "../../../app/viewModelBuilders/azul/common/systemStatusMapper/systemStatusMapper";
import { FLATTEN } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { ANVIL_CMG_CATEGORY_KEY, ANVIL_CMG_CATEGORY_LABEL } from "../category";
import { announcements } from "./announcements/announcements";
import { authenticationConfig } from "./authentication/authentication";
import { exportConfig } from "./export/export";
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { summary } from "./index/summary";
import { floating } from "./layout/floating";

// Template constants
const APP_TITLE = "AnVIL Data Explorer";
const DATA_URL = "https://service.anvil.gi.ucsc.edu";
const BROWSER_URL = "https://explore.anvil.gi.ucsc.edu";
const PORTAL_URL = "https://anvilproject.dev.clevercanary.com";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
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
    categoryGroupConfig: {
      categoryGroups: [
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
            {
              key: ANVIL_CMG_CATEGORY_KEY.DATASET_CONSENT_GROUP,
              label: ANVIL_CMG_CATEGORY_LABEL.DATASET_CONSENT_GROUP,
            },
            {
              key: ANVIL_CMG_CATEGORY_KEY.ACTIVITY_DATA_MODALITY,
              label: ANVIL_CMG_CATEGORY_LABEL.ACTIVITY_DATA_MODALITY,
            },
          ],
          label: "Dataset",
        },
        {
          categoryConfigs: [
            {
              key: ANVIL_CMG_CATEGORY_KEY.DIAGNOSE_DISEASE,
              label: ANVIL_CMG_CATEGORY_LABEL.DIAGNOSE_DISEASE,
            },
            {
              key: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
              label: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
            },
            {
              key: ANVIL_CMG_CATEGORY_KEY.DONOR_REPORTED_ETHNICITY,
              label: ANVIL_CMG_CATEGORY_LABEL.DONOR_REPORTED_ETHNICITY,
            },
            {
              key: ANVIL_CMG_CATEGORY_KEY.DONOR_PHENOTYPIC_SEX,
              label: ANVIL_CMG_CATEGORY_LABEL.DONOR_PHENOTYPIC_SEX,
            },
          ],
          label: "Donor",
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
          ],
          label: "Biosample",
        },
        {
          categoryConfigs: [
            {
              key: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
              label: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT,
            },
          ],
          label: "File",
        },
        {
          categoryConfigs: [
            {
              key: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_TYPE,
              label: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_TYPE,
            },
            {
              key: ANVIL_CMG_CATEGORY_KEY.PREP_MATERIAL_NAME,
              label: ANVIL_CMG_CATEGORY_LABEL.PREP_MATERIAL_NAME,
            },
          ],
        },
      ],
      key: "anvil-cmg",
    },
    contentDir: "anvil-cmg",
    dataSource: {
      defaultListParams: {
        size: "25",
        sort: "entryId",
      },
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/`,
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
      floating,
      footer: {
        Branding: C.ANVILBranding({ portalURL: portalUrl }),
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
        announcements,
        authenticationEnabled: true,
        logo: C.ANVILExplorer({ url: "/datasets" }),
        navigation: [
          undefined,
          undefined,
          [
            {
              flatten: FLATTEN.XS_ONLY,
              label: "Help & Documentation",
              menuItems: [
                {
                  label: "Beta Announcement",
                  url: "/beta-announcement",
                },
                {
                  label: "Guides",
                  url: "/guides",
                },
                {
                  label: "Terms of service",
                  url: "/terms-of-service",
                },
                {
                  label: "Privacy Policy",
                  url: "/privacy",
                },
              ],
              url: "",
            },
          ],
        ],
        searchEnabled: false,
        searchURL: undefined,
      },
    },
    portalURL: portalUrl,
    redirectRootToPath: "/datasets",
    summaryConfig: {
      apiPath: "index/summary",
      components: summary,
    },
    systemStatus: {
      apiPath: `${dataUrl}${APIEndpoints.INDEX_STATUS}`,
      bindResponse: <SystemStatusBindResponseFn>bindSystemStatusResponse,
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

const config: SiteConfig = makeConfig(BROWSER_URL, PORTAL_URL, DATA_URL);

export default config;
