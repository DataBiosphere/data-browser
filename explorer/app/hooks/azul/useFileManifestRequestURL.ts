import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";

/**
 * Returns file manifest URL for the integrations end point and given request params.
 * @param requestParams - Request params.
 * @returns file manifest URL.
 */
export const useFileManifestRequestURL = (
  requestParams: URLSearchParams
): string => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { url } = dataSource;

  // Build file manifest URL
  return `${url}fetch/manifest/files?${requestParams.toString()}`;
};
