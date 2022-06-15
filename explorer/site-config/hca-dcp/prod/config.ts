// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";
import devConfig from "../dev/config";

// Images
import HcaLogo from "images/hca-logo.png";

const config: SiteConfig = {
  ...devConfig,
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "dcp15",
    url: "https://service.azul.data.humancellatlas.org/",
  },
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "Human Cell Atlas Data Coordination Platform",
        height: 40,
        link: "/explore/projects",
        src: HcaLogo,
      },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
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
      searchEnabled: false,
      slogan: undefined,
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
    },
  },
};

export default config;
