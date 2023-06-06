import {
  Filters,
  SelectCategory,
} from "@clevercanary/data-explorer-ui/lib/common/entities";
import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";
import React, { useEffect, useState } from "react";

export enum ExportFilterKey {
  ENTITY_ID = "ENTITY_ID",
  FILE_FORMAT = "FILE_FORMAT",
  GENUS_SPECIES = "GENUS_SPECIES",
}

export interface ExportSelectCategory extends Omit<SelectCategory, "values"> {
  values: string[];
}

export type ExportFilterKeyExportCategory = Map<
  ExportFilterKey,
  ExportSelectCategory
>;

export interface ExportEntityToTerraFormProps {
  entityFilters?: Filters; // Initial filters for the entity.
  filterKeyValue: ExportFilterKeyExportCategory;
}

export const ExportEntityToTerraForm = ({
  entityFilters,
}: ExportEntityToTerraFormProps): JSX.Element => {
  const { updateExportFilters } = useDetailState();
  const [filters] = useState<Filters>(entityFilters || []);

  // Set export filters with the entity id, and any selected filter categories.
  useEffect(() => {
    updateExportFilters(filters);
  }, [filters, updateExportFilters]);

  return <>{/* Export entity form */}</>;
};
