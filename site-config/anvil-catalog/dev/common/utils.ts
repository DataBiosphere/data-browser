import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import {
  Parameter,
  replaceParameters,
} from "@databiosphere/findable-ui/lib/utils/replaceParameters";
import { VISIBLE } from "../../../common/constants";

/**
 * Returns configured menu item for the navigation.
 * @param menuItem - Navigation menu item.
 * @param parameter - Parameter.
 * @returns menu item.
 */
export function buildNavigationItem(
  menuItem: NavLinkItem,
  parameter: Parameter
): NavLinkItem {
  return {
    ...menuItem,
    menuItems: buildMenuItems(menuItem.menuItems, parameter),
    url: replaceParameters(menuItem.url, parameter),
  };
}

/**
 * Returns configured menu items for the menu item.
 * @param menuItems - Menu items.
 * @param parameter - Parameter.
 * @param isSubMenu - Sub menu items.
 * @returns menu items.
 */
function buildMenuItems(
  menuItems: NavLinkItem[] | undefined,
  parameter: Parameter,
  isSubMenu = false
): NavLinkItem[] | undefined {
  return menuItems?.map(({ menuItems, url, visible, ...menuItem }) => ({
    ...menuItem,
    menuItems: buildMenuItems(menuItems, parameter, true),
    url: replaceParameters(url, parameter),
    visible: isSubMenu ? visible ?? VISIBLE.MD_DOWN : visible,
  }));
}
