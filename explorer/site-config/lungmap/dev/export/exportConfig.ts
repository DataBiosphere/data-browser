import { ExportConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { exportConfig as hcaExportConfig } from "../../../hca-dcp/dev/export/export";
import { getExportCurrentQueryAndDataSummary } from "../../../hca-dcp/dev/export/sideColumn";
import { getExportDataReleasePolicy } from "./sideColumn";

export const exportConfig: ExportConfig = {
  ...hcaExportConfig,
  tabs: [
    {
      ...hcaExportConfig.tabs[0],
      sideColumn: [
        ...getExportCurrentQueryAndDataSummary(),
        ...getExportDataReleasePolicy(),
      ],
    },
  ],
};
