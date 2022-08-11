// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Social } from "app/components/common/Socials/socials";
import { Logo } from "../../../app/components/Layout/common/entities";

// Summary config
import { summary } from "./index/summary";

// Entities config
import { activitiesEntityConfig } from "./index/activitiesEntityConfig";
import { biosamplesEntityConfig } from "./index/biosamplesEntityConfig";
import { donorsEntityConfig } from "./index/donorsEntityConfig";
import { datasetsEntityConfig } from "./index/datasetsEntityConfig";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { librariesEntityConfig } from "./index/librariesEntityConfig";

// Export config
import { exportConfig } from "./export/export";

// Images
import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import { SiteConfig } from "../../../app/config/common/entities";

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
const SOCIALS: Social[] = [
  {
    type: "discourse",
    url: "https://help.anvilproject.org/",
  },
  {
    type: "twitter",
    url: "https://twitter.com/useAnVIL",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
  },
  {
    type: "github",
    url: "https://github.com/anvilproject",
  },
  {
    type: "slack",
    url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
  },
];

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  categoryConfigs: [
    {
      key: "biosample_type",
      label: "BioSample Type",
    },
    {
      key: "data_modality",
      label: "Data Modality",
    },
    {
      key: "file_format",
      label: "File Format",
    },
    {
      key: "file_type",
      label: "File Type",
    },
    {
      key: "organism_type",
      label: "Organism Type",
    },
    {
      key: "phenotypic_sex",
      label: "Phenotypic Sex",
    },
    {
      key: "prep_material_name",
      label: "Library Preparation",
    },
    {
      key: "reported_ethnicity",
      label: "Reported Ethnicity",
    },
  ],
  dataSource: {
    defaultListParams: {
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
  entityTitle: "Anvil Data Explorer",
  export: exportConfig,
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
      socials: SOCIALS,
    },
    header: {
      authenticationEnabled: false,
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
      searchEnabled: false,
      slogan: SLOGAN,
      socials: SOCIALS,
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
