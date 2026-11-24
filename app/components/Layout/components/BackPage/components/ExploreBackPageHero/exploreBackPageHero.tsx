import { Breadcrumbs } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { BackPageHero } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { useExploreList } from "@databiosphere/findable-ui/lib/providers/exploreList/hook";
import { NoSsr } from "@mui/material";
import type { JSX } from "react";
import type { ExploreBackPageHeroProps } from "./types";
import { getExploreBreadcrumb } from "./utils";

/**
 * Back page hero whose breadcrumbs start with "Explore", linking to the entity list the user explored from. In the
 * static HTML, "Explore" links to the page's own entity list (or the site's default list), until the page renders on
 * the client.
 * @param props - Back page hero props.
 * @param props.breadcrumbs - Breadcrumbs that follow the "Explore" breadcrumb.
 * @returns The back page hero.
 */
export const ExploreBackPageHero = ({
  breadcrumbs,
  ...props
}: ExploreBackPageHeroProps): JSX.Element => {
  const { entityConfig } = useConfig();
  const exploreList = useExploreList();
  return (
    <BackPageHero
      // Client-only: the explore list can come from the URL's `list` param, which the static HTML doesn't know, and
      // React doesn't correct a mismatched `href` during hydration. The fallback links to the page's own entity list,
      // the same list `_app` passes the explore list provider as `initialList`.
      breadcrumbs={
        <NoSsr
          fallback={
            <Breadcrumbs
              breadcrumbs={[
                getExploreBreadcrumb(entityConfig.route),
                ...breadcrumbs,
              ]}
            />
          }
        >
          <Breadcrumbs
            breadcrumbs={[getExploreBreadcrumb(exploreList), ...breadcrumbs]}
          />
        </NoSsr>
      }
      {...props}
    />
  );
};
