import {
  ComponentConfig,
  ExportConfig,
  ExportMethodConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as V from "../../../../app/viewModelBuilders/azul/lungmap/common/viewModelBuilders";
import {
  ROUTE_BULK_DOWNLOAD,
  ROUTE_EXPORT_TO_TERRA,
  ROUTE_MANIFEST_DOWNLOAD,
} from "../../../hca-dcp/dev/export/constants";
import { exportConfig as hcaExportConfig } from "../../../hca-dcp/dev/export/export";
import { getExportCurrentQueryAndDataSummary } from "../../../hca-dcp/dev/export/sideColumn";
import { getExportDataReleasePolicy } from "./sideColumn";

export const exportConfig: ExportConfig = {
  ...getExportConfig(hcaExportConfig),
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

/**
 * Returns the export config.
 * @param exportConfig - Export config.
 * @returns export config.
 */
function getExportConfig(exportConfig: ExportConfig): ExportConfig {
  // Clone export config.
  const cloneExportConfig = { ...exportConfig };
  // Update export methods.
  cloneExportConfig.exportMethods = getExportMethods(exportConfig);
  return cloneExportConfig;
}

/**
 * Returns the export methods.
 * @param exportConfig - Export config.
 * @returns export methods.
 */
function getExportMethods(exportConfig: ExportConfig): ExportMethodConfig[] {
  return [...exportConfig.exportMethods].map((exportMethod) => {
    const cloneExportMethod = { ...exportMethod };
    const mainColumn = cloneExportMethod.mainColumn as ComponentConfig[];
    // Clone main column.
    const cloneMainColumn = [...mainColumn];
    // Clone first component of main column.
    const cloneFirstComponent = { ...cloneMainColumn[0] };
    // Update the export method view builders for each download type.
    if (cloneExportMethod.route === ROUTE_BULK_DOWNLOAD) {
      // Update view builder for bulk download.
      cloneFirstComponent.viewBuilder = V.buildDownloadCurlCommand;
    }
    if (cloneExportMethod.route === ROUTE_MANIFEST_DOWNLOAD) {
      // Update view builder for manifest download.
      cloneFirstComponent.viewBuilder = V.buildManifestDownload;
    }
    if (cloneExportMethod.route === ROUTE_EXPORT_TO_TERRA) {
      // Update view builder for export to Terra.
      cloneFirstComponent.viewBuilder = V.buildExportToTerra;
    }
    cloneExportMethod.mainColumn = [cloneFirstComponent];
    return cloneExportMethod;
  });
}
