import { ButtonGroupButton } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { InventoryIconSmall } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";

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
  return isArchivePreviewAvailable(projectMatrixView) ? (
    <ButtonGroupButton
      action="View archive preview"
      label={<InventoryIconSmall />}
      onClick={(): void => console.log("Archive", projectMatrixView)}
    />
  ) : null;
};
