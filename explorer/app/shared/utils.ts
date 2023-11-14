import { NavLinkItem as DXNavLinkItem } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { HeaderProps as DXHeader } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { NavLinkItem, SiteConfig } from "../../site-config/common/entities";

/**
 * Returns the header properties for the site config and feature flag.
 * @param siteConfig - Site config.
 * @param isFeatureFlag - Flag indicating if feature is available to user.
 * @returns header properties.
 */
export function getFeatureFlagHeader(
  siteConfig: SiteConfig,
  isFeatureFlag: boolean
): DXHeader {
  if (!isFeatureFlag) {
    return siteConfig.layout.header;
  }
  const header = siteConfig.layout.header;
  const navLinks = filterFeatureFlagNavigation(header.navLinks, isFeatureFlag);
  return {
    ...header,
    navLinks,
  };
}

/**
 * Returns the header navigation links for the site config and feature flag.
 * @param navLinks - Nav links.
 * @param isFeatureFlag - Flag indicating if feature is available to user.
 * @returns navigation links.
 */
function filterFeatureFlagNavigation(
  navLinks: NavLinkItem[],
  isFeatureFlag: boolean
): DXNavLinkItem[] {
  return navLinks
    .filter(
      ({ featureFlag }) =>
        featureFlag === undefined || featureFlag === isFeatureFlag
    )
    .map((navLink) => {
      delete navLink.featureFlag;
      return navLink;
    });
}
