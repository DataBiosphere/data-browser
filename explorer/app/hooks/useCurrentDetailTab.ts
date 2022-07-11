import { PARAMS_INDEX_TAB } from "app/shared/constants";
import { useRouter } from "next/router";
import { useCurrentEntity } from "./useCurrentEntity";

/**
 * Hook to get the current tab that will be used to create the detail page
 */
export const useCurrentDetailTab = () => {
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
