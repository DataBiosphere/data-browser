import { ButtonGroupButton } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { InventoryIconSmall } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";

export interface FileLocationArchivePreviewProps {
  projectMatrixView: ProjectMatrixView;
}

export const FileLocationArchivePreview = ({
  projectMatrixView,
}: FileLocationArchivePreviewProps): JSX.Element => {
  return (
    <ButtonGroupButton
      action="View archive preview"
      label={<InventoryIconSmall />}
      onClick={(): void => console.log("Archive", projectMatrixView)}
    />
  );
};
