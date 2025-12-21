import { ButtonGroupButton } from "@databiosphere/findable-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { ContentCopyIconSmall } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@databiosphere/findable-ui/lib/hooks/useFileLocation";
import copy from "copy-to-clipboard";
import { useEffect } from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";

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
