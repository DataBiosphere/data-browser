import {
  AZUL_PARAM,
  ManifestDownloadFormat,
} from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { transformFilters } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/filterTransformer";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { useFileManifestState } from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifestState";

/**
 * Returns the download file manifest request parameters for the given manifest format and filters.
 * @param manifestFormat - Manifest format.
 * @returns download file manifest request parameters.
 */
export const useFileManifestRequestParams = (
  manifestFormat: ManifestDownloadFormat
): URLSearchParams => {
  const { filters } = useFileManifestState();
  const { config } = useConfig();
  const { dataSource } = config;
  const { defaultDetailParams } = dataSource;
  const { catalog } = defaultDetailParams || {};

  // Build request params.
  return new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    format: manifestFormat,
    [AZUL_PARAM.FILTERS]: transformFilters(filters),
  });
};
