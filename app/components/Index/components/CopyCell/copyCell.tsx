import { Cell, CellText, CopyToClipboard } from "./copyCell.styles";
import { JSX } from "react";

interface CopyCellProps {
  value: string;
}

export const CopyCell = ({ value }: CopyCellProps): JSX.Element => {
  return (
    <Cell>
      <CellText>{value}</CellText>
      <CopyToClipboard copyStr={value} />
    </Cell>
  );
};
