import { PARAMS_INDEX_TAB } from "app/shared/constants";
import { useRouter } from "next/router";
import { BackPageTabConfig } from "../config/common/entities";
import { getEntityConfig } from "../config/config";

/**
 * Model of current selected tab and the tab's corresponding route in the set of tabs.
 */
export interface CurrentDetailTab {
  currentTab: BackPageTabConfig;
  route: string;
}

/**
 * Hook to get the current tab and its route that will be used to create the detail page.
 * @param tabValue - the selected entity thpe
 * @returns Current tab and current tab route.
 */
export const useCurrentDetailTab = (tabValue: string): CurrentDetailTab => {
  const router = useRouter();
  const currentEntityConfig = getEntityConfig(tabValue);
  const tabRoute = router.query.params?.[PARAMS_INDEX_TAB] ?? ""; // TODO ? take from state instead of rounter?

  const currentTab =
    currentEntityConfig.detail.tabs.find((tab) => tab.route === tabRoute) ||
    currentEntityConfig.detail.tabs[0];

  return {
    currentTab,
    route: tabRoute,
  };
};
