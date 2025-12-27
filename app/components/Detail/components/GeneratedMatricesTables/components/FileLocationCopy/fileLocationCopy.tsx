import { ButtonGroupButton } from "@databiosphere/findable-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { ContentCopyIconSmall } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@databiosphere/findable-ui/lib/hooks/useFileLocation";
import { useLoginGuard } from "@databiosphere/findable-ui/lib/providers/loginGuard/hook";
import copy from "copy-to-clipboard";
import { JSX, useEffect } from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";

export interface FileLocationCopyProps {
  projectMatrixView: ProjectMatrixView;
}

export const FileLocationCopy = ({
  projectMatrixView,
}: FileLocationCopyProps): JSX.Element => {
  const { url } = projectMatrixView;
  const { fileUrl, isLoading, isSuccess, run } = useFileLocation(url);

  // Prompt user for login before download, if required.
  const { requireLogin } = useLoginGuard();

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
      onClick={() => requireLogin(run)}
    />
  );
};
