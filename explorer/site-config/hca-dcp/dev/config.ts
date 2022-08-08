// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Social } from "../../../app/components/common/Socials/socials";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/common/entities";
import { breakpointTablet } from "../../../app/theme/theme";

// Summary config
import { summary } from "./index/summary";

// Entities config
import { filesEntityConfig } from "./index/filesEntityConfig";
import { projectsEntity } from "./projectsEntity";
import { samplesEntity } from "./samplesEntity";

// Images
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";

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
      key: "anatomicalEntity",
      label: "Anatomical Entity",
    },
    {
      key: "biologicalSex",
      label: "Biological Sex",
    },
    {
      key: "contactName",
      label: "Contact Name",
    },
    {
      key: "developmentStage",
      label: "Development Stage",
    },
    {
      key: "genusSpecies",
      label: "Genus Species",
    },
    {
      key: "donorDisease",
      label: "Donor Disease",
    },
    {
      key: "instrumentManufacturerModel",
      label: "Instrument Manufacturer Model",
    },
    {
      key: "institution",
      label: "Institution",
    },
    {
      key: "laboratory",
      label: "Laboratory",
    },
    {
      key: "modelOrgan",
      label: "Model Organ",
    },
    {
      key: "nucleicAcidSource",
      label: "Nucleic Acid Source",
    },
    {
      key: "organPart",
      label: "Organ Part",
    },
    {
      key: "pairedEnd",
      label: "Paired End",
    },
    {
      key: "preservationMethod",
      label: "Preservation Method",
    },
    {
      key: "publicationTitle",
      label: "Publication Title",
    },
    {
      key: "libraryConstructionApproach",
      label: "Library Construction Method",
    },
    {
      key: "specimenDisease",
      label: "Specimen Disease",
    },
    {
      key: "selectedCellType",
      label: "Selected Cell Type",
    },
    {
      key: "sampleType",
      label: "Sample Type",
    },
    {
      key: "workflow",
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
  entities: [projectsEntity, samplesEntity, filesEntityConfig],
  entityTitle: "Explore Data: DCP 2.0 Data View",
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
    typography: {
      "text-body-large-500": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 18,
        fontWeight: 600,
      },
      "text-heading": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 26,
          letterSpacing: "normal",
        },
      },
      "text-heading-large": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 26,
        fontWeight: 600,
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
        fontWeight: 600,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 22,
          letterSpacing: "normal",
        },
      },
      "text-heading-xlarge": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 32,
        fontWeight: 600,
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
