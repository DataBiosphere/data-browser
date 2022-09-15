import { PARAMS_INDEX_TAB } from "app/shared/constants";
import { useRouter } from "next/router";
import { BackPageTabConfig } from "../config/common/entities";
import { useCurrentEntityConfig } from "./useCurrentEntityConfig";

/**
 * Model of current selected tab and the tab's corresponding route in the set of tabs.
 */
export interface CurrentDetailTab {
  currentTab: BackPageTabConfig;
  route: string;
}

/**
 * Hook to get the current tab and its route that will be used to create the detail page.
 * @returns Current tab and current tab route.
 */
export const useCurrentDetailTab = (): CurrentDetailTab => {
  const router = useRouter();
  const currentEntity = useCurrentEntityConfig();
  const tabRoute = router.query.params?.[PARAMS_INDEX_TAB] ?? "";

  const currentTab =
    currentEntity.detail.tabs.find((tab) => tab.route === tabRoute) ||
    currentEntity.detail.tabs[0];

  return {
    currentTab,
    route: tabRoute,
  };
};
