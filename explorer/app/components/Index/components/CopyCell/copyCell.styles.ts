import { CopyToClipboard as DXCopyToClipboard } from "@databiosphere/findable-ui/lib/components/common/CopyToClipboard/copyToClipboard";
import styled from "@emotion/styled";

export const Cell = styled.div`
  display: flex;
`;

export const CellText = styled("span")`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CopyToClipboard = styled(DXCopyToClipboard)`
  bottom: 2px;
  margin-left: 4px;
  position: relative;
`;
