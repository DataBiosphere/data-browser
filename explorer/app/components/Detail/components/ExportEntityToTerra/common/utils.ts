import { Filters } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { ExportFilterKeyExportCategory } from "../components/ExportEntityToTerraForm/exportEntityToTerraForm";

/**
 * Returns initially selected export filters for the given entity.
 * @param filterKeyValue - Export filters.
 * @returns selected export filters.
 */
export function initExportEntityFilters(
  filterKeyValue: ExportFilterKeyExportCategory
): Filters {
  const filters: Filters = [];
  for (const [, { key, values }] of filterKeyValue) {
    filters.push({ categoryKey: key, value: values });
  }
  return filters;
}
