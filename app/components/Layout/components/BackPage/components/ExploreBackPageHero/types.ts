import type { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import type { BackPageHeroProps } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";

export interface ExploreBackPageHeroProps extends Omit<
  BackPageHeroProps,
  "breadcrumbs"
> {
  /**
   * Breadcrumbs that follow the "Explore" breadcrumb.
   */
  breadcrumbs: Breadcrumb[];
}
