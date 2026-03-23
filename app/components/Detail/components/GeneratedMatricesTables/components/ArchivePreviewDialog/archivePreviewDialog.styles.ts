import styled from "@emotion/styled";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

export const ArchivePreviewDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 816px;
  }
`;

export const ArchivePreviewDialogContent = styled(DialogContent)`
  padding: 0;
`;

export const ArchivePreviewDialogActions = styled(DialogActions)`
  justify-content: flex-start;
`;
