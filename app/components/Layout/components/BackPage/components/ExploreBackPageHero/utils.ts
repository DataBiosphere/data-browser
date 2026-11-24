import type { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { EXPLORE_BREADCRUMB_TEXT } from "./constants";

/**
 * Returns the "Explore" breadcrumb, linking to the given explore list.
 * @param exploreList - Entity list type the user explored from, e.g. "files".
 * @returns The "Explore" breadcrumb.
 */
export function getExploreBreadcrumb(exploreList: string): Breadcrumb {
  return { path: `/${exploreList}`, text: EXPLORE_BREADCRUMB_TEXT };
}
