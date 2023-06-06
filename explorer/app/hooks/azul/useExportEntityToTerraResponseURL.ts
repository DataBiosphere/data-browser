import { buildExportToTerraUrl } from "@clevercanary/data-explorer-ui/lib/components/Export/common/utils";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { FileLocation } from "@clevercanary/data-explorer-ui/lib/hooks/useRequestFileLocation";

/**
 * Returns the export to Terra response URL for the given request file location.
 * @param requestParams - Export to terra request params.
 * @param fileLocation - Request file location.
 * @returns export to Terra request and response URLs.
 */
export const useExportEntityToTerraResponseURL = (
  requestParams: URLSearchParams,
  fileLocation?: FileLocation
): string | undefined => {
  const { config } = useConfig();
  const { exportToTerraUrl } = config;
  const { location } = fileLocation || {};

  if (!exportToTerraUrl || !location) {
    return;
  }

  // Build export to terra response URL
  return buildExportToTerraUrl(exportToTerraUrl, requestParams, location);
};
