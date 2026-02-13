import { JSX } from "react";
import { ComponentProps } from "react";
import { ExportMethod as DXExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { FEATURES } from "app/shared/entities";

/**
 * Export method component for platform based export.
 * Hidden if the platform based export feature is not enabled (NCPI Export).
 * @param props - Export method component props.
 * @returns Export method component.
 */
export const ExportMethod = (
  props: ComponentProps<typeof DXExportMethod>
): JSX.Element | null => {
  const isEnabled = useFeatureFlag(FEATURES.NCPI_EXPORT);

  if (!isEnabled) return null;

  return <DXExportMethod {...props} />;
};
