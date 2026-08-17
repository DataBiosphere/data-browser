import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../../app/components/index";
import { SiteConfig } from "../../../common/entities";

/**
 * Returns the footer configuration for the HCA DCP MA-DEV environment.
 * @param portalUrl - Portal URL.
 * @returns Footer configuration.
 */
export function getFooter(portalUrl: string): SiteConfig["layout"]["footer"] {
  return {
    Branding: C.HCABranding({
      orgURL: "https://www.humancellatlas.org",
      portalURL: portalUrl,
    }),
    navLinks: [
      {
        label: "About",
        target: ANCHOR_TARGET.BLANK,
        url: `${portalUrl}/about`,
      },
      {
        label: "Help",
        target: ANCHOR_TARGET.BLANK,
        url: `${portalUrl}/help`,
      },
      {
        label: "Privacy",
        target: ANCHOR_TARGET.BLANK,
        url: `${portalUrl}/privacy`,
      },
      {
        label: "Contact",
        target: ANCHOR_TARGET.BLANK,
        url: `${portalUrl}/contact`,
      },
    ],
    versionInfo: true,
  };
}
