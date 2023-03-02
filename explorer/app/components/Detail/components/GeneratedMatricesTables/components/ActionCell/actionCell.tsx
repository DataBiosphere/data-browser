import {
  ButtonGroup,
  ButtonGroupProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/buttonGroup";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";
import { FileLocationArchivePreview } from "../FileLocationArchivePreview/fileLocationArchivePreview";
import { FileLocationCopy } from "../FileLocationCopy/fileLocationCopy";
import { FileLocationDownload } from "../FileLocationDownload/fileLocationDownload";

export interface ActionCellProps {
  projectMatrixView: ProjectMatrixView;
}

export const ActionCell = ({
  projectMatrixView,
}: ActionCellProps): JSX.Element => {
  // Build buttons for the button group.
  const Buttons: ButtonGroupProps["Buttons"] = [];
  // Download matrix button.
  Buttons.push(<FileLocationDownload projectMatrixView={projectMatrixView} />);
  // Copy matrix button.
  Buttons.push(<FileLocationCopy projectMatrixView={projectMatrixView} />);
  // View archive preview button.
  Buttons.push(
    <FileLocationArchivePreview projectMatrixView={projectMatrixView} />
  );
  return <ButtonGroup Buttons={Buttons} />;
};
