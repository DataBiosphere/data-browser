import { useAsync } from "@databiosphere/findable-ui/lib/hooks/useAsync";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { useEffect } from "react";
import {
  ArchiveFile,
  fetchProjectMatrixArchiveFiles,
} from "../apis/azul/hca-dcp/archivePreview/archivePreview";
import { ProjectMatrixView } from "../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";

export interface UseArchivePreview {
  archiveFiles?: ArchiveFile[];
  isLoading: boolean;
  isSuccess: boolean;
}

/**
 * Fetches archive files for the specified project matrix view.
 * @param projectMatrixView - Project matrix view.
 * @returns archive files.
 */
export const useProjectMatrixArchiveFiles = (
  projectMatrixView: ProjectMatrixView
): UseArchivePreview => {
  const {
    data: archiveFiles,
    isLoading,
    isSuccess,
    run,
  } = useAsync<ArchiveFile[]>();
  const { id, version } = projectMatrixView;
  const { config } = useConfig();
  const { browserURL } = config;

  useEffect(() => {
    run(fetchProjectMatrixArchiveFiles(browserURL, id, version));
  }, [browserURL, id, run, version]);

  return { archiveFiles, isLoading, isSuccess };
};
