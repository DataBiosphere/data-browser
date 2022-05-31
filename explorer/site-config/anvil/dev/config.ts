import { SiteConfig } from "../../../app/config/model";
import AnvilLogo from "images/anvil-logo.png";

const config: SiteConfig = {
  datasources: {
    catalog: "dcp2",
    url: "https://service.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [],
  layout: {
    header: {
      logo: {
        slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
        url: AnvilLogo,
        alt: "NHGRI Analysis Visualization and Informatics Lab-space",
      },
      navLinks: {
        links: [
          {
            label: "Overview",
            url: "https://anvilproject.org/overview",
          },
          {
            label: "Learn",
            url: "https://anvilproject.org/learn",
          },
          {
            label: "Datasets",
            url: "https://anvilproject.org/data",
          },
          {
            label: "News",
            url: "https://anvilproject.org/news",
          },
          {
            label: "Events",
            url: "https://anvilproject.org/events",
          },
          {
            label: "Team",
            url: "https://anvilproject.org/team",
          },
          {
            label: "FAQ",
            url: "https://anvilproject.org/faq",
          },
          {
            label: "Help",
            url: "https://anvilproject.org/help",
          },
        ],
      },
      socialLinks: {
        links: [
          {
            type: "twitter",
            url: "https://twitter.com/useAnVIL",
          },
          {
            type: "youtube",
            url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
          },
          {
            type: "discourse",
            url: "https://help.anvilproject.org/",
          },
          {
            type: "github",
            url: "https://github.com/anvilproject",
          },
          {
            type: "slack",
            url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
          },
        ],
      },
      navAlignment: "center",
      searchEnabled: false,
      authenticationEnabled: false,
    },
  },
};

export default config;
