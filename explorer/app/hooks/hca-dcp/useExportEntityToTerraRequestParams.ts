import {
  AZUL_PARAM,
  EXPORT_TO_TERRA_FORMAT,
  EXPORT_TO_TERRA_PARAM,
} from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { transformFilters } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/filterTransformer";
import { useConfig } from "@clevercanary/data-explorer-ui/lib/hooks/useConfig";
import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";

/**
 * Returns the export to Terra request parameters from the given filters.
 * @returns export to Terra request parameters.
 */
export const useExportEntityToTerraRequestParams = (): URLSearchParams => {
  const { exportFilters } = useDetailState();
  const { config } = useConfig();
  const { dataSource } = config;
  const { defaultDetailParams } = dataSource;
  const { catalog } = defaultDetailParams || {};

  // Build request params.
  return new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [EXPORT_TO_TERRA_PARAM.FORMAT]: EXPORT_TO_TERRA_FORMAT.PFB,
    [AZUL_PARAM.FILTERS]: transformFilters(exportFilters),
  });
};
