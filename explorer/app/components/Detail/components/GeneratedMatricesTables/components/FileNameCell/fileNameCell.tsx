import React from "react";
import { FileNameCell as Cell } from "./fileNameCell.styles";

export interface FileNameCellProps {
  value: string;
}

export const FileNameCell = ({ value }: FileNameCellProps): JSX.Element => {
  return <Cell>{value}</Cell>;
};
