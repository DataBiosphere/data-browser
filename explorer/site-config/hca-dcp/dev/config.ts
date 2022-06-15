// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";
import {
  fileDetailToView,
  filesListToView,
  getProjectId,
  projectDetailToView,
  projectListToView,
  sampleDetailToView,
  samplesListToView,
} from "app/transformers/hca";

// Images
import HcaLogo from "images/hca-logo.png";

const config: SiteConfig = {
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "dcp2",
    url: "https://service.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [
    {
      label: "Projects",
      apiPath: "index/projects",
      route: "projects",
      listTransformer: projectListToView,
      detailTransformer: projectDetailToView,
      getId: getProjectId,
      staticLoad: true,
    },
    {
      label: "Files",
      apiPath: "index/files",
      route: "files",
      listTransformer: filesListToView,
      detailTransformer: fileDetailToView,
    },
    {
      label: "Samples",
      apiPath: "index/samples",
      route: "samples",
      listTransformer: samplesListToView,
      detailTransformer: sampleDetailToView,
    },
  ],
  layout: {
    header: {
      logo: {
        alt: "Human Cell Atlas Data Coordination Platform",
        height: 40,
        link: "/explore/projects",
        src: HcaLogo,
      },
      navLinks: {
        links: [
          {
            label: "Explore",
            url: "https://data.humancellatlas.org/explore/projects",
          },
          {
            label: "Guides",
            url: "https://data.humancellatlas.org/guides",
          },
          {
            label: "Metadata",
            url: "https://data.humancellatlas.org/metadata",
          },
          {
            label: "Pipelines",
            url: "https://data.humancellatlas.org/pipelines",
          },
          {
            label: "Analysis Tools",
            url: "https://data.humancellatlas.org/analyze",
          },
          {
            label: "Contribute",
            url: "https://data.humancellatlas.org/contribute",
          },
          {
            label: "APIs",
            url: "https://data.humancellatlas.org/apis",
          },
          {
            label: "Updates",
            url: "https://data.humancellatlas.org/dcp-updates",
          },
        ],
      },
      socialLinks: {
        links: [
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
        ],
      },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      searchEnabled: false,
      slogan: undefined,
      authenticationEnabled: false,
    },
  },
};

export default config;
