import { SiteConfig } from "../../../site-config/common/entities";
import { config } from "../../config/config";

interface ContentScope {
  browserURL: string;
  portalURL: string;
}

/**
 * Returns the content scope.
 * @returns content scope.
 */
export function getContentScope(): ContentScope {
  const siteConfig = config() as SiteConfig;
  const browserURL = siteConfig.browserURL;
  const portalURL = siteConfig.portalURL || "";
  return { browserURL, portalURL };
}
