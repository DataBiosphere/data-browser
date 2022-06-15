// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";
import {
  filesListToView,
  getProjectId,
  projectListToView,
  samplesListToView,
} from "app/transformers/hca";

// Images
import LungMapLogo from "images/lungmap-logo.png";

const config: SiteConfig = {
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "lm2",
    // url: "https://service.dev.singlecell.gi.ucsc.edu/",
    url: "https://service.azul.data.humancellatlas.org/",
  },
  entities: [
    {
      label: "Projects",
      apiPath: "index/projects",
      route: "projects",
      listTransformer: projectListToView,
      staticLoad: true,
      getId: getProjectId,
    },
    {
      label: "Files",
      apiPath: "index/files",
      route: "files",
      listTransformer: filesListToView,
    },
    {
      label: "Samples",
      apiPath: "index/samples",
      route: "samples",
      listTransformer: samplesListToView,
    },
  ],
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "LungMAP Data Browser",
        height: 40,
        link: "/explore/projects",
        src: LungMapLogo,
      },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: {
        links: [
          {
            label: "Explore",
            url: "https://data-browser.lungmap.net/explore/projects",
          },
          {
            label: "Metadata",
            url: "https://data-browser.lungmap.net/metadata",
          },
          {
            label: "APIs",
            url: "https://data-browser.lungmap.net/apis",
          },
        ],
      },
      searchEnabled: false,
      slogan: undefined,
      socialLinks: {
        links: [
          {
            type: "twitter",
            url: "https://twitter.com/lungmapnet",
          },
        ],
      },
    },
  },
};

export default config;
