import { ExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { FEATURES } from "app/shared/entities";
import type { ComponentProps, JSX } from "react";

/**
 * Export method for a Velsera platform; shown as "coming soon" when configured so, or when the Velsera export feature flag is off.
 * @param props - Export method component props.
 * @returns Export method component.
 */
export const VelseraExportMethod = (
  props: ComponentProps<typeof ExportMethod>
): JSX.Element => {
  const isEnabled = useFeatureFlag(FEATURES.VELSERA_EXPORT);
  return (
    <ExportMethod {...props} comingSoon={props.comingSoon || !isEnabled} />
  );
};
