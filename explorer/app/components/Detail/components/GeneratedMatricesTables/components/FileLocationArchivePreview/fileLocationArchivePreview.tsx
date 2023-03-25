import React, { useState } from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";
import { ArchivePreviewDialog } from "../ArchivePreviewDialog/archivePreviewDialog";
import { FileLocationArchivePreviewButton as Button } from "./fileLocationArchivePreview.styles";

const ARCHIVE_FILE_TYPE_REGEX = /\.(zip|tar|tar\.gz)$/;

export interface FileLocationArchivePreviewProps {
  projectMatrixView: ProjectMatrixView;
}

/**
 * Returns true if a specified matrix view is an archive.
 * @param projectMatrixView - Project matrix view.
 * @returns true if a specified matrix view is an archive.
 */
function isArchivePreviewAvailable(
  projectMatrixView: ProjectMatrixView
): boolean {
  return ARCHIVE_FILE_TYPE_REGEX.test(projectMatrixView.fileName);
}

export const FileLocationArchivePreview = ({
  projectMatrixView,
}: FileLocationArchivePreviewProps): JSX.Element | null => {
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO future loading state for archive preview dialog.
  const [loading, setLoading] = useState<boolean>(false);
  return isArchivePreviewAvailable(projectMatrixView) ? (
    <>
      <Button onClick={(): void => setOpen(true)}>Preview Archive</Button>
      <ArchivePreviewDialog
        onClose={(): void => setOpen(false)}
        open={open}
        projectMatrixView={projectMatrixView}
        setLoading={setLoading}
      />
    </>
  ) : null;
};
