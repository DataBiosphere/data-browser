import { PARAMS_INDEX_TAB } from "app/shared/constants";
import { useRouter } from "next/router";
import { useCurrentEntity } from "./useCurrentEntity";
import { DetailTabConfig } from "../config/model";

/**
 * Model of current selected tab and it's corresponding index in the set of tabs.
 */
export interface CurrentDetailTab {
  currentTab: DetailTabConfig;
  tabIndex: number;
}

/**
 * Hook to get the current tab and its index that will be used to create the detail page.
 * @returns Current tab and current tab index.
 */
export const useCurrentDetailTab = (): CurrentDetailTab => {
  const router = useRouter();
  const currentEntity = useCurrentEntity();
  const tabRoute = router.query.params?.[PARAMS_INDEX_TAB] ?? "";

  const currentIndex =
    currentEntity.detail.tabs.findIndex((tab) => tab.route === tabRoute) ?? 0;

  return {
    currentTab: currentEntity.detail.tabs[currentIndex],
    tabIndex: currentIndex,
  };
};
