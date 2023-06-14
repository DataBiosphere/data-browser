import { Filters } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { BULK_DOWNLOAD_EXECUTION_ENVIRONMENT } from "@clevercanary/data-explorer-ui/lib/components/Export/common/entities";
import { useDetailState } from "@clevercanary/data-explorer-ui/lib/hooks/useDetailState";
import React, { useEffect, useState } from "react";
import { ExportFilterKeyExportCategory } from "../../common/entities";

export interface DownloadEntityCurlCommandFormProps {
  entityFilters?: Filters; // Initial filters for the entity.
  filterKeyValue: ExportFilterKeyExportCategory;
}

export const DownloadEntityCurlCommandForm = ({
  entityFilters,
}: DownloadEntityCurlCommandFormProps): JSX.Element => {
  const { updateExecutionEnvironment, updateExportFilters } = useDetailState();
  const [filters] = useState<Filters>(entityFilters || []);

  // Set execution environment.
  // TODO: Allow user to select execution environment.
  useEffect(() => {
    updateExecutionEnvironment(BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH);
  }, [updateExecutionEnvironment]);

  // Set download curl command filters with the entity id, and any selected filter categories.
  useEffect(() => {
    updateExportFilters(filters);
  }, [filters, updateExportFilters]);

  return <>{/* Download curl command form */}</>;
};
