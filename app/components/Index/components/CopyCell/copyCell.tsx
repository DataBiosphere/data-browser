import { JSX } from "react";
import { Cell, CellText, CopyToClipboard } from "./copyCell.styles";

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
