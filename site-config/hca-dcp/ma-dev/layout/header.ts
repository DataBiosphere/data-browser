import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../../app/components/index";
import { FLATTEN } from "../../../common/constants";
import { SiteConfig } from "../../../common/entities";
import { ANNOUNCEMENTS } from "./announcements";

/**
 * Returns the header configuration for the HCA DCP MA-DEV environment.
 * @param appTitle - App title.
 * @param portalUrl - Portal URL.
 * @returns Header configuration.
 */
export function getHeader(
  appTitle: string,
  portalUrl: string
): SiteConfig["layout"]["header"] {
  return {
    announcements: ANNOUNCEMENTS,
    authenticationEnabled: true,
    logo: C.Logo({
      alt: appTitle,
      height: 32.5,
      link: "/projects",
      src: "/images/hcaExplorer.png",
    }),
    navigation: [
      undefined,
      undefined,
      [
        {
          flatten: FLATTEN.XS_ONLY,
          label: "Help & Documentation",
          menuItems: [
            {
              label: C.LabelIconMenuItem({ label: "Guides" }),
              target: ANCHOR_TARGET.BLANK,
              url: `${portalUrl}/guides`,
            },
            {
              label: C.LabelIconMenuItem({ label: "Privacy" }),
              target: ANCHOR_TARGET.BLANK,
              url: `${portalUrl}/privacy`,
            },
          ],
          url: "",
        },
      ],
    ],
    searchEnabled: false,
    searchURL: undefined,
  };
}
