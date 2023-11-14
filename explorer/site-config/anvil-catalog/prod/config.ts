import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../../app/components";
import { SiteConfig } from "../../common/entities";
import anvilCatalogDevConfig from "../dev/config";

// Template constants
const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const EXPLORER_URL = "https://prod.anvil.gi.ucsc.edu";
const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
const ROOT_PATH = "/consortia";

const config: SiteConfig = {
  ...anvilCatalogDevConfig,
  browserURL: BROWSER_URL,
  layout: {
    ...anvilCatalogDevConfig.layout,
    footer: {
      ...anvilCatalogDevConfig.layout.footer,
      navLinks: [
        {
          label: "Help",
          url: `${PORTAL_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${PORTAL_URL}/privacy`,
        },
      ],
    },
    header: {
      ...anvilCatalogDevConfig.layout.header,
      navLinks: [
        {
          label: "Overview",
          url: `${PORTAL_URL}/overview`,
        },
        {
          label: "Learn",
          url: `${PORTAL_URL}/learn`,
        },
        {
          featureFlag: false,
          label: "Datasets",
          url: ROOT_PATH,
        },
        {
          featureFlag: true,
          label: "Datasets",
          menuItems: [
            {
              description:
                "An open-access view of studies, workspaces, and consortia.",
              label: "Catalog",
              url: ROOT_PATH,
            },
            {
              description:
                "Build, download, and export cross-study cohorts of open and managed access data.",
              label: C.LabelIconMenuItem({
                iconFontSize: "small",
                label: "Explorer",
              }),
              target: ANCHOR_TARGET.BLANK,
              url: `${EXPLORER_URL}/datasets`,
            },
          ],
          url: "",
        },
        {
          label: "Consortia",
          url: `${PORTAL_URL}/consortia`,
        },
        {
          label: "News",
          url: `${PORTAL_URL}/news`,
        },
        {
          label: "Events",
          url: `${PORTAL_URL}/events`,
        },
        {
          label: HEADER_NAVIGATION_LABEL.MORE,
          menuItems: [
            {
              label: "Team",
              url: `${PORTAL_URL}/team`,
            },
            {
              label: "FAQ",
              url: `${PORTAL_URL}/faq`,
            },
            {
              label: "Help",
              url: `${PORTAL_URL}/help`,
            },
          ],
          url: "",
        },
      ],
      searchURL: `${PORTAL_URL}/search`,
    },
  },
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "foHZB1OikGzRdcl1gkapNw";
  analytics.gtmPreview = "env-1";
  config.analytics = analytics;
}

export default config;
