// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";
import devConfig from "../dev/config";

// Images
import LungMapLogo from "images/lungmap-logo.png";

const config: SiteConfig = {
  ...devConfig,
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "lm2",
    url: "https://service.azul.data.humancellatlas.org/",
  },
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
