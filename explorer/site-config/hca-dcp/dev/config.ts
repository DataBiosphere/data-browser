import { SiteConfig } from "../../../app/config/model";

const config: SiteConfig = {
  redirectRootToPath: "/explore/projects",
  datasources: {
    catalog: "dcp2",
    url: "https://service.dev.singlecell.gi.ucsc.edu/",
  },
  layout: {
    header: {
      logo: {
        slogan: "HCA DPC",
        url: "https://www.webhostingsecretrevealed.net/wp-content/uploads/logo-nightwatch-300x300.jpg",
        height: 30,
        width: 30,
        alt: "Human Cell Atlas Data Coordination Platform",
      },
      navLinks: {
        links: [
          {
            label: "Google",
            url: "https://google.com",
          },
        ],
      },
      socialLinks: {
        links: [
          {
            type: "github",
            url: "https://github.com/BruceRodrigues",
          },
        ],
      },
      navAlignment: "left",
      searchEnabled: true,
      authenticationEnabled: true,
    },
  },
};

export default config;
