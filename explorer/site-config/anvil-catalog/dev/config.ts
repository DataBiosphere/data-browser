import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { LogoProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Logo/logo";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoAnvil from "images/logoAnvil.png";
import logoHhs from "images/logoHhs.svg";
import logoNhgri from "images/logoNhgri.svg";
import logoNih from "images/logoNih.svg";
import logoUsagov from "images/logoUsagov.png";
import anvilDevConfig from "../../anvil/dev/config";
import { socials } from "../../anvil/dev/constants";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../category";
import { consortiaEntityConfig } from "./index/consortiaEntityConfig";
import { studiesEntityConfig } from "./index/studiesEntityConfig";
import { workspaceEntityConfig } from "./index/workspaceEntityConfig";

const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const SLOGAN = "NHGRI Analysis Visualization and Informatics Lab-space";
const LOGO: LogoProps = {
  alt: SLOGAN,
  height: 40,
  link: BROWSER_URL,
  src: logoAnvil,
};

const config: SiteConfig = {
  ...anvilDevConfig,
  analytics: {
    gtmAuth: "rrXpUu-I_wxMe0FRk_mnIg", // GTM environment-specific
    gtmId: "GTM-WCWXHT4",
    gtmPreview: "env-4",
  },
  authentication: undefined,
  browserURL: BROWSER_URL,
  categoryConfigs: [
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
      label: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
      label: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
      label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
      label: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
    },
    {
      key: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
      label: "Terra Workspace Name", // TODO review label here and elsewhere
    },
  ],
  dataSource: {
    url: "",
  },
  entities: [studiesEntityConfig, workspaceEntityConfig, consortiaEntityConfig],
  explorerTitle: "AnVIL Dataset Catalog",
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
      socials,
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
          url: `/`,
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
          label: "More",
          menuItems: [
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
          url: "",
        },
      ],
      searchEnabled: true,
      searchURL: `${BROWSER_URL}/search`,
      slogan: SLOGAN,
      socials,
    },
  },
  redirectRootToPath: "/studies",
  summaryConfig: undefined,
};

export default config;
