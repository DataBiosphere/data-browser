import { SiteConfig } from "../../../site-config/common/entities";
import { config } from "../../config/config";

interface ContentScope {
  browserURL: string;
  portalURL: string;
  redirectRootToPath: string;
}

/**
 * Returns the content scope.
 * @returns content scope.
 */
export function getContentScope(): ContentScope {
  const {
    browserURL,
    portalURL = "",
    redirectRootToPath,
  } = config() as SiteConfig;
  return { browserURL, portalURL, redirectRootToPath };
}
