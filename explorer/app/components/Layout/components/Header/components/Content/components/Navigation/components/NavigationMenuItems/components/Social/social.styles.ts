import { mediaDesktopSmallUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const ButtonLabel = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  ${mediaDesktopSmallUp} {
    .MuiTypography-text-body-large-400 {
      font: inherit;
    }
  }
`;
