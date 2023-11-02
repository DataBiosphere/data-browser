import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../app/components";
import devConfig from "../dev/config";

// Template constants

const ORG_URL = "https://www.humancellatlas.org";

const PORTAL_URL = "https://data.humancellatlas.org";
const BROWSER_URL = "https://explore.data.humancellatlas.org";

const config: SiteConfig = {
  ...devConfig,
  browserURL: BROWSER_URL,
  exportToTerraUrl: "https://app.terra.bio",
  layout: {
    ...devConfig.layout,
    footer: {
      Branding: C.HCABranding({
        orgURL: ORG_URL,
        portalURL: PORTAL_URL,
      }),
      navLinks: [
        {
          label: "About",
          target: ANCHOR_TARGET.BLANK,
          url: `${PORTAL_URL}/about`,
        },
        {
          label: "Help",
          target: ANCHOR_TARGET.BLANK,
          url: `${PORTAL_URL}/help`,
        },
        {
          label: "Privacy",
          target: ANCHOR_TARGET.BLANK,
          url: `${PORTAL_URL}/privacy`,
        },
        {
          label: "Contact",
          target: ANCHOR_TARGET.BLANK,
          url: `${PORTAL_URL}/contact`,
        },
      ],
    },
    header: {
      ...devConfig.layout.header,
      navLinks: [
        {
          flatten: true,
          label: "Help & Documentation",
          menuItems: [
            {
              label: C.LabelIconMenuItem({ label: "Guides" }),
              target: ANCHOR_TARGET.BLANK,
              url: `${PORTAL_URL}/guides`,
            },
            {
              label: C.LabelIconMenuItem({ label: "Privacy" }),
              target: ANCHOR_TARGET.BLANK,
              url: `${PORTAL_URL}/privacy`,
            },
          ],
          url: "",
        },
      ],
    },
  },
};

// Update gtmAuth for the prod environment lookup.
if (config.analytics) {
  const analytics = { ...config.analytics };
  analytics.gtmAuth = "xm3qglWPEFim7Lb4AxXnsA";
  analytics.gtmPreview = "env-2";
  config.analytics = analytics;
}

export default config;
