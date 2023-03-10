import React, { ReactNode } from "react";
import { FileNameCell as Cell } from "./fileNameCell.styles";

export interface FileNameCellProps {
  archivePreview?: ReactNode;
  fileName: string;
}

export const FileNameCell = ({
  archivePreview,
  fileName,
}: FileNameCellProps): JSX.Element => {
  return (
    <Cell>
      {fileName}
      {archivePreview}
    </Cell>
  );
};
