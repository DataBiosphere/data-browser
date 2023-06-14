import { SelectCategory } from "@clevercanary/data-explorer-ui/lib/common/entities";

/**
 * Set of possible values for the export filter key.
 */
export enum ExportFilterKey {
  ENTITY_ID = "ENTITY_ID",
  FILE_FORMAT = "FILE_FORMAT",
  GENUS_SPECIES = "GENUS_SPECIES",
}

/**
 * Filter model of export select category.
 */
export interface ExportSelectCategory extends Omit<SelectCategory, "values"> {
  values: string[];
}

/**
 * Map of export filter key to export select category.
 */
export type ExportFilterKeyExportCategory = Map<
  ExportFilterKey,
  ExportSelectCategory
>;
