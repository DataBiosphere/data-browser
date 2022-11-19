import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Social } from "../../../app/components/common/Socials/socials";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import { breakpointTablet } from "../../../app/theme/theme";
import { HCADCP_FILTER_CATEGORY_KEYS } from "../filter-category-keys";
import { exportConfig } from "./export/export";
import { filesEntityConfig } from "./index/filesEntityConfig";
import { samplesEntityConfig } from "./index/samplesEntityConfig";
import { summary } from "./index/summary";
import { projectsEntity } from "./projectsEntity";

// Template constants
const BROWSER_URL = "https://dev.singlecell.gi.ucsc.edu";
const CATALOG_DCP2 = "dcp2";
const FONT_FAMILY_DIN = "'din-2014', sans-serif";
const PAGINATION_PAGE_SIZE = "25";
export const PROJECTS_URL = "/projects";
const LOGO: Logo = {
  alt: "Human Cell Atlas Data Coordination Platform",
  height: 32,
  link: BROWSER_URL,
  src: logoHca,
};
const SOCIALS: Social[] = [
  {
    type: "twitter",
    url: "https://twitter.com/humancellatlas",
  },
  {
    type: "github",
    url: "https://github.com/HumanCellAtlas",
  },
  {
    type: "slack",
    url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
  },
];

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  categoryConfigs: [
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.SPECIMEN_ORGAN,
      label: "Anatomical Entity",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.BIOLOGICAL_SEX,
      label: "Biological Sex",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.CONTACT_NAME,
      label: "Contact Name",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.DEVELOPMENT_STAGE,
      label: "Development Stage",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.GENUS_SPECIES,
      label: "Genus Species",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.DONOR_DISEASE,
      label: "Donor Disease",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.INSTRUMENT_MANUFACTURER_MODEL,
      label: "Instrument Manufacturer Model",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.INSTITUTION,
      label: "Institution",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.LABORATORY,
      label: "Laboratory",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.MODEL_ORGAN,
      label: "Model Organ",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.NUCLEIC_ACID_SOURCE,
      label: "Nucleic Acid Source",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.ORGAN_PART,
      label: "Organ Part",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.PAIRED_END,
      label: "Paired End",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.PRESERVATION_METHOD,
      label: "Preservation Method",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.PUBLICATION_TITLE,
      label: "Publication Title",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.LIBRARY_CONSTRUCTION_APPROACH,
      label: "Library Construction Method",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.SPECIMEN_DISEASE,
      label: "Specimen Disease",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.SELECTED_CELL_TYPE,
      label: "Selected Cell Type",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.SAMPLE_TYPE,
      label: "Sample Type",
    },
    {
      key: HCADCP_FILTER_CATEGORY_KEYS.WORKFLOW,
      label: "Analysis Protocol",
    },
  ],
  dataSource: {
    defaultDetailParams: {
      catalog: CATALOG_DCP2,
    },
    defaultListParams: {
      catalog: CATALOG_DCP2,
      size: PAGINATION_PAGE_SIZE,
    },
    url: "https://service.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [projectsEntity, samplesEntityConfig, filesEntityConfig],
  explorerTitle: "Explore Data: DCP 2.0 Data View",
  export: exportConfig,
  exportToTerraUrl: "https://app.terra.bio/",
  layout: {
    footer: {
      feedbackForm: false, // TODO feedback form
      logos: [{ ...LOGO, height: 38, src: logoHumanCellAtlas }],
      navLinks: [
        {
          label: "About",
          url: `${BROWSER_URL}/about`,
        },
        {
          label: "Help",
          url: `${BROWSER_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${BROWSER_URL}/privacy`,
        },
        {
          label: "Contact",
          url: `${BROWSER_URL}/contact`,
        },
      ],
      socials: SOCIALS,
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
          label: "Guides",
          url: `${BROWSER_URL}/guides`,
        },
        {
          label: "Metadata",
          url: `${BROWSER_URL}/metadata`,
        },
        {
          label: "Pipelines",
          url: `${BROWSER_URL}/pipelines`,
        },
        {
          label: "Analysis Tools",
          url: `${BROWSER_URL}/analyze`,
        },
        {
          label: "Contribute",
          url: `${BROWSER_URL}/contribute`,
        },
        {
          label: "APIs",
          url: `${BROWSER_URL}/apis`,
        },
        {
          label: "Updates",
          url: `${BROWSER_URL}/dcp-updates`,
        },
      ],
      searchEnabled: false,
      slogan: undefined,
      socials: SOCIALS,
    },
  },
  redirectRootToPath: PROJECTS_URL,
  summaryConfig: {
    apiPath: "index/summary",
    components: summary,
  },
  theme: {
    palette: {
      primary: {
        dark: "#005EA9",
        main: "#1C7CC7",
      },
    },
    typography: {
      "text-body-large-500": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 18,
        fontWeight: 400,
      },
      "text-heading": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 22,
        fontWeight: 400,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 26,
          letterSpacing: "normal",
        },
      },
      "text-heading-large": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 26,
        fontWeight: 400,
        letterSpacing: "normal",
        lineHeight: "34px",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 32,
          letterSpacing: "normal",
        },
      },
      "text-heading-small": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 20,
        fontWeight: 400,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 22,
          letterSpacing: "normal",
        },
      },
      "text-heading-xlarge": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 32,
        fontWeight: 400,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 42,
          letterSpacing: "-0.4px",
        },
      },
    },
  },
};

export default config;
