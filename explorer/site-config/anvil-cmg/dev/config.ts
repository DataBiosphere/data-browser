import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { LogoProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Logo/logo";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
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

// Template constants
const BROWSER_URL = "https://anvil.gi.ucsc.edu";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
export const URL_DATASETS = "/datasets";
const LOGO: LogoProps = {
  alt: SLOGAN,
  height: 40,
  link: "/",
  src: logoAnvil,
};

const config: SiteConfig = {
  authentication: authenticationConfig,
  browserURL: BROWSER_URL,
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
  dataSource: {
    defaultDetailParams: {
      catalog: CATALOG_DEFAULT,
    },
    defaultListParams: {
      catalog: CATALOG_DEFAULT,
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
  explorerTitle: "AnVIL Data Explorer",
  export: exportConfig,
  exportToTerraUrl: "https://app.terra.bio/",
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
          url: `${BROWSER_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${BROWSER_URL}/privacy`,
        },
      ],
      socials,
    },
    header: {
      authenticationEnabled: true,
      logo: LOGO,
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
      navLinks: [
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
      searchEnabled: true,
      searchURL: `${BROWSER_URL}/search`,
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

export default config;
