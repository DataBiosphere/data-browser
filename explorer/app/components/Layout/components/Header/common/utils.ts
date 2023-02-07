import { CustomIcon } from "../../../../common/CustomIcon/customIcon";
import { Social } from "../../../../common/Socials/socials";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { NavLinkItem } from "../../../common/entities";
import { MenuItem } from "../components/NavLinkMenu/navLinkMenu";

/**
 * Returns header navigation links for the specified media breakpoint query.
 * @param links - Header navigation links.
 * @param socials - Header socials.
 * @param onlySmDesktop - Media breakpoint query is "true" for small desktop only.
 * @returns header navigation links.
 */
export function getHeaderNavigationLinks(
  links: NavLinkItem[],
  socials: Social[],
  onlySmDesktop: boolean
): NavLinkItem[] {
  if (onlySmDesktop) {
    const navLinks = [...links];
    if (socials) {
      navLinks.push({
        label: "Follow Us",
        menuItems: getFollowUsMenuItems(socials),
        url: "",
      });
    }
    return navLinks;
  }
  // Return the links without the "More" or "Follow Us" menu.
  return links.flatMap((link) => link.menuItems || link);
}

/**
 * Returns menu items for the "Follow Us" menu.
 * @param socials - Social configuration.
 * @returns a list of social menu items for the "Follow Us" menu.
 */
function getFollowUsMenuItems(socials: Social[]): MenuItem[] {
  return socials.map(({ label, type, url }) => {
    return {
      icon: CustomIcon({ fontSize: "small", iconName: type }),
      label,
      target: ANCHOR_TARGET.BLANK,
      url,
    };
  });
}
