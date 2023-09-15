import { Cell, CopyToClipboard } from "./copyCell.styles";

interface CopyCellProps {
  value: string;
}

export const CopyCell = ({ value }: CopyCellProps): JSX.Element => {
  return (
    <>
      <Cell>{value}</Cell>
      <CopyToClipboard copyStr={value} />
    </>
  );
};
