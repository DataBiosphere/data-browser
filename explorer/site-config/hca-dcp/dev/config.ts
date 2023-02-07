import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import { breakpointTablet } from "../../../app/theme/theme";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../category";
import { socials } from "./constants";
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

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  categoryConfigs: [
    {
      key: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY, // specimenOrgan
      label: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.BIOLOGICAL_SEX,
      label: HCA_DCP_CATEGORY_LABEL.BIOLOGICAL_SEX,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.CONTACT_NAME,
      label: HCA_DCP_CATEGORY_LABEL.CONTACT_NAME,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
      label: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
      label: HCA_DCP_CATEGORY_LABEL.GENUS_SPECIES,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
      label: HCA_DCP_CATEGORY_LABEL.DONOR_DISEASE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.INSTRUMENT_MANUFACTURER_MODEL,
      label: HCA_DCP_CATEGORY_LABEL.INSTRUMENT_MANUFACTURER_MODEL,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.INSTITUTION,
      label: HCA_DCP_CATEGORY_LABEL.INSTITUTION,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.LABORATORY,
      label: HCA_DCP_CATEGORY_LABEL.LABORATORY,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
      label: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
      label: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
      label: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.PAIRED_END,
      label: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.PRESERVATION_METHOD,
      label: HCA_DCP_CATEGORY_LABEL.PRESERVATION_METHOD,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.PUBLICATION_TITLE,
      label: HCA_DCP_CATEGORY_LABEL.PUBLICATION_TITLE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
      label: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
      label: HCA_DCP_CATEGORY_LABEL.SPECIMEN_DISEASE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
      label: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.SAMPLE_TYPE,
      label: HCA_DCP_CATEGORY_LABEL.SAMPLE_TYPE,
    },
    {
      key: HCA_DCP_CATEGORY_KEY.ANALYSIS_PROTOCOL, // workflow
      label: HCA_DCP_CATEGORY_LABEL.ANALYSIS_PROTOCOL,
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
      socials,
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
      socials,
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
