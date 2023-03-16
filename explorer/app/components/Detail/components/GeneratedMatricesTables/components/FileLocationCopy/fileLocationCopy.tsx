import { ButtonGroupButton } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { ContentCopyIconSmall } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@clevercanary/data-explorer-ui/lib/hooks/useFileLocation";
import copy from "copy-to-clipboard";
import React, { useEffect } from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/common/entities";

export interface FileLocationCopyProps {
  projectMatrixView: ProjectMatrixView;
}

export const FileLocationCopy = ({
  projectMatrixView,
}: FileLocationCopyProps): JSX.Element => {
  const { url } = projectMatrixView;
  const { fileUrl, isLoading, isSuccess, run } = useFileLocation(url);

  useEffect(() => {
    if (fileUrl && isSuccess) {
      copy(fileUrl);
    }
  }, [fileUrl, isSuccess]);

  return (
    <ButtonGroupButton
      action="Copy project matrix"
      label={<ContentCopyIconSmall />}
      loading={isLoading}
      onClick={run}
    />
  );
};
