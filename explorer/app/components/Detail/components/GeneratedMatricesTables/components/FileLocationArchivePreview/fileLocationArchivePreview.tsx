import { ButtonGroupButton } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { InventoryIconSmall } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import React, { useState } from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";
import { ArchivePreviewDialog } from "../ArchivePreviewDialog/archivePreviewDialog";

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
  const [loading, setLoading] = useState<boolean>(false);
  return isArchivePreviewAvailable(projectMatrixView) ? (
    <>
      <ButtonGroupButton
        action="View archive preview"
        label={<InventoryIconSmall />}
        loading={loading}
        onClick={(): void => setOpen(true)}
      />
      <ArchivePreviewDialog
        onClose={(): void => setOpen(false)}
        open={open}
        projectMatrixView={projectMatrixView}
        setLoading={setLoading}
      />
    </>
  ) : null;
};
