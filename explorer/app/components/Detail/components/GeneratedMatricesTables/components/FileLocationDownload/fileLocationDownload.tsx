import { FileDownloadButton } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/FileDownloadButton/fileDownloadButton";
import { ButtonGroupButton } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { DownloadIconSmall } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@clevercanary/data-explorer-ui/lib/hooks/useFileLocation";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";

export interface FileLocationDownloadProps {
  projectMatrixView: ProjectMatrixView;
}

export const FileLocationDownload = ({
  projectMatrixView,
}: FileLocationDownloadProps): JSX.Element => {
  const { fileName, url } = projectMatrixView;
  const { fileUrl, isLoading, run } = useFileLocation(url);
  return (
    <>
      <ButtonGroupButton
        action="Download project matrix"
        label={<DownloadIconSmall />}
        loading={isLoading}
        onClick={run}
      />
      <FileDownloadButton fileName={fileName} fileUrl={fileUrl} />
    </>
  );
};
