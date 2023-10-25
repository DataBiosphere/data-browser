import { HEADER_NAVIGATION_LABEL } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/common/constants";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import anvilCatalogDevConfig from "../dev/config";

const BROWSER_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

const config: SiteConfig = {
  ...anvilCatalogDevConfig,
  layout: {
    ...anvilCatalogDevConfig.layout,
    footer: {
      ...anvilCatalogDevConfig.layout.footer,
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
    },
    header: {
      ...anvilCatalogDevConfig.layout.header,
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
          label: "Consortia",
          url: `${BROWSER_URL}/consortia`,
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
          label: HEADER_NAVIGATION_LABEL.MORE,
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
      searchURL: `${BROWSER_URL}/search`,
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
