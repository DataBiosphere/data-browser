import { FileDownloadButton } from "@databiosphere/findable-ui/lib/components/common/Button/components/FileDownloadButton/fileDownloadButton";
import { ButtonGroupButton } from "@databiosphere/findable-ui/lib/components/common/ButtonGroup/components/ButtonGroupButton/buttonGroupButton";
import { DownloadIconSmall } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/common/constants";
import { useFileLocation } from "@databiosphere/findable-ui/lib/hooks/useFileLocation";
import { useLoginGuard } from "@databiosphere/findable-ui/lib/providers/loginGuard/hook";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";
import { JSX } from "react";

export interface FileLocationDownloadProps {
  projectMatrixView: ProjectMatrixView;
}

export const FileLocationDownload = ({
  projectMatrixView,
}: FileLocationDownloadProps): JSX.Element => {
  const { fileName, url } = projectMatrixView;
  const { fileUrl, isLoading, run } = useFileLocation(url);

  // Prompt user for login before download, if required.
  const { requireLogin } = useLoginGuard();

  return (
    <>
      <ButtonGroupButton
        action="Download project matrix"
        label={<DownloadIconSmall />}
        loading={isLoading}
        onClick={() => requireLogin(run)}
      />
      <FileDownloadButton fileName={fileName} fileUrl={fileUrl} />
    </>
  );
};
