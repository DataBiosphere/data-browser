import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { PORTAL_ROUTES } from "../../../common/constants";
import { buildNavigationItem } from "../../../common/utils";
import { HELP } from "../../header/navigation/navigationItem/help";
import { PRIVACY } from "../../header/navigation/navigationItem/privacy";

/**
 * Returns configured footer navigation.
 * @param portalUrl - Portal URL.
 * @returns navigation.
 */
export function buildNavigation(portalUrl: string): NavLinkItem[] {
  return [
    buildNavigationItem(HELP, { help: PORTAL_ROUTES.HELP, portalUrl }),
    buildNavigationItem(PRIVACY, {
      portalUrl,
      privacy: PORTAL_ROUTES.PRIVACY,
    }),
  ];
}
