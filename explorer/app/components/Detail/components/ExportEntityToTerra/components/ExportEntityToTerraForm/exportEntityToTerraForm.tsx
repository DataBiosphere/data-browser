import { Filters } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";
import React, { useEffect, useMemo, useState } from "react";

export interface ExportEntityToTerraFormProps {
  fileFormats: string[];
  genusSpecies: string[];
  projectId: string;
}

export const ExportEntityToTerraForm = ({
  fileFormats,
  genusSpecies,
  projectId,
}: ExportEntityToTerraFormProps): JSX.Element => {
  const { updateExportFilters } = useDetailState();
  const [currentQueryId, setCurrentQueryId] = useState<string>();
  const filters = useMemo(
    () => buildExportFilters(projectId, genusSpecies, fileFormats),
    [fileFormats, genusSpecies, projectId]
  );

  useEffect(() => {
    if (currentQueryId) {
      // Filters are already set when the currentQueryId is defined by the projectId.
      return;
    } else {
      // Set currentQueryId to projectId.
      // Set export filters with the project id, and all available genus species and file formats.
      setCurrentQueryId(projectId);
      updateExportFilters(filters);
    }
  }, [currentQueryId, filters, projectId, updateExportFilters]);

  return <>{/* Export entity form */}</>;
};

/**
 * Returns selected export filters for the given project.
 * @param projectId - Project identifier.
 * @param genusSpecies - Genus species.
 * @param fileFormats - File formats.
 * @returns selected export filters.
 */
export function buildExportFilters(
  projectId: string,
  genusSpecies: string[],
  fileFormats: string[]
): Filters {
  const filters: Filters = [];
  /* projectId */
  filters.push({
    categoryKey: "projectId",
    value: [projectId],
  });
  /* genusSpecies */
  filters.push({
    categoryKey: "genusSpecies",
    value: genusSpecies,
  });
  /* fileFormat */
  filters.push({
    categoryKey: "fileFormat",
    value: fileFormats,
  });
  return filters;
}
