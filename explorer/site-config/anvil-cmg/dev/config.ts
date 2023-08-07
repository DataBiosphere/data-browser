import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { CATALOG_DEFAULT } from "../../../app/apis/azul/anvil-cmg/common/constants";
import { authenticationConfig } from "./authentication/authentication";
import { socials } from "./constants";
import { exportConfig } from "./export/export";
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { summary } from "./index/summary";

const logoAnvil = "/images/logoAnvil.png";
const logoHhs = "/images/logoHhs.svg";
const logoNhgri = "/images/logoNhgri.svg";
const logoNih = "/images/logoNih.svg";
const logoUsagov = "/images/logoUsagov.png";

// Template constants
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
export const URL_DATASETS = "/datasets";

export function make_config(
  browserUrl: string,
  catalog: string = CATALOG_DEFAULT
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "up3ucjProssPj7Iq59W45g", // GTM environment-specific
      gtmId: "GTM-KDZF5XS",
      gtmPreview: "env-3",
    },
    authentication: authenticationConfig,
    browserURL: browserUrl,
    categoryGroupConfigs: [
      {
        categoryConfigs: [
          {
            key: "biosamples.anatomical_site",
            label: "Anatomical Site",
          },
          {
            key: "biosamples.biosample_type",
            label: "BioSample Type",
          },
          {
            key: "datasets.consent_group",
            label: "Consent Group",
          },
          {
            key: "activities.data_modality",
            label: "Data Modality",
          },
          {
            key: "datasets.title",
            label: "Dataset",
          },
          {
            key: "diagnoses.phenotype",
            label: "Diagnosis",
          },
          {
            key: "files.file_format",
            label: "File Format",
          },
          {
            key: "files.file_type",
            label: "File Type",
          },
          {
            key: "datasets.registered_identifier",
            label: "Identifier",
          },
          {
            key: "donors.organism_type",
            label: "Organism Type",
          },
          {
            key: "donors.phenotypic_sex",
            label: "Phenotypic Sex",
          },
          {
            key: "prep_material_name",
            label: "Library Preparation",
          },
          {
            key: "donors.reported_ethnicity",
            label: "Reported Ethnicity",
          },
        ],
      },
    ],
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
    explorerTitle: "AnVIL Explorer",
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
        socials,
      },
      header: {
        authenticationEnabled: true,
        logo: {
          alt: SLOGAN,
          height: 40,
          link: `${browserUrl}/`,
          src: logoAnvil,
        },
        navAlignment: ELEMENT_ALIGNMENT.CENTER,
        navLinks: [
          {
            label: "Overview",
            url: `${browserUrl}/overview`,
          },
          {
            label: "Learn",
            url: `${browserUrl}/learn`,
          },
          {
            label: "Datasets",
            url: URL_DATASETS,
          },
          {
            label: "News",
            url: `${browserUrl}/news`,
          },
          {
            label: "Events",
            url: `${browserUrl}/events`,
          },
          {
            label: "More",
            menuItems: [
              {
                label: "Team",
                url: `${browserUrl}/team`,
              },
              {
                label: "FAQ",
                url: `${browserUrl}/faq`,
              },
              {
                label: "Help",
                url: `${browserUrl}/help`,
              },
            ],
            url: "",
          },
        ],
        searchEnabled: true,
        searchURL: `${browserUrl}/search`,
        slogan: SLOGAN,
        socials,
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

const config: SiteConfig = make_config("https://anvil.gi.ucsc.edu");

export default config;
