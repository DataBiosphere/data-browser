import { ButtonGroup } from "@clevercanary/data-explorer-ui/lib/components/common/ButtonGroup/buttonGroup";
import { DialogTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Dialog/components/DialogTitle/dialogTitle";
import React from "react";
import { ProjectMatrixView } from "../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";
import { FileLocationCopy } from "../FileLocationCopy/fileLocationCopy";
import { FileLocationDownload } from "../FileLocationDownload/fileLocationDownload";
import {
  ArchivePreviewDialog as Dialog,
  ArchivePreviewDialogActions as DialogActions,
  ArchivePreviewDialogContent as DialogContent,
} from "./archivePreviewDialog.styles";
import {
  ArchivePreviewTable,
  SetLoadingFn,
} from "./components/ArchivePreviewTable/archivePreviewTable";

export interface FileLocationArchivePreviewModalProps {
  onClose: () => void;
  open: boolean;
  projectMatrixView: ProjectMatrixView;
  setLoading: SetLoadingFn;
}

export const ArchivePreviewDialog = ({
  onClose,
  open,
  projectMatrixView,
  setLoading,
}: FileLocationArchivePreviewModalProps): JSX.Element => {
  return (
    <Dialog fullWidth maxWidth={false} open={open} onClose={onClose}>
      <DialogTitle title="Preview Archive" onClose={onClose} />
      <DialogContent dividers>
        <ArchivePreviewTable
          projectMatrixView={projectMatrixView}
          setLoading={setLoading}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          Buttons={[
            <FileLocationDownload
              key="download"
              projectMatrixView={projectMatrixView}
            />,
            <FileLocationCopy
              key="copy"
              projectMatrixView={projectMatrixView}
            />,
          ]}
        />
      </DialogActions>
    </Dialog>
  );
};
