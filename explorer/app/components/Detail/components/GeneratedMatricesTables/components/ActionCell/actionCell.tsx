import { FileDownloadButton } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/FileDownloadButton/fileDownloadButton";
import { ButtonGroup } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/buttonGroup";
import {
  ContentCopyIconSmall,
  DownloadIconSmall,
  InventoryIconSmall,
} from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@clevercanary/data-explorer-ui/lib/hooks/useFileLocation";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";

export interface ActionCellProps {
  projectMatrixView: ProjectMatrixView;
}

export const ActionCell = ({
  projectMatrixView,
}: ActionCellProps): JSX.Element => {
  const { fileName, url } = projectMatrixView;
  const { fileUrl, isLoading, run } = useFileLocation(url);
  // Build buttons for the button group.
  const buttons: ButtonGroup[] = [];
  // Download matrix button.
  if (url) {
    buttons.push({
      action: "Download project matrix",
      label: <DownloadIconSmall />,
      loading: isLoading,
      onClick: run,
    });
  }
  // Copy matrix button.
  buttons.push({
    action: "Copy project matrix",
    label: <ContentCopyIconSmall />,
    onClick: () => console.log("Copy"),
  });
  // View archive preview button.
  buttons.push({
    action: "View archive preview",
    label: <InventoryIconSmall />,
    onClick: () => console.log("Archive"),
  });
  return (
    <>
      <ButtonGroup buttons={buttons} />
      <FileDownloadButton fileName={fileName} fileUrl={fileUrl} />
    </>
  );
};
