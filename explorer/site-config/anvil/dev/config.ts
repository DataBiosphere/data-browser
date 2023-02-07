import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import { CATALOG_DEFAULT } from "../../../app/apis/azul/anvil/common/constants";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import { authenticationConfig } from "./authentication/authentication";
import { ANVIL_CATEGORY_KEY, ANVIL_CATEGORY_LABEL } from "./category";
import { socials } from "./constants";
import { exportConfig } from "./export/export";
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { librariesEntityConfig } from "./index/librariesEntityConfig";
import { summary } from "./index/summary";

// Template constants
const BROWSER_URL = "https://staging.anvilproject.org";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
export const URL_DATASETS = "/datasets";
const LOGO: Logo = {
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
  dataSource: {
    defaultDetailParams: {
      catalog: CATALOG_DEFAULT,
    },
    defaultListParams: {
      catalog: CATALOG_DEFAULT,
      size: "25",
      sort: "entryId",
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
  explorerTitle: "Anvil Data Explorer",
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
      searchEnabled: false,
      slogan: SLOGAN,
      socials,
    },
  },
  redirectRootToPath: "/datasets",
  summaryConfig: {
    apiPath: "index/summary",
    components: summary,
  },
  theme: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#035C94",
      },
    },
  },
};

export default config;
