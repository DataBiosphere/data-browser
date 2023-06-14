import { textBody4002Lines } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Label = styled.div`
  ${textBody4002Lines};
  color: ${({ theme }) => theme.palette.ink.light};
`;

export const Values = styled.div`
  ${textBody4002Lines};
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;

  span {
    word-break: break-word;
  }

  code {
    color: ${({ theme }) => theme.palette.ink.light};
  }
`;
