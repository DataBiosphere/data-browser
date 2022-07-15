// App dependencies
import { ELEMENT_ALIGNMENT } from "../../../app/common/entities";
import { Social } from "app/components/common/Socials/socials";
import { Logo } from "../../../app/components/Layout/common/entities";
import { SiteConfig } from "../../../app/config/model";

// Summary config
import { summary } from "./Index/summary";

// Entities config
import { biosamplesEntity } from "./biosamplesEntity";
import { filesEntity } from "./filesEntity";

// Images
import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";

// Template constants
const BROWSER_URL = "https://staging.anvilproject.org";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
const LOGO: Logo = {
  alt: SLOGAN,
  height: 40,
  link: "/",
  src: logoAnvil,
};
const SOCIALS: Social[] = [
  {
    type: "discourse",
    url: "https://help.anvilproject.org/",
  },
  {
    type: "twitter",
    url: "https://twitter.com/useAnVIL",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/channel/UCBbHCj7kUogAMFyBAzzzfUw",
  },
  {
    type: "github",
    url: "https://github.com/anvilproject",
  },
  // {
  //   type: "slack",
  //   url: "https://join.slack.com/t/anvil-community/shared_invite/zt-hsyfam1w-LXlCv~3vNLSfDj~qNd5uBg",
  // },
];

const config: SiteConfig = {
  browserURL: BROWSER_URL,
  datasources: {
    defaultListParams: {
      size: "25",
      sort: "entryId",
    },
    url: "https://service.nadove3.dev.singlecell.gi.ucsc.edu/",
  },
  entities: [biosamplesEntity, filesEntity],
  entityTitle: "Anvil Data Explorer",
  layout: {
    footer: {
      logos: [
        {
          alt: "nhgri",
          height: 24,
          link: "https://www.genome.gov/",
          src: logoNhgri,
        },
        {
          alt: "nih",
          height: 24,
          link: "https://www.nih.gov/",
          src: logoNih,
        },
        {
          alt: "hhs",
          height: 32,
          link: "https://www.hhs.gov/",
          src: logoHhs,
        },
        {
          alt: "hhs",
          height: 32,
          link: "https://www.usa.gov/",
          src: logoUsagov,
        },
      ],
      navLinks: [
        {
          label: "Help",
          url: `${BROWSER_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${BROWSER_URL}/privacy`,
        },
      ],
      socials: SOCIALS,
    },
    header: {
      authenticationEnabled: false,
      logo: LOGO,
      navAlignment: ELEMENT_ALIGNMENT.CENTER,
      navLinks: [
        {
          label: "Overview",
          url: `${BROWSER_URL}/overview`,
        },
        {
          label: "Learn",
          url: `${BROWSER_URL}/learn`,
        },
        {
          label: "Datasets",
          url: `${BROWSER_URL}/files`,
        },
        {
          label: "News",
          url: `${BROWSER_URL}/news`,
        },
        {
          label: "Events",
          url: `${BROWSER_URL}/events`,
        },
        {
          label: "Team",
          url: `${BROWSER_URL}/team`,
        },
        {
          label: "FAQ",
          url: `${BROWSER_URL}/faq`,
        },
        {
          label: "Help",
          url: `${BROWSER_URL}/help`,
        },
      ],
      searchEnabled: false,
      slogan: SLOGAN,
      socials: SOCIALS,
    },
  },
  redirectRootToPath: "/files",
  summary: {
    apiPath: "index/summary",
    components: summary,
  },
};

export default config;
