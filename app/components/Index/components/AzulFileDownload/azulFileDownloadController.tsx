import { useExploreState } from "@databiosphere/findable-ui/lib/hooks/useExploreState";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { updateVisibility } from "@databiosphere/findable-ui/lib/providers/exploreState/actions/updateVisibility/dispatch";
import { JSX, useEffect } from "react";
import { FEATURES } from "../../../../shared/entities";
import { ANVIL_CMG_CATEGORY_KEY } from "../../../../../site-config/anvil-cmg/category";

/**
 * Controller component that syncs the AZUL_DOWNLOAD feature flag with column visibility.
 * Renders nothing but manages the download column visibility based on the feature flag.
 * @returns Empty fragment.
 */
export const AzulFileDownloadController = (): JSX.Element => {
  const isDownloadEnabled = useFeatureFlag(FEATURES.AZUL_DOWNLOAD);
  const { exploreDispatch } = useExploreState();

  useEffect(() => {
    exploreDispatch(
      updateVisibility({
        updaterOrValue: (prev) => ({
          ...prev,
          [ANVIL_CMG_CATEGORY_KEY.AZUL_FILE_DOWNLOAD]: isDownloadEnabled,
        }),
      })
    );
  }, [isDownloadEnabled, exploreDispatch]);

  return <></>;
};
