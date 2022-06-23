// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { SiteConfig } from "../../../app/config/model";

// Images
import AnvilLogo from "images/anvil-logo.png";
import { filesEntity } from "./filesEntity";

const config: SiteConfig = {
  datasources: {
    defaultListParams: {
      sort: "entryId",
    },
    url: "https://service.nadove2.dev.singlecell.gi.ucsc.edu/",
  },
  redirectRootToPath: "/explore/files",
  entities: [filesEntity],
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "NHGRI Analysis Visualization and Informatics Lab-space",
        height: 40,
        link: "/",
        src: AnvilLogo,
      },
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
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
      searchEnabled: false,
      slogan: "NHGRI Analysis Visualization and Informatics Lab-space",
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
    },
  },
};

export default config;
