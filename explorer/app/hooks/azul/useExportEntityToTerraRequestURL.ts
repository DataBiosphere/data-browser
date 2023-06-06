import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";

/**
 * Returns the export to Terra request URL for the given request params.
 * @param requestParams - Export to terra request params.
 * @returns export to Terra request URL.
 */
export const useExportEntityToTerraRequestURL = (
  requestParams: URLSearchParams
): string => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { url } = dataSource;

  // Build export to terra request URL
  return `${url}fetch/manifest/files?${requestParams.toString()}`;
};
