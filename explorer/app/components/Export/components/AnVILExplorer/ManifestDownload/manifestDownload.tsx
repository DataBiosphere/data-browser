import { Alert } from "@databiosphere/findable-ui/lib/components/common/Alert/alert";
import {
  ManifestDownload as DXManifestDownload,
  ManifestDownloadProps,
} from "@databiosphere/findable-ui/lib/components/Export/components/ManifestDownload/manifestDownload";
import { useExploreState } from "@databiosphere/findable-ui/lib/hooks/useExploreState";
import { useEffect, useState } from "react";
import { FEATURE_FLAGS } from "../../../../../viewModelBuilders/common/contants";

export const ManifestDownload = ({
  ...props
}: ManifestDownloadProps): JSX.Element => {
  const {
    exploreState: { featureFlagState },
  } = useExploreState();
  const [showExport, setShowExport] = useState<boolean>(false);

  useEffect(() => {
    if (featureFlagState) {
      setShowExport(featureFlagState === FEATURE_FLAGS.MANIFEST);
    }
  }, [featureFlagState]);

  return showExport ? (
    <DXManifestDownload {...props} />
  ) : (
    <Alert severity="error" title="Not Available" />
  );
};
