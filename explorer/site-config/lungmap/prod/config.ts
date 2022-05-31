import { SiteConfig } from "../../../app/config/model";
import LungMapLogo from "images/lungmap-logo.png";
import devConfig from "../dev/config";

const config: SiteConfig = {
  ...devConfig,
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "lm2",
    url: "https://service.azul.data.humancellatlas.org/",
  },
  layout: {
    header: {
      logo: {
        url: LungMapLogo,
        alt: "LungMAP Data Browser",
      },
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
      socialLinks: {
        links: [
          {
            type: "twitter",
            url: "https://twitter.com/lungmapnet",
          },
        ],
      },
      navAlignment: "left",
      searchEnabled: false,
      authenticationEnabled: false,
    },
  },
};

export default config;
