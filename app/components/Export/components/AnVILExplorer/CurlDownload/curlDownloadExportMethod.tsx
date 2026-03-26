import { JSX } from "react";
import { ComponentProps } from "react";
import { ExportMethod as DXExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { FEATURES } from "app/shared/entities";

/**
 * Export method component for curl download.
 * Hidden if the curl download feature is not enabled.
 * @param props - Export method component props.
 * @returns Export method component.
 */
export const CurlDownloadExportMethod = (
  props: ComponentProps<typeof DXExportMethod>
): JSX.Element | null => {
  const isEnabled = useFeatureFlag(FEATURES.CURL_DOWNLOAD);

  if (!isEnabled) return null;

  return <DXExportMethod {...props} />;
};
