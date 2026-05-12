import { SiteConfig } from "../../../common/entities";
import { FLOATING } from "./floating";
import { getFooter } from "./footer";
import { getHeader } from "./header";

/**
 * Returns the layout configuration for the HCA DCP MA-DEV environment.
 * @param appTitle - Application title.
 * @param portalUrl - Portal URL.
 * @returns Layout configuration.
 */
export function getLayout(
  appTitle: string,
  portalUrl: string
): SiteConfig["layout"] {
  return {
    floating: FLOATING,
    footer: getFooter(portalUrl),
    header: getHeader(appTitle, portalUrl),
  };
}
