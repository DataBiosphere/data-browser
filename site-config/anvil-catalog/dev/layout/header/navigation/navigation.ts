import { Navigation } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { FLATTEN } from "../../../../../common/constants";
import {
  EXPLORER_ROUTES,
  PORTAL_ROUTES,
  ROUTES,
} from "../../../common/constants";
import { buildNavigationItem } from "../../../common/utils";
import { CONSORTIA } from "./navigationItem/consortia";
import { DATASETS } from "./navigationItem/datasets";
import { EVENTS } from "./navigationItem/events";
import { FAQ } from "./navigationItem/faq";
import { HELP } from "./navigationItem/help";
import { LEARN } from "./navigationItem/learn";
import { NEWS } from "./navigationItem/news";
import { OVERVIEW } from "./navigationItem/overview";
import { SOCIAL } from "./navigationItem/social";
import { TEAM } from "./navigationItem/team";

/**
 * Returns configured header navigation.
 * @param portalUrl - Portal URL.
 * @param explorerUrl - Explorer URL.
 * @returns navigation.
 */
export function buildNavigation(
  portalUrl: string,
  explorerUrl: string
): Navigation {
  return [
    undefined,
    [
      buildNavigationItem(OVERVIEW, {
        overview: PORTAL_ROUTES.OVERVIEW,
        portalUrl,
      }),
      buildNavigationItem(LEARN, {
        learn: PORTAL_ROUTES.LEARN,
        portalUrl,
      }),
      buildNavigationItem(DATASETS, {
        consortia: ROUTES.CONSORTIA,
        datasets: EXPLORER_ROUTES.DATASETS,
        explorerUrl,
        studies: ROUTES.STUDIES,
        workspaces: ROUTES.WORKSPACES,
      }),
      buildNavigationItem(NEWS, {
        news: PORTAL_ROUTES.NEWS,
        portalUrl,
      }),
      buildNavigationItem(EVENTS, {
        events: PORTAL_ROUTES.EVENTS,
        portalUrl,
      }),
      {
        flatten: FLATTEN.XS_ONLY,
        label: "More",
        menuItems: [
          buildNavigationItem(CONSORTIA, {
            consortia: PORTAL_ROUTES.CONSORTIA,
            portalUrl,
          }),
          buildNavigationItem(TEAM, {
            portalUrl,
            team: PORTAL_ROUTES.TEAM,
          }),
          buildNavigationItem(FAQ, {
            faq: PORTAL_ROUTES.FAQ,
            portalUrl,
          }),
          buildNavigationItem(HELP, {
            help: PORTAL_ROUTES.HELP,
            portalUrl,
          }),
          SOCIAL,
        ],
        url: "",
      },
    ],
    undefined,
  ];
}
