import { ReactNode } from "react";
import { FileNameCell as Cell } from "./fileNameCell.styles";
import { JSX } from "react";

export interface FileNameCellProps {
  archivePreview?: ReactNode;
  fileName: string;
}

export const FileNameCell = ({ fileName }: FileNameCellProps): JSX.Element => {
  return <Cell>{fileName}</Cell>;
};
